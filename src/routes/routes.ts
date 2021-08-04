import AuthGuard from "src/auth/guards/guardAuth";
import React, { ComponentType } from "react";
import Login from "src/pages/login/login";
const HomePage = React.lazy(() => import("src/pages/homePage/page/homePage"));
const Contact = React.lazy(() => import("src/pages/contact/page/contact"));
const NotFound = React.lazy(() => import("src/pages/404_page/notFound"));
export interface IRoutes {
  path: string;
  Component: React.LazyExoticComponent<ComponentType<any>> | ComponentType<any>;
  exact?: boolean;
  guard?: React.LazyExoticComponent<ComponentType<any>> | ComponentType<any>;
}
const Routes: IRoutes[] = [
  {
    path: "/login",
    Component: Login,
    exact: true,
  },
  {
    path: "/",
    Component: HomePage,
    exact: true,
    guard: AuthGuard,
  },
  {
    path: "/contact",
    Component: Contact,
    exact: true,
    guard: AuthGuard,
  },
  {
    path: "*",
    Component: NotFound,
  },
];
export default Routes;
