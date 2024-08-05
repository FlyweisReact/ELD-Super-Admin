/** @format */

import React, { useState } from "react";
import { GoogleMapPage } from "../Components/GoogleMap";
import { useNavigate } from "react-router-dom";

const Park = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const navigate = useNavigate("");
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex ">
      {isDrawerOpen ? (
        <div className="flex relative">
          <div className="shadow-lg h-[100vh] w-[340px] px-4 text-[#000000]">
            <p className="text-[28px] mt-4">2102</p>
            <div className="my-4">
              <p className="text-[19px] font-[600]">
                I 97,LEm City, north California
              </p>
              <p>Today | 2:11 AM EDT</p>
            </div>
            <div className="flex justify-between">
              <div>
                <p>Distance Covered</p>
                <p className="font-[600]">141 mi</p>
              </div>
              <div>
                <p>Hours Driven</p>
                <p className="font-[600]">02h 03m</p>
              </div>
            </div>
            <div className="my-4">
              <p className="font-[600] pb-4">Drivers</p>
              <div className="flex flex-col gap-3">
                <div
                  className="flex justify-between cursor-pointer"
                  onClick={() => navigate("/Logbook/1")}
                >
                  <p>Muhammad Zurrain</p>
                  <div className="bg-[#F3F4F6] px-4 py-1 rounded-xl">
                    Logbook
                  </div>
                </div>
                <div
                  className="flex justify-between cursor-pointer"
                  onClick={() => navigate("/Logbook/1")}
                >
                  <p>Muhammad Zurrain</p>
                  <div className="bg-[#F3F4F6] px-4 py-1 rounded-xl">
                    Logbook
                  </div>
                </div>
                <div
                  className="flex justify-between cursor-pointer"
                  onClick={() => navigate("/Logbook/1")}
                >
                  <p>Muhammad Zurrain</p>
                  <div className="bg-[#F3F4F6] px-4 py-1 rounded-xl">
                    Logbook
                  </div>
                </div>
                <div
                  className="flex justify-between cursor-pointer"
                  onClick={() => navigate("/Logbook/1")}
                >
                  <p>Muhammad Zurrain</p>
                  <div className="bg-[#F3F4F6] px-4 py-1 rounded-xl">
                    Logbook
                  </div>
                </div>
              </div>
              <div
                className="flex justify-between my-4 cursor-pointer"
                onClick={() => navigate("/parked")}
              >
                <p className="font-[600]">Parked</p>
                <p>2:11 AM EDT</p>
              </div>
              <p>I 97,LEm City, north California</p>
            </div>
          </div>
          <div
            className="shadow-lg px-3 py-2 w-fit h-fit cursor-pointer"
            onClick={toggleDrawer}
          >
            <img src="../chevron_down.png" alt="" />
          </div>
        </div>
      ) : (
        <div
          className="shadow-lg px-3 py-2 w-fit h-fit cursor-pointer"
          onClick={toggleDrawer}
        >
          <img src="../chevron_down.png" alt="" />
        </div>
      )}
      <div className="flex-1">
        <GoogleMapPage />
      </div>
    </div>
  );
};

export default Park;
