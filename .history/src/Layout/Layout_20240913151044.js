/** @format */

import React from "react";
import { Outlet } from "react-router-dom";
import SuperSidebar from "../Components/SuperSidebar";

const Layout = () => {
  return (
    <div className="layout">
      <div className="sidebar">
        <SuperSidebar />
      </div>
      <div className="w-[100%] main-component">
        <div className="w-[100%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
