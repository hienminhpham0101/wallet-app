import React, { ComponentType } from "react";
const HomePage = React.lazy(() => import("../HomePage/page/HomePage"));
const Contact = React.lazy(() => import("../Contact/page/Contact"));
const NotFound = React.lazy(() => import("../404 Page/NotFound"));
export interface IRoutes {
  id: number;
  path: string;
  Component: ComponentType;
  exact?: boolean;
}
const Routes: IRoutes[] = [
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
