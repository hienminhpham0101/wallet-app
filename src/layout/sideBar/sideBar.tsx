import { HomeOutlined, ContactsOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import "./sideBarStyles.scss";
interface Props {
  collapsed: boolean;
}
const { Sider } = Layout;

export default function SideBar(props: Props) {
  const { collapsed } = props;
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo"></div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ContactsOutlined />}>
          <Link to="/contact">Contact</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
