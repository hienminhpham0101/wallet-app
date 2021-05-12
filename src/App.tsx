import NProgress from "nprogress";
import React, { ComponentType, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout, Spin } from "antd";
import "antd/dist/antd.css";
import "./assets/styles/styles.scss";
import Header from "./layout/header/header";
import SideBar from "./layout/sideBar/sideBar";
import Routes from "./routes/routes";
import { GlobalLoadingProvider } from "./global/contexts/global-loading";
const { Content } = Layout;

interface IRoutes {
  id: number;
  path: string;
  Component: ComponentType;
  exact?: boolean;
}

function App() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const [loadingState, setLoadingState] =
    useState<"init" | "loading" | "idle">("init");
  return (
    <GlobalLoadingProvider
      value={{
        loadingState,
        setLoadingState,
      }}
    >
      <Layout style={{ height: "100vh" }}>
        <React.Suspense fallback={<span>Loading ...</span>}>
          <Router>
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
                <Switch>
                  {Routes &&
                    Routes.map((route: IRoutes) => (
                      <Route
                        key={route.id}
                        exact={route.exact}
                        path={route.path}
                        component={route.Component}
                      />
                    ))}
                </Switch>
              </Content>
            </Layout>
          </Router>
        </React.Suspense>
      </Layout>
      {loadingState === "loading" && (
        <div className="global-loading">
          <Spin size="large" tip="Loading..." />
        </div>
      )}
    </GlobalLoadingProvider>
  );
}

export default App;
