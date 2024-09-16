/** @format */

import React, { useState } from "react";
import Helmet from "../../Components/Helmet";
import { AlertDateSelector, EditThreshold } from "../../Components/Modals/Modals";
import TableLayout from "../../Components/TableLayout/TableLayout";
import { Dropdown } from "antd";
import { Tabs } from "../../Components/HelpingComponents";

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

  return (
    <section className="dormancy-report-page p-5">
      <Helmet title={"Fuel Efficiency"} />
      <AlertDateSelector show={open} handleClose={() => setOpen(false)} />
      <EditThreshold show={show} handleClose={() => setShow(false)} />

      <Tabs
        tab={selectedTab}
        setTab={setSelectedTab}
        option={tabsOptions}
        ExtraComponent={ExtraComponent}
      />
      {selectedTab === "Drivers" ? (
        <TableLayout thead={driverThead} className="vehicle-table mt-5" />
      ) : (
        <TableLayout thead={thead} className="vehicle-table mt-5" />
      )}
    </section>
  );
};
export default FuelEfficiency;
