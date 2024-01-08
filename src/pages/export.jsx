import { lazy } from "react";

const Home = lazy(() => import("./Home"));
const Contact = lazy(() => import("./Contact"));
const PageNotFound = lazy(() => import("./PageNotFound"));

export { Home, Contact, PageNotFound };
