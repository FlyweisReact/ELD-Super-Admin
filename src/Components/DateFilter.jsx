import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateFilter = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  return (
    <div className="alert-date-filter">
      <div className="input-groups">
        <div className="date">
          <i className="fa-solid fa-calendar-days"></i>
          <span>Aug 01, 2024</span>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="date">
          <i className="fa-regular fa-clock"></i>
          <span>12:00 AM</span>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <i className="fa-solid fa-arrow-right"></i>
        <div className="date">
          <i className="fa-solid fa-calendar-days"></i>
          <span>Aug 01, 2024</span>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="date">
          <i className="fa-regular fa-clock"></i>
          <span>12:00 AM</span>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>

      <div className="custom-date-picker">
        <div className="days-pickers">
          <div className="item">
            <p className="selected">Today</p>
            <p className="normal">Fri</p>
          </div>
          <div className="item">
            <p className="selected">Yesterday</p>
            <p className="normal">Thur</p>
          </div>
          <div className="item">
            <p className="selected">Last Week</p>
            <p className="normal">Aug 18, 2024</p>
          </div>
          <div className="item">
            <p className="selected">2 weeks</p>
            <p className="normal">Aug 16, 2024</p>
          </div>
        </div>

        <DatePicker
          selected={startDate}
          onChange={(update) => {
            setStartDate(update[0]);
            setEndDate(update[1]);
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      </div>

      <button className="apply-date-range-btn">
        Apply Date Range
      </button>
    </div>
  );
};

export default DateFilter;
