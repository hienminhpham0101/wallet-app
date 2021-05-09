import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
} from "antd";
import "./ModalSpendingStyles.scss";
interface Props {
  isModalVisible: boolean;
  handleSubmit: () => void;
  handleCancel: () => void;
}

export default function ModalSpending(props: Props) {
  const { isModalVisible, handleCancel, handleSubmit } = props;
  const [form] = Form.useForm();

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
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
        title: "Do you Want to delete these items?",
        content: "Some descriptions",
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
      <Form form={form} layout="vertical" name="expenditure-form">
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
              <DatePicker renderExtraFooter={() => "extra footer"} showTime />
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
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="note" label="Note :">
          <Input.TextArea rows={3} />
        </Form.Item>
        <div style={{ marginBottom: "20px" }}></div>
      </Form>
    </Modal>
  );
}
