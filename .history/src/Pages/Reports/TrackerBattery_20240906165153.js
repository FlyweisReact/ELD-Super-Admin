/** @format */

import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { BarChart } from "../../Components/ApexCharts/Charts";
import { AlertDateSelector } from "../../Components/Modal/Modal";
import TableLayout from "../../Components/TableLayout";

const TrackerBattery = () => {
  const [open, setOpen] = useState(false);

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

  const thead = [
    <input type={"checkbox"} />,
    "Device Name",
    "Vehicle",
    "Device Type",
    "Avg Charge",
    "Max Charge",
    "Min Charge",
    "Charging",
    "Discharging",
    "Plugged-In",
  ];

  const tbody = [
    [
      <input type={"checkbox"} className="checkbox" />,
      "Device-38",
      "Vehicle-39",
      "Smart Tracker",
      "37.18%",
      <span className="success-badge">66%</span>,
      <span className="danger-badges">3%</span>,
      "10%",
      "2%",
      "5%",
    ],
    [
      <input type={"checkbox"} className="checkbox" />,
      "Device-38",
      "Vehicle-39",
      "Smart Tracker",
      "37.18%",
      <span className="success-badge">66%</span>,
      <span className="danger-badges">3%</span>,
      "10%",
      "2%",
      "5%",
    ],
    [
      <input type={"checkbox"} className="checkbox" />,
      "Device-38",
      "Vehicle-39",
      "Smart Tracker",
      "37.18%",
      <span className="success-badge">66%</span>,
      <span className="danger-badges">3%</span>,
      "10%",
      "2%",
      "5%",
    ],
    [
      <input type={"checkbox"} className="checkbox" />,
      "Device-38",
      "Vehicle-39",
      "Smart Tracker",
      "37.18%",
      <span className="success-badge">66%</span>,
      <span className="danger-badges">3%</span>,
      "10%",
      "2%",
      "5%",
    ],
  ];

  return (
    <section className="p-5 geofence-report pb-5">
      <AlertDateSelector show={open} handleClose={() => setOpen(false)} />

      <p className="heading">Reports Demo</p>
      <p className="sub-heading">
        You are viewing a TruckX placeholder powered by a sample data set as a
        part of the demo experience!
      </p>

      <div className="bg-white mt-3">
        <div className="full-width" style={{ borderBottom: "1px solid #ddd" }}>
          <div className="p-4">
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
          </div>
        </div>
        <div className="report-chart-container">
          <div className="my-chart">
            <div className="flex-container">
              <div style={{ width: 200, height: 200 }}>
                <CircularProgressbar value={50} text={"50"} />
              </div>

              <div className="flex-box">
                <div className="items">
                  <p className="faded">Devices</p>
                  <p className="bold">10</p>
                </div>
                <div className="items">
                  <p className="faded">Max Charge</p>
                  <p className="bold">83%</p>
                </div>
                <div className="items">
                  <p className="faded">Min Charge</p>
                  <p className="bold">3%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="my-chart">
            <BarChart data={salesData} />
          </div>
          <div className="my-chart">
            <BarChart data={salesData} />
          </div>
        </div>

        <div className="p-4 pt-0">
          <TableLayout
            thead={thead}
            tbody={tbody}
            className="vehicle-table mt-5"
          />
        </div>
      </div>
    </section>
  );
};

export default TrackerBattery;
