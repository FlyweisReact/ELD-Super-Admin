/** @format */

import React from "react";

const Geofences = () => {
  return (
    <div className="flex gap-2 geofences">
      <div className="bg-[#F4F6FA] shadow rounded my-2 p-4">
        <p className="font-[600] text-[28px]">Geofences preview</p>
        <div className="flex justify-between">
          <p className="text-[#858B9A]">
            You are viewing a NXT placeholder powered by a sample data set!
          </p>
          <div className="flex gap-2">
            <div className="w-[18px] h-[18px] rounded-full bg-[#34B7C1]"></div>
            <div className="w-[18px] h-[18px] rounded-full border border-1 border-[#34B7C1] "></div>
          </div>
        </div>
        <div>
          <img
            src="../Screenshot 2024-04-03 130015 1.png"
            alt=""
            className="w-[65vw]"
          />
        </div>
      </div>
      <div className="my-8 mx-4">
        <p className="text-[20px] font-[500] pb-2">
          Get more out of Asset Tracking!
        </p>
        <p className="text-[#858B9A] font-[500] pb-2">
          Increase utilization and productivity using Geofence monitoring
        </p>
        <div className="flex items-center gap-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-[#32D29633] h-2.5 rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>
          <p>0%</p>
        </div>
        <div className="border border-1 border-[#D8D8D8] shadow rounded-md p-4">
          <div className="flex items-center justify-between text-[#858B9A] pb-4">
            <div className="w-[18px] h-[18px] rounded-full border border-1 border-[#34B7C1] "></div>
            <p className="text-[20px]">Add Asset Tracker</p>
            <img src="../Vector6.png" alt="" />
          </div>
          <div className="border border-1 border-[#D8D8D8] shadow rounded-md p-4 text-[#858B9A]">
            <p className="text-[20px] text-center pb-2">
              How to add an Asset Tracker
            </p>
            <div className="flex justify-center items-center">
              <iframe
                width="full"
                height="160"
                style={{ borderRadius: "8px" }}
                src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="border border-1 text-[20px]  border-[#D8D8D8] shadow rounded-md p-4 mt-8 text-[#858B9A]">
          <p className="text-center pb-4">Additional Resources</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="../Vector6.png" alt="" className="h-fit" />
              <p>Don't have an Asset Tracker? Buy Now!</p>
            </div>
            <img src="../Vector6.png" alt="" className="h-fit" />
          </div>
          <hr className="my-4" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="../Vector6.png" alt="" className="h-fit" />
              <p>Help Center</p>
            </div>
            <img src="../Vector6.png" alt="" className="h-fit" />
          </div>
          <hr className="my-4" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="../Vector6.png" alt="" className="h-fit" />
              <p>Contact US</p>
            </div>
            <img src="../Vector6.png" alt="" className="h-fit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Geofences;