/** @format */

import React, { useState } from "react";
import { GoogleMapPage } from "../Components/GoogleMap";
import { useNavigate } from "react-router-dom";

const Location = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate("");

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const VehicleArray = [
    { label: "Truck" },
    { label: "Trailer" },
    { label: "Bus" },
    { label: "Car" },
    { label: "Bike" },
    { label: "Plane" },
    { label: "Boat" },
    { label: "Locomotive" },
    { label: "Boat" },
    { label: "RV" },
    { label: "Van" },
    { label: "Motorcycle" },
  ];

  return (
    <div className="flex ">
      {isDrawerOpen ? (
        <div className="flex relative">
          <div className="shadow-lg h-[100vh] w-[300px] px-4">
            <div className="flex justify-between gap-10 my-3">
              <p className="text-[28px]">List View</p>
              <div
                className="px-[12px] py-[4px] rounded bg-white shadow cursor-pointer"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <img src="../ion_filter.png" alt="" />
              </div>
            </div>
            {isFilterOpen && (
              <div className="absolute right-10 w-[150px]">
                <ul class="w-[150px] h-[500px] overflow-auto text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <p className="px-4 py-2 font-bold text-[20px]">Filter</p>
                  <p className="px-4 py-2 text-[17px]">Vehicle Type</p>

                  {VehicleArray?.map((d, i) => (
                    <li
                      class="w-full rounded-t-lg dark:border-gray-600"
                      key={i}
                    >
                      <div class="flex items-center ps-3">
                        <input
                          id="teal-checkbox"
                          type="checkbox"
                          value=""
                          class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="vue-checkbox"
                          class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {d?.label}
                        </label>
                      </div>
                    </li>
                  ))}
                  <p className="px-4 py-2 text-[18px]">Status</p>
                  <li class="w-full rounded-t-lg dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input
                        id="teal-checkbox"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        for="vue-checkbox"
                        class="w-full py-3 ms-2 text-sm font-medium text-[#FC8041] dark:text-gray-300"
                      >
                        Idling
                      </label>
                    </div>
                  </li>
                  <li class="w-full rounded-t-lg dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input
                        id="teal-checkbox"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        for="vue-checkbox"
                        class="w-full py-3 ms-2 text-sm font-medium text-[#FC8041] dark:text-gray-300"
                      >
                        Inactive
                      </label>
                    </div>
                  </li>
                  <li class="w-full rounded-t-lg dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input
                        id="teal-checkbox"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        for="vue-checkbox"
                        class="w-full py-3 ms-2 text-sm font-medium text-[#34A853] dark:text-gray-300"
                      >
                        Moving
                      </label>
                    </div>
                  </li>
                  <li class="w-full rounded-t-lg dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input
                        id="teal-checkbox"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        for="vue-checkbox"
                        class="w-full py-3 ms-2 text-sm font-medium text-[#1890FF] dark:text-gray-300"
                      >
                        Parked
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            )}
            <div className="border border-[#8E8F8F] flex gap-2 items-center justify-center py-1 rounded">
              <p className="text-[#8E8F8F]">Truck</p>
              <img src="../chevron_down2.png" alt="" />
            </div>
            <div className="flex justify-between my-4">
              <p className="text-[20px]">2101</p>
              <div
                className="bg-[#BFE7F380] rounded-2xl w-fit cursor-pointer"
                onClick={() => navigate("/park")}
              >
                <p className="py-1 px-4">Parked</p>
              </div>
            </div>
            <div className="bg-[#BFE7F380] rounded w-fit">
              <p className="py-1 px-6">Muhammad Zurrain +4</p>
            </div>
            <div className="flex justify-between font-[600] text-[14px] my-4">
              <p>Franklin County, GA 30521</p>
              <p>1:50 AM EDT</p>
            </div>
          </div>
          <div
            className="shadow-lg px-3 py-2 w-fit h-fit cursor-pointer"
            onClick={toggleDrawer}
          >
            <img src="../chevron_down.png" alt="" />
          </div>
        </div>
      ) : (
        <div
          className="shadow-lg px-3 py-2 w-fit h-fit cursor-pointer"
          onClick={toggleDrawer}
        >
          <img src="../chevron_down.png" alt="" />
        </div>
      )}
      <div className="flex-1">
        <GoogleMapPage />
      </div>
    </div>
  );
};

export default Location;
