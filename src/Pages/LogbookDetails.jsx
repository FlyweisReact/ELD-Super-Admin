/** @format */

import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import TableLayout from "../Components/TableLayout/TableLayout";
import { EditElog, EditElogEvent } from "../Components/Modals/Modals.js";
import { useParams } from "react-router-dom";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import {
  returnFullName,
  convertSecondsToHHMM,
  downloadReport,
} from "../utils/utils.js";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import styles from "../css/modules/logbook.module.css";
import { statusMapping } from "../constant/constant";
import { useReactToPrint } from "react-to-print";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

const returnNickName = (data) => {
  if (data?.firstName || data?.lastName) {
    return data?.firstName?.slice(0, 1) + data?.lastName?.slice(0, 1);
  } else {
    return "";
  }
};
const getUpcomingDate = (formattedDate, setFormattedDate) => {
  const [day, month, year] = formattedDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + 1);
  const previousDay = String(date.getDate()).padStart(2, "0");
  const previousMonth = String(date.getMonth() + 1).padStart(2, "0");
  const previousYear = date.getFullYear();
  setFormattedDate(`${previousDay}-${previousMonth}-${previousYear}`);
};

const getPreviousDay = (formattedDate, setFormattedDate) => {
  const [day, month, year] = formattedDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() - 1);
  const previousDay = String(date.getDate()).padStart(2, "0");
  const previousMonth = String(date.getMonth() + 1).padStart(2, "0");
  const previousYear = date.getFullYear();
  setFormattedDate(`${previousDay}-${previousMonth}-${previousYear}`);
};

const getTodayDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
};

function formatDateString(dateString) {
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const originalDate = parseDate(dateString);

  if (isNaN(originalDate)) {
    return "";
  }
  return formatDate(originalDate);
}

function formatTime(dateTimeString) {
  const date = new Date(dateTimeString); // Convert the string to a Date object
  let hours = date.getHours(); // Get the hours in 24-hour format
  const minutes = date.getMinutes(); // Get the minutes
  const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM or PM

  // Convert to 12-hour format
  hours = hours % 12 || 12; // Adjust 0 to 12 for midnight

  // Pad minutes with leading zero if needed
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Return formatted time
  return `${hours}:${formattedMinutes} ${ampm}`;
}

const RecapContainer = ({ recapData }) => {
  const dateFormatter = (date) => {
    const splitData = date?.split("-");
    const getMonth = splitData?.[1];
    const getDay = splitData?.[2];
    const hasAll = getMonth && getDay;
    if (hasAll) {
      return `${getMonth}/${getDay}`;
    }
  };
  return recapData?.data?.map((item, index) => (
    <div className="flex justify-between hide-print" key={index}>
      <p className={styles.desc} style={{ color: "#000", fontWeight: "900" }}>
        {" "}
        {dateFormatter(item?.date)}{" "}
      </p>
      <p className={styles.desc} style={{ color: "#000", fontWeight: "900" }}>
        {" "}
        {item?.totalSec && convertSecondsToHHMM(item?.totalSec)}{" "}
      </p>
    </div>
  ));
};

function convertSecondsToReadableFormat(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "0 sec";
  }

  const hours = Math.floor(seconds / 3600);
  const remainingMinutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let timeString = "";

  if (hours > 0) {
    timeString += `${hours} hr${hours > 1 ? "s" : ""} `;
  }

  if (remainingMinutes > 0) {
    timeString += `${remainingMinutes} min${remainingMinutes > 1 ? "s" : ""} `;
  }

  if (remainingSeconds > 0 || seconds === 0) {
    timeString += `${remainingSeconds} sec${remainingSeconds > 1 ? "s" : ""}`;
  }

  return timeString.trim();
}

const checkStatus = (status) => {
  if (status === "On") {
    return (
      <div className="logbook-dutystatus on-duty">
        <p>ON</p>
      </div>
    );
  } else if (status === "Off") {
    return (
      <div className="logbook-dutystatus off-duty">
        <p>OFF</p>
      </div>
    );
  } else if (status === "D") {
    return (
      <div className="logbook-dutystatus drive">
        <p>D</p>
      </div>
    );
  } else {
    return (
      <div className="logbook-dutystatus sb">
        <p> {status} </p>
      </div>
    );
  }
};

