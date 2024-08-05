import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const DateFilter = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <div className="flex justify-between gap-3 mb-2">
        <div className="relative">
          <input
            type="text"
            className="h-[45px] w-[150px] pl-9 border border-[#8E8F8F] rounded-lg p-2 "
            style={{ color: "#8E8F8F" }}
            placeholder="Apr 03,2022"
          />
          <img
            src="../Vector (11).png"
            alt=""
            className="absolute top-3 left-2"
          />
        </div>
        <input
          type="time"
          className="h-[45px] pl-9 border border-[#8E8F8F] rounded-lg p-2 "
          style={{ color: "#8E8F8F" }}
          placeholder="Apr 03,2022"
        />
        <div className="relative">
          <input
            type="text"
            className="h-[45px] w-[150px] pl-9 border border-[#8E8F8F] rounded-lg p-2 "
            style={{ color: "#8E8F8F" }}
            placeholder="Apr 03,2022"
          />
          <img
            src="../Vector (11).png"
            alt=""
            className="absolute top-3 left-2"
          />
        </div>
        <input
          type="time"
          className="h-[45px] pl-9 border border-[#8E8F8F] rounded-lg p-2 "
          style={{ color: "#8E8F8F" }}
          placeholder="Apr 03,2022"
        />
      </div>
      <div className="flex justify-between gap-10 my-6">
        <div className="flex gap-[80px]">
        <div className="flex flex-col gap-4"> 
            <div>Today</div>
            <div>Yesterday</div>
            <div>Last Week</div>
            <div>2 weeks</div>
            <div>this month</div>
            <div>Last month</div>
            <div>3 Months</div>
            <div>This Quater</div>
            <div>This year</div>
        </div>
        <div className="flex flex-col gap-4"> 
            <div>Wed</div>
            <div>Tue</div>
            <div>Mar 31, 2022</div>
            <div>Mar 31, 2022</div>
            <div>Mar 31, 2022</div>
            <div>Mar 31, 2022</div>
            <div>Mar 31, 2022</div>
            <div>Mar 31, 2022</div>
            <div>Mar 31, 2022</div>
     
        </div>

        </div>

      <Calendar
        onChange={onChange}
        value={value}
        showNeighboringMonth={false}
      />
      </div>
      <button className="bg-[#34B7C1] w-full py-2 rounded-md text-white font-[600]">Apply Date Range</button>
    </div>
  );
};

export default DateFilter;
