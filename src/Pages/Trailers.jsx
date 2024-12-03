/** @format */

import React from "react";
import "../index.css";
import { IoMdAdd } from "react-icons/io";

const Trailers = () => {
  return (
    <div className="flex justify-between gap-6 mr-4 geofences">
    <div className="bg-[#F4F6FA] p-4 shadow rounded-md">
      <div className="bg-custom w-[60vw] h-[70vh] full-width autoHeight ">
        <div className="pt-[60px] pl-[40px] w-[30vw] full-width md-padding">
          <p className="text-white text-[36px] lg:text-[50px] font-bold font-large ">
            Make NXT Work For You!
          </p>
          <p className="text-white">
            Asset Traking | Utilization | Geofancing & visibility
          </p>
          <button className="bg-[#5c48ee] px-10 font-semibold mt-6 flex justify-center items-center gap-2 rounded-md text-white h-[45px]">
            <IoMdAdd style={{ color: "white" }} /> Add Trailer
          </button>
        </div>
      </div>
    </div>
    <div>
      <div className="border border-1 text-[20px] bg-[#F4F6FA]  border-[#D8D8D8] shadow rounded-md p-4 mt-8 text-[#858B9A]">
        <div className="flex items-center justify-between">
          <p className="font-medium">Recommended Learning</p>
          <img src="../Vector6.png" alt="" className="h-fit" />
        </div>
        <div className="flex items-center justify-center gap-2 mt-6 bg-white py-2 rounded-sm">
          <img src="../Vector6.png" alt="" className="h-fit" />
          <p className="font-small">How to add Trailers</p>
        </div>
      </div>
      <div className="border border-1 text-[20px]  border-[#D8D8D8] shadow rounded-md p-4 mt-8 text-[#858B9A]">
        <p className="text-left font-[500] pb-4 font-medium">Additional Resources</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="../Vector6.png" alt="" className="h-fit" />
            <p className="font-xs">Don't have an Asset Tracker? Buy Now!</p>
          </div>
          <img src="../Vector6.png" alt="" className="h-fit" />
        </div>
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="../Vector6.png" alt="" className="h-fit" />
            <p className="font-xs">Help Center</p>
          </div>
          <img src="../Vector6.png" alt="" className="h-fit" />
        </div>
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="../Vector6.png" alt="" className="h-fit" />
            <p className="font-xs">Contact US</p>
          </div>
          <img src="../Vector6.png" alt="" className="h-fit" />
        </div>
      </div>
    </div>
  </div>
  );
};

export default Trailers;
