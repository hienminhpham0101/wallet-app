import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Switch } from "antd";
import firebase from "firebase";
import React from "react";
import { useAuth } from "src/global/contexts/usersContext";
import "./headerStyles.scss";
interface Props {
  collapsed: boolean;
  MenuUnfoldOutlined: React.ForwardRefExoticComponent<Pick<any, string>>;
  MenuFoldOutlined: React.ForwardRefExoticComponent<Pick<any, string>>;
  toggleCollapse: () => void;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Header(props: Props) {
  const { userData } = useAuth();
  const { Header } = Layout;

  const {
    collapsed,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    toggleCollapse,
    darkMode,
    setDarkMode,
  } = props;

  const handleSignOut = () => {
    firebase.auth().signOut();
  };

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
          overlay={
            <Menu>
              <Menu.Item
                key="1"
                onClick={handleSignOut}
                icon={<UserOutlined />}
              >
                Sign Out
              </Menu.Item>
            </Menu>
          }
          placement="bottomCenter"
          className="px-0 py-0 border-none"
          icon={
            <img
              className="img-user px-0 py-0 border-none"
              src={userData.photoURL}
              alt="user"
            />
          }
        >
          {userData.displayName}
        </Dropdown.Button>
      </div>
    </Header>
  );
}
