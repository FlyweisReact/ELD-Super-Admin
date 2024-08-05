/** @format */

"use client";
import { Drawer } from "flowbite-react";
import { useState } from "react";
import { BiSolidBell } from "react-icons/bi";
import { BsPlayBtn } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flex min-h-[50vh] items-center justify-center">
        <BiSolidBell
          size={25}
          style={{ color: "#B0C3CC", cursor: "pointer" }}
          onClick={() => setIsOpen(true)}
        />
      </div>
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Items>
          <div className=" bg-white h-full rounded-md shadow-lg z-10">
            <div className="flex justify-between p-2">
              <div className="flex items-center gap-2 font-semibold">
                <BiSolidBell style={{ color: "#B0C3CC" }} /> New Feature
              </div>
              <span className="">
                <IoCloseSharp
                  size={25}
                  onClick={handleClose}
                  className="cursor-pointer"
                />
              </span>
            </div>
            <div className="flex justify-between items-center border-b p-2">
              <div className="flex flex-col gap-2">
                <span className="text-[#34B7C1] text-sm">
                  Organize Geofences with custom Geofence Types
                </span>
                <span className="text-[#858B9A] text-[10px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt!!
                </span>
              </div>
              <div>
                <BsPlayBtn />
              </div>
            </div>

            <div className="flex justify-between items-center border-b p-2">
              <div className="flex flex-col gap-2">
                <span className="text-[#34B7C1] text-sm">
                  Organize Geofences with custom Geofence Types
                </span>
                <span className="text-[#858B9A] text-[10px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt!!
                </span>
              </div>
              <div>
                <BsPlayBtn />
              </div>
            </div>
            <div className="flex justify-between items-center border-b p-2">
              <div className="flex flex-col gap-2">
                <span className="text-[#34B7C1] text-sm">
                  Organize Geofences with custom Geofence Types
                </span>
                <span className="text-[#858B9A] text-[10px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt!!
                </span>
              </div>
              <div>
                <BsPlayBtn />
              </div>
            </div>
            <div className="flex justify-between items-center border-b p-2">
              <div className="flex flex-col gap-2">
                <span className="text-[#34B7C1] text-sm">
                  Organize Geofences with custom Geofence Types
                </span>
                <span className="text-[#858B9A] text-[10px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt!!
                </span>
              </div>
              <div>
                <BsPlayBtn />
              </div>
            </div>
            <div className="flex justify-between items-center border-b p-2">
              <div className="flex flex-col gap-2">
                <span className="text-[#34B7C1] text-sm">
                  Organize Geofences with custom Geofence Types
                </span>
                <span className="text-[#858B9A] text-[10px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt!!
                </span>
              </div>
              <div>
                <BsPlayBtn />
              </div>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
};
export default Notification;
