import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import SuperSidebar from "../Components/SuperSidebar";

const Layout = () => {
  return (
    <div className="flex">
      <div className="">
        <SuperSidebar />
      </div>
      <div className="w-[100%]">
        <Header />
        <div className="w-[100%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
