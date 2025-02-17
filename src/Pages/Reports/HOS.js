/** @format */

import { Dropdown } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { AreaCharts } from "../../Components/ApexCharts/Charts";
import {
  Pagination,
  CustomProgressBar,
} from "../../Components/HelpingComponents";
import { AlertDateSelector } from "../../Components/Modals/Modals";
import TableLayout from "../../Components/TableLayout/TableLayout";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { returnFullName } from "../../utils/utils";

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

const HOS = () => {
  const [open, setOpen] = useState(false);
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
    "Driver Name",
    "Compliance Score",
    "Miles Driven",
    "Total Violations",
    "Form & Manner",
    "Rest",
    "Driving",
    "Cycle",
    "Duty",
  ];

  const body = data?.data?.docs?.map((i) => [
    <input type={"checkbox"} className="checkbox" />,
    returnFullName(i?.driver),
    <div
      className="w-[70px] h-[34px] bg-[#EDF8F0] rounded-xl text-[#18A88C] flex justify-center gap-1 items-center m-auto"
      style={{ fontWeight: "900" }}
    >
      ---
    </div>,
    i?.milesDriven,
    i?.violations,
    "---",
    "---",
    "---",
    i?.driver?.cycle,
    i?.driver?.dutyStatus,
  ]);
  return (
    <section className="p-5">
      <AlertDateSelector show={open} handleClose={() => setOpen(false)} />

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
      <hr className="mt-5 mb-5" />

      <div className="report-chart-container">
        <div className="my-chart">
          <div className="flex-container">
            <div style={{ width: 200, height: 200 }}>
              <CircularProgressbar value={97.8} text={"97.8"} />
            </div>

            <div className="flex-box">
              <div className="items">
                <p className="faded">Total HOS Violations</p>
                <p className="bold">4</p>
              </div>
              <div className="items">
                <p className="faded">Distance Driven</p>
                <p className="bold">5160 mi</p>
              </div>
              <div className="items">
                <p className="faded">Time Driven</p>
                <p className="bold">82h 58m</p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-chart">
          <div
            className="flex-container"
            style={{ flexDirection: "column", gap: "10px" }}
          >
            <CustomProgressBar label={"Form & Manner"} />
            <CustomProgressBar label={"Rest"} />
            <CustomProgressBar
              label={"Driving"}
              color={"#96F794"}
              percentage={50}
            />
            <CustomProgressBar label={"Cycle"} />
            <CustomProgressBar
              label={"Duty"}
              color={"#B3B6FA"}
              percentage={50}
            />
          </div>
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

export default HOS;
