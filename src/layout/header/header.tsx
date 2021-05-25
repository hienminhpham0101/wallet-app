import { Layout, Switch } from "antd";
import React from "react";
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
  const { Header } = Layout;
  const {
    collapsed,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    toggleCollapse,
    darkMode,
    setDarkMode,
  } = props;
  return (
    <Header className="site-layout-background d-flex align-items-center">
      <div className="trigger" onClick={toggleCollapse}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <Switch
        defaultChecked={darkMode}
        checkedChildren="☀"
        unCheckedChildren="☾"
        onClick={() => setDarkMode(!darkMode)}
      />
    </Header>
  );
}
