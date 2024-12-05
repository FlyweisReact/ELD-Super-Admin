/** @format */

import { Dropdown } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { AreaCharts, BarChart } from "../../Components/ApexCharts/Charts";
import { Pagination, Tabs } from "../../Components/HelpingComponent";
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
  const [data, setData] = useState(null);
  const [vehicleLog, setVehicleLog] = useState(null);
  const [avgReport, setAvgReport] = useState(null);
  const [page, setPage] = useState(1);

  const fetchHandler = useCallback(() => {
    getApi(endPoints.logbook.allCompanyLog({ page }), {
      setResponse: setData,
    });
  }, [page]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const fetchLog = () => {
    getApi(endPoints.logbook.tripHistory, {
      setResponse: setVehicleLog,
    });
    getApi(endPoints.logbook.tripAvg, {
      setResponse: setAvgReport,
    });
  };

  useEffect(() => {
    fetchLog();
  }, []);

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

  const body = data?.data?.docs?.map((i) => [
    <input type={"checkbox"} className="checkbox" />,
    returnFullName(i?.driver),
    "---",
    i?.workedToday,
    i?.distance,
    "---",
    i?.eldFuelRecord?.[0]?.idleTimeHours,
    "---",
    "---",
  ]);

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

  const vehicleBody = vehicleLog?.data?.docs?.map((i) => [
    <input type="checkbox" className="checkbx" />,
    i?.vehicleNumber,
    i?.vehicleType,
    i?.totalTrip,
    i?.totalDriveTime,
    i?.totalDistance,
    i?.averageSpeed,
    i?.idleTime,
    `${i?.idling}%`,
    i?.safetyEvents,
  ]);

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
              <CircularProgressbar
                value={avgReport?.data?.totalTrip || 0}
                text={`${avgReport?.data?.totalTrip || 0}`}
              />
            </div>

            <div className="flex-box">
              <div className="items">
                <p className="faded">Total Trips</p>
                <p className="bold"> {avgReport?.data?.totalTrip} </p>
              </div>
              <div className="items">
                <p className="faded">Avg. Trip Distance</p>
                <p className="bold"> {avgReport?.data?.totalDistance} mi</p>
              </div>
              <div className="items">
                <p className="faded">Avg. Trip Duration</p>
                <p className="bold">{avgReport?.data?.averageDuration}</p>
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
        <div>
          <TableLayout
            thead={thead}
            className="vehicle-table mt-5"
            tbody={body}
          />
          <Pagination
            className={"mt-5"}
            totalPages={data?.data?.totalPages}
            currentPage={page}
            setCurrentPage={setPage}
          />
        </div>
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
