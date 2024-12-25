import React from "react";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { ToastContainer } from "react-toastify";
import {
  Routes,
  Route,
} from "react-router-dom";
import { AdminLayout, EmptyLayout } from "./Layout";
import CreateInvoice from "../partials/CreateInvoice";
import Page404 from "../pages/Page404";

const AppRoute = ({
  component: Component,
  layout: Layout,
  screenProps: ScreenProps,
  ...rest
}) => (
  <Layout screenProps={ScreenProps} {...rest}>
    <Component />
  </Layout>
);

const Base = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path={"/"}
          element={<AppRoute component={Home} layout={AdminLayout} />}
        />
        <Route
          path={"/login"}
          element={<AppRoute component={SignIn} layout={EmptyLayout} />}
        />
        <Route
          path={"/signup"}
          element={<AppRoute component={SignUp} layout={EmptyLayout} />}
        />
        <Route
          path={"/create-invoice"}
          element={<AppRoute component={CreateInvoice} layout={AdminLayout} />}
        />
        <Route
          path={"/*"}
          element={<AppRoute component={Page404} layout={AdminLayout} />}
        />
      </Routes>
    </>
  );
};

export default Base;
