/** @format */

import React, { useEffect, useState } from "react";
import {
  AlertDateSelector,
  EditThreshold,
} from "../../Components/Modals/Modals";
import TableLayout from "../../Components/TableLayout/TableLayout";
import { CircularProgressbar } from "react-circular-progressbar";
import { AreaCharts, PieChart } from "../../Components/ApexCharts/Charts";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { returnFullName } from "../../utils/utils";

const LogHistory = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);

  const fetchHandler = () => {
    getApi(endPoints.logbook.allCompanyLog, {
      setResponse: setData,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const pieSeries = [100];
  const pieLabel = ["Approved", "Rejected", "Canceled", "Pending"];

  const thead = [
    <input type={"checkbox"} />,
    "Driver Name",
    "Miles Driven",
    "Avg Edits/1000 mi",
    "Approved Edits",
    "Pending Edits",
    "Rejected Edits",
    "Cancelled Edits",
  ];

  const body = data?.data?.docs?.map((i) => [
    <input type={"checkbox"} className="checkbox" />,
    returnFullName(i?.driver),
    i?.milesDriven,
    "---",
    "---",
    "---",
    "---",
    "---",
  ]);

  const value = 99.17;

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
              <CircularProgressbar value={value} text={`3.1`} />
            </div>
            <div className="flex-box">
              <div className="items">
                <p className="faded">Total Miles Driven</p>
                <p className="bold">4807 mi</p>
              </div>
              <div className="items">
                <p className="faded">Approved Edits</p>
                <p className="bold">15 </p>
              </div>
              <div className="items">
                <p className="faded">Avg. Edits/ Driver</p>
                <p className="bold">5</p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-chart">
          <div className="flex-container">
            <PieChart series={pieSeries} labels={pieLabel} />
          </div>
        </div>
        <div className="my-chart">
          <AreaCharts series={tempSeries} labels={tempLabels} />
        </div>
      </div>

      <TableLayout thead={thead} className="vehicle-table mt-5" tbody={body} />
    </section>
  );
};

export default LogHistory;
