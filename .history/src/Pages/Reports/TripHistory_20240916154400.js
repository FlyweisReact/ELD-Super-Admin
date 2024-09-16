/** @format */

import { Dropdown } from "antd";
import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { AreaCharts, BarChart } from "../../Components/ApexCharts/Charts";
import { Tabs } from "../../Components/";
import { AlertDateSelector } from "../../Components/Modals/Modals";
import TableLayout from "../../Components/TableLayout/TableLayout";

const items = [
  {
    key: "0",
    label: <a href="#">Download</a>,
  },
  {
    key: "1",
    label: <a href="#">Share</a>,
  },
];

const salesData = [
  {
    x: "100",
    y: 100,
  },
  {
    x: "0-500",
    y: 50,
  },

  {
    x: "500-1000",
    y: 50,
  },

  {
    x: "0-500",
    y: 50,
  },

  {
    x: "0-500",
    y: 50,
  },

  {
    x: "0-500",
    y: 50,
  },
];

const TripHistory = () => {
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Drivers");

  const tempSeries = [
    {
      name: "",
      data: [1122, 750, 350, 750, 780, 1000, 200],
    },
  ];

  const tempLabels = [
    "Aug 29",
    "Aug 30",
    "Aug 31",
    "Sep 1",
    "Sep 2",
    "Seo 3",
    "Sep 4",
    "Sep 5",
    "Sep 6",
  ];

  const thead = [
    <input type={"checkbox"} />,
    "Driver Name",
    "Total Trips",
    "Total Drive Time",
    "Distance",
    "Avg Speed",
    "Idle Time",
    "Idling",
    "Safety Events",
  ];

  const body = [
    [
      <input type={"checkbox"} className="checkbox" />,
      "Farhan Raja",
      5,
      "17h 47m",
      "508 ml",
      "52.22 mph",
      "0",
      "0.0%",
      "2",
    ],
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

  const vehicleHead = [
    <input type={"checkbox"} />,
    "Vehicle No",
    "Type",
    "Total Trips",
    "Total Drive Time",
    "Distance",
    "Avg Speed",
    "Idle Time",
    "Idling",
    "Safety Events",
  ];

  const vehicleBody = [
    [
      <input type="checkbox" className="checkbx" />,
      78616,
      "TRUCK",
      12,
      "23h 17m",
      "539 mi",
      "51.89 mph",
      "0",
      "0%",
      0,
    ],
  ];

  return (
    <section className="p-5">
      <AlertDateSelector show={open} handleClose={() => setOpen(false)} />
      <Tabs
        tab={selectedTab}
        setTab={setSelectedTab}
        option={tabsOptions}
        ExtraComponent={ExtraComponent}
      />

      <div className="report-chart-container">
        <div className="my-chart">
          <div className="flex-container">
            <div style={{ width: 200, height: 200 }}>
              <CircularProgressbar value={5} text={"5"} />
            </div>

            <div className="flex-box">
              <div className="items">
                <p className="faded">Total Trips</p>
                <p className="bold">39</p>
              </div>
              <div className="items">
                <p className="faded">Avg. Trip Distance</p>
                <p className="bold">133.67 mi</p>
              </div>
              <div className="items">
                <p className="faded">Avg. Trip Duration</p>
                <p className="bold">2h 59m</p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-chart">
          <BarChart data={salesData} />
        </div>

        <div className="my-chart">
          <AreaCharts series={tempSeries} labels={tempLabels} />
        </div>
      </div>

      {selectedTab === "Drivers" ? (
        <TableLayout
          thead={thead}
          className="vehicle-table mt-5"
          tbody={body}
        />
      ) : (
        <TableLayout
          thead={vehicleHead}
          className="vehicle-table mt-5"
          tbody={vehicleBody}
        />
      )}
    </section>
  );
};

export default TripHistory;
