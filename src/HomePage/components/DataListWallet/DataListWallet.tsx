import React from "react";
import { Button, Space, Switch, Table } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import ModalSpending from "../ModalSpending/ModalSpending";
import axios from "axios";

interface IColumns {
  title: string;
  dataIndex: string;
  key: string;
  width?: string;
  sorter?: any;
}

const columns: IColumns[] = [
  {
    title: "Expenditure",
    dataIndex: "Expenditure",
    key: "Expenditure",
  },
  {
    title: "Cost",
    dataIndex: "Cost",
    key: "Cost",
    width: "12%",
    sorter: {
      compare: (a: any, b: any) => a.Cost - b.Cost,
      multiple: 3,
    },
  },
  {
    title: "Time",
    dataIndex: "Time",
    width: "30%",
    key: "Time",
  },
  {
    title: "Note",
    dataIndex: "Note",
    width: "30%",
    key: "Note",
  },
];

const data = [
  {
    key: 1,
    Expenditure: "John Brown sr.",
    Cost: 60,
    Time: "New York No. 1 Lake Park",
    Note: "no note",
    children: [
      {
        key: 11,
        Expenditure: "John Brown",
        Cost: 42,
        Time: "New York No. 2 Lake Park",
        Note: "no note",
      },
      {
        key: 12,
        Expenditure: "John Brown jr.",
        Cost: 30,
        Time: "New York No. 3 Lake Park",
        Note: "no note",
      },
    ],
  },
  {
    key: 2,
    Expenditure: "Joe Black",
    Cost: 32,
    Time: "Sidney No. 1 Lake Park",
    Note: "no note",
  },
];

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
};

function DataListWallet() {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleSubmit = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          New Spending
        </Button>
      </div>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection }}
        dataSource={data}
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
