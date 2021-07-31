import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, PageHeader } from "antd";
import React from "react";
import { DataListWallet } from "../components/dataListWallet/dataListWallet";
import "./homePageStyles.scss";
export default function HomePage() {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const handleSubmit = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <React.Fragment>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Title"
        extra={[
          <Button
            type="primary"
            key="add"
            size="large"
            icon={<PlusCircleOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Spending
          </Button>,
        ]}
      ></PageHeader>
      <DataListWallet
        isModalVisible={isModalVisible}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </React.Fragment>
  );
}
