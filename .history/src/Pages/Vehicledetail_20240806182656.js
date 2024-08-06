/** @format */

import React, { useState, useCallback, useEffect } from "react";
import isymbol from "../Assets/Logbook/isymbol.svg";
import { LuArrowUpDown } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import tickmark from "../Assets/Vechicledetail/tickmark.svg";
import { MdOutlineEdit } from "react-icons/md";
import vehiclegallary from "../Assets/Vechicledetail/vihiclegallary.svg";
import add from "../Assets/Vechicledetail/add.svg";
import { useNavigate, useParams } from "react-router-dom";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { dateFormatter } from "../utils";
import { Pagination } from "../Components/HelpingComponent";
import {
  EditCargoInsurance,
  EditTruckLiability,
  EditVehicleDetails,
  EditVehicleRegestration,
} from "../Components/Modals/Modals";

const Vehicledetail = () => {
  const params = useParams();
  const navigate = useNavigate("");
  const [selectedTab, setselectedTab] = useState("Overview");
  const [Vehicleregistration, setVehicleregistration] = useState(false);
  const [editLiability, setEditvehicleliability] = useState(false);
  const [cargoinsurance, setCargoinsurance] = useState(false);
  const [data, setData] = useState({});
  const [activeDTC, setActiveDTC] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);

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

  console.log(data);

  return (
    <>
      <EditVehicleDetails
        show={open}
        handleClose={() => setOpen(false)}
        fetchApi={fetchHandler}
        prevData={data?.data}
      />
      <EditVehicleRegestration
        show={Vehicleregistration}
        handleClose={() => setVehicleregistration(false)}
        fetchApi={fetchHandler}
        prevData={data?.data}
      />
      <EditTruckLiability
        show={editLiability}
        handleClose={() => setEditvehicleliability(false)}
        fetchApi={fetchHandler}
        prevData={data?.data}
      />
      <EditCargoInsurance
        show={cargoinsurance}
        handleClose={() => setCargoinsurance(false)}
        fetchApi={fetchHandler}
        prevData={data?.data}
      />

      <div className="p-5">
        <div className="text-[28px]  font-semibold flex justify-start">
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("/Vehicles")}
          >
            Vehicles
          </span>
          <span className="pl-2 text-[#8E8F8F]">
            {">"} {data?.data?.vehicleNumber}
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
              Active DTC Codes ({activeDTC?.data?.totalDocs})
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
                            onClick={() => setOpen(true)}
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
                            {data?.data?.vehicleModel}
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
                          <div className="text-[#666666]">
                            {" "}
                            {data?.data?.fuelTank}{" "}
                          </div>
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
                            {data?.data?.registrationNumber}{" "}
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
                          <div className="flex gap-2 items-center text-[#666666]">
                            {" "}
                            {data?.data?.emailAlertDaysPrior} days{" "}
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
                          <div className="flex gap-2 items-center text-[#666666]">
                            {" "}
                            {
                              data?.data?.liabilityInsuranceEmailAlertDaysPrior
                            }{" "}
                            days <img src={tickmark} alt="" />
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
                          <div className="text-[#666666]">
                            {" "}
                            {data?.data?.cargoInsuranceName}{" "}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-[#666666] font-semibold">
                            Number:
                          </div>
                          <div className="text-[#666666]">
                            {" "}
                            {data?.data?.cargoInsuranceNumber}{" "}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-[#666666] font-semibold">
                            Expiry Date:
                          </div>
                          <div className="text-[#666666]">
                            {" "}
                            {dateFormatter(
                              data?.data?.cargoInsuranceExpireDate
                            )}{" "}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="text-[#666666] font-semibold">
                            Receive Alert:
                          </div>
                          <div className="flex gap-2 items-center text-[#666666]">
                            {data?.data?.cargoInsuranceEmailAlertDaysPrior} days
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
                      {activeDTC?.data?.docs?.map((i, index) => (
                        <tr className="border-b h-[135px]" key={index}>
                          <td>
                            {" "}
                            <div className="flex justify-center items-center gap-1">
                              <GoDotFill
                                style={{ color: "#1E87F0" }}
                                size={25}
                              />{" "}
                              {i?.engineLight}
                            </div>
                          </td>
                          <td className="font-semibold">
                            SPN: {i?.spn} , FMI: {i?.fmi}, OC: {i?.oc}
                          </td>
                          <td className="font-semibold text-center">
                            {dateFormatter(i?.createdAt)}
                          </td>
                          <td className="font-semibold">{i?.logBookMode}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <Pagination
                    className={"mt-5"}
                    totalPages={activeDTC?.data?.totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
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
