/** @format */

import { Dropdown } from "antd";
import React, { useState } from "react";
import { AlertDateSelector } from "../../Components/Modals/Modals";
import TableLayout from "../../Components/TableLayout/TableLayout";

const items = [
  {
    key: "0",
    label: <a href="#">Download</a>,
  },
];

const DriveTime = () => {
  const [open, setOpen] = useState(false);

  const thead = [
   "Vehicle" ,
   "Unassigned Duration" ,
   "Unassigned Distance" ,
   "Unassigned Trips" ,
   "Pending Trips" ,
   "Annotated Trips"
  ];

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
      <TableLayout thead={thead} className="vehicle-table mt-5" />
    </section>
  );
};

export default DriveTime;
