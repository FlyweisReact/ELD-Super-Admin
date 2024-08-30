/** @format */

import React, { useEffect, useState, useCallback } from "react";
import isymbol from "../Assets/Logbook/isymbol.svg";
import { LuArrowUpDown } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import {
  Pagination,
  SectionHeading,
  Tabs,
} from "../Components/HelpingComponent";
import { CreateTruck } from "../Components/Modals/Modals";
import  {TableLayout}

const Vehicles = () => {
  const navigate = useNavigate("");
  const [selectedTab, setselectedTab] = useState("Active");
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ids, setIds] = useState([]);
  const [allPushed, setAllPushed] = useState(false);
  const [deactiveData, setDeactiveData] = useState({});
  const allIds = data?.data?.docs?.map((i) => i?._id);

  const pushInArr = (id) => {
    const alreadyPresent = ids.some((i) => i === id);
    if (alreadyPresent) {
      const filterData = ids.filter((i) => i !== id);
      setIds(filterData);
    } else {
      setIds((prev) => [...prev, id]);
    }
  };
  const checkIfAlreadyPresent = (id) => {
    const isPresent = ids.some((i) => i === id);
    if (isPresent) {
      return true;
    } else {
      return false;
    }
  };
  const pushAll = () => {
    setAllPushed(!allPushed);
    if (allPushed) {
      setIds([]);
    } else {
      setIds(allIds);
    }
  };

  const thead = [
    <input type="checkbox" onChange={() => pushAll()} />,
    <span style={{ textAlign: "left", width: "100%", display: "block" }}>
      Vehicle No. | Serial No.
    </span>,
    "Vehicle Type",
    "Status",
    "Relay Switch",
    "Fault Codes",
    "Driver",
    "Current Location (CDT)",
    "Mode",
    "Documents",
    "Add Date (CDT)",
    "Actions",
  ];

  useEffect(() => {
    if (selectedTab) {
      setCurrentPage(1);
    }
  }, [selectedTab]);

  const fetchHandler = useCallback(() => {
    getApi(endPoints.vehicles.getActiveVehicle({ page: currentPage }), {
      setResponse: setData,
    });
  }, [currentPage]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const tabsOptions = [
    {
      value: "Active",
      label: `Active Truck`,
    },
    {
      value: "Deativated",
      label: `Deativated Truck`,
    },
  ];

  const ExtraComponent = () => {
    return (
      <div className="driver-actions-btn flex sm-padding gap-1">
        <button
          className="bg-[#fff] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]"
          style={{
            color: "#eb5757",
            border: "1px solid #eb5757",
            fontWeight: 900,
          }}
        >
          <i className="fa-solid fa-trash-can"></i>Deactivate
        </button>

        <button
          className="bg-[#34B7C1] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]"
          onClick={() => setOpen(true)}
        >
          <IoMdAdd style={{ color: "white" }} /> Add Truck
        </button>
      </div>
    );
  };

  const tbody = data?.data?.docs?.map((i) => [
    <input
      type="checkbox"
      className="checkbox"
      onChange={() => pushInArr(i._id)}
      checked={checkIfAlreadyPresent(i._id)}
    />,
    <div
      className="text-left"
      onClick={() => navigate(`/Vehicledetail/${i._id}`)}
    >
      <p className="bold">{i.vehicleNumber}</p>
      <p>----------------</p>
    </div>,
    i?.vehicleType,
  ]);

  return (
    <>
      <CreateTruck
        show={open}
        handleClose={() => setOpen(false)}
        fetchApi={fetchHandler}
      />
      <div className="p-5">
        <SectionHeading title={"Vehicles"} />

        <Tabs
          setTab={setselectedTab}
          tab={selectedTab}
          option={tabsOptions}
          ExtraComponent={ExtraComponent}
        />

        <TableLayout
          thead={thead}
          className="vehicle-table mt-5 mb-5"
          tbody={tbody}
        />

        {selectedTab === "Active" && (
          <>
            <div className="mt-5">
              <table className="border w-full ">
                <thead>
                  <tr className="bg-[#F0FAFB] h-[65px]  ">
                    <th className="w-[180px] text-center pl-2">
                      <input type="checkbox" /> Device
                    </th>
                    <th className=" w-[180px]  ">
                      <div className="flex items-center justify-center gap-2">
                        Unit No <LuArrowUpDown />
                      </div>
                    </th>
                    <th className=" w-[198px] text-center">Relay Switch</th>
                    <th className="w-[198px]">
                      <div className="flex  items-center justify-center gap-2">
                        VIN No
                        <LuArrowUpDown />
                      </div>
                    </th>

                    <th className="w-[198px]">
                      <div className=" flex  items-center justify-center gap-2">
                        Fault Codes <LuArrowUpDown />
                      </div>
                    </th>
                    <th className="w-[180px] text-center">Driver </th>
                    <th className="w-[269px] text-center">
                      Current Location (EDT)
                    </th>
                    <th className="w-[180px]">Logbook Mode</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.docs?.map((i, index) => (
                    <tr
                      className="border-b h-[135px] cursor-pointer"
                      onClick={() => navigate(`/Vehicledetail/${i?._id}`)}
                      key={index}
                    >
                      <td>
                        <div className="font-semibold flex justify-center items-center pl-2">
                          <input type="checkbox" />{" "}
                          <GoDotFill style={{ color: "#21DDB8" }} />
                        </div>
                      </td>
                      <td className="text-center font-semibold"></td>
                      <td className="text-center"></td>
                      <td className="font-semibold text-center">
                        {i?.vinNumber}
                      </td>
                      <td className="text-center"></td>
                      <td className="text-center font-semibold"></td>
                      <td className="text-center font-semibold"></td>
                      <td className="font-semibold text-center"></td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {selectedTab === "Deativated" && (
          <>
            <div className="mt-5">
              <table className="border w-full ">
                <thead>
                  <tr className="bg-[#F0FAFB] h-[65px]  ">
                    <th className=" w-[180px]  ">
                      <div className="flex items-center justify-center gap-2">
                        Engine Light <LuArrowUpDown />
                      </div>
                    </th>
                    <th className=" w-[198px] text-center">Fault Code</th>
                    <th className="w-[198px]">
                      <div className="flex  items-center justify-center gap-2">
                        First Detection
                        <LuArrowUpDown />
                      </div>
                    </th>
                    <th className="w-[180px] text-center">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    className="border-b h-[135px] cursor-pointer"
                    onClick={() => navigate("/Vehicledetail/2010")}
                  >
                    <td>
                      <div className="font-semibold flex justify-center items-center pl-2">
                        <GoDotFill
                          style={{ color: "#1E87F0", fontSize: "24px" }}
                        />{" "}
                        ON
                      </div>
                    </td>
                    <td className="text-center font-semibold">
                      SPN: 191, FMI: 9, OC: 1
                    </td>
                    <td className="text-center font-semibold">
                      2022-02-22, 11:12 pm
                    </td>
                    <td className="font-semibold text-center">
                      <p>Transmission Output Shaft Speed.</p>
                      <p className="font-[400]">Abnormal Update Rate.</p>
                    </td>
                  </tr>
                  <tr
                    className="border-b h-[135px] cursor-pointer"
                    onClick={() => navigate("/Vehicledetail/2010")}
                  >
                    <td>
                      <div className="font-semibold flex justify-center items-center pl-2">
                        <GoDotFill
                          style={{ color: "#1E87F0", fontSize: "24px" }}
                        />{" "}
                        ON
                      </div>
                    </td>
                    <td className="text-center font-semibold">
                      SPN: 191, FMI: 9, OC: 1
                    </td>
                    <td className="text-center font-semibold">
                      2022-02-22, 11:12 pm
                    </td>
                    <td className="font-semibold text-center">
                      <p>Transmission Output Shaft Speed.</p>
                      <p className="font-[400]">Abnormal Update Rate.</p>
                    </td>
                  </tr>
                  <tr
                    className="border-b h-[135px] cursor-pointer"
                    onClick={() => navigate("/Vehicledetail/2010")}
                  >
                    <td>
                      <div className="font-semibold flex justify-center items-center pl-2">
                        <GoDotFill
                          style={{ color: "#1E87F0", fontSize: "24px" }}
                        />{" "}
                        ON
                      </div>
                    </td>
                    <td className="text-center font-semibold">
                      SPN: 191, FMI: 9, OC: 1
                    </td>
                    <td className="text-center font-semibold">
                      2022-02-22, 11:12 pm
                    </td>
                    <td className="font-semibold text-center">
                      <p>Transmission Output Shaft Speed.</p>
                      <p className="font-[400]">Abnormal Update Rate.</p>
                    </td>
                  </tr>
                  <tr
                    className="border-b h-[135px] cursor-pointer"
                    onClick={() => navigate("/Vehicledetail/2010")}
                  >
                    <td>
                      <div className="font-semibold flex justify-center items-center pl-2">
                        <GoDotFill
                          style={{ color: "#1E87F0", fontSize: "24px" }}
                        />{" "}
                        ON
                      </div>
                    </td>
                    <td className="text-center font-semibold">
                      SPN: 191, FMI: 9, OC: 1
                    </td>
                    <td className="text-center font-semibold">
                      2022-02-22, 11:12 pm
                    </td>
                    <td className="font-semibold text-center">
                      <p>Transmission Output Shaft Speed.</p>
                      <p className="font-[400]">Abnormal Update Rate.</p>
                    </td>
                  </tr>
                  <tr
                    className="border-b h-[135px] cursor-pointer"
                    onClick={() => navigate("/Vehicledetail/2010")}
                  >
                    <td>
                      <div className="font-semibold flex justify-center items-center pl-2">
                        <GoDotFill
                          style={{ color: "#1E87F0", fontSize: "24px" }}
                        />{" "}
                        ON
                      </div>
                    </td>
                    <td className="text-center font-semibold">
                      SPN: 191, FMI: 9, OC: 1
                    </td>
                    <td className="text-center font-semibold">
                      2022-02-22, 11:12 pm
                    </td>
                    <td className="font-semibold text-center">
                      <p>Transmission Output Shaft Speed.</p>
                      <p className="font-[400]">Abnormal Update Rate.</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-5">
              <div className=" border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </a>
                </div>
                <div className="flex justify-center">
                  <div>
                    <nav
                      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                      aria-label="Pagination"
                    >
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                      {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                      <a
                        href="#"
                        aria-current="page"
                        className="relative z-10 inline-flex items-center bg-[#1E87F0] px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        1
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        2
                      </a>
                      <a
                        href="#"
                        className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                      >
                        3
                      </a>
                      <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                        ...
                      </span>
                      <a
                        href="#"
                        className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                      >
                        6
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        7
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        8
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <Pagination
          className={"mt-5"}
          totalPages={data?.data?.totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default Vehicles;
