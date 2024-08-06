/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { LuArrowUpDown } from "react-icons/lu";
import { MdOutlineEdit } from "react-icons/md";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { useParams } from "react-router-dom";
import { Loader } from "../Components/HelpingComponent";
import { dateFormatter } from "../utils";
import {
  AssignDriverInTerminal,
  UnAssignDriverInTerminal,
} from "../Components/Modals/Modals";

const TerminalsDatils = () => {
  const [editunitnumber, setEditunitnumber] = useState(false);
  const [selectedTab, setselectedTab] = useState("Drivers");
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevData, setPrevData] = useState({});
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

  return (
    <>
      <AssignDriverInTerminal
        show={open}
        handleClose={() => setOpen(false)}
        id={id}
        fetchApi={fetchHandler}
      />
      <UnAssignDriverInTerminal
        show={editunitnumber}
        handleClose={() => setEditunitnumber(false)}
        id={id}
        data={prevData}
        fetchApi={fetchHandler}
      />

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
                              onClick={() => {
                                setPrevData(item);
                                setEditunitnumber(true);
                              }}
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
                        <td className="text-left pl-5">{item}</td>
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
