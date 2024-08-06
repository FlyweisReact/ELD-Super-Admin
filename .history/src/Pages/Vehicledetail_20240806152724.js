/** @format */

import React, { useState, useCallback, useEffect } from "react";
import isymbol from "../Assets/Logbook/isymbol.svg";
import { LuArrowUpDown } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import tickmark from "../Assets/Vechicledetail/tickmark.svg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { MdOutlineEdit } from "react-icons/md";
import vehiclegallary from "../Assets/Vechicledetail/vihiclegallary.svg";
import add from "../Assets/Vechicledetail/add.svg";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { dateFormatter } from "../utils";

const Vehicledetail = () => {
  const params = useParams();
  const navigate = useNavigate("");
  const [selectedTab, setselectedTab] = useState("Overview");
  const [editvehicledetail, setEditvehicledetail] = useState(false);
  const [Vehicleregistration, setVehicleregistration] = useState(false);
  const [editLiability, setEditvehicleliability] = useState(false);
  const [cargoinsurance, setCargoinsurance] = useState(false);
  const [data, setData] = useState({});
  const [activeDTC, setActiveDTC] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const fetchHandler = useCallback(() => {
    getApi(endPoints.company.getById(params?.id), {
      setResponse: setData,
    });
  }, [params]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  useEffect(() => {
    getApi(
      endPoints.activeDTC.getAll({ truck: params?.id, page: currentPage }),
      {
        setResponse: setActiveDTC,
      }
    );
  }, [params, currentPage]);

  console.log(activeDTC);

  return (
    <>
      {editvehicledetail ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[600px] bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-xl font-semibold text-[#666666]">
                    Vehicle Details
                  </h3>

                  <span
                    onClick={() => setEditvehicledetail(false)}
                    className="cursor-pointer"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
                <hr />
                <div className="pl-10 pr-10">
                  <div className="mt-5 justify-center flex">
                    <div>
                      <label className="text-[#8E8F8F]">Vehicle Number *</label>
                      <br />
                      <input
                        placeholder="Vehicle Number"
                        className="placeholder: block w-[475px] mt-1  border-b py-1.5 pr-4 text-gray-900  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="mt-5 justify-center flex">
                    <div>
                      <label className="text-[#8E8F8F]">Vehicle Type *</label>
                      <br />
                      <input
                        placeholder="Vehicle Type"
                        className="placeholder: block w-[475px] mt-1  border-b py-1.5 pr-4 text-gray-900  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="mt-5 justify-center flex">
                    <div>
                      <label className="text-[#8E8F8F]">Vin Number*</label>
                      <br />
                      <input
                        placeholder="Vin Number"
                        className="placeholder: block w-[475px] mt-1  border-b py-1.5 pr-4 text-gray-900  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="mt-5 pl-5 pr-5 flex-col justify-center">
                    <div>
                      <label className="text-[#8E8F8F]">Vehicle Model</label>
                      <br />
                      <select className="w-full mt-5 border-b text-[#8E8F8F] ">
                        <option>Enter model name</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-5 pl-5 pr-5 flex-col justify-center">
                    <div>
                      <label className="text-[#8E8F8F]">Fuel Type</label>
                      <br />
                      <select className="w-full mt-5 border-b text-[#8E8F8F] ">
                        <option>Choose fuel type</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-5 pl-5 pr-5 flex-col justify-center">
                    <div>
                      <label className="text-[#8E8F8F]">
                        Fuel tank Capacity (in gallons)
                      </label>
                      <br />
                      <select className="w-full mt-5 border-b text-[#8E8F8F] ">
                        <option>Enter fuel capacity</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-center mt-10 gap-5 m-5">
                    <button
                      className="text-[#F56C89] w-[180px] h-[45px] bg-white border border-[#F56C89]"
                      onClick={() => setEditvehicledetail(false)}
                    >
                      Cancel
                    </button>
                    <button className="bg-[#34B7C1] w-[180px] h-[45px]  text-white flex justify-center items-center gap-2">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {Vehicleregistration ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[600px] bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-xl font-semibold text-[#666666]">
                    Vehicle Registration
                  </h3>

                  <span
                    onClick={() => setVehicleregistration(false)}
                    className="cursor-pointer"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
                <hr />
                <div className="pl-10 pr-10 ">
                  <div className="mt-5 justify-center flex">
                    <div>
                      <label className="text-[#8E8F8F]">
                        Registration Number
                      </label>
                      <br />
                      <input
                        placeholder="Registration Number"
                        className="placeholder: block w-[475px] mt-1  border-b py-1.5 pr-4 text-gray-900   placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="mt-5 justify-center flex">
                    <div>
                      <label className="text-[#8E8F8F]">Expiry Date</label>
                      <br />
                      <input
                        type="date"
                        className="placeholder: block w-[475px] mt-1  border-b py-1.5 pr-4 text-gray-900   placeholder:text-gray-400   sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="mt-5 justify-center flex">
                    <div>
                      <div className="flex items-center gap-2">
                        <img src={tickmark} alt="" />
                        <label className="text-[#8E8F8F]">
                          Received email alerts
                        </label>
                      </div>

                      <input
                        placeholder="Received email alerts"
                        className="placeholder: block w-[475px] mt-1  border-b py-1.5 pr-4 text-gray-900   placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col m-5">
                    <div className="text-[#8E8F8F]">Days in prior</div>
                    <div className="text-[#8E8F8F] font-semibold mt-2">
                      ( Registered Email: xyz@gmail.com)
                    </div>
                  </div>

                  <div className="flex justify-center mt-10 gap-5 m-5">
                    <button
                      className="text-[#F56C89] w-[180px] h-[45px] bg-white border border-[#F56C89]"
                      onClick={() => setVehicleregistration(false)}
                    >
                      Cancel
                    </button>
                    <button className="bg-[#34B7C1] w-[180px] h-[45px]  text-white flex justify-center items-center gap-2">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {editLiability ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[600px] bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-xl font-semibold text-[#666666]">
                    Liability Insurance
                  </h3>

                  <span
                    onClick={() => setEditvehicleliability(false)}
                    className="cursor-pointer"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
                <hr />
                <div className="pl-10 pr-10 ">
                  <div className="mt-5 justify-center flex">
                    <div>
                      <label className="text-[#8E8F8F]">Insurance Name</label>
                      <br />
                      <input
                        placeholder="Insurance Name"
                        className="placeholder: block w-[475px] mt-1  border-b py-1.5 pr-4 text-gray-900   placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="mt-5 justify-center flex">
                    <div>
                      <label className="text-[#8E8F8F]">Insurance Number</label>
                      <br />
                      <input
                        placeholder="Insurance Number"
                        className="placeholder: block w-[475px] mt-1  border-b py-1.5 pr-4 text-gray-900   placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="mt-5 justify-center flex">
                    <div>
                      <label className="text-[#8E8F8F]">
                        Insurance expiry Date
                      </label>
                      <br />
                      <input
                        type="date"
                        className="placeholder: block w-[475px] mt-1  border-b py-1.5 pr-4 text-gray-900   placeholder:text-gray-400   sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="mt-5 justify-center flex">
                    <div>
                      <div className="flex items-center gap-2">
                        <img src={tickmark} alt="" />
                        <label className="text-[#8E8F8F]">
                          Received email alerts
                        </label>
                      </div>

                      <input
                        placeholder="Received email alerts"
                        className="placeholder: block w-[475px] mt-1  border-b py-1.5 pr-4 text-gray-900   placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col m-5">
                    <div className="text-[#8E8F8F]">Days in prior</div>
                    <div className="text-[#8E8F8F] font-semibold mt-2">
                      ( Registered Email: xyz@gmail.com)
                    </div>
                  </div>

                  <div className="flex justify-center mt-10 gap-5 m-5">
                    <button
                      className="text-[#F56C89] w-[180px] h-[45px] bg-white border border-[#F56C89]"
                      onClick={() => setEditvehicleliability(false)}
                    >
                      Cancel
                    </button>
                    <button className="bg-[#34B7C1] w-[180px] h-[45px]  text-white flex justify-center items-center gap-2">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {cargoinsurance ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[600px] bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-xl font-semibold text-[#666666]">
                    Cargo Insurance
                  </h3>

                  <span
                    onClick={() => setCargoinsurance(false)}
                    className="cursor-pointer"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
                <hr />
                <div className="pl-10 pr-10 ">
                  <div className="mt-5 justify-center flex">
                    <div>
                      <label className="text-[#8E8F8F]">Insurance Name</label>
                      <br />
                      <input
                        placeholder="Insurance Name"
                        className="placeholder: block w-[475px] mt-1  border-b py-1.5 pr-4 text-gray-900   placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="mt-5 justify-center flex">
                    <div>
                      <label className="text-[#8E8F8F]">Insurance Number</label>
                      <br />
                      <input
                        placeholder="Insurance Number"
                        className="placeholder: block w-[475px] mt-1  border-b py-1.5 pr-4 text-gray-900   placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="mt-5 justify-center flex">
                    <div>
                      <label className="text-[#8E8F8F]">
                        Insurance expiry Date
                      </label>
                      <br />
                      <input
                        type="date"
                        className="placeholder: block w-[475px] mt-1  border-b py-1.5 pr-4 text-gray-900   placeholder:text-gray-400   sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="mt-5 justify-center flex">
                    <div>
                      <div className="flex items-center gap-2">
                        <img src={tickmark} alt="" />
                        <label className="text-[#8E8F8F]">
                          Received email alerts
                        </label>
                      </div>

                      <input
                        placeholder="Received email alerts"
                        className="placeholder: block w-[475px] mt-1  border-b py-1.5 pr-4 text-gray-900   placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col m-5">
                    <div className="text-[#8E8F8F]">Days in prior</div>
                    <div className="text-[#8E8F8F] font-semibold mt-2">
                      ( Registered Email: xyz@gmail.com)
                    </div>
                  </div>

                  <div className="flex justify-center mt-10 gap-5 m-5">
                    <button
                      className="text-[#F56C89] w-[180px] h-[45px] bg-white border border-[#F56C89]"
                      onClick={() => setCargoinsurance(false)}
                    >
                      Cancel
                    </button>
                    <button className="bg-[#34B7C1] w-[180px] h-[45px]  text-white flex justify-center items-center gap-2">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <div className="p-5">
        <div className="text-[28px]  font-semibold flex justify-start">
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("/Vehicles")}
          >
            Vehicles
          </span>
          <span className="pl-2 text-[#8E8F8F]">
            {">"} {data?.data?.vinNumber}
          </span>
        </div>
        <div className="mt-10 flex justify-between">
          <div className=" flex">
            <div
              className={`cursor-pointer ${
                selectedTab === "Overview"
                  ? "w-[208px] flex items-center justify-center  gap-2 underline-custom"
                  : "w-[208px] flex items-center justify-center   gap-2"
              }`}
              onClick={() => setselectedTab("Overview")}
            >
              Overview
              <img src={isymbol} alt=" " className="w-[15px] h-[15px]" />
            </div>
            <div
              className={`cursor-pointer ${
                selectedTab === "Active DTC Codes"
                  ? "w-[208px] flex items-center justify-center   gap-2 underline-custom"
                  : "w-[208px] flex items-center justify-center   gap-2"
              }`}
              onClick={() => setselectedTab("Active DTC Codes")}
            >
              Active DTC Codes (3)
            </div>
          </div>
          <div className="">
            <button className="bg-[#34B7C1] w-[173px]  rounded-lg text-white h-[45px]">
              + Add Truck
            </button>
          </div>
        </div>
        <hr className="mt-5" />
        {selectedTab && (
          <div>
            {selectedTab === "Overview" && (
              <>
                <div>
                  <div className="flex gap-4 flex-wrap mt-5">
                    <div className="bg-[#F0FAFB73]  w-[380px] h-[320px] box-shadow rounded-xl pl-5 pr-5 pt-8 pb-8">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-[28px]">
                          <img src={tickmark} alt="" />
                          Vehicle Details
                        </div>

                        <div>
                          <MdOutlineEdit
                            style={{ color: "#34B7C1" }}
                            className="cursor-pointer"
                            onClick={() => setEditvehicledetail(true)}
                          />
                        </div>
                      </div>
                      <div className="mt-5 flex flex-col gap-2">
                        <div className="flex gap-2">
                          <div className="text-[#666666] font-semibold">
                            Vehicle Number:
                          </div>
                          <div className="text-[#666666]">
                            {" "}
                            {data?.data?.vehicleNumber}{" "}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-[#666666] font-semibold">
                            Vehicle Type:
                          </div>
                          <div className="text-[#666666]">
                            {" "}
                            {data?.data?.vehicleType}{" "}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-[#666666] font-semibold">
                            VIN Number:
                          </div>
                          <div className="text-[#666666]">
                            {" "}
                            {data?.data?.vinNumber}{" "}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-[#666666] font-semibold">
                            Vehicle Model:
                          </div>
                          <div className="text-[#666666]">
                            {data?.data?.vehicleNumber}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-[#666666] font-semibold">
                            Fuel Type:
                          </div>
                          <div className="text-[#666666]">
                            {" "}
                            {data?.data?.fuelType}{" "}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-[#666666] font-semibold">
                            Fuel Tank Capacity:
                          </div>
                          <div className="text-[#666666]">---</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#F0FAFB73]  w-[380px] h-[320px]  box-shadow rounded-xl pl-5 pr-5 pt-8 pb-8">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-[28px]">
                          <img src={tickmark} alt="" />
                          Vehicle Registration
                        </div>

                        <div>
                          <MdOutlineEdit
                            style={{ color: "#34B7C1" }}
                            className="cursor-pointer"
                            onClick={() => setVehicleregistration(true)}
                          />
                        </div>
                      </div>
                      <div className="mt-5 flex flex-col gap-2">
                        <div className="flex gap-2">
                          <div className="text-[#666666] font-semibold">
                            Number:
                          </div>
                          <div className="text-[#666666]">
                            {" "}
                            {data?.data?.vehicleNumber}{" "}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-[#666666] font-semibold">
                            Expiry Date:
                          </div>
                          <div className="text-[#666666]">
                            {" "}
                            {dateFormatter(data?.data?.expireDate)}{" "}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-[#666666] font-semibold">
                            Receive Alert:
                          </div>
                          <div>
                            {" "}
                            <img src={tickmark} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#F0FAFB73]  w-[380px] h-[320px]  box-shadow rounded-xl pl-5 pr-5 pt-8 pb-8">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-[28px]">
                          <img src={tickmark} alt="" />
                          Liability Insurance
                        </div>

                        <div>
                          <MdOutlineEdit
                            style={{ color: "#34B7C1" }}
                            className="cursor-pointer"
                            onClick={() => setEditvehicleliability(true)}
                          />
                        </div>
                      </div>
                      <div className="mt-5 flex flex-col gap-2">
                        <div className="flex gap-2">
                          <div className="text-[#666666] font-semibold">
                            Name:
                          </div>
                          <div className="text-[#666666]">
                            {" "}
                            {data?.data?.liabilityInsuranceName}{" "}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-[#666666] font-semibold">
                            Number:
                          </div>
                          <div className="text-[#666666]">
                            {" "}
                            {data?.data?.liabilityInsuranceNumber}{" "}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-[#666666] font-semibold">
                            Expiry Date:
                          </div>
                          <div className="text-[#666666]">
                            {" "}
                            {dateFormatter(
                              data?.data?.liabilityInsuranceExpireDate
                            )}{" "}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-[#666666] font-semibold">
                            Receive Alert:
                          </div>
                          <div>
                            {" "}
                            <img src={tickmark} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#F0FAFB73]  w-[380px] h-[320px]  box-shadow rounded-xl pl-5 pr-5 pt-8 pb-8">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-[28px]">
                          <img src={tickmark} alt="" />
                          Cargo Insurance
                        </div>

                        <div>
                          <MdOutlineEdit
                            style={{ color: "#34B7C1" }}
                            className="cursor-pointer"
                            onClick={() => setCargoinsurance(true)}
                          />
                        </div>
                      </div>
                      <div className="mt-5 flex flex-col gap-2">
                        <div className="flex gap-2">
                          <div className="text-[#666666] font-semibold">
                            Name:
                          </div>
                          <div className="text-[#666666]">---</div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-[#666666] font-semibold">
                            Number:
                          </div>
                          <div className="text-[#666666]">---</div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-[#666666] font-semibold">
                            Expiry Date:
                          </div>
                          <div className="text-[#666666]">---</div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-[#666666] font-semibold">
                            Receive Alert:
                          </div>
                          <div>
                            {" "}
                            <img src={tickmark} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#F0FAFB73]  w-[780px] h-[320px]  box-shadow rounded-xl pl-5 pr-5 pt-8 pb-8">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-[28px]">
                          <img src={vehiclegallary} alt="" />
                          Vehicle Gallery
                        </div>

                        <div>
                          <MdOutlineEdit style={{ color: "#34B7C1" }} />
                        </div>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <div className="bg-[#34B7C133] w-[180px] h-[220px] rounded-lg relative">
                          <img
                            src={add}
                            alt=""
                            className="absolute bottom-0 right-0 p-2"
                          />
                        </div>
                        <div className="bg-[#34B7C133] w-[180px] h-[220px] rounded-lg relative">
                          <img
                            src={add}
                            alt=""
                            className="absolute bottom-0 right-0 p-2"
                          />
                        </div>
                        <div className="bg-[#34B7C133] w-[180px] h-[220px] rounded-lg relative">
                          <img
                            src={add}
                            alt=""
                            className="absolute bottom-0 right-0 p-2"
                          />
                        </div>
                        <div className="bg-[#34B7C133] w-[180px] h-[220px] rounded-lg relative">
                          <img
                            src={add}
                            alt=""
                            className="absolute bottom-0 right-0 p-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {selectedTab === "Active DTC Codes" && (
              <>
                <div className="mt-5">
                  <table class="border ">
                    <thead>
                      <tr className="bg-[#F0FAFB] h-[65px]  ">
                        <th className=" w-[350px]  ">
                          <div className="flex items-center justify-center gap-2">
                            Engine Light
                            <LuArrowUpDown />
                          </div>
                        </th>
                        <th className="w-[350px] ">Relay Switch</th>
                        <th>
                          <div className="flex w-[350px]  items-center justify-center gap-2">
                            VIN No
                            <LuArrowUpDown />
                          </div>
                        </th>

                        <th className="w-[350px] ">Logbook Mode</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeDTC?.data?.docs?.map((i) => (
                        <tr className="border-b h-[135px]">
                          <td>
                            {" "}
                            <div className="flex justify-center items-center gap-1">
                              <GoDotFill
                                style={{ color: "#1E87F0" }}
                                size={25}
                              />{" "}
                              ON
                            </div>
                          </td>
                          <td className="font-semibold">
                            SPN: 191, FMI: 9, OC: 1
                          </td>
                          <td className="font-semibold">
                            2022-02-22, 11:12 pm
                          </td>
                          <td className="font-semibold">
                            <div>
                              Transmission Output Shaft Speed.
                              <br />
                              <span className="text-[16px] font-thin">
                                Abnormal Update Rate.
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
           
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Vehicledetail;
