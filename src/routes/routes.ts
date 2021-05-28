import React, { ComponentType } from "react";
const HomePage = React.lazy(() => import("../pages/HomePage/page/HomePage"));
const Contact = React.lazy(() => import("../pages/Contact/page/Contact"));
const NotFound = React.lazy(() => import("../pages/404 Page/NotFound"));
const Login = React.lazy(() => import("../pages/Login/Login"));
export interface IRoutes {
  id: number;
  path: string;
  Component: ComponentType;
  exact?: boolean;
}
const Routes: IRoutes[] = [
  {
    id: 0,
    path: "/login",
    Component: Login,
    exact: true,
  },
  {
    id: 1,
    path: "/",
    Component: HomePage,
    exact: true,
  },
  {
    id: 2,
    path: "/contact",
    Component: Contact,
    exact: true,
  },
  {
    id: 3,
    path: "*",
    Component: NotFound,
  },
];
export default Routes;
