import React, { useEffect, useState } from "react";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
//import {column} from "src/HomePage/constants/columns/columns";
import { IActivities } from "src/HomePage/model/activities";
import ModalSpending from "../ModalSpending/ModalSpending";
import { IColumns } from "src/HomePage/model/columns";
import Highlighter from "react-highlight-words";
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
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

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
  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: {
      setSelectedKeys: any;
      selectedKeys: string;
      confirm: string;
      clearFilters: string;
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            //searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
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
          <Button
            type="link"
            size="small"
            // onClick={() => {
            //   confirm({ closeDropdown: false });
            //   setSearchText(selectedKeys), setSearchedColumn(dataIndex);
            // }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        //setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text: any) =>
      setSearchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    setSearchText(selectedKeys);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchText("");
  };

  const columns: IColumns[] = [
    {
      title: "Expenditure",
      dataIndex: "expenditure",
      key: "expenditure",
      ...getColumnSearchProps("expenditure"),
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      width: "12%",
      sorter: {
        compare: (a: any, b: any) => {
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
      width: "30%",
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
  ];
  useEffect(() => {
    if (activities && activities.length) {
      const objectInstance = activities.map((activity: IActivities) => ({
        ...activity,
        key: activity.id,
        cost: new Intl.NumberFormat().format(activity.cost) + " VND",
        time: formatDate(activity.time),
      }));
      setData([...objectInstance]);

      const total = activities.reduce(
        (pre: number | any, current: number | any) => pre.cost + current.cost
      );
      setTotalMoney(total);
    }
  }, [activities]);

  // rowSelection objects indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record: any, selected: any, selectedRows: any) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
      console.log(selected, selectedRows, changeRows);
    },
    onclick: (selected: any, selectedRows: any, changeRows: any) => {
      console.log(selected, selectedRows, changeRows);
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

  return (
    <>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection }}
        dataSource={data}
        summary={summaryActivity}
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
