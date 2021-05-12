import { Space, Table } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { columns } from "src/HomePage/constants/columns/columns";
import { IActivities } from "src/HomePage/model/activities";
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
  };
  return (
    <>
      {totalMoney && (
        <Space style={{ marginBottom: ".5rem" }}>
          <Title level={5}>
            <Text strong type="danger">
              Total Money: {new Intl.NumberFormat().format(totalMoney) + " VND"}
            </Text>
          </Title>
        </Space>
      )}
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
