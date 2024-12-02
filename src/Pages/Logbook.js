/** @format */

import React, { useCallback, useEffect, useState } from "react";
import refresh from "../Assets/Logbook/refresh.svg";
import { GoDotFill } from "react-icons/go";
import redisymbol from "../Assets/Logbook/redisymbol.svg";
import {
  Loader,
  Pagination,
  SectionHeading,
  Tabs,
} from "../Components/HelpingComponent";
import TableLayout from "../Components/TableLayout/TableLayout";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { returnFullName } from "../utils/utils";
import { Link } from "react-router-dom";

const thead = [
  "Status",
  "Driver | Vehicle",
  "Location | Last Sync",
  "Violations",
  "HOS",
  "Drive Left",
  "Duty Left",
  "Cycle Left",
  "App Status",
];

const checkStatus = (item) => {
  if (item?.status === "Active") {
    return (
      <div className="w-[53px] h-[30px] rounded-2xl bg-[#1E87F0] text-white flex justify-center items-center">
        On
      </div>
    );
  } else {
    return (
      <div className="w-[53px] h-[30px] rounded-2xl bg-[#F0506E33] text-[#FB6262] flex justify-center items-center">
        Off
      </div>
    );
  }
};

const variantGiver = (item) => {
  return (
    <div
      className="w-auto h-[30px] rounded-2xl bg-[#32D29633] text-black flex justify-center items-center m-auto"
      style={{ padding: "0px 10px" }}
    >
      {item}
    </div>
  );
};

