import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
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
import {
  DefaultSearch,
  IActivities,
  IParamsFilter,
} from "src/pages/homePage/model/activities";
import { ActivityKey, IColumns } from "src/pages/homePage/model/columns";
import {
  getActivities,
  removeActivity,
  updateActivity,
} from "src/pages/homePage/services/httpsClient";
import { EditableCell } from "../../constants/columns/columns";
import ModalSpending from "../modalSpending/modalSpending";
import "./dataListWalletStyles.scss";
interface IDataListWallet {
  isModalVisible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

function DataListWalletComponent(props: IDataListWallet) {
  const { isModalVisible, onCancel, onSubmit } = props;
  const [data, setData] = useState<IActivities[]>([]);
  const { setLoadingState } = useContext(GlobalLoadingContext);
  const [totalMoney, setTotalMoney] = useState<number>();
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [totalData, setTotalData] = useState<number>(0);
  const [filters, setFilters] = useState<IParamsFilter>(DefaultSearch);
  const [forcedReload, setForcedReload] = useState(false);

  useEffect(() => {
    getActivities(filters)
      .then((res: any) => {
        const { status } = res;
        if (status === 200) {
          const { data, total } = res.data;
          if (data.length) {
            const objectInstance = data.map((activity: IActivities) => ({
              ...activity,
              key: activity.id,
              cost: new Intl.NumberFormat().format(activity.cost) + " VND",
              time: moment(activity.time).format("MM/DD/YYYY hh:mm"),
            }));
            setTotalData(total);
            setData([...objectInstance]);
            if (data.length > 0) {
              const total = data.reduce(
                (pre: number | any, current: number | any) => {
                  return { cost: pre.cost + current.cost };
                }
              );
              setTotalMoney(total.cost);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setData([]);
    };
  }, [filters, forcedReload]);

  const handleSearch = (confirm: () => void) => {
    confirm();
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const handleDateTime = (e: any) => {
    const startDate: Date | null = e ? moment(e[0]).toDate() : null;
    const endDate: Date | null = e ? moment(e[1]).toDate() : null;
    setFilters((pre) => {
      return {
        ...pre,
        startDate,
        endDate,
      };
    });
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
    }): JSX.Element => (
      <div className="pd-1">
        {dataIndex === "time" ? (
          <DatePicker.RangePicker
            className="mb-8 d-flex"
            onChange={(e) => handleDateTime(e)}
          />
        ) : (
          <React.Fragment>
            <Input
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSelectedKeys(e.target.value ? [e.target.value.trim()] : [])
              }
              onPressEnter={() => handleSearch(confirm)}
              className="d-block mb-1"
            />
            <Space className="mt-1">
              <Button
                type="primary"
                onClick={() => handleSearch(confirm)}
                icon={<SearchOutlined />}
                size="small"
              >
                Search
              </Button>
              <Button onClick={() => handleReset(clearFilters)} size="small">
                Reset
              </Button>
            </Space>
          </React.Fragment>
        )}
      </div>
    ),

    filterIcon: (filtered: string) => <SearchOutlined />,

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
      title: ActivityKey.Expenditure,
      dataIndex: ActivityKey.Expenditure,
      width: "25%",
      key: ActivityKey.Expenditure,
      ...getColumnSearchProps(ActivityKey.Expenditure),
      editable: true,
      fixed: "left",
      type: "text",
      required: true,
    },
    {
      title: ActivityKey.Cost,
      dataIndex: ActivityKey.Cost,
      key: ActivityKey.Cost,
      width: "20%",
      sorter: {
        compare: (a: { cost: string }, b: { cost: string }) => {
          const first = a.cost.replace(/[VND|,]/g, "");
          const second = b.cost.replace(/[VND|,]/g, "");
          return Number(first) - Number(second);
        },
        multiple: 3,
      },
      ...getColumnSearchProps(ActivityKey.Cost),
      editable: true,
      type: "number",
      required: true,
    },
    {
      title: ActivityKey.Time,
      dataIndex: ActivityKey.Time,
      width: "20%",
      key: ActivityKey.Time,
      ...getColumnSearchProps(ActivityKey.Time),
      editable: true,
      type: "date",
      required: true,
    },
    {
      title: ActivityKey.Note,
      dataIndex: ActivityKey.Note,
      width: "20%",
      key: ActivityKey.Note,
      ...getColumnSearchProps(ActivityKey.Note),
      editable: true,
      type: "text",
      required: false,
    },
    {
      title: "operation",
      dataIndex: "operation",
      key: "operation",
      width: "20%",
      fixed: "right",
      render: (_: any, record: IActivities) => {
        const editable = isEditing(record);
        return (
          <React.Fragment>
            {editable ? (
              <span>
                <Typography.Link onClick={() => save(record.key)}>
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
          </React.Fragment>
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

  const handleDelete = (activityId: React.Key) => {
    setLoadingState("loading");
    removeActivity(activityId)
      .then((res) => {
        if (res?.status === 200) {
          setTimeout(() => {
            message.success("Delete spending successfully !");
          }, 700);
          onSubmit();
          onReload();
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
          if (res?.status === 204) {
            setTimeout(() => {
              message.success("Update spending successfully !");
            }, 500);
            onSubmit();
            onReload();
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
          }, 500);
        });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleChangePaging = (page: number, pageSize?: number) => {
    setFilters((pre) => {
      return {
        ...pre,
        page,
        pageSize,
      };
    });
  };

  const onReload = () => {
    setForcedReload((pre) => !pre);
  };

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

  return (
    <Form form={form} component={false}>
      <Table
        columns={mergedColumns}
        dataSource={data}
        rowClassName="editable-row"
        summary={summaryActivity}
        size="middle"
        bordered
        pagination={{
          total: totalData,
          pageSize: filters.pageSize,
          onChange: handleChangePaging,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total} items`,
          size: "default",
        }}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        sticky
      />
      <ModalSpending
        isModalVisible={isModalVisible}
        handleSubmit={onSubmit}
        handleCancel={onCancel}
        handleReload={onReload}
      />
    </Form>
  );
}
export const DataListWallet = React.memo(DataListWalletComponent);
