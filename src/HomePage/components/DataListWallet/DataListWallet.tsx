import React, { useContext, useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, message, Popconfirm, Space, Table } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import { GlobalLoadingContext } from "src/global/contexts/global-loading";
import { IActivities } from "src/HomePage/model/activities";
import { IColumns } from "src/HomePage/model/columns";
import { STATUS } from "src/HomePage/model/status";
import { removeActivity } from "src/HomePage/services/httpsClient";
import ModalSpending from "../ModalSpending/ModalSpending";
interface IDataListWallet {
  isModalVisible: boolean;
  handleCancel: () => void;
  handleSubmit: () => void;
  activities: IActivities[] | any;
}

function DataListWallet(props: IDataListWallet) {
  const { activities, isModalVisible, handleCancel, handleSubmit } = props;
  const [data, setData] = useState<IActivities[]>();
  const [totalMoney, setTotalMoney] = useState<number>();
  const [rowSelected, setRowSelected] = useState<IActivities>();
  const { setLoadingState } = useContext(GlobalLoadingContext);
  const formatDate = (dates: Date) => {
    const date = new Date(dates);
    return date
      .toLocaleString("en-US", {
        day: "numeric",
        year: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
      })
      .replaceAll(",", "/");
  };

  useEffect(() => {
    if (activities) {
      const objectInstance = activities.map((activity: IActivities) => ({
        ...activity,
        key: activity.id,
        cost: new Intl.NumberFormat().format(activity.cost) + " VND",
        time: formatDate(activity.time),
      }));
      setData([...objectInstance]);

      if (activities.length > 0) {
        const total = activities.reduce(
          (pre: number | any, current: number | any) => {
            return pre.cost ?? 0 + current.cost;
          },
          0
        );
        setTotalMoney(total);
      }
    }
  }, [activities]);

  // rowSelection objects indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: IActivities[]) => {},
    onSelect: (record: any, selected: any, selectedRows: any) => {
      //console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
      //console.log(selected, selectedRows, changeRows);
    },
  };

  const summaryActivity = () => (
    <Table.Summary.Row>
      <Table.Summary.Cell index={0}>
        <Title level={5}>Total:</Title>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={1}></Table.Summary.Cell>
      <Table.Summary.Cell index={2}>
        {totalMoney && (
          <Title level={5}>
            <Text strong type="danger">
              {new Intl.NumberFormat().format(totalMoney) + " VND"}
            </Text>
          </Title>
        )}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={3}></Table.Summary.Cell>
      <Table.Summary.Cell index={4}></Table.Summary.Cell>
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
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSelectedKeys(e.target.value ? [e.target.value.trim()] : [])
          }
          onPressEnter={() => handleSearch(confirm)}
          style={{ marginBottom: 8, display: "block" }}
        />
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
      width: "30%",
      key: "expenditure",
      ...getColumnSearchProps("expenditure"),
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      width: "17%",
      sorter: {
        compare: (a: { cost: string }, b: { cost: string }) => {
          const first = a.cost.replace(/[VND|,]/g, "");
          const second = b.cost.replace(/[VND|,]/g, "");
          return Number(first) - Number(second);
        },
        multiple: 3,
      },
      ...getColumnSearchProps("cost"),
    },
    {
      title: "Time",
      dataIndex: "time",
      width: "23%",
      key: "time",
      ...getColumnSearchProps("time"),
    },
    {
      title: "Note",
      dataIndex: "note",
      width: "30%",
      key: "note",
      ...getColumnSearchProps("note"),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      render: (_: any, record: { key: React.Key }) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.key)}
        >
          <a>Delete</a>
        </Popconfirm>
      ),
    },
  ];
  const handleDelete = (activityId: React.Key) => {
    setLoadingState("loading");
    removeActivity(activityId)
      .then((res) => {
        if (res?.status === STATUS.SUCCESS) {
          setTimeout(() => {
            message.success("Delete spending successfully !");
          }, 700);
          handleSubmit();
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
  return (
    <>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection }}
        dataSource={data}
        summary={summaryActivity}
        onRow={(record: IActivities, rowIndex) => {
          return {
            onClick: () => {
              setRowSelected(record);
            },
          };
        }}
      />
      <ModalSpending
        isModalVisible={isModalVisible}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </>
  );
}
export default DataListWallet;
