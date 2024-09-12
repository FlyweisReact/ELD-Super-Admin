/** @format */

import React, { useState, useEffect, useCallback } from "react";
import { LuArrowUpDown } from "react-icons/lu";
import statusImg from "../../Assets/Device/status.svg";
import {
  Loader,
  Pagination,
  SectionHeading,
  Tabs,
} from "../Components/HelpingComponents";
import TableLayout from "../Components/TableLayout";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { dateFormatter, returnFullName } from "../utils/utils";

const Devices = () => {
  const [devices, setDevices] = useState({ data: { docs: [] } });
  const [status, setStatus] = useState("Connected");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchHandler = useCallback(() => {
    getApi(endPoints.devices.getDevices({ status, page }), {
      setResponse: setDevices,
      setLoading,
    });
  }, [status, page]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const tabsOptions = [
    {
      value: "Connected",
      label: "Active",
    },
    {
      value: "Disconnected",
      label: "Disconnected",
    },
  ];

  const thead = [
    <div className="flex items-center gap-2 justify-center">
      {" "}
      Driver <LuArrowUpDown />
    </div>,
    "Serial Number",
    "VIN Number",
    "Status",
    <div className="flex items-center gap-2 justify-center">
      Last Connected (CDT) <LuArrowUpDown />
    </div>,
  ];

  const tbody = devices.data.docs.map((i) => [
    returnFullName(i?.driver),
    i?.serialNumber,
    i?.vinNumber,
    i?.status === "Disconnected" ? (
      <div
        className="w-[139px] h-[34px] bg-[#EDF8F0] rounded-xl text-[#939eb9] flex justify-center gap-1 items-center m-auto"
        style={{ fontWeight: "900" }}
      >
        Disconnected
      </div>
    ) : (
      <div
        className="w-[139px] h-[34px] bg-[#EDF8F0] rounded-xl text-[#18A88C] flex justify-center gap-1 items-center m-auto"
        style={{ fontWeight: "900" }}
      >
        Connected <img src={statusImg} alt="" />
      </div>
    ),
    dateFormatter(i?.lastConnected),
  ]);

  return (
    <div className="p-5">
      <Loader isLoading={loading} />
      <SectionHeading title={"ELD Devices"} />
      <Tabs
        setTab={setStatus}
        tab={status}
        option={tabsOptions}
        isBtn={false}
      />
      <div className="mt-5">
        <TableLayout
          thead={thead}
          className="vehicle-table mt-5 mb-5"
          tbody={tbody}
        />
        <Pagination
          className={"mt-5"}
          totalPages={devices?.data?.totalPages}
          currentPage={page}
          setCurrentPage={setPage}
        />
      </div>
    </div>
  );
};

export default Devices;
