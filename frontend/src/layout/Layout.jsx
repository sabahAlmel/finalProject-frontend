import React from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <Header />
      <Outlet />
      {location.pathname != "/dashboard" ? <Footer /> : <></>}
    </>
  );
}
