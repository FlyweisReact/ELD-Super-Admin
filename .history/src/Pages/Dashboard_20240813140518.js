/** @format */

import React, { useState } from "react";
import livebtn from "../Assets/Dashboard/livebtn.svg";
import dot from "../Assets/Dashboard/dot.svg";
import halfcircle from "../Assets/Dashboard/halfcircle.svg";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [selectedTab, setselectedTab] = useState("Today");
  const navigate = useNavigate("");
  

  return (
    <div className="bg-[#F9FBFF] p-5  h-[400px]">
      <div className="flex justify-between">
        <div className="semi-bold text-[28px]">
          Welcome back, Company XYZName!
        </div>
        <div className="w-[120px] flex justify-center items-center gap-2 h-[40px] border-[#EB5757] font-semibold border text-[#EB5757] rounded-3xl bg-[#FDEEEE]">
          <img src={livebtn} alt="" className="w-[24px] h-[24px]" />
          LIVE
        </div>
      </div>
      <div className="flex flex-col lg:flex-row  gap-5 justify-between mt-5">
        <div
          className=" box-shadow  flex flex-col gap-10 rounded-xl bg-white py-5 pb-[50px] px-10 cursor-pointer"
          onClick={() => navigate("/Logbook")}
        >
          <div className="flex font-semibold text-[20px] items-center gap-2">
            <img src={dot} alt="" className="w-[11px] h-[17px]" /># Drivers
          </div>
          <div className="flex items-center gap-5">
            <div className="relative">
              <img src={halfcircle} alt="" />
              <div className="absolute top-2/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  font-semibold text-[#2093c3]">
                87%
              </div>
            </div>
            <div className="mt-10">
              <div className="flex items-center font-semibold">
                <GoDotFill style={{ color: "#34B7C1" }} size={20} />1
              </div>
              <div className="font-semibold">Off </div>
              <div className="font-semibold">Duty</div>
            </div>
          </div>
        </div>
        <div
          className="box-shadow  flex flex-col gap-10 rounded-xl bg-white py-5 pb-[50px] px-10 cursor-pointer"
          onClick={() => navigate("/location")}
        >
          <div className="flex font-semibold text-[20px] items-center gap-2">
            <img src={dot} alt="" className="w-[11px] h-[17px]" /># Trucks &
            Vehicles
          </div>
          <div className="flex items-center gap-5">
            <div className="relative">
              <img src={halfcircle} alt="" />
              <div className="absolute top-2/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  font-semibold text-[#2093c3]">
                87%
              </div>
            </div>
            <div className="mt-10">
              <div className="flex items-center font-semibold">
                <GoDotFill style={{ color: "#34B7C1" }} size={20} />2
              </div>
              <div className="font-semibold">Parked </div>
            </div>
          </div>
        </div>
        <div
          className=" box-shadow  flex flex-col gap-10 rounded-xl bg-white py-5 pb-[50px] px-10 cursor-pointer"
          onClick={() => navigate("/Drivers")}
        >
          <div className="flex font-semibold text-[20px] items-center gap-2">
            <img src={dot} alt="" className="w-[11px] h-[17px]" /># Drivers
          </div>
          <div className="flex items-center gap-5">
            <div className="relative">
              <img src={halfcircle} alt="" />
              <div className="absolute top-2/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  font-semibold text-[#2093c3]">
                87%
              </div>
            </div>
            <div className="mt-10">
              <div className="flex items-center font-semibold">
                <GoDotFill style={{ color: "#34B7C1" }} size={20} />3
              </div>
              <div className="font-semibold">Off </div>
              <div className="font-semibold">Duty</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 bg-white  rounded-xl">
        <div className="flex gap-10 p-5 border-b ">
          <div
            className={`cursor-pointer ${
              selectedTab === "Today"
                ? "w-[208px] flex items-center justify-center gap-2 pb-2 underline-custom"
                : "w-[208px] flex items-center justify-center  gap-2"
            }`}
            onClick={() => setselectedTab("Today")}
          >
            Today
          </div>
          <div
            className={`cursor-pointer ${
              selectedTab === "7 Days"
                ? "w-[208px] flex items-center justify-center gap-2 pb-2 underline-custom"
                : "w-[208px] flex items-center justify-center  gap-2"
            }`}
            onClick={() => setselectedTab("7 Days")}
          >
            7 Days
          </div>
          <div
            className={`cursor-pointer ${
              selectedTab === "30 Days"
                ? "w-[208px] flex items-center justify-center gap-2 pb-2 underline-custom"
                : "w-[208px] flex items-center justify-center  gap-2"
            }`}
            onClick={() => setselectedTab("30 Days")}
          >
            30 Days
          </div>
        </div>

        <div className="mt-5 flex justify-between gap-5">
          <div
            className="box-shadow rounded-xl border p-5 w-full cursor-pointer"
            onClick={() => navigate("/Logbook")}
          >
            <div className="flex font-semibold text-[20px] items-center gap-2">
              <img src={dot} alt="" className="w-[11px] h-[17px]" /> 5
            </div>
            <div className="text-[20px] text-left pl-5 font-semibold ">
              # Signatures Missing
            </div>
          </div>
          <div className="box-shadow rounded-xl w-full border p-5">
            <div className="flex justify-between font-semibold text-[20px] items-center gap-2">
              <div className="flex items-center gap-3">
                <img src={dot} alt="" className="w-[11px] h-[17px]" />
                <span>5</span>
              </div>
              <p className="text-[#34B7C1]">25%</p>
            </div>
            <div className="text-[20px] text-left pl-5 font-semibold ">
              # Signatures Missing
            </div>
          </div>
          <div className="w-full box-shadow rounded-xl border p-5">
            <div className="flex font-semibold text-[20px] items-center gap-2">
              <img src={dot} alt="" className="w-[11px] h-[17px]" /> 5
            </div>
            <div className="text-[20px] text-left pl-5 font-semibold ">
              # Signatures Missing
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 justify-between mt-5">
          <div
            className="w-full border box-shadow  flex flex-col gap-10 rounded-xl bg-white py-5 pb-[50px] px-10 cursor-pointer"
            onClick={() => navigate("/Reportdetails")}
          >
            <div className="flex font-semibold text-[20px] items-center gap-2">
              <img src={dot} alt="" className="w-[11px] h-[17px]" /># Assets
              Fleet Stats - Trucks
            </div>
            <div className="flex items-center gap-5">
              <div className="relative">
                <img src={halfcircle} alt="" />
                <div className="absolute top-2/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  font-semibold text-[#2093c3]">
                  87%
                </div>
              </div>
              <div className="mt-10">
                <div className="flex items-center font-semibold">
                  <GoDotFill style={{ color: "#34B7C1" }} size={20} />1
                </div>
                <div className="font-semibold">Off </div>
                <div className="font-semibold">Duty</div>
              </div>
            </div>
          </div>
          <div className="w-full border box-shadow  flex flex-col gap-10 rounded-xl bg-white py-5 pb-[50px] px-10 ">
            <div className="flex font-semibold text-[20px] items-center gap-2">
              <img src={dot} alt="" className="w-[11px] h-[17px]" /># Assets
              Fleet Stats - Trucks
            </div>
            <div className="flex items-center gap-5">
              <div className="relative">
                <img src={halfcircle} alt="" />
                <div className="absolute top-2/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  font-semibold text-[#2093c3]">
                  87%
                </div>
              </div>
              <div className="mt-10">
                <div className="flex items-center font-semibold">
                  <GoDotFill style={{ color: "#34B7C1" }} size={20} />2
                </div>
                <div className="font-semibold">Parked </div>
              </div>
            </div>
          </div>
          <div className="w-full  border box-shadow  flex flex-col gap-10 rounded-xl bg-white py-5 pb-[50px] px-10 ">
            <div className="flex font-semibold text-[20px] items-center gap-2">
              <img src={dot} alt="" className="w-[11px] h-[17px]" /># Assets
              Fleet Stats - Trucks
            </div>
            <div className="flex items-center gap-5">
              <div className="relative">
                <img src={halfcircle} alt="" />
                <div className="absolute top-2/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  font-semibold text-[#2093c3]">
                  87%
                </div>
              </div>
              <div className="mt-10">
                <div className="flex items-center font-semibold">
                  <GoDotFill style={{ color: "#34B7C1" }} size={20} />3
                </div>
                <div className="font-semibold">Off </div>
                <div className="font-semibold">Duty</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center gap-5 mt-5">
          <div className="w-full basis-2/3  border box-shadow  flex flex-col gap-10 rounded-xl bg-white py-5 pb-[50px] px-10 ">
            <div className="flex font-semibold text-[20px] items-center gap-2">
              <img src={dot} alt="" className="w-[11px] h-[17px]" /># Assets
              Fleet Stats - Trucks
            </div>
            <div className="flex justify-center items-center gap-5">
              <div className="relative">
                <img src={halfcircle} alt="" />
                <div className="absolute top-2/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  font-semibold text-[#2093c3]">
                  87%
                </div>
              </div>
              <div className="mt-10">
                <div className="flex items-center font-semibold">
                  <GoDotFill style={{ color: "#34B7C1" }} size={20} />1
                </div>
                <div className="font-semibold">Off </div>
                <div className="font-semibold">Duty</div>
              </div>
            </div>
          </div>
          <div className="w-full basis-1/3 border box-shadow  flex flex-col gap-10 rounded-xl bg-white py-5 pb-[50px] px-10 ">
            <div className="flex font-semibold text-[20px] items-center gap-2">
              <img src={dot} alt="" className="w-[11px] h-[17px]" /># Assets
              Fleet Stats - Trucks
            </div>
            <div className="flex items-center gap-5">
              <div className="relative">
                <img src={halfcircle} alt="" />
                <div className="absolute top-2/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  font-semibold text-[#2093c3]">
                  87%
                </div>
              </div>
              <div className="mt-10">
                <div className="flex items-center font-semibold">
                  <GoDotFill style={{ color: "#34B7C1" }} size={20} />3
                </div>
                <div className="font-semibold">Off </div>
                <div className="font-semibold">Duty</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
