import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, PageHeader } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { GlobalLoadingContext } from "src/global/contexts/global-loading";
import DataListWallet from "../components/DataListWallet/DataListWallet";
import { STATUS } from "../constants/responseStatus/status";
import { IActivities } from "../model/activities";
import { getActivities } from "../services/httpsClient";
import "./homePageStyles.scss";
export default function HomePage() {
  const { setLoadingState } = useContext(GlobalLoadingContext);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [activities, setActivities] = useState<IActivities[]>();
  const [forcedReload, setForcedReload] = useState(false);

  const handleSubmit = () => {
    setIsModalVisible(false);
    setForcedReload((pre) => !pre);
  };
  const handleSuccess = () => {
    setForcedReload((pre) => !pre);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setLoadingState("loading");
    getActivities()
      .then((res: any) => {
        const { status, data } = res;
        if (status === STATUS.SUCCESS) {
          setActivities([...data]);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingState("idle"));
  }, [forcedReload]);

  return (
    <React.Fragment>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Title"
        subTitle="This is a subtitle"
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
        onSuccess={handleSuccess}
        activities={activities}
      />
    </React.Fragment>
  );
}
