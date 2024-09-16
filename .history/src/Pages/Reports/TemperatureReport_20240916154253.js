/** @format */
import React, { useState } from "react";
import { AlertDateSelector } from "../../Components/Modals/Modals";
import TableLayout from "../../Components/TableLayout";

const TemperatureReport = () => {
  const [open, setOpen] = useState(false);

  const thead = [
    "Vehicle",
    "Type",
    "# Sensor",
    "Max Temp",
    "Min Temp",
    "Max Hum",
    "Min Hum",
  ];

  const tbody = [
    [
      "8TIHWVO",
      "TRUCK",
      1,
      <div className="flex gap-2 items-center justify-center">
        97.87F<span className="danger-badges">-0.7F</span>
      </div>,
      <div className="flex gap-2 items-center justify-center">
        30.54F<span className="success-badge">+0.54F</span>
      </div>,
      "95.0%",
      "20.0%",
    ],
    [
      "ELD92TS",
      "TRUCK",
      1,
      <div className="flex gap-2 items-center justify-center">
        97F<span className="danger-badges">-0.7F</span>
      </div>,
      <div className="flex gap-2 items-center justify-center">
        30.54F<span className="danger-badges">-0.7F</span>
      </div>,
      "95.0%",
      "20.0%",
    ],
    [
      "8TIHWVO",
      "TRUCK",
      1,
      <div className="flex gap-2 items-center justify-center">
        97.87F<span className="danger-badges">-0.7F</span>
      </div>,
      <div className="flex gap-2 items-center justify-center">
        30.54F<span className="success-badge">+0.54F</span>
      </div>,
      "95.0%",
      "20.0%",
    ],
    [
      "ELD92TS",
      "TRUCK",
      1,
      <div className="flex gap-2 items-center justify-center">
        97F<span className="danger-badges">-0.7F</span>
      </div>,
      <div className="flex gap-2 items-center justify-center">
        30.54F<span className="danger-badges">-0.7F</span>
      </div>,
      "95.0%",
      "20.0%",
    ],
    [
      "8TIHWVO",
      "TRUCK",
      1,
      <div className="flex gap-2 items-center justify-center">
        97.87F<span className="danger-badges">-0.7F</span>
      </div>,
      <div className="flex gap-2 items-center justify-center">
        30.54F<span className="success-badge">+0.54F</span>
      </div>,
      "95.0%",
      "20.0%",
    ],
    [
      "ELD92TS",
      "TRUCK",
      1,
      <div className="flex gap-2 items-center justify-center">
        97F<span className="danger-badges">-0.7F</span>
      </div>,
      <div className="flex gap-2 items-center justify-center">
        30.54F<span className="danger-badges">-0.7F</span>
      </div>,
      "95.0%",
      "20.0%",
    ],
    [
      "8TIHWVO",
      "TRUCK",
      1,
      <div className="flex gap-2 items-center justify-center">
        97.87F<span className="danger-badges">-0.7F</span>
      </div>,
      <div className="flex gap-2 items-center justify-center">
        30.54F<span className="success-badge">+0.54F</span>
      </div>,
      "95.0%",
      "20.0%",
    ],
    [
      "ELD92TS",
      "TRUCK",
      1,
      <div className="flex gap-2 items-center justify-center">
        97F<span className="danger-badges">-0.7F</span>
      </div>,
      <div className="flex gap-2 items-center justify-center">
        30.54F<span className="danger-badges">-0.7F</span>
      </div>,
      "95.0%",
      "20.0%",
    ],
  ];

  return (
    <section className="p-5 geofence-report pb-5">
      <AlertDateSelector show={open} handleClose={() => setOpen(false)} />
      <Helmet title={"Geofence"} />

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

export default TemperatureReport;
