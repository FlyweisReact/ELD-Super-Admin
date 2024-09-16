import React, { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Iftareports = () => {
  const [active ,setActive] = useState(0)
  const [activeId ,setActiveId] = useState(0)
  const navigate = useNavigate()
  return (
    <div className="p-5 bg-[#F5F8F9] h-screen">
      <div className="font-semibold text-[20px] flex justify-start">
        IFTA Reports
      </div>

      <div className="flex bg-white rounded gap-4 mt-5 ifta-trips-detail">
        <div className="w-[350px]  border-r p-5 vehicle-list">
          <div className="text-[28px] font-semibold text-left">Vehicles</div>
          <div className="text-[#858B9A] text-[20px] text-left">
            Please select a vehicle to view individual reports.
          </div>
          <div>
            <div className="relative mt-2">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className=" p-2.5 ml-[-3px] rounded-tl rounded-bl text-white">
                  <FaSearch style={{ color: "black" }} />
                </span>
              </div>
              <input
                type="text"
                className="placeholder: ml-2 block w-[300px] bg-[#F9F9F9] rounded-xl border-0 py-1.5 pl-10 pr-4 text-gray-900  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Vehicle search "
              />
            </div>
          </div>
          <div className="flex mt-5">
          <div onClick={()=> setActive(0)} className={`${active === 0  ? 'w-[173px] h-[45px] cursor-pointer bg-[#34B7C1] text-white flex justify-center items-center rounded-l-lg' :'w-[173px] h-[45px] bg-[#F4F4F4] text-[#C5C5C5] flex justify-center items-center rounded-r-lg' }`}>
              Active Vehicles
            </div>
            <div onClick={()=> setActive(1)} className={`${active === 1  ? 'w-[173px] h-[45px] cursor-pointer bg-[#34B7C1] text-white flex justify-center items-center rounded-l-lg' :'w-[173px] h-[45px] bg-[#F4F4F4] text-[#C5C5C5] flex justify-center items-center rounded-r-lg' }`}>
              Deleted Vehicles
            </div>
          </div>
          <div className="border mt-5 rounded-2xl ">
            <div onClick={()=> { 
               navigate('/Iftareports/0')
              setActiveId(1)}} className={`${activeId === 0  ? 'flex justify-start p-5 border-b bg-[#34B7C1] text-white items-center gap-5' :'flex justify-start p-5 border-b items-center gap-5' }`}>
              <div className= "border border-[#34B7C1] h-[50px] w-[50px] flex justify-center items-center rounded-full bg-[#EFF6FF] text-[#34B7C1]">
                A
              </div>
              All Units
            </div>
            <div  onClick={()=> { 
               navigate('/Iftareports/1')
              setActiveId(1)}} className={`${activeId === 1  ? 'flex justify-start p-5 border-b bg-[#34B7C1] text-white items-center gap-5' :'flex justify-start p-5 border-b items-center gap-5' }`}>
              <div className="border border-[#34B7C1] h-[50px] w-[50px] flex justify-center items-center rounded-full bg-[#EFF6FF] text-[#34B7C1]">
                2
              </div>
              2101
            </div>
            <div  onClick={()=> { 
               navigate('/Iftareports/2')
              setActiveId(1)}} className={`${activeId === 2  ? 'flex justify-start p-5 border-b bg-[#34B7C1] text-white items-center gap-5' :'flex justify-start p-5 border-b items-center gap-5' }`}>
              <div className="border border-[#34B7C1] h-[50px] w-[50px] flex justify-center items-center rounded-full bg-[#EFF6FF] text-[#34B7C1]">
                2
              </div>
              2201
            </div>
          </div>
        </div>
        <div className="flex-1 remaining-list">
          <div className="m-5 gap-2  flex justify-between items-center filters">
            <div>
              <input
                type="date"
                className="w-[297px] h-[45px] border border-[#8E8F8F] rounded-lg p-2 "
                style={{color:"#8E8F8F"}} 
              />
            </div>
            <div className="flex gap-4 items-center">
              <div className="text-[16px] font-bold">Format :</div>
              <div>
                <select className="border-[#8E8F8F] border rounded-lg w-[117px] h-[45px]">
                  <option>CSV</option>
                  <option>Excel</option>
                  <option>PDF</option>
                </select>
              </div>
              <button className="w-[76px] h-[45px] bg-[#34B7C1] text-white rounded-lg">
                Go
              </button>
            </div>
          </div>

          <div className="h-fit py-6 w-full rounded-lg bg-[#FEF3C7] font-semibold border border-[#CA8A04] flex justify-center items-center gap-2">
            <IoMdInformationCircleOutline style={{ color: "#93C5FD" }} />{" "}
             Please select a vehicle to view individual reports.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Iftareports;
