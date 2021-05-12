import React, { useEffect, useState } from "react";
import { Button } from "antd";
import DataListWallet from "../components/DataListWallet/DataListWallet";
import { getActivities } from "../services/httpsClient";
import { PlusCircleOutlined } from "@ant-design/icons";
import { IActivities } from "../model/activities";
import { Status } from "../constants/responseStatus/status";
export default function HomePage() {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [activities, setActivities] = useState<IActivities[]>();
  const [forcedReload, setForcedReload] = useState(false);

  const handleSubmit = () => {
    setIsModalVisible(false);
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
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        activities={activities}
      />
    </div>
  );
}
