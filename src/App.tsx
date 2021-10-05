import { Spin } from "antd";
import "antd/dist/antd.css";
import firebase from "firebase";
import { Fragment, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./assets/styles/styles.scss";
import { GlobalLoadingProvider } from "./global/contexts/global-loading";
import { ProgressBar } from "./global/progressBar/progressBar";
import {
  initialCurrentUser,
  UserContextProvider,
} from "./global/contexts/usersContext";
import LayoutSection from "./layout/layout/layout";
import Routes, { IRoutes } from "./routes/routes";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};

firebase.initializeApp(config);

function App() {
  const [loadingState, setLoadingState] = useState<"init" | "loading" | "idle">(
    "init"
  );

  const [userData, setUserData] = useState(initialCurrentUser);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user: any) => {
        if (user) {
          const { displayName, email, photoURL } = user;
          setIsSignedIn(!!user);
          setUserData({ displayName, email, photoURL });
          const token = user.getIdToken().then(function (accessToken: any) {
            return accessToken;
          });
          console.log("🚀 ~ file: App.tsx ~ line 41 ~ token ~ token", token);
        } else {
          setUserData(initialCurrentUser);
          setIsSignedIn(false);
        }
      });
    return () => {
      unregisterAuthObserver();
    };
  }, []);
  console.log("branch dev");
  console.log("branch dev2");

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
                return (
                  <Route key={route.path} exact={route.exact} path={route.path}>
                    <Guard key="auth">
                      <Suspense
                        fallback={<ProgressBar showProgress={route.progress} />}
                      >
                        {isSignedIn ? (
                          <LayoutSection>
                            <Component />
                          </LayoutSection>
                        ) : (
                          <Component />
                        )}
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
