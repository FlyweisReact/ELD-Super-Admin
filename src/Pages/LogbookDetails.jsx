/** @format */

import React, { useState, useCallback, useRef, useEffect } from "react";
import profile from "../Assets/Header/profile.svg";
import { BiSolidBell } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import ReactApexChart from "react-apexcharts";
import TableLayout from "../Components/TableLayout/TableLayout";
import { useParams } from "react-router-dom";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import {
  returnFullName,
  convertSecondsToTimeFormat,
  convertSecondsToHHMM,
  downloadReport,
} from "../utils/utils.js";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import styles from "../css/modules/logbook.module.css";
import { statusMapping } from "../constant/constant";
import { useReactToPrint } from "react-to-print";
import { EditElog, EditElogEvent } from "../Components/Modals/Modals.js";

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
      <p className={styles.desc}> {dateFormatter(item?.date)} </p>
      <p className={styles.desc}>
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
  const [driver, setDriver] = useState(null);
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
      title: {
        text: "",
        align: "left",
      },

      xaxis: {
        title: {
          text: "",
        },
        labels: {
          formatter: (val) => `${val}`, // Customize the time labels if needed
        },
      },
      yaxis: {
        title: {
          text: "",
        },
        categories: ["S", "ON", "OFF", "SB"], // Fixed status values on the y-axis
        labels: {
          formatter: function (val) {
            return val; // Show the status labels as they are
          },
        },
      },

      markers: {
        hover: {
          sizeOffset: 4,
        },
      },
    },
  });

  const fetchDetails = useCallback(() => {
    getApi(endPoints.logbook.getDriverLoogbook({ id, date: formattedDate }), {
      setResponse: setGraph,
    });
  }, [id, formattedDate]);

  useEffect(() => {
    if (id) {
      getApi(endPoints.logbook.getRecap(id), {
        setResponse: setRecapData,
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

      const chartData = statusArr.map((status, index) => ({
        x: timeArray[index],
        y: status ? status : 3,
      }));

      const lastItem = graph?.data?.docs[graph.data.docs.length - 1];
      const lastToTime = lastItem ? new Date(lastItem.toTime) : null;
      if (lastToTime && !isNaN(lastToTime.getTime())) {
        const lastStatus = statusMapping[lastItem.dutyStatus];
        chartData.push({
          x: lastToTime,
          y: lastStatus,
        });
      }

      setChartState((prevState) => ({
        ...prevState,
        series: [
          {
            name: "Status",
            data: chartData, // Use prepared chart data
          },
        ],
        options: {
          ...prevState.options,
          title: {
            text: formatDateString(formattedDate),
          },
          yaxis: {
            min: 1,
            max: 4,
            title: {
              text: "",
            },
            labels: {
              formatter: function (value) {
                const statusLabels = { 2: "D", 1: "On", 3: "Off", 4: "SB" };
                return statusLabels[value];
              },
            },
          },
          xaxis: {
            title: {
              text: "",
            },
            labels: {
              formatter: function (value) {
                const date = new Date(value);
                return date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });
              },
            },
          },
        },
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
    <div
      className={`bg-[#EDF8F0] text-[#1DBC60] w-[60px]  px-4 py-1 rounded-2xl m-auto font-[900]`}
    >
      {i?.status}
    </div>,
    <div className="text-start">
      <p className="font-[900]"> {i?.dutyStatus} </p>
      {convertSecondsToTimeFormat(i?.totalMin)} <br />
      {convertSecondsToReadableFormat(i?.totalMin)}
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
        }
      );
    }
  }, [id, formattedDate]);

  useEffect(() => {
    fetchDriverLogbook();
  }, [fetchDriverLogbook]);

  useEffect(() => {
    if (detail) {
      setLoogBookData(detail?.data?.docs?.reverse()?.[0]);
    }
  }, [detail]);

  useEffect(() => {
    if (id) {
      getApi(endPoints.drivers.getDriverDetail(id), {
        setResponse: setDriver,
      });
    }
  }, [id]);

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

  return (
    <>
      <EditElog
        show={openModal2}
        handleClose={() => setOpenModal2(false)}
        title={`${returnFullName(driver?.data)} /  ${formatDateString(
          formattedDate
        )}`}
        data={loogBookData}
        fetchHandler={fetchDriverLogbook}
      />

      <EditElogEvent
        show={open}
        handleClose={() => setOpen(false)}
        title={`${returnFullName(driver?.data)} /  ${formatDateString(
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
            <p className="font-[700] w-[40px]">
              {returnNickName(driver?.data)}
            </p>
            <div>
              <div className="text-[#1F384C] font-[700]">
                {returnFullName(driver?.data)}
              </div>
              <div className="flex items-center gap-1">
                <img
                  src="../Ellipse 30.png"
                  alt=""
                  className="w-[10px] h-[10px]"
                />
                <span className="text-[#1F384C] text-[14px]">
                  {driver?.data?.dutyStatus}
                </span>
              </div>
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
              className="flex items-center cursor-pointer gap-2 py-2 px-3 bg-[#34B7C1] rounded-md border border-1 border-[#34B7C1] hidePrint"
            >
              <img src="../Vector4.png" alt="" className="h-fit" />
              <span className="text-white">Edit Elog Form</span>
            </div>
            <div
              className="flex items-center gap-2 py-2 px-3 bg-[#34B7C1] rounded-md border border-1 border-[#34B7C1] hidePrint"
              onClick={handlePrint2}
            >
              <img src="../Vector3.png" alt="" className="h-fit" />
              <span className="text-white">Generate Report</span>
            </div>
          </div>
        </div>

        <div className={styles.drop_content}>
          <div className={styles.content}>
            <div className={styles.all_fields}>
              <div className="text-[#8E8F8F]">
                <p>Start Location</p>
                <p className="text-[#000] font-[900]">
                  {" "}
                  {loogBookData?.startLocation}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Start / End Odometer</p>
                <p className="text-[#000] font-[900]">
                  {loogBookData?.startOdometer} / {loogBookData?.endOdometer}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Co Driver Name</p>
                <p className="text-[#000] font-[900]">
                  {loogBookData?.coDriverName}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Shipping ID</p>
                <p className="text-[#000] font-[900]">
                  {" "}
                  {loogBookData?.shippingId}{" "}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Destination</p>
                <p className="text-[#000] font-[900]">
                  {loogBookData?.destinationLocation}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Miles Today</p>
                <p className="text-[#000] font-[900]">
                  {" "}
                  {loogBookData?.milesToday}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Truck Number</p>
                <p className="text-[#000] font-[900]">
                  {loogBookData?.vehicleNumber}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Trailer ID</p>
                <p className="text-[#000] font-[900]">
                  {loogBookData?.trailerId}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Timezone</p>
                <p className="text-[#000] font-[900]">
                  {loogBookData?.driver?.timeZone}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>24 Start Time</p>
                <p className="text-[#000] font-[900]">
                  {loogBookData?.twentyForHourStartTime}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Start / End Engine Hours</p>
                <p className="text-[#000] font-[900]">---</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Driver Name</p>
                <p className="text-[#000] font-[900]">
                  {loogBookData?.driverName}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Licence State</p>
                <p className="text-[#000] font-[900]">
                  {loogBookData?.driver?.state}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>ELD ID</p>
                <p className="text-[#000] font-[900]">---</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>File Comment</p>
                <p className="text-[#000] font-[900]">
                  {loogBookData?.comment}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Driver Licence</p>
                <p className="text-[#000] font-[900]">
                  {loogBookData?.driver?.license}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>ELD Manufacturer</p>
                <p className="text-[#000] font-[900]">---</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Unidentified Driver Records</p>
                <p className="text-[#000] font-[900]">---</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Print/Display Date</p>
                <p className="text-[#000] font-[900]"> {loogBookData?.date} </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Exempt Driver Status</p>
                <p className="text-[#000] font-[900]">---</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Data Diagnostic Indicators</p>
                <p className="text-[#000] font-[900]">---</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>ELD Malfunction Indicators</p>
                <p className="text-[#000] font-[900]">---</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Truck Tractor VIN</p>
                <p className="text-[#000] font-[900]">---</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Carrier</p>
                <p className="text-[#000] font-[900]">
                  {loogBookData?.carrierName}
                </p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>USDOT </p>
                <p className="text-[#000] font-[900]">
                  {" "}
                  {loogBookData?.dotNumber}
                </p>
              </div>
            </div>

            <div className={styles.signature_btn}>
              <p className="text-[#8E8F8F]">Signature</p>
              {loogBookData?.signature ? (
                loogBookData?.signature
              ) : (
                <div className="flex items-center justify-center border border-dashed border-[#939eb9] gap-2 text-[#F56C89] p-4 bg-[#F3F5FB] mt-2 rounded-xl font-[700]">
                  <img src="../Vector2.png" alt="" className="h-fit w-fit" />
                  <p>Missing Signature</p>
                </div>
              )}
            </div>
          </div>

          <div className={`${styles.content} mt-5`}>
            <div className={styles.chart}>
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

              <TableLayout
                thead={head}
                className="vehicle-table mt-5 mb-5"
                tbody={body}
              />
            </div>
            <div
              className={`px-6 py-4 w-[18vw] bg-[#E8F4FF] ${styles.recap_div} hidePrint`}
            >
              <p>Recap</p>

              <div className="mt-4 text-[#858B9A] ">
                <div className="flex flex-col gap-4 pr-3">
                  <RecapContainer recapData={recapData} />
                </div>
                <hr style={{ margin: "16px 0px" }} />
                <div>
                  <p>Cycle Left</p>
                  <p> {loogBookData?.cycleLeft} </p>
                  <hr style={{ margin: "16px 0px" }} />
                </div>
                <div>
                  <p>Available Today</p>
                  <p>{loogBookData?.availableToday}</p>
                  <hr style={{ margin: "16px 0px" }} />
                </div>
                <div>
                  <p>Worked Today</p>
                  <p>{loogBookData?.workedToday}</p>
                  <hr style={{ margin: "16px 0px" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogbookDetails;
