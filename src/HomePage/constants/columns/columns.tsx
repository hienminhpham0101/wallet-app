import { Button, Input, Space } from "antd";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { IColumns } from "src/HomePage/model/columns";
import Highlighter from "react-highlight-words";

export const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

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
    },
  ];
};
