// src/Drawer.js
import React from 'react';
import { BiSolidBell } from 'react-icons/bi';
import { BsPlayBtn } from 'react-icons/bs';
import { IoCloseSharp } from 'react-icons/io5';

const Drawer = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 bg-white w-[400px] z-50 shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4">
          <div className="">
            {/* Drawer content goes here */}
            <div className="flex justify-between p-2">
              <div className="flex items-center gap-2 text-[24px] font-semibold">
                <BiSolidBell style={{ color: "#B0C3CC"}} /> New Features
              </div>
              <span className="">
                <IoCloseSharp
                  size={25}
                onClick={onClose}
                  className="cursor-pointer"
                />
              </span>
            </div>
            <div className="flex justify-between border-b p-2">
              <div className="flex flex-col gap-2">
                <span className="text-[#34B7C1] text-[18px]">
                  Organize Geofences with custom Geofence Types
                </span>
                <span className="text-[#858B9A] text-[14px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt!!
                </span>
              </div>
              <div>
                <BsPlayBtn />
              </div>
            </div>
            <div className="flex justify-between border-b p-2">
              <div className="flex flex-col gap-2">
                <span className="text-[#34B7C1] text-[18px]">
                  Organize Geofences with custom Geofence Types
                </span>
                <span className="text-[#858B9A] text-[14px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt!!
                </span>
              </div>
              <div>
                <BsPlayBtn />
              </div>
            </div>
            <div className="flex justify-between border-b p-2">
              <div className="flex flex-col gap-2">
                <span className="text-[#34B7C1] text-[18px]">
                  Organize Geofences with custom Geofence Types
                </span>
                <span className="text-[#858B9A] text-[14px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt!!
                </span>
              </div>
              <div>
                <BsPlayBtn />
              </div>
            </div>
            <div className="flex justify-between border-b p-2">
              <div className="flex flex-col gap-2">
                <span className="text-[#34B7C1] text-[18px]">
                  Organize Geofences with custom Geofence Types
                </span>
                <span className="text-[#858B9A] text-[14px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt!!
                </span>
              </div>
              <div>
                <BsPlayBtn />
              </div>
            </div>
            <div className="flex justify-between border-b p-2">
              <div className="flex flex-col gap-2">
                <span className="text-[#34B7C1] text-[18px]">
                  Organize Geofences with custom Geofence Types
                </span>
                <span className="text-[#858B9A] text-[14px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt!!
                </span>
              </div>
              <div>
                <BsPlayBtn />
              </div>
            </div>
          
        

          </div>
          </div>
      </div>
    </>
  );
};

export default Drawer;
