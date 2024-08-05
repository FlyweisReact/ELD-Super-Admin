/** @format */

import React from "react";
import { IoMdAdd } from "react-icons/io";

const Dashcamdevices = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-4">
      <div className="bg-[#F4F6FA] p-5">
        <div className="w-full lg:w-[54vw] rounded-xl bg-white p-10 ">
          <div className="flex gap-5">
            <div className="w-[25vw] pr-5">
              <div className="text-[24px] lg:text-[30px] text-left">
                Mitigate risks and enhance fleet safety
              </div>
              <div className="mt-5 text-[20px] text-left text-[#858B9A]">
                4-Facing dash camera capturing critical events for incident
                analysis and driver behavior monitoring.
              </div>
              <div className="mt-5">
                <button className="bg-[#34B7C1] w-[296px] h-[45px] flex justify-center items-center gap-1 text-white">
                  <IoMdAdd />
                  Add Device
                </button>
              </div>
            </div>
            <div className="w-[40vw] lg:w-[20vw] flex gap-2">
              <div className="w-[20vw] lg:w-[10vw] bg-[#858B9A] h-[20vw] lg:h-[10vw]"></div>
              <div className="w-[20vw] lg:w-[10vw] bg-[#858B9A] h-[20vw] lg:h-[10vw]"></div>
            </div>
          </div>
          <div className="mt-10">
            <div className="text-[#858B9A] font-bold text-left">
              Our Products
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <div className="bg-[#858B9A] w-[20vw] lg:w-[10vw] h-[20vw] lg:h-[20vh]"></div>
              <div className="bg-[#858B9A] w-[20vw] lg:w-[10vw] h-[20vw] lg:h-[20vh]"></div>
              <div className="bg-[#858B9A] w-[20vw] lg:w-[10vw] h-[20vw] lg:h-[20vh]"></div>
              <div className="bg-[#858B9A] w-[20vw] lg:w-[10vw] h-[20vw] lg:h-[20vh]"></div>
              <div className="bg-[#858B9A] w-[20vw] lg:w-[10vw] h-[20vw] lg:h-[20vh]"></div>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-white p-5 ">
        <div className="text-left">A new home for all your IoT data!</div>
        <div className="text-[#858B9A] text-left mt-2">
          Add device to unlock the power of data-driven fleet operations.
        </div>
        <div className="border border-1 border-[#D8D8D8] shadow rounded-md p-4 mt-4">
          <div className="flex items-center justify-between text-[#858B9A] pb-4">
            <div className="w-[18px] h-[18px] rounded-full border border-1 border-[#34B7C1] "></div>
            <p className="text-[20px]">Add a new device</p>
            <img src="../Vector6.png" alt="" />
          </div>
          <div className="border border-1 border-[#D8D8D8] shadow rounded-md p-4 text-[#858B9A]">
            <p className="text-[20px] text-center pb-2">
              How to add a new device
            </p>
            <div className="flex justify-center items-center">
              <iframe
                width="260"
                height="120"
                style={{ borderRadius: "8px" }}
                src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="border border-1 text-[20px]  border-[#D8D8D8] shadow rounded-md p-4 mt-8 text-[#858B9A]">
          <p className="text-left font-[500] pb-4">Additional Resources</p>
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

export default Dashcamdevices;
