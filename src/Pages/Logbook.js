/** @format */

import React, { useCallback, useEffect, useState } from "react";
import refresh from "../Assets/Logbook/refresh.svg";
import redisymbol from "../Assets/Logbook/redisymbol.svg";
import {
  Loader,
  Pagination,
  SectionHeading,
  Tabs,
} from "../Components/HelpingComponents";
import TableLayout from "../Components/TableLayout/TableLayout";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { returnFullName } from "../utils/utils";
import { Link } from "react-router-dom";

const thead = [
  "Status",
  "Driver | Vehicle",
  "Location | Last Sync (EST)",
  "Violations",
  "HOS",
  "Drive Left",
  "Duty Left",
  "Cycle Left",
  "App Status",
];

const formatDateInEST = (isoDateString) => {
  const inputDate = new Date(isoDateString);
  const options = {
    timeZone: "America/New_York",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedEST = new Intl.DateTimeFormat("en-US", options).format(
    inputDate
  );
  return formattedEST;
};

const formatSecondsToTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const remainingSecondsAfterHours = totalSeconds % 3600;
  const minutes = Math.floor(remainingSecondsAfterHours / 60);
  const seconds = remainingSecondsAfterHours % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const getCurrentTimeInEST12Hour = () => {
  const now = new Date();
  const estFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York", // EST timezone
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return estFormatter.format(now);
};

const CheckDeviceConnection = (status) => {
  if (status === "Connected") {
    return (
      <div className="logbook-device-connect connected">
        <span className="color-dot" />
        Connected
        <img src={redisymbol} alt="" />
      </div>
    );
  } else if (status === "Disconnected") {
    return (
      <div className="logbook-device-connect disconnected">
        <span className="color-dot" />
        Disconnected
        <img src={redisymbol} alt="" />
      </div>
    );
  } else {
    return (
      <div className="logbook-device-connect">
        <span className="color-dot" />
        {status}
        <img src={redisymbol} alt="" />
      </div>
    );
  }
};

const Logbook = () => {
  const [selectedTab, setselectedTab] = useState("Active");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDrivers, setActiveDrivers] = useState({});
  const [inactiveDriver, setInactiveDriver] = useState({});
  const [allDrivers, setAllDrivers] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);

  const fetchCurrentEstTime = () => {
    setCurrentTime(getCurrentTimeInEST12Hour());
  };

  const fetchActiverDrivers = useCallback(() => {
    getApi(endPoints.drivers.getAllDrivers({ page: currentPage, limit: 5 }), {
      setResponse: setActiveDrivers,
      setLoading,
      showErr: false,
    });
  }, [currentPage]);

  const fetchInActiveDrivers = useCallback(() => {
    getApi(
      endPoints.drivers.allInactiveDriver({ page: currentPage, limit: 5 }),
      {
        setResponse: setInactiveDriver,
        setLoading,
        showErr: false,
      }
    );
  }, [currentPage]);

  const fetchAlllDrivers = useCallback(() => {
    getApi(endPoints.drivers.getDriversList({ page: currentPage, limit: 5 }), {
      setResponse: setAllDrivers,
      setLoading,
      showErr: false,
    });
  }, [currentPage]);

  const allMergeFetch = () => {
    fetchCurrentEstTime();
    fetchActiverDrivers();
    fetchInActiveDrivers();
    fetchAlllDrivers();
  };

  useEffect(() => {
    fetchActiverDrivers();
  }, [fetchActiverDrivers]);

  useEffect(() => {
    fetchInActiveDrivers();
  }, [fetchInActiveDrivers]);

  useEffect(() => {
    fetchAlllDrivers();
  }, [fetchAlllDrivers]);

  useEffect(() => {
    fetchCurrentEstTime();
  }, []);

  const tabsOptions = [
    {
      value: "Active",
      label: `Active (${activeDrivers?.data?.totalDocs || 0})`,
    },
    {
      value: "Inactive",
      label: `Inactive (${inactiveDriver?.data?.totalDocs || 0}) `,
    },
    {
      value: "All",
      label: `All (${allDrivers?.data?.totalDocs || 0})`,
    },
  ];

  const ExtraComponent = () => {
    return (
      <div className="flex items-center gap-2 eld-component">
        <div className="text-[#8E8F8F] font-bold">
          Mode :<span className="text-[#86e3ce]">ELD</span>
        </div>
        <div
          style={{ cursor: "pointer" }}
          className="w-[214px] h-[45px] rounded-lg border text-[#8E8F8F] flex justify-center items-center gap-2 cursor-pointer"
          onClick={() => allMergeFetch()}
        >
          {currentTime} (EST) <img src={refresh} alt="" />
        </div>
      </div>
    );
  };

  const checkStatus = (item) => {
    if (item?.dutyStatus === "onDuty") {
      return (
        <div className="logbook-dutystatus on-duty">
          <p>ON</p>
        </div>
      );
    } else if (item?.dutyStatus === "off-duty") {
      return (
        <div className="logbook-dutystatus off-duty">
          <p>OFF</p>
        </div>
      );
    } else if (item?.dutyStatus === "Drive") {
      return (
        <div className="logbook-dutystatus drive">
          <p>D</p>
        </div>
      );
    } else {
      return (
        <div className="logbook-dutystatus sb">
          <p>{item?.dutyStatus}</p>
        </div>
      );
    }
  };

  const variantGiver = (item) => {
    return (
      <div className="w-[auto] h-[auto] rounded-2xl bg-[#32D29633] text-black flex justify-center items-center m-auto p-2">
        {item}
      </div>
    );
  };

  const tbody = activeDrivers?.data?.docs?.map((i) => [
    checkStatus(i),
    <span>
      <Link
        to={`/Logbook/${i?._id}`}
        style={{
          color: "blue",
          textDecoration: "underline",
          fontWeight: "900",
          textTransform: "capitalize",
        }}
      >
        {returnFullName(i)}
      </Link>{" "}
      <br />
      <span style={{ textAlign: "left" }}>
        {" "}
        {i?.truck?.vehicleNumber ? i?.truck?.vehicleNumber : ""}
      </span>
    </span>,
    <span>
      {i?.locationInWord} <br />
      {i?.lastSync && formatDateInEST(i?.lastSync)}
    </span>,
    variantGiver(i?.violations),
    <div className="logbook-hos-status ready">
      <p className="status"> {i?.hosStatus}</p>
      <p className="timer"> {i?.hos} </p>
      <div className="border-co" />
    </div>,
    variantGiver(formatSecondsToTime(i?.driveLeft)),
    variantGiver(formatSecondsToTime(i?.shiftLeft)),
    <div className="w-[auto] h-[auto] rounded-2xl bg-[#32D29633] text-black flex justify-center items-center m-auto p-2">
      {i?.cycleInHrs || 0} hr / {i?.cycleInDays} days
    </div>,
    CheckDeviceConnection(i?.isDeviceConnected),
  ]);

  const inactiveBody = inactiveDriver?.data?.docs?.map((i) => [
    checkStatus(i),
    <span>
      <Link
        to={`/Logbook/${i?._id}`}
        style={{
          color: "blue",
          textDecoration: "underline",
          fontWeight: "900",
          textTransform: "capitalize",
        }}
      >
        {returnFullName(i)}
      </Link>{" "}
      <br />
      <span style={{ textAlign: "left" }}>
        {" "}
        {i?.truck?.vehicleNumber ? i?.truck?.vehicleNumber : ""}
      </span>
    </span>,
    <span>
      {i?.locationInWord} <br />
      {i?.lastSync && formatDateInEST(i?.lastSync)}
    </span>,
    variantGiver(i?.violations),
    <div className="logbook-hos-status ready">
      <p className="status"> {i?.hosStatus}</p>
      <p className="timer"> {i?.hos} </p>
      <div className="border-co" />
    </div>,
    variantGiver(formatSecondsToTime(i?.driveLeft)),
    variantGiver(formatSecondsToTime(i?.shiftLeft)),
    <div className="w-[auto] h-[auto] rounded-2xl bg-[#32D29633] text-black flex justify-center items-center m-auto p-2">
      {i?.cycleInHrs || 0} hr / {i?.cycleInDays} days
    </div>,
    CheckDeviceConnection(i?.isDeviceConnected),
  ]);

  const allBody = allDrivers?.data?.docs?.map((i) => [
    checkStatus(i),
    <span>
      <Link
        to={`/Logbook/${i?._id}`}
        style={{
          color: "blue",
          textDecoration: "underline",
          fontWeight: "900",
          textTransform: "capitalize",
        }}
      >
        {returnFullName(i)}
      </Link>{" "}
      <br />
      <span style={{ textAlign: "left" }}>
        {" "}
        {i?.truck?.vehicleNumber ? i?.truck?.vehicleNumber : ""}
      </span>
    </span>,
    <span>
      {i?.locationInWord} <br />
      {i?.lastSync && formatDateInEST(i?.lastSync)}
    </span>,
    variantGiver(i?.violations),
    <div className="logbook-hos-status ready">
      <p className="status"> {i?.hosStatus}</p>
      <p className="timer"> {i?.hos} </p>
      <div className="border-co" />
    </div>,
    variantGiver(formatSecondsToTime(i?.driveLeft)),
    variantGiver(formatSecondsToTime(i?.shiftLeft)),
    <div className="w-[auto] h-[auto] rounded-2xl bg-[#32D29633] text-black flex justify-center items-center m-auto p-2">
      {i?.cycleInHrs || 0} hr / {i?.cycleInDays} days
    </div>,
    CheckDeviceConnection(i?.isDeviceConnected),
  ]);

  let finalData;
  if (selectedTab === "Active") {
    finalData = tbody;
  } else if (selectedTab === "Inactive") {
    finalData = inactiveBody;
  } else if (selectedTab === "All") {
    finalData = allBody;
  } else {
    finalData = tbody;
  }

  let totalPages;
  if (selectedTab === "Active") {
    totalPages = activeDrivers?.data?.totalPages;
  } else if (selectedTab === "Inactive") {
    totalPages = inactiveBody?.data?.totalPages;
  } else if (selectedTab === "All") {
    totalPages = allDrivers?.data?.totalPages;
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab]);

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

      <div className="mt-5">
        <TableLayout
          thead={thead}
          className="vehicle-table mt-5 mb-5"
          tbody={finalData}
        />

        {selectedTab === "Active" && (
          <Pagination
            className={"mt-5"}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hasNextPage={activeDrivers?.data?.hasNextPage}
            hasPrevPage={activeDrivers?.data?.hasPrevPage}
          />
        )}

        {selectedTab === "Inactive" && (
          <Pagination
            className={"mt-5"}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hasNextPage={inactiveBody?.data?.hasNextPage}
            hasPrevPage={inactiveBody?.data?.hasPrevPage}
          />
        )}

        {selectedTab === "All" && (
          <Pagination
            className={"mt-5"}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hasNextPage={allDrivers?.data?.hasNextPage}
            hasPrevPage={allDrivers?.data?.hasPrevPage}
          />
        )}
      </div>
    </section>
  );
};

export default Logbook;
