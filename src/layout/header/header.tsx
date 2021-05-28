import { Button, Dropdown, Layout, Menu, message, Switch } from "antd";
import React from "react";
import "./headerStyles.scss";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
interface Props {
  collapsed: boolean;
  MenuUnfoldOutlined: React.ForwardRefExoticComponent<Pick<any, string>>;
  MenuFoldOutlined: React.ForwardRefExoticComponent<Pick<any, string>>;
  toggleCollapse: () => void;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Header(props: Props) {
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
    console.log("click", e);
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
              src="https://lh3.googleusercontent.com/a-/AOh14GhAqKIrnuHhPxTmIEQezfNl4lhSu_IQHlpS_mU17w=s96-c"
              alt="user"
            />
          }
        >
          Hien Pham
        </Dropdown.Button>
      </div>
    </Header>
  );
}
