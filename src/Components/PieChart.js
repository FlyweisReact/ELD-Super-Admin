/** @format */

import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import dot from "../Assets/Dashboard/dot.svg";

const PieChart = ({ labels = [], counts = [], title, link }) => {
  const navigate = useNavigate();

  const [options] = useState({
    chart: {
      type: "donut",
    },
    labels: labels,
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  });

  const [series] = useState(counts);
  return (
    <div
      className=" box-shadow cursor-pointer  flex flex-col gap-10 rounded-xl bg-white p-6"
      onClick={() => navigate(link)}
    >
      <div className="flex font-semibold text-[20px] items-center gap-2">
        <img src={dot} alt="" className="w-[11px] h-[17px]" />#{title}
      </div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="donut" />
      </div>
    </div>
  );
};

export default PieChart;
