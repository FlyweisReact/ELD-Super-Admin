/** @format */

import React, { useState } from "react";
import { AlertDateSelector, EditThreshold } from "../../Components/Modals/Modals";
import ReactApexChart from "react-apexcharts";
import TableLayout from "../../Components/TableLayout/";

const Dormancy = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  // --- overspeeding chart
  const [series] = useState([100]);
  const [overspeedingOption] = useState({
    chart: {
      type: "donut",
    },
    labels: ["Overspeeding"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  });

  // --- violation day
  const [violationSeries] = useState([
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ]);

  const [violationOption] = useState({
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false, // Hide the toolbar
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
  });

  const thead = [
    <input type={"checkbox"} />,
    "Vehicle",
    "Vehicle Type",
    "Days Dromant",
    "Dormancy Threshold",
    "Location",
    "Last Active",
  ];

  const body = [
    [
      <input type={"checkbox"} className="checkbox" />,
      "78616",
      "Truck",
      "3d",
      <span onClick={() => setShow(true)}>
        3d{" "}
        <i className="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i>
      </span>,
      "Cedar Grove Road, Shepherdsville, Kentucky, 40165",
      "Aug 30, 2024 | 4:24 PM",
    ],
  ];

  return (
    <section className="dormancy-report-page p-5">
      <AlertDateSelector show={open} handleClose={() => setOpen(false)} />
      <EditThreshold show={show} handleClose={() => setShow(false)} />

      <div className="full-width">
        <div>
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
          <p className="title">Avg Dormancy</p>
          <p className="percentage">42.86%</p>
          <div className="flex-box">
            <div className="items">
              <p className="faded">Avg. Dormancy/Vehicle</p>
              <p className="bold">3d</p>
            </div>
            <div className="items">
              <p className="faded">Avg. Dormancy Threshold</p>
              <p className="bold">3d</p>
            </div>
            <div className="items">
              <p className="faded">Total Days Dormant</p>
              <p className="bold">3d</p>
            </div>
          </div>
        </div>
        <div className="my-chart">
          <p className="title">Vehicles by % Dormancy Range</p>

          <div className="flex-container">
            <ReactApexChart
              options={overspeedingOption}
              series={series}
              type="donut"
            />
          </div>
        </div>
        <div className="my-chart">
          <p className="title">Dormant Vehicles per Day</p>

          <ReactApexChart
            options={violationOption}
            series={violationSeries}
            type="area"
          />
        </div>
      </div>

      <TableLayout thead={thead} className="vehicle-table mt-5" tbody={body} />
    </section>
  );
};

export default Dormancy;
