import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Spin } from "antd";
import "antd/dist/antd.css";
import React, { ComponentType, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./assets/styles/styles.scss";
import { GlobalLoadingProvider } from "./global/contexts/global-loading";
import useDarkMode from "./hooks/useDarkMode";
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
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <GlobalLoadingProvider
      value={{
        loadingState,
        setLoadingState,
      }}
    >
      <Layout className={`layout ${collapsed ? "collapsed" : null}`}>
        <React.Suspense
          fallback={
            <div className="global-loading">
              <Spin size="large" tip="Loading ..." />
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
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
              <Content className="site-layout-background site-layout-custom">
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
