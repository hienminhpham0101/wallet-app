import { Button, Result } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
export default function Contact() {
  return (
    <Result
      status="warning"
      title="We are coming soon."
      icon={<MessageOutlined />}
      extra={
        <Button type="primary" key="console">
          <Link to="/">Go to Home Page</Link>
        </Button>
      }
    />
  );
}
