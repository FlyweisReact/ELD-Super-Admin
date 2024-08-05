import React, { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Iftatrips = () => {
  const [active ,setActive] = useState(0)
  const [activeId ,setActiveId] = useState(0)
  const navigate = useNavigate()
  
  return (
    <div className="p-5">
      <div className="font-semibold text-[20px] flex justify-start">
        IFTA Trips
      </div>
      <div className="mt-5 bg-[#FEF3C7] h-[85px] border  border-[#CA8A04] flex justify-center items-center gap-2 rounded-lg">
        <IoMdInformationCircleOutline style={{ color: "#A44C4C" }} />
        <div>
          <span className="font-semibold">Important:</span> IFTA will work if
          and only if driver has vehicle assigned and device is connected to
          logbook app while driving
        </div>
      </div>
      <div className="flex gap-4 mt-5">
        <div className="w-[350px] h-[500px] bg-white rounded-lg box-shadow p-5">
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
        <div onClick={()=>{ 
          setActive(0)
          }} className={`${active === 0  ? 'w-[173px] h-[45px] cursor-pointer bg-[#34B7C1] text-white flex justify-center items-center rounded-l-lg' :'w-[173px] h-[45px] bg-[#F4F4F4] text-[#C5C5C5] flex justify-center items-center rounded-r-lg' }`}>
              Active Vehicles
            </div>
            <div onClick={()=> setActive(1)} className={`${active === 1  ? 'w-[173px] h-[45px] cursor-pointer bg-[#34B7C1] text-white flex justify-center items-center rounded-l-lg' :'w-[173px] h-[45px] bg-[#F4F4F4] text-[#C5C5C5] flex justify-center items-center rounded-r-lg' }`}>
              Deleted Vehicles
            </div>
          </div>
          <div className="border mt-5 rounded-2xl h-[192px]">
          <div  onClick={()=>{
            navigate('/Iftatrips/1')
             setActiveId(1)}} className={`${activeId === 1  ? 'flex justify-start p-5 border-b bg-[#34B7C1] text-white items-center gap-5' :'flex justify-start p-5 border-b items-center gap-5' }`}>
              <div className="border border-[#34B7C1] h-[50px] w-[50px] flex justify-center items-center rounded-full bg-[#EFF6FF] text-[#34B7C1]">
                1
              </div>
              2101
            </div>
            <div onClick={()=>{ 
               navigate('/Iftatrips/2')
              setActiveId(2)}} className={`${activeId === 2  ? 'flex justify-start p-5 border-b bg-[#34B7C1] text-white items-center gap-5' :'flex justify-start p-5 border-b items-center gap-5' }`}>
              <div className="border border-[#34B7C1] h-[50px] w-[50px] flex justify-center items-center rounded-full bg-[#EFF6FF] text-[#34B7C1]">
                2
              </div>
              2201
            </div>
          </div>
        </div>
        <div className="py-8 h-fit w-full rounded-lg bg-[#DBEAFE] font-semibold border border-[#93C5FD] flex justify-center items-center gap-2">
          <IoMdInformationCircleOutline style={{ color: "#93C5FD" }} />  Please
          select a vehicle to view individual reports.
        </div>
      </div>
    </div>
  );
};

export default Iftatrips;
