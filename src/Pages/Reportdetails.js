/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { PopUp } from "../Components/PopUp";
import DateFilter from "../Components/DateFilter";
import { CircularProgressbar } from "react-circular-progressbar";
import TableLayout from "../Components/TableLayout";
import { AlertDateSelector } from "../Components/Modals/Modals";
import ReactApexChart from "react-apexcharts";
import { Dropdown } from "antd";
import { getApi } from "../Repository/Api";
import { dateFormatter, returnFullName } from "../utils/utils";
import { Pagination } from "../Components/HelpingComponents";
import endPoints from "../Repository/apiConfig";

const items = [
  {
    key: "0",
    label: <a href="#">Download</a>,
  },
  {
    key: "1",
    label: <a href="#">Share</a>,
  },
  {
    key: "2",
    label: <a href="#">Schedule</a>,
  },
];

const Reportdetails = () => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const value = 29;

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

  const thead = [
    "No",
    "Event",
    "Driver",
    "Vehicle",
    "Time (CDT)",
    "Location",
    "Video",
    "Detail",
  ];

  const tbody = data?.data?.docs?.map((i, index) => [
    index + 1,
    i?.violations,
    returnFullName(i?.driver),
    i?.truck?.vehicleNumber,
    i?.date && dateFormatter(i?.date),
    i.startLocation,
    "---",
    "View",
  ]);
  // --- overspeeding chart
  const [series] = useState([100]);
  const [overspeedingOption] = useState({
    chart: {
      type: "pie",
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

  return (
    <div className="p-4">
      <AlertDateSelector show={open} handleClose={() => setOpen(false)} />
      <div className="flex justify-between items-center  flex-column flex-end full-width">
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

        <div className="flex gap-2 flex-column md-padding flex-end full-width ">
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <button className=" w-[163px] h-[45px] text-black font-bold border bg-[#86E3CE] border-[#86E3CE] flex justify-center items-center gap-5 rounded-lg">
              Report Action
            </button>
          </Dropdown>
        </div>
      </div>

      <div className="report-chart-container">
        <div className="my-chart">
          <div className="flex-container">
            <div style={{ width: 200, height: 200 }}>
              <CircularProgressbar value={value} text={`${value}`} />
            </div>
            <p className="font-bold">Avg. Hours Used/Day: 6hr</p>
          </div>
        </div>

        <div className="my-chart">
          <div className="flex-container">
            <ReactApexChart
              options={overspeedingOption}
              series={series}
              type="pie"
            />
          </div>
        </div>
        <div className="my-chart">
          <ReactApexChart
            options={violationOption}
            series={violationSeries}
            type="area"
          />
        </div>
      </div>

      <TableLayout
        thead={thead}
        className="vehicle-table mt-5 mb-5"
        tbody={tbody}
      />

      <Pagination
        className={"mt-5"}
        currentPage={page}
        setCurrentPage={setPage}
        hasNextPage={data?.data?.hasNextPage}
        hasPrevPage={data?.data?.hasNextPage}
      />

      <PopUp
        title="Date Filter"
        openModal={openPopUp}
        setOpenModal={setOpenPopUp}
      >
        <DateFilter />
      </PopUp>
    </div>
  );
};

export default Reportdetails;
