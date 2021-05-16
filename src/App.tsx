import React, { ComponentType, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "./assets/styles/styles.scss";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Spin } from "antd";
import { GlobalLoadingProvider } from "./global/contexts/global-loading";
import Header from "./layout/header/header";
import SideBar from "./layout/sideBar/sideBar";
import Routes from "./routes/routes";

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
      <Layout style={{ minHeight: "100vh" }}>
        <React.Suspense
          fallback={
            <div className="global-loading">
              <Spin tip="Loading ..." />
            </div>
          }
        >
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
