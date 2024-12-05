/** @format */

import React, { useCallback, useEffect, useState } from "react";
import {
  AlertDateSelector,
  EditThreshold,
} from "../../Components/Modals/Modals";
import TableLayout from "../../Components/TableLayout/TableLayout";
import { CircularProgressbar } from "react-circular-progressbar";
import { AreaCharts, BarChart } from "../../Components/ApexCharts/Charts";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { returnFullName } from "../../utils/utils";
import { Pagination } from "../../Components/HelpingComponent";

const DutyStatus = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
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
    "Driver Name",
    "Time Driven",
    "Miles Driven",
    "Dwell Time",
    "On Duty",
    "Personal",
    "Yard Move",
    "Off Duty",
    "Sleeper Berth",
  ];

  const body = data?.data?.docs?.map((i) => [
    <input type={"checkbox"} className="checkbox" />,
    returnFullName(i?.driver),
    i?.workedToday,
    i?.milesDriven,
    "---",
    i?.workedToday,
    "---",
    i?.distance,
    "---",
    "---",
  ]);

  const value = 100;

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
          <div className="flex-container">
            <div style={{ width: 200, height: 200 }}>
              <CircularProgressbar value={value} text={`${value}`} />
            </div>
            <div className="flex-box">
              <div className="items">
                <p className="faded">Total Dwell Time</p>
                <p className="bold">0</p>
              </div>
              <div className="items">
                <p className="faded">Distance Driven</p>
                <p className="bold">5543 mi</p>
              </div>
              <div className="items">
                <p className="faded">Time Driven</p>
                <p className="bold">100h 35m</p>
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
        totalPages={data?.data?.totalPages}
        currentPage={page}
        setCurrentPage={setPage}
      />
    </section>
  );
};

export default DutyStatus;
