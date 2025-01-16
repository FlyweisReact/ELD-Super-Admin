/** @format */

import { Dropdown } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { AreaCharts, BarChart } from "../../Components/ApexCharts/Charts";
import { AlertDateSelector, EditHour } from "../../Components/Modals/Modals";
import TableLayout from "../../Components/TableLayout/TableLayout";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { Pagination } from "../../Components/HelpingComponents";

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

const Utilization = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);

  const fetchHandler = useCallback(() => {
    const queryParams = new URLSearchParams({
      page,
      limit: 10,
    });
    getApi(endPoints.logbook.allCompanyLog(queryParams?.toString()), {
      setResponse: setData,
      showErr: false,
    });
  }, [page]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

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
    "Vehicle",
    "Vehicle Type",
    "Utilization",
    "Avg. Utilization/Day",
    "Hours Available/Day",
    "Total Hours Used",
    "Total Miles Driven",
  ];

  const body = data?.data?.docs?.map((i) => [
    <input type={"checkbox"} className="checkbox" />,
    i?.truck?.vehicleNumber,
    i?.truck?.vehicleType,
    "---",
    "---",
    <span onClick={() => setShow(true)}>
      {i?.workedToday}{" "}
      <i className="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i>
    </span>,
    i?.workedToday,
    i?.milesDriven,
  ]);

  return (
    <section className="p-5">
      <AlertDateSelector show={open} handleClose={() => setOpen(false)} />
      <EditHour show={show} handleClose={() => setShow(false)} />

      <div className="report-btn-container">
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

      <div className="report-chart-container">
        <div className="my-chart">
          <div className="flex-container">
            <div style={{ width: 200, height: 200 }}>
              <CircularProgressbar value={33} text={"33"} />
            </div>

            <div className="flex-box">
              <div className="items">
                <p className="faded">Avg. Hours Used/Day</p>
                <p className="bold">23 hr</p>
              </div>
              <div className="items">
                <p className="faded">Hours Available/Day</p>
                <p className="bold">24 hr</p>
              </div>
              <div className="items">
                <p className="faded">Total Hours Used</p>
                <p className="bold">158 hr</p>
              </div>
              <div className="items">
                <p className="faded">Total Miles Driven</p>
                <p className="bold">5,174 mi</p>
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

      <TableLayout thead={thead} className="vehicle-table mt-5" tbody={body} />
      <Pagination
        className={"mt-5"}
        currentPage={page}
        setCurrentPage={setPage}
        hasNextPage={data?.data?.hasNextPage}
        hasPrevPage={data?.data?.hasPrevPage}
      />
    </section>
  );
};

export default Utilization;
