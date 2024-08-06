/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { LuArrowUpDown } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { useParams } from "react-router-dom";
import { Loader } from "../Components/HelpingComponent";
import { dateFormatter } from "../utils";
import { AssignDriverInTerminal } from "../Components/Modals/Modals";

const TerminalsDatils = () => {
  const [editunitnumber, setEditunitnumber] = useState(false);
  const [selectedTab, setselectedTab] = useState("Drivers");
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const fetchHandler = useCallback(() => {
    getApi(endPoints.terminal.getDetail(id), {
      setResponse: setDetail,
      setLoading,
    });
  }, [id]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  console.log(detail);

  return (
    <>
      <AssignDriverInTerminal
        show={open}
        handleClose={() => setOpen(false)}
        id={id}
      />
      {editunitnumber ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[600px] bg-white outline-none focus:outline-none p-5">
                <div className="flex items-start justify-between rounded-t">
                  <h3 className="text-xl font-semibold text-[#666666]">
                    Assign /Unassign Vehicle
                  </h3>

                  <span
                    onClick={() => setEditunitnumber(false)}
                    className="cursor-pointer"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
                <hr className="mt-2" />
                <div className="h-[44px] rounded-lg flex items-center justify-start pl-5 mt-5 bg-[#F0506E1A] border-[#EB5757] border text-[#EB5757]">
                  Driver is offline. Please ask your driver to be online.
                </div>
                <div className="flex flex-col gap-5 mt-5">
                  <div>
                    <div>
                      <label className="text-[#8E8F8F]">Driver</label>
                      <br />
                      <input
                        placeholder="Driver"
                        className="placeholder: block w-full mt-1  border-b py-1.5 pr-4 text-gray-900  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label className="text-[#8E8F8F]">Current Vehicle</label>
                      <br />
                      <input
                        placeholder="Current Vehicle"
                        className="placeholder: block mt-1 w-full  border-b py-1.5 pr-4 text-gray-900  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="h-[44px]  flex items-center justify-start pl-5 mt-5   text-[#FC8041]">
                  Please unassign in order to assign a new vehicle
                </div>

                <div className="flex justify-center mt-5 gap-5 ">
                  <button
                    className="text-[#F56C89] w-[429px] rounded-lg  h-[45px] bg-white border border-[#F56C89]"
                    onClick={() => setEditunitnumber(false)}
                  >
                    Cancel
                  </button>
                  <button className="bg-[#34B7C1] w-[429px] h-[45px]  rounded-lg text-white flex justify-center items-center gap-2">
                    Unassign
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <div className="p-5">
        <div className="text-[28px] font-semibold flex justify-start">
          Terminals
        </div>
        <Loader isLoading={loading} />

        <div className="flex justify-between gap-6 my-5">
          <div className="shadow text-[18px]  text-[#666666] bg-[#F0FAFB] shadow-[#0B3F6F0D] p-6 rounded-xl w-full ">
            <p className="font-semibold">Terminal address</p>
            <p> {detail?.data?.address} </p>
            <p className="font-semibold pt-2">Terminal Timezone</p>
            <p>{detail?.data?.timeZone} </p>
          </div>
          <div className="shadow text-[#666666] text-[18px] bg-[#F0FAFB] shadow-[#0B3F6F0D] p-6 rounded-xl w-full ">
            <div className="flex gap-2 pb-2">
              <p className=" font-semibold">Name:</p>
              <p> {detail?.data?.name} </p>
            </div>
            <div className="flex gap-2 pb-2">
              <p className=" font-semibold">Drivers:</p>
              <p> {detail?.data?.drivers?.length} </p>
            </div>
            <div className="flex gap-2 pb-2">
              <p className=" font-semibold">Asset:</p>
              <p> {detail?.data?.assets?.length} </p>
            </div>
            <div className="flex gap-2 pb-2">
              <p className=" font-semibold">Created on:</p>
              <p> {dateFormatter(detail?.data?.createdAt)} </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-between">
          <div className="flex">
            <div
              className={`cursor-pointer ${
                selectedTab === "Drivers"
                  ? "w-[208px] flex items-center justify-center  gap-2 underline-custom"
                  : "w-[208px] flex items-center justify-center   gap-2"
              }`}
              onClick={() => setselectedTab("Drivers")}
            >
              Drivers ({detail?.data?.drivers?.length})
            </div>
            <div
              className={`cursor-pointer ${
                selectedTab === "Assets"
                  ? "w-[208px] flex items-center justify-center   gap-2 underline-custom"
                  : "w-[208px] flex items-center justify-center   gap-2"
              }`}
              onClick={() => setselectedTab("Assets")}
            >
              Assets ({detail?.data?.assets?.length})
            </div>
            <div
              className={`cursor-pointer ${
                selectedTab === "Admins"
                  ? "w-[208px] flex items-center justify-center   gap-2 underline-custom"
                  : "w-[208px] flex items-center justify-center   gap-2"
              }`}
              onClick={() => setselectedTab("Admins")}
            >
              Admins
            </div>
          </div>
          <div className="">
            <button
              className="bg-[#34B7C1] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]"
              onClick={() => setOpen(true)}
            >
              {" "}
              Assign Driver
            </button>
          </div>
        </div>
        <hr className="mt-5" />

        {selectedTab && (
          <div>
            {selectedTab === "Drivers" && (
              <div className="mt-5">
                <table className="border w-full ">
                  <thead>
                    <tr className="bg-[#F0FAFB] h-[65px]  ">
                      <th className="w-[180px]">
                        <div className="flex items-center justify-center gap-2">
                          Name <LuArrowUpDown />
                        </div>
                      </th>
                      <th className="w-[180px] ">Start Date</th>
                      <th className="w-[180px] ">Cellphone</th>
                      <th className="w-[180px]">Unit No </th>
                      <th className="w-[200px]">Time Zone</th>
                      <th className="w-[180px]">Driver License</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail?.data?.drivers?.map((item, index) => (
                      <tr className="border-b h-[79px]" key={index}>
                        <td className="text-center">
                          {item?.driver?.fullName}
                        </td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td>
                          <div className="flex gap-2 items-center justify-center">
                            {item?.unitNumber}
                            <MdOutlineEdit
                              onClick={() => setEditunitnumber(true)}
                              className="cursor-pointer"
                            />
                          </div>
                        </td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedTab === "Assets" && (
              <div className="mt-5">
                <table className="border w-full ">
                  <tbody>
                    {detail?.data?.assets?.map((item, index) => (
                      <tr className="border-b h-[79px]" key={`assest${index}`}>
                        <td className="text-left pl-5 ">{item}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TerminalsDatils;
