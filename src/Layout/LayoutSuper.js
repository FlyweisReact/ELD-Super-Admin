import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Newsidebar from "../Components/Newsider";

const LayoutSuper = () => {
  return (
    <div className="flex">
      <div className="">
        <Newsidebar />
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

export default LayoutSuper;
