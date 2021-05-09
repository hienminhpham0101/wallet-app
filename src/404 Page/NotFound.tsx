import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      style={{ paddingTop: "15px" }}
      extra={
        <Button type="primary">
          <Link to="/">Back Home</Link>
        </Button>
      }
    />
  );
}
