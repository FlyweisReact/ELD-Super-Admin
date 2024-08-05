import React from "react";
import logbook from "../Assets/Sidebar/logbook.svg";
import location from "../Assets/Sidebar/location.svg";
import dascams from "../Assets/Sidebar/dascams.svg";
import report from "../Assets/Sidebar/report.svg";
import ifta from "../Assets/Sidebar/ifta.svg";
import { Link } from "react-router-dom";
import vehicles from "../Assets/Sidebar/vehicles.svg";
import drivers from "../Assets/Sidebar/drivers.svg";
import Devices from "../Assets/Sidebar/devices.svg";
import userrole from "../Assets/Sidebar/userrole.svg";
import testimonial from "../Assets/Sidebar/testimonial.svg";
import alert from "../Assets/Sidebar/alert.svg";
import fmcsa from "../Assets/Sidebar/fmcsa.svg";
const Sidebar = () => {
  return (
    <div className="bg-[#F9FBFF] border-r h-[1000px] ">
      <Link to="/dashboard">
        <div className="text-center text-[rgb(52,183,193)] font-semibold text-2xl pt-10">
          Dashboard
        </div>
      </Link>

      <ul className="mt-10 flex flex-col gap-4 pl-2 pr-2 ">
        <Link to="/logbook">
          <li className="flex  pl-5 items-center w-[224px] h-[48px] bg-white rounded-lg hover:bg-[#F0FAFB]  cursor-pointer">
            <img src={logbook} alt="" className="w-[24px] h-[24px] " />

            <div className="text-[#80848F] ml-2 font-semibold text-[14.16px]">
              Logbook
            </div>
          </li>
        </Link>
        <Link to="/location">
        <li className="flex pl-5 items-center w-[224px] h-[48px] bg-white rounded-lg   cursor-pointer">
          <img src={location} alt="" className="w-[24px] h-[24px] " />

          <div className="text-[#80848F] ml-2 font-semibold text-[14.16px]">
            Location
          </div>
        </li>
        </Link>
        <Link to="/Dashcams">
          <li className="flex pl-5 items-center w-[224px] h-[48px] bg-white rounded-lg   cursor-pointer">
            <img src={dascams} alt="" className="w-[24px] h-[24px] " />

            <div className="text-[#80848F] ml-2 font-semibold text-[14.16px]">
              Dashcams
            </div>
          </li>
        </Link>
        <Link to="/reports">
          <li className="flex  pl-5 items-center w-[224px] h-[48px] bg-white rounded-lg   cursor-pointer">
            <img src={report} alt="" className="w-[24px] h-[24px] " />

            <div className="text-[#80848F] ml-2 font-semibold text-[14.16px]">
              Report
            </div>
          </li>
        </Link>
        <Link to="/Iftatrips">
          <li className="flex pl-5 items-center w-[224px] h-[48px] bg-white rounded-lg   cursor-pointer">
            <img src={ifta} alt="" className="w-[24px] h-[24px]" />

            <div className="text-[#80848F] ml-2 font-semibold text-[14.16px]">
              IFTA
            </div>
          </li>
        </Link>
        <Link to="/Vehicles">
          <li className="flex pl-5 items-center w-[224px] h-[48px] bg-white rounded-lg   cursor-pointer">
            <img src={vehicles} alt="" className="w-[24px] h-[24px]" />

            <div className="text-[#80848F] ml-2 font-semibold text-[14.16px]">
              Vehicles
            </div>
          </li>{" "}
        </Link>
        <Link to="/Drivers">
          <li className="flex pl-5 items-center w-[224px] h-[48px] bg-white rounded-lg   cursor-pointer">
            <img src={drivers} alt="" className="w-[24px] h-[24px]" />

            <div className="text-[#80848F] ml-2 font-semibold text-[14.16px]">
              Drivers
            </div>
          </li>
        </Link>
        <Link to="/devices">
          <li className="flex pl-5 items-center w-[224px] h-[48px] bg-white rounded-lg   cursor-pointer">
            <img src={Devices} alt="" className="w-[24px] h-[24px]" />

            <div className="text-[#80848F] ml-2 font-semibold text-[14.16px]">
              Devices
            </div>
          </li>
        </Link>
        <Link to="/userroles">
          <li className="flex pl-5 items-center w-[224px] h-[48px] bg-white rounded-lg   cursor-pointer">
            <img src={userrole} alt="" className="w-[24px] h-[24px]" />

            <div className="text-[#80848F] ml-2 font-semibold text-[14.16px]">
              User Roles
            </div>
          </li>
        </Link>
        <Link to="/Terminals">
          <li className="flex pl-5 items-center w-[224px] h-[48px] bg-white rounded-lg   cursor-pointer">
            <img src={testimonial} alt="" className="w-[24px] h-[24px]" />

            <div className="text-[#80848F] ml-2 font-semibold text-[14.16px]">
              Terminals
            </div>
          </li>
        </Link>
        <Link to="/Alerts">
        <li className="flex pl-5 items-center w-[224px] h-[48px] bg-white rounded-lg   cursor-pointer">
          <img src={alert} alt="" className="w-[24px] h-[24px]" />

          <div className="text-[#80848F] ml-2 font-semibold text-[14.16px]">
            Alerts
          </div>
        </li>
        </Link>
        <li className="flex pl-5 items-center w-[224px] h-[48px] bg-white rounded-lg   cursor-pointer">
          <img src={fmcsa} alt="" className="w-[24px] h-[24px]" />

          <div className="text-[#80848F] ml-2 font-semibold text-[14.16px]">
            FMCSA
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
