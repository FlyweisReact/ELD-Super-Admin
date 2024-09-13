import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Newsidebar from "../Components/Newsider";

const LayoutSuper = () => {
  return (
    <div className="layout">
      <div className="sidebar">
        <Newsidebar />
      </div>
      <div className="w-[100%] main-component">
        <Header />
        <div className="w-[100%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutSuper;
