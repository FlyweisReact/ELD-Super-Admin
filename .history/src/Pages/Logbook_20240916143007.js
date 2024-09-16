/** @format */

import React, { useState, useEffect } from "react";
import refresh from "../Assets/Logbook/refresh.svg";
import { GoDotFill } from "react-icons/go";
import redisymbol from "../Assets/Logbook/redisymbol.svg";
import {
  Pagination,
  SectionHeading,
  Tabs,
} from "../Components/HelpingComponent";
import TableLayout from "../Components/TableLayout/TableLayout";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import PieChart from "../Components/PieChart";

const Logbook = () => {
  const [selectedTab, setselectedTab] = useState("Active");
  const navigate = useNavigate();

  return (
    <div className="p-5">
      <div className="font-semibold text-[28px] text-left">Logbook</div>
      <div className="mt-10 flex justify-between">
        <div className=" flex">
          <div
            className={`cursor-pointer ${
              selectedTab === "Active"
                ? "w-[208px] flex items-center justify-center  gap-2 underline-custom"
                : "w-[208px] flex items-center justify-center   gap-2"
            }`}
            onClick={() => setselectedTab("Active")}
          >
            Active (1)
            <img src={isymbol} alt=" " className="w-[15px] h-[15px]" />
          </div>
          <div
            className={`cursor-pointer ${
              selectedTab === "Inactive"
                ? "w-[208px] flex items-center justify-center   gap-2 underline-custom"
                : "w-[208px] flex items-center justify-center   gap-2"
            }`}
            onClick={() => setselectedTab("Inactive")}
          >
            Inactive (4) {" "}
            <img src={isymbol} alt=" " className="w-[15px] h-[15px]" />
          </div>
          <div
            className={`cursor-pointer ${
              selectedTab === "All"
                ? "w-[208px] flex items-center justify-center  gap-2 underline-custom"
                : "w-[208px] flex items-center  justify-center  gap-2"
            }`}
            onClick={() => setselectedTab("All")}
          >
            All (4)  <img src={isymbol} alt=" " className="w-[15px] h-[15px]" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[#8E8F8F] font-bold">
            Mode :<span className="text-[#34B7C1]">ELD</span>
          </div>
          <div className="w-[214px] h-[45px] rounded-lg border text-[#8E8F8F] flex justify-center items-center gap-2">
            10:16 PM (EDIT) <img src={refresh} alt="" />
          </div>
        </div>
      </div>
      <hr className="mt-5" />

      {selectedTab && (
        <div>
          {selectedTab === "Active" && (
            <>
              <div className="mt-5">
                <table class="border ">
                  <thead>
                    <tr className="bg-[#F0FAFB] h-[65px] ">
                      <th className="w-[180px] flex items-center justify-center h-[65px]">
                        Status <img src={statusfilter} alt="" />
                      </th>
                      <th className="w-[250px]  ">Driver | Vehicle </th>
                      <th className="w-[250px]">Location | Last Sync</th>
                      <th className="w-[180px] ">Violations</th>
                      <th className="w-[100px] text-left">HOS</th>
                      <th className="w-[150px] text-left">Drive Left</th>
                      <th className="w-[150px] text-left">Duty Left</th>
                      <th className="w-[150px] text-left">Cycle Left</th>
                      <th className="w-[150px] text-left">App Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      className="border-b cursor-pointer"
                      onClick={() => navigate("/Logbook/1")}
                    >
                      <td className="flex justify-center items-center">
                        {" "}
                        <div className="w-[53px] h-[30px] rounded-2xl bg-[#1E87F0] text-white flex justify-center items-center">
                          On{" "}
                        </div>
                      </td>
                      <td>Adam Bhalke powers 2101</td>
                      <td>
                        powhatan county, VA 23139 us Apr 1, 2024 | 12:18 am
                      </td>
                      <td className="flex justify-center items-center h-[65px]">
                        <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          00{" "}
                        </div>
                      </td>
                      <td>
                        <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full">
                          Ready
                          <br />
                          00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          11:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          14:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[77px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          70:00/8
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <GoDotFill style={{ color: "#A44C4C" }} />
                          Offline
                          <img src={redisymbol} alt="" />
                        </div>
                      </td>
                    </tr>
                    <tr
                      className="border-b"
                      onClick={() => navigate("/Logbook/1")}
                    >
                      <td className="flex justify-center items-center">
                        {" "}
                        <div className="w-[53px] h-[30px] rounded-2xl bg-[#1E87F0] text-white flex justify-center items-center">
                          On{" "}
                        </div>
                      </td>
                      <td>Adam Bhalke powers 2101</td>
                      <td>
                        powhatan county, VA 23139 us Apr 1, 2024 | 12:18 am
                      </td>
                      <td className="flex justify-center items-center h-[65px]">
                        <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          00{" "}
                        </div>
                      </td>
                      <td>
                        <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full">
                          Ready
                          <br />
                          00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          11:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          14:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[77px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          70:00/8
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <GoDotFill style={{ color: "#A44C4C" }} />
                          Offline
                          <img src={redisymbol} alt="" />
                        </div>
                      </td>
                    </tr>
                    <tr
                      className="border-b"
                      onClick={() => navigate("/Logbook/1")}
                    >
                      <td className="flex justify-center items-center">
                        {" "}
                        <div className="w-[53px] h-[30px] rounded-2xl bg-[#1E87F0] text-white flex justify-center items-center">
                          On{" "}
                        </div>
                      </td>
                      <td>Adam Bhalke powers 2101</td>
                      <td>
                        powhatan county, VA 23139 us Apr 1, 2024 | 12:18 am
                      </td>
                      <td className="flex justify-center items-center h-[65px]">
                        <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          00{" "}
                        </div>
                      </td>
                      <td>
                        <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full">
                          Ready
                          <br />
                          00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          11:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          14:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[77px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          70:00/8
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <GoDotFill style={{ color: "#A44C4C" }} />
                          Offline
                          <img src={redisymbol} alt="" />
                        </div>
                      </td>
                    </tr>
                    <tr
                      className="border-b"
                      onClick={() => navigate("/Logbook/1")}
                    >
                      <td className="flex justify-center items-center">
                        {" "}
                        <div className="w-[53px] h-[30px] rounded-2xl bg-[#1E87F0] text-white flex justify-center items-center">
                          On{" "}
                        </div>
                      </td>
                      <td>Adam Bhalke powers 2101</td>
                      <td>
                        powhatan county, VA 23139 us Apr 1, 2024 | 12:18 am
                      </td>
                      <td className="flex justify-center items-center h-[65px]">
                        <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          00{" "}
                        </div>
                      </td>
                      <td>
                        <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full">
                          Ready
                          <br />
                          00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          11:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          14:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[77px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          70:00/8
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <GoDotFill style={{ color: "#A44C4C" }} />
                          Offline
                          <img src={redisymbol} alt="" />
                        </div>
                      </td>
                    </tr>
                    <tr
                      className="border-b"
                      onClick={() => navigate("/Logbook/1")}
                    >
                      <td className="flex justify-center items-center">
                        {" "}
                        <div className="w-[53px] h-[30px] rounded-2xl bg-[#1E87F0] text-white flex justify-center items-center">
                          On{" "}
                        </div>
                      </td>
                      <td>Adam Bhalke powers 2101</td>
                      <td>
                        powhatan county, VA 23139 us Apr 1, 2024 | 12:18 am
                      </td>
                      <td className="flex justify-center items-center h-[65px]">
                        <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          00{" "}
                        </div>
                      </td>
                      <td>
                        <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full">
                          Ready
                          <br />
                          00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          11:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          14:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[77px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          70:00/8
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <GoDotFill style={{ color: "#A44C4C" }} />
                          Offline
                          <img src={redisymbol} alt="" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-5">
                <div className=" border-gray-200 bg-white px-4 py-3 sm:px-6">
                  <div className="flex flex-1 justify-between sm:hidden">
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Previous
                    </a>
                    <a
                      href="#"
                      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Next
                    </a>
                  </div>
                  <div className="flex justify-center">
                    <div>
                      <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                      >
                        <a
                          href="#"
                          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeftIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </a>
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        <a
                          href="#"
                          aria-current="page"
                          className="relative z-10 inline-flex items-center bg-[#1E87F0] px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          1
                        </a>
                        <a
                          href="#"
                          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                          2
                        </a>
                        <a
                          href="#"
                          className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                        >
                          3
                        </a>
                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                          ...
                        </span>
                        <a
                          href="#"
                          className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                        >
                          6
                        </a>
                        <a
                          href="#"
                          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                          7
                        </a>
                        <a
                          href="#"
                          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                          8
                        </a>
                        <a
                          href="#"
                          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                          <span className="sr-only">Next</span>
                          <ChevronRightIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 justify-between   mt-5">
                <div
                  onClick={() => {
                    navigate("/Drivers");
                  }}
                  className=" box-shadow  flex flex-col gap-10 rounded-xl bg-white p-6"
                >
                  <div className="flex font-semibold text-[20px] items-center gap-2">
                    <img src={dot} alt="" className="w-[11px] h-[17px]" />#
                    Drivers
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
                  onClick={() => {
                    navigate("/location");
                  }}
                  className=" box-shadow  flex flex-col gap-10 rounded-xl bg-white p-6"
                >
                  <div className="flex font-semibold text-[20px] items-center gap-2">
                    <img src={dot} alt="" className="w-[11px] h-[17px]" />#
                    Trucks & Vehicles
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
                  onClick={() => {
                    navigate("/Drivers");
                  }}
                  className=" box-shadow  flex flex-col gap-10 rounded-xl bg-white p-6"
                >
                  <div className="flex font-semibold text-[20px] items-center gap-2">
                    <img src={dot} alt="" className="w-[11px] h-[17px]" />#
                    Drivers
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
            </>
          )}
          {selectedTab === "Inactive" && (
            <>
              <div className="mt-5">
                <table class="border ">
                  <thead>
                    <tr className="bg-[#F0FAFB] h-[65px] ">
                      <th className="w-[180px] flex items-center justify-center h-[65px]">
                        Status <img src={statusfilter} alt="" />
                      </th>
                      <th className="w-[250px] ">Driver | Vehicle </th>
                      <th className="w-[250px]">Location | Last Sync</th>
                      <th className="w-[180px] ">Violations</th>
                      <th className="w-[100px] text-left">HOS</th>
                      <th className="w-[150px] text-left">Drive Left</th>
                      <th className="w-[150px] text-left">Duty Left</th>
                      <th className="w-[150px] text-left">Cycle Left</th>
                      <th className="w-[150px] text-left">App Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="flex justify-center items-center">
                        {" "}
                        <div className="w-[53px] h-[30px] rounded-2xl bg-[#F0506E33] text-[#FB6262] flex justify-center items-center">
                          Off
                        </div>
                      </td>
                      <td>Adam Bhalke powers 2101</td>
                      <td>
                        powhatan county, VA 23139 us Apr 1, 2024 | 12:18 am
                      </td>
                      <td className="flex justify-center items-center h-[65px]">
                        <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          00{" "}
                        </div>
                      </td>
                      <td>
                        <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full">
                          Ready
                          <br />
                          00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          11:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          14:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[77px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          70:00/8
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <GoDotFill style={{ color: "#A44C4C" }} />
                          Offline
                          <img src={redisymbol} alt="" />
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="flex justify-center items-center">
                        {" "}
                        <div className="w-[53px] h-[30px] rounded-2xl bg-[#F0506E33] text-[#FB6262] flex justify-center items-center">
                          Off
                        </div>
                      </td>
                      <td>Adam Bhalke powers 2101</td>
                      <td>
                        powhatan county, VA 23139 us Apr 1, 2024 | 12:18 am
                      </td>
                      <td className="flex justify-center items-center h-[65px]">
                        <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          00{" "}
                        </div>
                      </td>
                      <td>
                        <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full">
                          Ready
                          <br />
                          00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          11:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          14:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[77px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          70:00/8
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <GoDotFill style={{ color: "#A44C4C" }} />
                          Offline
                          <img src={redisymbol} alt="" />
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="flex justify-center items-center">
                        {" "}
                        <div className="w-[53px] h-[30px] rounded-2xl bg-[#F0506E33] text-[#FB6262] flex justify-center items-center">
                          Off
                        </div>
                      </td>
                      <td>Adam Bhalke powers 2101</td>
                      <td>
                        powhatan county, VA 23139 us Apr 1, 2024 | 12:18 am
                      </td>
                      <td className="flex justify-center items-center h-[65px]">
                        <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          00{" "}
                        </div>
                      </td>
                      <td>
                        <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full">
                          Ready
                          <br />
                          00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          11:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          14:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[77px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          70:00/8
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <GoDotFill style={{ color: "#A44C4C" }} />
                          Offline
                          <img src={redisymbol} alt="" />
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="flex justify-center items-center">
                        {" "}
                        <div className="w-[53px] h-[30px] rounded-2xl bg-[#F0506E33] text-[#FB6262] flex justify-center items-center">
                          Off
                        </div>
                      </td>
                      <td>Adam Bhalke powers 2101</td>
                      <td>
                        powhatan county, VA 23139 us Apr 1, 2024 | 12:18 am
                      </td>
                      <td className="flex justify-center items-center h-[65px]">
                        <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          00{" "}
                        </div>
                      </td>
                      <td>
                        <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full">
                          Ready
                          <br />
                          00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          11:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          14:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[77px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          70:00/8
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <GoDotFill style={{ color: "#A44C4C" }} />
                          Offline
                          <img src={redisymbol} alt="" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
          {selectedTab === "All" && (
            <>
              <div className="mt-5">
                <table class="border ">
                  <thead>
                    <tr className="bg-[#F0FAFB] h-[65px] ">
                      <th className="w-[180px] flex items-center justify-center h-[65px]">
                        Status <img src={statusfilter} alt="" />
                      </th>
                      <th className="w-[250px] ">Driver | Vehicle </th>
                      <th className="w-[250px]">Location | Last Sync</th>
                      <th className="w-[180px] ">Violations</th>
                      <th className="w-[100px] text-left">HOS</th>
                      <th className="w-[150px] text-left">Drive Left</th>
                      <th className="w-[150px] text-left">Duty Left</th>
                      <th className="w-[150px] text-left">Cycle Left</th>
                      <th className="w-[150px] text-left">App Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="flex justify-center items-center">
                        {" "}
                        <div className="w-[53px] h-[30px] rounded-2xl bg-[#F0506E33] text-[#FB6262] flex justify-center items-center">
                          Off
                        </div>
                      </td>
                      <td>Adam Bhalke powers 2101</td>
                      <td>
                        powhatan county, VA 23139 us Apr 1, 2024 | 12:18 am
                      </td>
                      <td className="flex justify-center items-center h-[65px]">
                        <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          00{" "}
                        </div>
                      </td>
                      <td>
                        <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full">
                          Ready
                          <br />
                          00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          11:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          14:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[77px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          70:00/8
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <GoDotFill style={{ color: "#A44C4C" }} />
                          Offline
                          <img src={redisymbol} alt="" />
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="flex justify-center items-center">
                        {" "}
                        <div className="w-[53px] h-[30px] rounded-2xl bg-[#F0506E33] text-[#FB6262] flex justify-center items-center">
                          Off
                        </div>
                      </td>
                      <td>Adam Bhalke powers 2101</td>
                      <td>
                        powhatan county, VA 23139 us Apr 1, 2024 | 12:18 am
                      </td>
                      <td className="flex justify-center items-center h-[65px]">
                        <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          00{" "}
                        </div>
                      </td>
                      <td>
                        <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full">
                          Ready
                          <br />
                          00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          11:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          14:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[77px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          70:00/8
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <GoDotFill style={{ color: "#A44C4C" }} />
                          Offline
                          <img src={redisymbol} alt="" />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="flex justify-center items-center">
                        {" "}
                        <div className="w-[53px] h-[30px] rounded-2xl bg-[#1E87F0] text-white flex justify-center items-center">
                          On{" "}
                        </div>
                      </td>
                      <td>Adam Bhalke powers 2101</td>
                      <td>
                        powhatan county, VA 23139 us Apr 1, 2024 | 12:18 am
                      </td>
                      <td className="flex justify-center items-center h-[65px]">
                        <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          00{" "}
                        </div>
                      </td>
                      <td>
                        <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full">
                          Ready
                          <br />
                          00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          11:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          14:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[77px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          70:00/8
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <GoDotFill style={{ color: "#A44C4C" }} />
                          Offline
                          <img src={redisymbol} alt="" />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="flex justify-center items-center">
                        {" "}
                        <div className="w-[53px] h-[30px] rounded-2xl bg-[#1E87F0] text-white flex justify-center items-center">
                          On{" "}
                        </div>
                      </td>
                      <td>Adam Bhalke powers 2101</td>
                      <td>
                        powhatan county, VA 23139 us Apr 1, 2024 | 12:18 am
                      </td>
                      <td className="flex justify-center items-center h-[65px]">
                        <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          00{" "}
                        </div>
                      </td>
                      <td>
                        <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full">
                          Ready
                          <br />
                          00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          11:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          14:00
                        </div>
                      </td>
                      <td>
                        <div className="w-[77px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center">
                          70:00/8
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <GoDotFill style={{ color: "#A44C4C" }} />
                          Offline
                          <img src={redisymbol} alt="" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Logbook;
