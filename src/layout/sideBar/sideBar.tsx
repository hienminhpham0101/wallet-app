import { ContactsOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import "./sideBarStyles.scss";
import { useLocation } from "react-router-dom";
import { Logo } from "../../shared/icons";
interface Props {
  collapsed: boolean;
}
const { Sider } = Layout;

export default function SideBar(props: Props) {
  const { collapsed } = props;
  const location = useLocation();

  return (
    <Sider
      className={`side-bar ${collapsed ? "menu-micro" : ""}`}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className="logo">
        <Link to="/" className="d-flex align-items-center">
          <Logo /> {!collapsed && "My App"}
        </Link>
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        selectedKeys={[location.pathname]}
      >
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/contact" icon={<ContactsOutlined />}>
          <Link to="/contact">Contact</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
