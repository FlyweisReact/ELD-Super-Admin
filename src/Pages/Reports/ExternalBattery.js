/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { AlertDateSelector } from "../../Components/Modals/Modals";
import TableLayout from "../../Components/TableLayout/TableLayout";
import { Dropdown } from "antd";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { Pagination } from "../../Components/HelpingComponent";

const items = [
  {
    key: "0",
    label: <a href="#">Schedule</a>,
  },
];

const ExternalBattery = () => {
  const [open, setOpen] = useState(false);
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
    "Vehicle",
    "Vehicle Type",
    "Device Name",
    "Battery Level",
    "Avg Battery Charge",
    "Battery Type",
    "# Batteries",
    "Avg Battery Voltage",
    "Max Charge",
    "Min Charge",
  ];

  const tbody = data?.data?.docs?.map((i) => [
    i?.truck?.vehicleNumber,
    i?.truck?.vehicleType,
  ]);

  return (
    <section className="dormancy-report-page p-5">
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

      <TableLayout thead={thead} className="vehicle-table mt-5" tbody={tbody} />
      <Pagination
        className={"mt-5"}
        totalPages={data?.data?.totalPages}
        currentPage={page}
        setCurrentPage={setPage}
      />
    </section>
  );
};

export default ExternalBattery;
