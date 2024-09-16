/** @format */

import React, { useState, useEffect } from "react";
import refresh from "../Assets/Logbook/refresh.svg";
import { GoDotFill } from "react-icons/go";
import redisymbol from "../Assets/Logbook/redisymbol.svg";
import {
  Pagination,
  SectionHeading,
  Tabs,
} from "../Components/HelpingComponent";
import TableLayout from "../Components/TableLayout/TableLayout";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import PieChart from "../Components/PieChart";

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

const tbody = [
  [
    <div className="w-[53px] h-[30px] rounded-2xl bg-[#1E87F0] text-white flex justify-center items-center">
      On{" "}
    </div>,
    "Adam Bhalke powers 2101",
    "powhatan county, VA 23139 us Apr 1, 2024 | 12:18 am",
    <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      00{" "}
    </div>,
    <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full m-auto">
      Ready
      <br />
      00
    </div>,
    <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      11:00
    </div>,
    <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      14:00
    </div>,
    <div className="w-[77px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      70:00/8
    </div>,
    <div className="flex items-center gap-2">
      <GoDotFill style={{ color: "#A44C4C" }} />
      Offline
      <img src={redisymbol} alt="" />
    </div>,
  ],
  [
    <div className="w-[53px] h-[30px] rounded-2xl bg-[#1E87F0] text-white flex justify-center items-center">
      On{" "}
    </div>,
    "Adam Bhalke powers 2101",
    "powhatan county, VA 23139 us Apr 1, 2024 | 12:18 am",
    <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      00{" "}
    </div>,
    <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full m-auto">
      Ready
      <br />
      00
    </div>,
    <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      11:00
    </div>,
    <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      14:00
    </div>,
    <div className="w-[77px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      70:00/8
    </div>,
    <div className="flex items-center gap-2">
      <GoDotFill style={{ color: "#A44C4C" }} />
      Offline
      <img src={redisymbol} alt="" />
    </div>,
  ],
];

const inactiveBody = [
  [
    <div className="w-[53px] h-[30px] rounded-2xl bg-[#F0506E33] text-[#FB6262] flex justify-center items-center">
      Off
    </div>,
    "Adam Bhalke powers 2101",
    "powhatan county, VA 23139 us Apr 1, 2024 | 12:18 am",
    <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      00{" "}
    </div>,
    <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full m-auto">
      Ready
      <br />
      00
    </div>,
    <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      11:00
    </div>,
    <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      14:00
    </div>,
    <div className="w-[77px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      70:00/8
    </div>,
    <div className="flex items-center gap-2">
      <GoDotFill style={{ color: "#A44C4C" }} />
      Offline
      <img src={redisymbol} alt="" />
    </div>,
  ],
  [
    <div className="w-[53px] h-[30px] rounded-2xl bg-[#F0506E33] text-[#FB6262] flex justify-center items-center">
      Off
    </div>,
    "Adam Bhalke powers 2101",
    "powhatan county, VA 23139 us Apr 1, 2024 | 12:18 am",
    <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      00{" "}
    </div>,
    <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full m-auto">
      Ready
      <br />
      00
    </div>,
    <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      11:00
    </div>,
    <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      14:00
    </div>,
    <div className="w-[77px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      70:00/8
    </div>,
    <div className="flex items-center gap-2">
      <GoDotFill style={{ color: "#A44C4C" }} />
      Offline
      <img src={redisymbol} alt="" />
    </div>,
  ],
];

const allBody = [
  [
    <div className="w-[53px] h-[30px] rounded-2xl bg-[#F0506E33] text-[#FB6262] flex justify-center items-center">
      Off
    </div>,
    "Adam Bhalke powers 2101",
    "powhatan county, VA 23139 us Apr 1, 2024 | 12:18 am",
    <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      00{" "}
    </div>,
    <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full m-auto">
      Ready
      <br />
      00
    </div>,
    <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      11:00
    </div>,
    <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      14:00
    </div>,
    <div className="w-[77px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      70:00/8
    </div>,
    <div className="flex items-center gap-2">
      <GoDotFill style={{ color: "#A44C4C" }} />
      Offline
      <img src={redisymbol} alt="" />
    </div>,
  ],
  [
    <div className="w-[53px] h-[30px] rounded-2xl bg-[#1E87F0] text-white flex justify-center items-center">
      On{" "}
    </div>,
    "Adam Bhalke powers 2101",
    "powhatan county, VA 23139 us Apr 1, 2024 | 12:18 am",
    <div className="w-[44px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      00{" "}
    </div>,
    <div className="border-[#1E87F0] flex justify-center items-center text-[8px] border-4 w-[47px] h-[47px] rounded-full m-auto">
      Ready
      <br />
      00
    </div>,
    <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      11:00
    </div>,
    <div className="w-[56px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      14:00
    </div>,
    <div className="w-[77px] h-[30px] rounded-2xl bg-[#32D29633] text-white flex justify-center items-center m-auto">
      70:00/8
    </div>,
    <div className="flex items-center gap-2">
      <GoDotFill style={{ color: "#A44C4C" }} />
      Offline
      <img src={redisymbol} alt="" />
    </div>,
  ],
];

const Logbook = () => {
  const [selectedTab, setselectedTab] = useState("Active");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDrivers, setActiveDrivers] = useState({});
  const [inactiveDriver, setInactiveDriver] = useState({});
  const [deletedDriver, setDeletedDriver] = useState({});
  const [activeVehicle, setActiveVehicles] = useState({});
  const [deactiveVehicle, setDeactiveVehicles] = useState({});
  const [activeUser, setActiveUser] = useState({});
  const [deactiveUser, setDeactiveUser] = useState({});
  const [activeTerminal, setActiveTerminal] = useState({});
  const [deactiveTerminal, setDeactiveTerminal] = useState({});

  useEffect(() => {
    getApi(endPoints.drivers.getAllDrivers({}), {
      setResponse: setActiveDrivers,
    });
    getApi(endPoints.drivers.allInactiveDriver({}), {
      setResponse: setInactiveDriver,
    });
    getApi(endPoints.drivers.allDeletedDriver({}), {
      setResponse: setDeletedDriver,
    });
    getApi(endPoints.vehicles.getActiveVehicle({}), {
      setResponse: setActiveVehicles,
    });
    getApi(endPoints.vehicles.deactiveVehicles({}), {
      setResponse: setDeactiveVehicles,
    });
    getApi(endPoints.users.getUser({}), {
      setResponse: setActiveUser,
    });
    getApi(endPoints.users.getDeactivatedUser({}), {
      setResponse: setDeactiveUser,
    });
    getApi(endPoints.terminals.activeTerminal({}), {
      setResponse: setActiveTerminal,
    });
    getApi(endPoints.terminals.inactiveTerminals({}), {
      setResponse: setDeactiveTerminal,
    });
  }, []);



  const tabsOptions = [
    {
      value: "Active",
      label: "Active (2)",
    },
    {
      value: "Inactive",
      label: "Inactive (2)",
    },
    {
      value: "All",
      label: "All (2)",
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

  return (
    <section className="p-5">
      <SectionHeading title={"Logbook"} />
      <Tabs
        tab={selectedTab}
        setTab={setselectedTab}
        option={tabsOptions}
        ExtraComponent={ExtraComponent}
      />

      <div className="mt-5">
        <TableLayout
          thead={thead}
          className="vehicle-table mt-5 mb-5"
          tbody={finalData}
        />
      </div>
      <Pagination
        className={"mt-5"}
        totalPages={5}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
};

export default Logbook;
