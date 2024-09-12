/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { LuArrowUpDown } from "react-icons/lu";
import { getApi } from "../../Repository/Api.js";
import endPoints from "../../Repository/apiConfig";
import { useParams } from "react-router-dom";
import { Loader, Tabs } from "../../Components/HelpingComponent";
import { dateFormatter, returnFullName } from "../utils/utils.js";
import {
  AssignDriverInTerminal,
  UnAssignDriverInTerminal,
} from "../Components/Modal/Modal.js";
import TableLayout from "../Components/TableLayout";

const TerminalsDatils = () => {
  const [editunitnumber, setEditunitnumber] = useState(false);
  const [selectedTab, setselectedTab] = useState("Drivers");
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevData, setPrevData] = useState({});
  const { id } = useParams();

  const fetchHandler = useCallback(() => {
    getApi(endPoints.terminals.getTerminalDetail(id), {
      setResponse: setDetail,
      setLoading,
    });
  }, [id]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const tabsOptions = [
    {
      value: "Drivers",
      label: `Drivers (${detail?.data?.drivers?.length})`,
    },
    {
      value: "Assets",
      label: `Assets (${detail?.data?.assets?.length})`,
    },
    {
      value: "Admins",
      label: `Admins`,
    },
  ];

  const ExtraComponent = () => {
    return (
      <button
        className="bg-[#34B7C1] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]"
        onClick={() => setOpen(true)}
      >
        {" "}
        Assign Driver
      </button>
    );
  };

  //---
  const driverHead = [
    <div className="flex items-center justify-center gap-2">
      Name <LuArrowUpDown />
    </div>,
    <div className="flex items-center justify-center gap-2">
      Start Date <LuArrowUpDown />
    </div>,
    "Cellphone",
    "Unit No.",
    "Timezone",
    "Driver License",
  ];
  const driverBody = detail?.data?.drivers?.map((i) => [
    returnFullName(i?.driver),
    "---",
    i?.driver?.mobileNumber ? i?.driver?.mobileNumber : "---",
    <div
      className="flex gap-1 items-center justify-center"
      onClick={() => {
        setPrevData(i);
        setEditunitnumber(true);
      }}
    >
      {i?.unitNumber}
      <i className="fa-solid fa-pen"></i>
    </div>,
    i?.driver?.timeZone,
    i?.driver?.license ? i?.driver?.license : "---",
  ]);

  const assestHead = ["Asset", "Type", "Attached truck"];

  const assestBody = detail?.data?.assets?.map((item) => [item, "", ""]);

  const adminHead = [
    <div className="flex items-center justify-center gap-2">
      Name <LuArrowUpDown />
    </div>,
    "Email",
    "Roles",
    "Terminals(s)",
  ];

  const adminBody = [];

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
          <div className="shadow text-[18px]  text-[#666666] bg-[#F0FAFB] shadow-[#0B3F6F0D] p-6 rounded-xl w-full ">
            <p className="font-semibold">Terminal address</p>
            <p> {detail?.data?.address} </p>
            <p className="font-semibold pt-2">Terminal Timezone</p>
            <p>{detail?.data?.timeZone} </p>
          </div>
        </div>

        <Tabs
          setTab={setselectedTab}
          tab={selectedTab}
          option={tabsOptions}
          isBtn={true}
          ExtraComponent={ExtraComponent}
        />

        {selectedTab === "Drivers" && (
          <div className="mt-5">
            <TableLayout
              thead={driverHead}
              className="vehicle-table mt-5 mb-5"
              tbody={driverBody}
            />
          </div>
        )}

        {selectedTab === "Assets" && (
          <div className="mt-5">
            <TableLayout
              thead={assestHead}
              className="vehicle-table mt-5 mb-5"
              tbody={assestBody}
            />
          </div>
        )}

        {selectedTab === "Admins" && (
          <div className="mt-5">
            <TableLayout
              thead={adminHead}
              className="vehicle-table mt-5 mb-5"
              tbody={adminBody}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default TerminalsDatils;
