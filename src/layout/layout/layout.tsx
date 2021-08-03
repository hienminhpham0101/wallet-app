import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import React, { ReactElement, useState } from "react";
import useDarkMode from "src/hooks/useDarkMode";
import Header from "../header/header";
import SideBar from "../sideBar/sideBar";
const { Content } = Layout;
interface IProps {
  children: ReactElement<any>;
}
export default function LayoutSection(props: IProps) {
  const { children } = props;
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useDarkMode();
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout className={`layout ${collapsed ? "collapsed" : null}`}>
      <SideBar collapsed={collapsed} />
      <Layout className="site-layout">
        <Header
          collapsed={collapsed}
          MenuFoldOutlined={MenuFoldOutlined}
          MenuUnfoldOutlined={MenuUnfoldOutlined}
          toggleCollapse={toggleCollapse}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <Content className="site-layout-background site-layout-custom">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
