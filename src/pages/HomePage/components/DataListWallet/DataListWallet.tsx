import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Space,
  Table,
  Typography,
} from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { GlobalLoadingContext } from "src/global/contexts/global-loading";
import { IActivities } from "src/pages/HomePage/model/activities";
import { IColumns } from "src/pages/HomePage/model/columns";
import { STATUS } from "src/pages/HomePage/model/status";
import {
  removeActivity,
  updateActivity,
} from "src/pages/HomePage/services/httpsClient";
import ModalSpending from "../ModalSpending/ModalSpending";
import "./DataListWalletStyles.scss";
interface IDataListWallet {
  isModalVisible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  onSuccess: () => void;
  activities: IActivities[] | any;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: "number" | "text" | "date";
  record: IActivities;
  index: number;
  required: boolean;
  children: React.ReactNode;
}

function DataListWallet(props: IDataListWallet) {
  const { activities, isModalVisible, onCancel, onSubmit, onSuccess } = props;
  const { setLoadingState } = useContext(GlobalLoadingContext);
  const [data, setData] = useState<IActivities[] | undefined>();
  const [totalMoney, setTotalMoney] = useState<number>();
  const [, setRowSelected] = useState<IActivities>();
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    if (activities) {
      const objectInstance = activities.map((activity: IActivities) => ({
        ...activity,
        key: activity.id,
        cost: new Intl.NumberFormat().format(activity.cost) + " VND",
        time: moment(activity.time).format("MM/DD/YYYY hh:mm"),
      }));
      setData([...objectInstance]);

      if (activities.length > 0) {
        const total = activities.reduce(
          (pre: number | any, current: number | any) => {
            return { cost: pre.cost + current.cost };
          }
        );
        setTotalMoney(total.cost);
      }
    }
    return () => {
      setData([]);
    };
  }, [activities]);

  const summaryActivity = () => (
    <Table.Summary.Row>
      <Table.Summary.Cell index={0}>
        <Title level={5}>Total:</Title>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={1} colSpan={4}>
        {totalMoney && (
          <Title level={5}>
            <Text strong type="danger">
              {new Intl.NumberFormat().format(totalMoney) + " VND"}
            </Text>
          </Title>
        )}
      </Table.Summary.Cell>
    </Table.Summary.Row>
  );

  const handleSearch = (confirm: () => void) => {
    confirm();
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };
  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: {
      setSelectedKeys: (value: string[]) => React.ChangeEvent<HTMLInputElement>;
      selectedKeys: string;
      confirm: () => void;
      clearFilters: () => void;
    }) => (
      <div style={{ padding: 8 }}>
        {dataIndex === "time" ? (
          <DatePicker.RangePicker
            className="mb-8 d-flex"
            onChange={(e) => console.log(e)}
          />
        ) : (
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSelectedKeys(e.target.value ? [e.target.value.trim()] : [])
            }
            onPressEnter={() => handleSearch(confirm)}
            style={{ marginBottom: 8, display: "block" }}
          />
        )}

        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),

    filterIcon: (filtered: string) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),

    onFilter: (value: string, record: any) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
  });

  const columns: IColumns[] = [
    {
      title: "Expenditure",
      dataIndex: "expenditure",
      width: "25%",
      key: "expenditure",
      ...getColumnSearchProps("expenditure"),
      editable: true,
      fixed: "left",
      type: "text",
      required: true,
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      width: "20%",
      sorter: {
        compare: (a: { cost: string }, b: { cost: string }) => {
          const first = a.cost.replace(/[VND|,]/g, "");
          const second = b.cost.replace(/[VND|,]/g, "");
          return Number(first) - Number(second);
        },
        multiple: 3,
      },
      ...getColumnSearchProps("cost"),
      editable: true,
      type: "number",
      required: true,
    },
    {
      title: "Time",
      dataIndex: "time",
      width: "20%",
      key: "time",
      ...getColumnSearchProps("time"),
      editable: true,
      type: "date",
      required: true,
    },
    {
      title: "Note",
      dataIndex: "note",
      width: "20%",
      key: "note",
      ...getColumnSearchProps("note"),
      editable: true,
      type: "text",
      required: false,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      width: "20%",
      fixed: "right",
      render: (_: any, record: IActivities) => {
        const editable = isEditing(record);
        return (
          <>
            {editable ? (
              <span>
                <Typography.Link
                  onClick={() => save(record.key)}
                  style={{ marginRight: 5 }}
                >
                  Save
                </Typography.Link>
                <span className="separate">|</span>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <Typography.Link>Cancel</Typography.Link>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              >
                Edit
              </Typography.Link>
            )}
            <span className="separate">|</span>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <Typography.Link>Delete</Typography.Link>
            </Popconfirm>{" "}
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IActivities) => ({
        record,
        inputType: col.type,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        required: col.required,
      }),
    };
  });

  const handleDelete = (activityId: React.Key) => {
    setLoadingState("loading");
    removeActivity(activityId)
      .then((res) => {
        if (res?.status === STATUS.SUCCESS) {
          setTimeout(() => {
            message.success("Delete spending successfully !");
          }, 700);
          onSubmit();
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Error, please try again !");
      })
      .finally(() => {
        setLoadingState("idle");
      });
  };
  function disabledDate(current: any) {
    return current && current.valueOf() > Date.now();
  }
  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    required,
    ...restProps
  }) => {
    let inputNode: JSX.Element = <></>;
    switch (inputType) {
      case "text":
        inputNode = <Input />;
        break;
      case "number":
        inputNode = (
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        );
        break;
      case "date":
        inputNode = (
          <DatePicker
            disabledDate={(current) => disabledDate(current)}
            format="MM/DD/YYYY HH:mm:ss"
            placeholder="Select date"
            showTime
          />
        );
        break;
    }
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: required ? true : false,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const isEditing = (record: IActivities) => record.key === editingKey;

  const edit = (record: Partial<IActivities> & { key: React.Key }) => {
    form.setFieldsValue({
      ...record,
      cost: record.cost?.toString().replace(/[VND|,]/g, ""),
      time: moment(record.time),
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: string) => {
    try {
      const values = (await form.validateFields()) as IActivities;
      const objectInstance = {
        ...values,
        cost: Number(values.cost),
        time: moment(values.time.format("MM/DD/YYYY HH:mm:ss")),
      };
      setLoadingState("loading");
      updateActivity(key, { ...objectInstance, id: key })
        .then((res) => {
          if (res?.status === STATUS.UPDATED) {
            setTimeout(() => {
              message.success("Update spending successfully !");
            }, 800);
            onSuccess();
          } else {
            message.error("Error, please try again !");
          }
          setEditingKey("");
        })
        .catch((err) => {
          console.log(err);
          message.error("Error, please try again !");
        })
        .finally(() => {
          setTimeout(() => {
            setLoadingState("idle");
          }, 600);
        });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  return (
    <Form form={form} component={false}>
      {data && data.length && (
        <Table
          columns={mergedColumns}
          dataSource={data}
          rowClassName="editable-row"
          summary={summaryActivity}
          pagination={false}
          bordered
          onRow={(record: IActivities) => {
            return {
              onClick: () => {
                setRowSelected(record);
              },
            };
          }}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          scroll={{ y: 800 }}
          sticky
        />
      )}
      <ModalSpending
        isModalVisible={isModalVisible}
        handleSubmit={onSubmit}
        handleCancel={onCancel}
      />
    </Form>
  );
}
export default DataListWallet;