const Logbook = () => {
  const [selectedTab, setselectedTab] = useState("Active");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDrivers, setActiveDrivers] = useState({});
  const [inactiveDriver, setInactiveDriver] = useState({});
  const [allDrivers, setAllDrivers] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);

  const fetchActiveDrivers = useCallback(() => {
    getApi(endPoints.drivers.getAllDrivers({ page: currentPage, limit: 5 }), {
      setResponse: setActiveDrivers,
      setLoading,
    });
  }, [currentPage]);

  const fetchInActiveDrivers = useCallback(() => {
    getApi(
      endPoints.drivers.allInactiveDriver({ page: currentPage1, limit: 5 }),
      {
        setResponse: setInactiveDriver,
        setLoading,
      }
    );
  }, [currentPage1]);

  const fetchAllDrivers = useCallback(() => {
    getApi(endPoints.drivers.getDriversList({ page: currentPage2, limit: 5 }), {
      setResponse: setAllDrivers,
      setLoading,
    });
  }, [currentPage2]);

  useEffect(() => {
    fetchActiveDrivers();
  }, [fetchActiveDrivers]);

  useEffect(() => {
    fetchInActiveDrivers();
  }, [fetchInActiveDrivers]);

  useEffect(() => {
    fetchAllDrivers();
  }, [fetchAllDrivers]);

  const tabsOptions = [
    {
      value: "Active",
      label: `Active (${activeDrivers?.data?.totalDocs})`,
    },
    {
      value: "Inactive",
      label: `Inactive (${inactiveDriver?.data?.totalDocs}) `,
    },
    {
      value: "All",
      label: `All (${allDrivers?.data?.totalDocs})`,
    },
  ];

  const ExtraComponent = () => {
    return (
      <div className="flex items-center gap-2 eld-component">
        <div className="text-[#8E8F8F] font-bold">
          Mode :<span className="text-[#34B7C1]">ELD</span>
        </div>
        <div className="w-[214px] h-[45px] rounded-lg border text-[#8E8F8F] flex justify-center items-center gap-2">
          10:16 PM (EDIT) <img src={refresh} alt="" />
        </div>
      </div>
    );
  };

  // ====== active driver's =========
  const tbody = activeDrivers?.data?.docs?.map((i) => [
    checkStatus(i),
    <Link
      to={`/Logbook/${i?._id}`}
      style={{ color: "blue", textDecoration: "underline", fontWeight: "900" }}
    >
      {returnFullName(i)}{" "}
      {i?.truck?.vehicleNumber ? `| ${i?.truck?.vehicleNumber}` : ""}
    </Link>,
    i?.location?.coordinates?.map((item) => item),
    variantGiver(i?.violations),
    <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full m-auto">
      {i?.hos}
    </div>,
    variantGiver(i?.driveLeft),
    variantGiver(i?.shiftLeft),
    <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-black flex justify-center items-center m-auto">
      {i?.cycleInHrs || 0} hr
    </div>,
    <div className="flex items-center gap-2">
      <GoDotFill style={{ color: "#A44C4C" }} />
      {i?.dutyStatus}
      <img src={redisymbol} alt="" />
    </div>,
  ]);
  // =================================
  // ======= inactive driver's =======
  const inactiveBody = inactiveDriver?.data?.docs?.map((i) => [
    checkStatus(i),
    <Link
      to={`/Logbook/${i?._id}`}
      style={{ color: "blue", textDecoration: "underline", fontWeight: "900" }}
    >
      {returnFullName(i)}{" "}
      {i?.truck?.vehicleNumber ? `| ${i?.truck?.vehicleNumber}` : ""}
    </Link>,
    i?.location?.coordinates?.map((item) => item),
    variantGiver(i?.violations),
    <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full m-auto">
      {i?.hos}
    </div>,
    variantGiver(i?.driveLeft),
    variantGiver(i?.shiftLeft),
    <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-black flex justify-center items-center m-auto">
      {i?.cycleInHrs || 0} hr
    </div>,
    <div className="flex items-center gap-2">
      <GoDotFill style={{ color: "#A44C4C" }} />
      {i?.dutyStatus}
      <img src={redisymbol} alt="" />
    </div>,
  ]);
  // =================================
  // ======= all drvier's ============
  const allBody = allDrivers?.data?.docs?.map((i) => [
    checkStatus(i),
    <Link
      to={`/Logbook/${i?._id}`}
      style={{ color: "blue", textDecoration: "underline", fontWeight: "900" }}
    >
      {returnFullName(i)}{" "}
      {i?.truck?.vehicleNumber ? `| ${i?.truck?.vehicleNumber}` : ""}
    </Link>,
    i?.location?.coordinates?.map((item) => item),
    variantGiver(i?.violations),
    <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full m-auto">
      {i?.hos}
    </div>,
    variantGiver(i?.driveLeft),
    variantGiver(i?.shiftLeft),
    <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-black flex justify-center items-center m-auto">
      {i?.cycleInHrs || 0} hr
    </div>,
    <div className="flex items-center gap-2">
      <GoDotFill style={{ color: "#A44C4C" }} />
      {i?.dutyStatus}
      <img src={redisymbol} alt="" />
    </div>,
  ]);
  // =================================

  return (
    <section className="p-5">
      <SectionHeading title={"Logbook"} />
      <Tabs
        tab={selectedTab}
        setTab={setselectedTab}
        option={tabsOptions}
        ExtraComponent={ExtraComponent}
      />
      <Loader isLoading={loading} />

      {selectedTab === "Active" && (
        <div className="mt-5">
          <TableLayout
            thead={thead}
            className="vehicle-table mt-5 mb-5"
            tbody={tbody}
          />
          <Pagination
            className={"mt-5"}
            totalPages={activeDrivers?.data?.totalPages || 0}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}

      {selectedTab === "Inactive" && (
        <div className="mt-5">
          <TableLayout
            thead={thead}
            className="vehicle-table mt-5 mb-5"
            tbody={inactiveBody}
          />
          <Pagination
            className={"mt-5"}
            totalPages={inactiveBody?.data?.totalPages || 0}
            currentPage={currentPage1}
            setCurrentPage={setCurrentPage1}
          />
        </div>
      )}

      {selectedTab === "All" && (
        <div className="mt-5">
          <TableLayout
            thead={thead}
            className="vehicle-table mt-5 mb-5"
            tbody={allBody}
          />
          <Pagination
            className={"mt-5"}
            totalPages={allDrivers?.data?.totalPages || 0}
            currentPage={currentPage2}
            setCurrentPage={setCurrentPage2}
          />
        </div>
      )}
    </section>
  );
};

export default Logbook;
