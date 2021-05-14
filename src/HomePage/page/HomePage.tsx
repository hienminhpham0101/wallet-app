import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import DataListWallet from "../components/DataListWallet/DataListWallet";
import { Status } from "../constants/responseStatus/status";
import { IActivities } from "../model/activities";
import { getActivities } from "../services/httpsClient";
export default function HomePage() {
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
    getActivities()
      .then((res: any) => {
        const { status, data } = res;
        if (status === Status.Success) {
          setActivities([...data]);
        }
      })
      .catch((err) => console.log(err));
  }, [forcedReload]);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          New Spending
        </Button>
      </div>
      <DataListWallet
        isModalVisible={isModalVisible}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onSuccess={handleSuccess}
        activities={activities}
      />
    </div>
  );
}
