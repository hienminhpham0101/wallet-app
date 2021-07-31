import { Button, Dropdown, Layout, Menu, message, Switch } from "antd";
import React, { useContext } from "react";
import "./headerStyles.scss";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { UserContext } from "src/global/contexts/usersContext";
import Login from "../../pages/login/Login";
interface Props {
  collapsed: boolean;
  MenuUnfoldOutlined: React.ForwardRefExoticComponent<Pick<any, string>>;
  MenuFoldOutlined: React.ForwardRefExoticComponent<Pick<any, string>>;
  toggleCollapse: () => void;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Header(props: Props) {
  const userData = useContext(UserContext);
  const { Header } = Layout;
  const {
    collapsed,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    toggleCollapse,
    darkMode,
    setDarkMode,
  } = props;
  function handleMenuClick(e: any) {
    message.info("Click on menu item.");
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className="site-layout-background d-flex justify-content-between align-items-center">
      <div className="trigger" onClick={toggleCollapse}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <Login />
      <div className="side-right">
        <Switch
          defaultChecked={darkMode}
          checkedChildren="☀"
          unCheckedChildren="☾"
          onClick={() => setDarkMode(!darkMode)}
          className="side-item"
        />
        <Button
          type="text"
          shape="circle"
          icon={<BellOutlined />}
          className="side-item border-none"
        />
        <Dropdown.Button
          overlay={menu}
          placement="bottomCenter"
          className="px-0 py-0 border-none"
          icon={
            <img
              className="img-user px-0 py-0 border-none"
              src={userData.userData.imageUrl}
              alt="user"
            />
          }
        >
          {userData.userData.name}
        </Dropdown.Button>
      </div>
    </Header>
  );
}
