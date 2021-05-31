import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
} from "antd";
import locale from "antd/lib/date-picker/locale/vi_VN";
import React from "react";
import { GlobalLoadingContext } from "src/global/contexts/global-loading";
import { IActivities } from "src/pages/HomePage/model/activities";
import { addActivity } from "src/pages/HomePage/services/httpsClient";
import { STATUS } from "../../constants/responseStatus/status";
import "./ModalSpendingStyles.scss";
interface Props {
  isModalVisible: boolean;
  handleSubmit: () => void;
  handleCancel: () => void;
}

export default function ModalSpending(props: Props) {
  const { isModalVisible, handleCancel, handleSubmit } = props;
  const [form] = Form.useForm();
  const { setLoadingState } = React.useContext(GlobalLoadingContext);
  const onCreate = (activity: IActivities) => {
    setLoadingState("loading");
    addActivity(activity)
      .then((res) => {
        if (res?.status === STATUS.CREATED) {
          setTimeout(() => {
            message.success("Create spending successfully !");
          }, 800);
          handleSubmit();
        }
      })
      .catch((err) => {
        const { data } = err.response;
        message.error(data);
        console.log(err);
      })
      .finally(() => {
        setLoadingState("idle");
      });
  };
  const onSubmit = () => {
    form
      .validateFields()
      .then((values: IActivities) => {
        form.resetFields();
        onCreate(values);
        handleSubmit();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  const onReset = () => {
    form.resetFields();
  };
  const onCancel = () => {
    const { expenditure, time, cost } = form.getFieldsValue([
      "expenditure",
      "time",
      "cost",
    ]);
    if (expenditure && time && cost) {
      return Modal.confirm({
        title: "Are you sure you want to discard all data?",
        icon: <ExclamationCircleOutlined />,
        onOk() {
          form.resetFields();
          handleCancel();
        },
      });
    }
    form.resetFields();
    handleCancel();
  };
  return (
    <Modal
      visible={isModalVisible}
      title="Create a new expenditure"
      onCancel={handleCancel}
      maskClosable={false}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="reset" type="default" onClick={onReset}>
          Reset
        </Button>,
        <Button
          key="submit"
          onClick={onSubmit}
          form="expenditure-form"
          type="primary"
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="expenditure-form"
        className="mb-5"
      >
        <Form.Item
          name="expenditure"
          label="Expenditure :"
          rules={[
            {
              required: true,
              message: "This field is required !",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item
              name="time"
              label="Time :"
              rules={[
                {
                  required: true,
                  message: "This field is required !",
                },
              ]}
            >
              <DatePicker locale={locale} placeholder="Select date" showTime />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="cost"
              label="Cost :"
              rules={[
                {
                  required: true,
                  message: "This field is required !",
                },
              ]}
              hasFeedback
            >
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="note" label="Note :">
          <Input.TextArea rows={3} showCount maxLength={250} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
}