const CheckDeviceConnection = (status) => {
  if (status === "Connected") {
    return (
      <div
        className="logbook-device-connect connected"
        style={{ justifyContent: "flex-start" }}
      >
        <span className="color-dot" />
        Online
      </div>
    );
  } else {
    return (
      <div
        className="logbook-device-connect"
        style={{ justifyContent: "flex-start" }}
      >
        <span className="color-dot" />
        Offline
      </div>
    );
  }
};

const Return_Duty_Status = (status) => {
  if (status === "On") {
    return <span>On Duty</span>;
  } else if (status === "Off") {
    return <span>Off Duty</span>;
  } else if (status === "D") {
    return <span>Drive</span>;
  } else if (status === "SB") {
    return <span>Sleeper Berth</span>;
  }
};

function formatTimeHHMM(totalSec) {
  if (totalSec <= 0) return "00:00";
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}

function getTotalTimeForStatus(data, status) {
  const totalSec = data
    .filter((item) => item.dutyStatus === status)
    .reduce((sum, item) => sum + (item.totalMin || 0), 0);
  return formatTimeHHMM(totalSec);
}

const LogbookDetails = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [detail, setDetails] = useState(null);
  const [loogBookData, setLoogBookData] = useState(null);
  const [graph, setGraph] = useState(null);
  const [formattedDate, setFormattedDate] = useState(getTodayDate);
  const [selectedLog, setSelectedLog] = useState(null);
  const [recapData, setRecapData] = useState(null);
  const [driverInfo, setDriverInfo] = useState(null);
  const [sbTotalTime, setSbTotalTime] = useState("00:00");
  const [dTotalTime, setDTotalTime] = useState("00:00");
  const [onTotalTime, setOnTotalTime] = useState("00:00");
  const [offTotalTime, setOffTotalTime] = useState("00:00");
  const [chartState, setChartState] = useState({
    series: [
      {
        name: "Status",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
      },
      stroke: {
        curve: "stepline",
        width: 2,
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        categories: [
          "M",
          "",
          "1",
          "",
          "2",
          "",
          "3",
          "",
          "4",
          "",
          "5",
          "",
          "6",
          "",
          "7",
          "",
          "8",
          "",
          "9",
          "",
          "10",
          "",
          "11",
          "",
          "N",
          "",
          "1",
          "",
          "2",
          "",
          "3",
          "",
          "4",
          "",
          "5",
          "",
          "6",
          "",
          "7",
          "",
          "8",
          "",
          "9",
          "",
          "10",
          "",
          "11",
          "",
          "M",
        ],
      },
      yaxis: {
        min: 1,
        max: 4,
        labels: {
          formatter: function (value) {
            const statusLabels = { 2: "D", 1: "On", 3: "SB", 4: "Off" };
            // const statusLabels = { 2: "D", 1: "On", 3: "Off", 4: "SB" };
            return statusLabels[value] || "";
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#e0e0e0", // Match gridlines to desired style
        xaxis: {
          lines: {
            show: true, // Show vertical gridlines
          },
        },
        yaxis: {
          lines: {
            show: false, // Show horizontal gridlines
          },
        },
      },
      colors: ["#3E7B27"],
    },
  });

  const fetchDriverInfo = useCallback(() => {
    getApi(endPoints.users.getUserDetail(id), {
      setResponse: setDriverInfo,
      showErr: false,
    });
  }, [id]);

  useEffect(() => {
    fetchDriverInfo();
  }, [fetchDriverInfo]);

  const fetchDetails = useCallback(() => {
    getApi(endPoints.logbook.getDriverLoogbook({ id, date: formattedDate }), {
      setResponse: setGraph,
      showErr: false,
    });
  }, [id, formattedDate]);

  useEffect(() => {
    if (id) {
      getApi(endPoints.logbook.getRecap(id), {
        setResponse: setRecapData,
        showErr: false,
      });
    }
  }, [id]);

  useEffect(() => {
    if (id && formattedDate) {
      fetchDetails();
    }
  }, [formattedDate, id, fetchDetails]);

  useEffect(() => {
    if (graph) {
      const timeArray = graph?.data?.docs?.map((item) => {
        const date = new Date(item.fromTime);
        return isNaN(date.getTime()) ? null : date;
      });
      const statusArr = graph?.data?.docs?.map(
        (item) => statusMapping[item.dutyStatus]
      );
      const chartData = new Array(50).fill(null);
      let lastStatus = null;
      let lastTimeIndex = -1;
      let statusMap = {};
      timeArray.forEach((time, index) => {
        if (time) {
          const hour = time.getHours();
          const minutes = time.getMinutes();
          let categoryIndex = hour * 2 + (minutes >= 30 ? 1 : 0);
          if (minutes >= 15 && minutes < 30) {
            categoryIndex = hour * 2 + 1;
          }
          if (!(categoryIndex in statusMap)) {
            statusMap[categoryIndex] = statusArr[index];
          }
          if (lastTimeIndex !== -1 && categoryIndex > lastTimeIndex) {
            for (let i = lastTimeIndex + 1; i < categoryIndex; i++) {
              if (!statusMap[i]) {
                statusMap[i] = lastStatus;
              }
            }
          }

          lastStatus = statusArr[index];
          lastTimeIndex = categoryIndex;
        }
      });

      Object.keys(statusMap).forEach((index) => {
        chartData[index] = statusMap[index];
      });

      setChartState((prevState) => ({
        ...prevState,
        series: [
          {
            name: "Duty Status",
            data: chartData,
          },
        ],
      }));
    }
  }, [graph]);

  const head = [
    "Status",
    <div className="text-start">Duration</div>,
    "Location",
    "Comment",
    "Actions",
  ];
  const body = graph?.data?.docs?.map((i) => [
    checkStatus(i?.dutyStatus),
    <div className="text-start">
      <p className="font-[900]">{Return_Duty_Status(i?.dutyStatus)}</p>
      {formatTime(i?.fromTime)} | {convertSecondsToReadableFormat(i?.totalMin)}
    </div>,
    i?.location,
    i?.comment,
    <span
      onClick={() => {
        setSelectedLog(i);
        setOpen(true);
      }}
    >
      <i className="fa-solid fa-pencil text-[blue] cursor-pointer"></i>
    </span>,
  ]);

  const fetchDriverLogbook = useCallback(() => {
    if (id && formattedDate) {
      getApi(
        endPoints.logbook.getLogbookByDriver(id, inputDate(formattedDate)),
        {
          setResponse: setDetails,
          showErr: false,
        }
      );
    }
  }, [id, formattedDate]);

  useEffect(() => {
    fetchDriverLogbook();
  }, [fetchDriverLogbook]);

  useEffect(() => {
    if (detail !== null) {
      setLoogBookData(detail?.data?.docs?.reverse()?.[0]);
    }
    if (detail === null) {
      setLoogBookData(null);
    }
  }, [detail]);



  // Function to format date from DD-MM-YYYY to YYYY-MM-DD
  const inputDate = (date) => {
    if (!date) {
      return ""; // Ensure a default return value
    }
    const split = date?.split("-");
    const day = split?.[0];
    const month = split?.[1];
    const year = split?.[2];

    return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
  };

  // Function to handle date updates from input
  const updateDateHandler = (date) => {
    const split = date?.split("-");
    const year = split?.[0]; // Correct index for year
    const month = split?.[1];
    const day = split?.[2];
    setFormattedDate(`${day}-${month}-${year}`); // Set date in DD-MM-YYYY format
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrint2 = () => {
    downloadReport(handlePrint);
  };

  useEffect(() => {
    if (graph) {
      const data = graph?.data?.docs || [];
      setSbTotalTime(getTotalTimeForStatus(data, "SB"));
      setDTotalTime(getTotalTimeForStatus(data, "D"));
      setOnTotalTime(getTotalTimeForStatus(data, "On"));
      setOffTotalTime(getTotalTimeForStatus(data, "Off"));
    }
  }, [graph]);

  return (
    <>
      <EditElog
      show={openModal2}
        handleClose={() => setOpenModal2(false)}
        title={`${returnFullName(loogBookData?.driver)} /  ${formatDateString(
          formattedDate
        )}`}
        data={loogBookData}
        fetchHandler={fetchDriverLogbook}
      />

      <EditElogEvent
       show={open}
        handleClose={() => setOpen(false)}
        title={`${returnFullName(loogBookData?.driver)} /  ${formatDateString(
          formattedDate
        )}`}
        date={formatDateString(formattedDate)}
        graph={graph}
        data={selectedLog}
        fetchDetails={fetchDetails}
      />
      <div className={`mb-3`} ref={componentRef}>
        <div className={styles.log_header}>
          <div className="flex items-center gap-3">
            <p
              className="font-[700] w-[40px]"
              style={{ textTransform: "uppercase" }}
            >
              {returnNickName(driverInfo?.data)}
            </p>
            <div>
              <div
                className="text-[#1F384C] font-[700]"
                style={{ textTransform: "capitalize" }}
              >
                {returnFullName(driverInfo?.data)}
              </div>
              {CheckDeviceConnection(driverInfo?.data?.isDeviceConnected)}
            </div>
          </div>
          <div className={styles.btn_container}>
            <div className="relative w-[180px] rounded-md ">
              <input
                className="placeholder: ml-2 block w-[160px] h-[45px] bg-[#F9F9F9] rounded-xl border-0 py-1.5 pr-4 text-gray-900  ring-gray-300 placeholder:text-gray-400  sm:text-sm  sm:leading-6
                border border-1 border-[#8E8F8F]"
                type="date"
                value={inputDate(formattedDate)}
                onChange={(e) => updateDateHandler(e.target.value)}
              />
            </div>
            <div
              onClick={() => setOpenModal2(true)}
              className="flex items-center cursor-pointer gap-2 py-2 px-3 bg-[#86E3CE] rounded-md border border-1 border-[#86E3CE] hidePrint"
            >
              <MdEdit size={20} />
              <span className="text-black font-bold">Edit Elog Form</span>
            </div>
            <div
              className="flex items-center gap-2 py-2 px-3 bg-[#86E3CE] rounded-md border border-1 border-[#86E3CE] hidePrint"
              onClick={handlePrint2}
            >
              <FaPlus size={20} />
              <span className="text-black font-bold">Download Report</span>
            </div>
          </div>
        </div>

        <div className={styles.drop_content}>
          <div className={styles.content}>
            <div className={styles.all_fields}>
              <div className="text-[#000]">
                <p className={styles.title_feild}>Start Location</p>
                <p className={styles.value_field}>
                  {" "}
                  {loogBookData?.startLocation}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>Start / End Odometer</p>
                <p className={styles.value_field}>
                  {loogBookData?.startOdometer}
                  {loogBookData?.startOdometer ? "/" : ""}
                  {loogBookData?.endOdometer}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>Co Driver Name</p>
                <p className={styles.value_field}>
                  {loogBookData?.coDriverName}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>Shipping ID</p>
                <p className={styles.value_field}>
                  {" "}
                  {loogBookData?.shippingId}{" "}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>Destination</p>
                <p className={styles.value_field}>
                  {loogBookData?.destinationLocation}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>Miles Today</p>
                <p className={styles.value_field}>
                  {" "}
                  {loogBookData?.milesToday}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>Truck Number</p>
                <p className={styles.value_field}>
                  {loogBookData?.vehicleNumber}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>Trailer ID</p>
                <p className={styles.value_field}>{loogBookData?.trailerId}</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>Timezone</p>
                <p className={styles.value_field}>{loogBookData?.timeZone}</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>24 Start Time</p>
                <p className={styles.value_field}>
                  {loogBookData?.twentyForHourStartTime}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>Start / End Engine Hours</p>
                <p className={styles.value_field}>
                  {loogBookData?.startEngineHours}{" "}
                  {loogBookData?.startEngineHours ? "/" : ""}
                  {loogBookData?.endEngineHours}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>Driver Name</p>
                <p className={styles.value_field}>
                  {returnFullName(driverInfo?.data)}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>Licence State</p>
                <p className={styles.value_field}>{driverInfo?.data?.state}</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}> ELD ID</p>
                <p className={styles.value_field}>{loogBookData?.eldId}</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>File Comment</p>
                <p className={styles.value_field}>{loogBookData?.comment}</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>Driver Licence</p>
                <p className={styles.value_field}>
                  {driverInfo?.data?.license}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>ELD Manufacturer</p>
                <p className={styles.value_field}>
                  {loogBookData?.eldManufacturer}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>
                  Unidentified Driver Records
                </p>
                <p className={styles.value_field}>
                  {loogBookData?.unidentifiedDriverRecords}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>Print/Display Date</p>
                <p className={styles.value_field}> {loogBookData?.date} </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>Exempt Driver Status</p>
                <p className={styles.value_field}>
                  {loogBookData?.exemptDriverStatus}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>Data Diagnostic Indicators</p>
                <p className={styles.value_field}>
                  {loogBookData?.dataDiagnosticIndicators}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>ELD Malfunction Indicators</p>
                <p className={styles.value_field}>
                  {loogBookData?.eldMalfunctionIndicators}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>Truck Tractor VIN</p>
                <p className={styles.value_field}>
                  {loogBookData?.truck?.vinNumber}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>Carrier</p>
                <p className={styles.value_field}>
                  {loogBookData?.carrierName}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p className={styles.title_feild}>USDOT </p>
                <p className={styles.value_field}> {loogBookData?.dotNumber}</p>
              </div>
            </div>

            <div className={styles.signature_btn}>
              <p className={styles.title_feild}>Signature</p>
              {loogBookData?.signature ? (
                loogBookData?.signature
              ) : (
                <div className="flex items-center justify-center border border-dashed border-[#939eb9] gap-2 text-[#F56C89] p-4 bg-[#F3F5FB] mt-2 rounded-xl font-[700]">
                  <img src="../Vector2.png" alt="" className="h-fit w-fit" />
                  <p>Missing Signature</p>
                </div>
              )}

              <div
                className={`px-6 py-4 w-[18vw] bg-[#E8F4FF] ${styles.recap_div} hidePrint`}
              >
                {recapData && (
                  <p style={{ color: "#000", fontWeight: "900" }}>Recap</p>
                )}

                <div className="mt-4 text-[#000] ">
                  {recapData && (
                    <>
                      <div className="flex flex-col gap-4 pr-3">
                        <RecapContainer recapData={recapData} />
                      </div>
                      <hr style={{ margin: "16px 0px" }} />
                    </>
                  )}
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "900" }}>
                      Cycle Left
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: "900" }}>
                      {" "}
                      {loogBookData?.cycleLeft &&
                        convertSecondsToHHMM(loogBookData?.cycleLeft)}{" "}
                      {loogBookData?.cycleLeft ? "/" : ""}{" "}
                      {loogBookData?.cycleDays}{" "}
                      {loogBookData?.cycleDays > 1 ? "day (s)" : "day"}
                    </p>
                    <hr style={{ margin: "16px 0px" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "900" }}>
                      Available Today
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: "900" }}>
                      {loogBookData?.availableToday &&
                        convertSecondsToHHMM(loogBookData?.availableToday)}
                    </p>
                    <hr style={{ margin: "16px 0px" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "900" }}>
                      Worked Today
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: "900" }}>
                      {" "}
                      {loogBookData?.workedToday &&
                        convertSecondsToHHMM(loogBookData?.workedToday)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.content} mt-5`}>
            <div className={styles.chart}>
              <div className={styles.main_chart_container}>
                <div className={styles.chart_container}>
                  <ReactApexChart
                    options={chartState.options}
                    series={graph?.data?.docs ? chartState.series : []}
                    type="line"
                    height={350}
                  />
                  <div className={styles.date_handler}>
                    <div
                      className={`${styles.go_back} hidePrint`}
                      onClick={() =>
                        getPreviousDay(formattedDate, setFormattedDate)
                      }
                    >
                      <IoIosArrowBack size={16} />
                    </div>
                    {getTodayDate() !== formattedDate && (
                      <div
                        className={`${styles.go_forward} hidePrint`}
                        onClick={() =>
                          getUpcomingDate(formattedDate, setFormattedDate)
                        }
                      >
                        <IoIosArrowForward size={16} />
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.time_container}>
                  <p className={styles.off_time}>{offTotalTime}</p>
                  <p className={styles.sb_time}>{sbTotalTime}</p>
                  <p className={styles.d_time}>{dTotalTime}</p>
                  <p className={styles.on_time}>{onTotalTime}</p>
                </div>
              </div>

              <TableLayout
                thead={head}
                className="vehicle-table mt-5 mb-5"
                tbody={body}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogbookDetails;
