import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import "antd/dist/antd.css";
import Header from "./layout/header/header";
import SideBar from "./layout/sideBar/sideBar";

const { Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout>
      <SideBar collapsed={collapsed} />
      <Layout className="site-layout">
        <Header
          collapsed={collapsed}
          MenuFoldOutlined={MenuFoldOutlined}
          MenuUnfoldOutlined={MenuUnfoldOutlined}
          toggleCollapse={toggleCollapse}
        />
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
