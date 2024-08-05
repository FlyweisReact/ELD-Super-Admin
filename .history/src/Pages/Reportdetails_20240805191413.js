/** @format */

import React, { useState } from "react";
import { IoCloseSharp, IoFilterOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { LuArrowUpDown } from "react-icons/lu";
import DateFilter from "../Components/DateFilter";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Reportdetails = () => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const value = 29;

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: ["0-60%", "60%-80%", "80%+"],
    },
    yAxis: {
      title: {
        text: "#Vehicles",
      },
    },
    credits: {
      enabled: false, // Hide Highcharts.com label
    },

    series: [
      {
        name: "Avg Utilization",
        data: [10, 20, 25],
        color: "#FFC0C4",
      },
    ],
  };
  const options1 = {
    chart: {
      type: "line",
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false, // Hide Highcharts.com label
    },
    xAxis: {
      categories: [
        "Mar 5",
        "Mar 6",
        "Mar 7",
        "Mar 8",
        "Mar 9",
        "Mar 10",
        "Mar 11",
      ],
    },
    yAxis: {
      // title: {
      //     text: 'Avg Utilization(hr/day)'
      // }
    },
    labels: { enabled: false },
    series: [
      {
        name: "Avg Utilization",
        data: [10, 12, 15, 8, 11, 20, 25],
      },
    ],
  };

  return (
    <div className="p-4">
      {" "}
      <div className="">
        <div className="text-[28px] flex justify-start font-semibold">
          Reports
        </div>
      </div>
      <div className="flex justify-between items-center mt-5">
        <div>
          <div
            className="relative"
            onClick={() => {
              setOpenPopUp(true);
            }}
          >
            <input
              type="text"
              className="w-[297px] h-[45px] pl-9 border border-[#8E8F8F] rounded-lg p-2 "
              style={{ color: "#8E8F8F" }}
              placeholder="06 Mar, 2024 at 12:00 AM"
            />
            <img
              src="../Vector (11).png"
              alt=""
              className="absolute top-3 left-2"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="text-[#34B7C1] w-[163px] h-[45px] border border-[#34B7C1] flex justify-center items-center gap-5 rounded-lg">
            Filter <IoFilterOutline />
          </button>
          <button className=" w-[163px] h-[45px] text-white border bg-[#34B7C1] flex justify-center items-center gap-5 rounded-lg">
            Report Action
          </button>
          <button className=" w-[163px] h-[45px] text-white border bg-[#34B7C1] flex justify-center items-center gap-5 rounded-lg">
            <IoMdAdd style={{ color: "white" }} />
            Download
          </button>
        </div>
      </div>
      <div className="p-5 mt-4 rounded-md flex flex-col lg:flex-row gap-4 bg-[#F5F8F9] w-[80vw]">
        <div className="flex flex-col lg:flex-row gap-2 items-center  bg-white rounded-md p-4 mt-4 shadow lg:w-[26vw]">
          <div>
            <div style={{ width: 200, height: 200 }}>
              <CircularProgressbar value={value} text={`${value}`} />
            </div>
            <p className="text-center pt-2 text-xl"> Avg Utilization</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Avg. Hours Used/Day: 6hr</p>
            <p className="font-bold">Hours Available/Day: 24hr</p>
            <p className="font-bold">Total Hours Used: 42hr</p>
            <p className="font-bold">Total Miles Driven: 42mi</p>
          </div>
        </div>
        <div className="bg-white rounded-md p-4 mt-4 shadow lg:w-[25vw] ">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
        <div className="bg-white rounded-md p-4 mt-4 shadow lg:w-[25vw]">
          <HighchartsReact highcharts={Highcharts} options={options1} />
        </div>
      </div>
      <div className="mt-5">
        <table class="border w-full ">
          <thead>
            <tr className="bg-[#F0FAFB] h-[65px]  ">
              <th className="w-[180px] flex items-center gap-2 justify-start pl-2 h-[65px]">
                <input type="checkbox" /> Vehicle <LuArrowUpDown />
              </th>
              <th className="w-[180px] ">Vehicle Type</th>
              <th className="w-[180px] flex  items-center justify-center gap-2">
                Utilization
                <LuArrowUpDown />
              </th>
              <th className="w-[180px]">Avg. Utilization/Day  </th>
              <th className="w-[200px] flex  items-center justify-center gap-2">
                Hours Available/Day <LuArrowUpDown />
              </th>
              <th className="w-[180px]">Total Hours Used</th>
              <th className="w-[180px]">Total Miles Driven</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b h-[79px]">
              <td className="flex gap-2 justify-start h-[79px] items-center pl-2">
                <input type="checkbox" /> 2012
              </td>
              <td className="text-center">Truck</td>
              <td className="flex justify-center gap-2 items-center">
                {" "}
                <div className="w-[53px] h-[30px] rounded-lg bg-[#F0506E33] text-[#6F667F] flex justify-center items-center">
                  29%
                </div>
                <div className="w-[53px] h-[30px] rounded-lg bg-[#F0506E33] text-[#6F667F] flex justify-center items-center">
                  -30%
                </div>
              </td>
              <td className="text-center">7h 0m 0s</td>
              <td className="flex gap-2 items-center justify-center">
                24h
                <MdOutlineEdit />
              </td>
              <td className="text-center">42h</td>
              <td className="text-center">1,691 mi</td>
            </tr>
            <tr className="border-b h-[79px]">
              <td className="flex gap-2 justify-start h-[79px] items-center pl-2">
                <input type="checkbox" /> 2012
              </td>
              <td className="text-center">Truck</td>
              <td className="flex justify-center gap-2 items-center">
                {" "}
                <div className="w-[53px] h-[30px] rounded-lg bg-[#F0506E33] text-[#6F667F] flex justify-center items-center">
                  29%
                </div>
                <div className="w-[53px] h-[30px] rounded-lg bg-[#F0506E33] text-[#6F667F] flex justify-center items-center">
                  -30%
                </div>
              </td>
              <td className="text-center">7h 0m 0s</td>
              <td className="flex gap-2 items-center justify-center">
                24h
                <MdOutlineEdit />
              </td>
              <td className="text-center">42h</td>
              <td className="text-center">1,691 mi</td>
            </tr>
            <tr className="border-b h-[79px]">
              <td className="flex gap-2 justify-start h-[79px] items-center pl-2">
                <input type="checkbox" /> 2012
              </td>
              <td className="text-center">Truck</td>
              <td className="flex justify-center gap-2 items-center">
                {" "}
                <div className="w-[53px] h-[30px] rounded-lg bg-[#F0506E33] text-[#6F667F] flex justify-center items-center">
                  29%
                </div>
                <div className="w-[53px] h-[30px] rounded-lg bg-[#F0506E33] text-[#6F667F] flex justify-center items-center">
                  -30%
                </div>
              </td>
              <td className="text-center">7h 0m 0s</td>
              <td className="flex gap-2 items-center justify-center">
                24h
                <MdOutlineEdit />
              </td>
              <td className="text-center">42h</td>
              <td className="text-center">1,691 mi</td>
            </tr>
          </tbody>
        </table>
      </div>
      {openPopUp ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full px-5 pb-4 bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between py-5 rounded-t">
                  <h3 className="text-xl font-semibold text-black">
                    Date Filter
                  </h3>

                  <span
                    onClick={() => setOpenPopUp(false)}
                    className="cursor-pointer"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
                <hr className="mb-4" />
                <DateFilter />
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default Reportdetails;
