/** @format */

import React, { useCallback, useEffect, useState } from "react";
import {
  AlertDateSelector,
  EditThreshold,
} from "../../Components/Modals/Modals";
import TableLayout from "../../Components/TableLayout/TableLayout";
import { Dropdown } from "antd";
import { Pagination, Tabs } from "../../Components/HelpingComponent";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { returnFullName } from "../../utils/utils";

const items = [
  {
    key: "0",
    label: <a href="#">Schedule</a>,
  },
];

const FuelEfficiency = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Drivers");
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);

  const fetchHandler = useCallback(() => {
    getApi(endPoints.logbook.allCompanyLog({ page }), {
      setResponse: setData,
    });
  }, [page]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const thead = [
    <input type={"checkbox"} />,
    "Vehicle Name",
    "Miles Driven",
    "Fuel Efficiency",
    "Avg Speed",
    "Total Engine Time",
    "Idle Time",
  ];

  const driverThead = [
    <input type={"checkbox"} />,
    "Driver Name",
    "Miles Driven",
    "Fuel Efficieny",
    "Avg Speed",
    "Total Engine Time",
    "Idle Time",
  ];

  const tabsOptions = [
    {
      value: "Drivers",
      label: "Drivers",
    },
    {
      value: "Vehicles",
      label: "Vehicles",
    },
  ];

  const ExtraComponent = () => {
    return (
      <div className="report-btn-container" style={{ flex: 1 }}>
        <div className="relative" onClick={() => setOpen(true)}>
          <input
            type="text"
            className="w-[380px] h-[45px] pl-9 border border-[#8E8F8F] rounded-lg p-2 "
            style={{ color: "#8E8F8F" }}
            placeholder="06 Mar, 2024 at 12:00 AM - Today at 11:59 PM"
          />
          <img
            src="../Vector (11).png"
            alt=""
            className="absolute top-3 left-2"
          />
        </div>
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <button className="btn">Report Action</button>
        </Dropdown>
      </div>
    );
  };

  const driverBody = data?.data?.docs?.map((i) => [
    <input type="checkbox" className="checkbox" />,
    returnFullName(i?.driver),
    i?.milesDriven,
    i?.eldEngineRecord?.[0]?.drivingFuelEconomy_LPerKm,
    "---",
    "---",
    i?.eldFuelRecord?.[0]?.idleTimeHours,
  ]);

  return (
    <section className="dormancy-report-page p-5">
      <AlertDateSelector show={open} handleClose={() => setOpen(false)} />
      <EditThreshold show={show} handleClose={() => setShow(false)} />

      <Tabs
        tab={selectedTab}
        setTab={setSelectedTab}
        option={tabsOptions}
        ExtraComponent={ExtraComponent}
      />
      {selectedTab === "Drivers" ? (
        <TableLayout
          thead={driverThead}
          tbody={driverBody}
          className="vehicle-table mt-5"
        />
      ) : (
        <TableLayout thead={thead} className="vehicle-table mt-5" />
      )}
      <Pagination
        className={"mt-5"}
        totalPages={data?.data?.totalPages}
        currentPage={page}
        setCurrentPage={setPage}
      />
    </section>
  );
};
export default FuelEfficiency;
