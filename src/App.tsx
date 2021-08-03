import { Spin } from "antd";
import "antd/dist/antd.css";
import { Fragment, Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./assets/styles/styles.scss";
import { token } from "./auth/services/localStorageService";
import { GlobalLoadingProvider } from "./global/contexts/global-loading";
import {
  initialCurrentUser,
  UserContextProvider,
} from "./global/contexts/usersContext";
import LayoutSection from "./layout/layout/layout";
import Routes, { IRoutes } from "./routes/routes";

function App() {
  const [loadingState, setLoadingState] = useState<"init" | "loading" | "idle">(
    "init"
  );

  const [userData, setUserData] = useState(initialCurrentUser);

  return (
    <GlobalLoadingProvider
      value={{
        loadingState,
        setLoadingState,
      }}
    >
      <UserContextProvider value={{ userData, setUserData }}>
        <Router>
          <Switch>
            {Routes &&
              Routes.map((route: IRoutes) => {
                const Guard = route.guard || Fragment;
                const Component = route.Component;
                return userData.googleId ? (
                  <LayoutSection>
                    <Route
                      key={route.path}
                      exact={route.exact}
                      path={route.path}
                    >
                      <Guard key="auth">
                        <Suspense
                          fallback={
                            <div className="global-loading">
                              <Spin size="large" tip="Loading ..." />
                            </div>
                          }
                        >
                          <Component />
                        </Suspense>
                      </Guard>
                    </Route>
                  </LayoutSection>
                ) : (
                  <Route
                    key={route.path}
                    exact={route.exact}
                    path={route.path}
                    component={route.Component}
                  >
                    <Guard key="auth">
                      <Suspense
                        fallback={
                          <div className="global-loading">
                            <Spin size="large" tip="Loading ..." />
                          </div>
                        }
                      >
                        <Component />
                      </Suspense>
                    </Guard>
                  </Route>
                );
              })}
          </Switch>
        </Router>
      </UserContextProvider>
      {loadingState === "loading" && (
        <div className="global-loading">
          <Spin size="large" tip="Loading..." />
        </div>
      )}
    </GlobalLoadingProvider>
  );
}

export default App;
