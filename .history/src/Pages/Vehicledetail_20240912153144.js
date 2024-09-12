/** @format */

import React, { useState, useCallback, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import tickmark from "../Assets/Vechicledetail/tickmark.svg";
import { MdOutlineEdit } from "react-icons/md";
import vehiclegallary from "../Assets/Vechicledetail/vihiclegallary.svg";
import add from "../Assets/Vechicledetail/add.svg";
import { useNavigate, useParams } from "react-router-dom";
import { getApi, putApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { dateFormatter } from "../utils/utils";
import { Pagination, Tabs } from "";
import {
  EditCargoInsurance,
  EditTruckLiability,
  EditVehicleDetails,
  EditVehicleRegestration,
} from "../Components/Modal/Modal.js";
import TableLayout from "../Components/TableLayout";

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
    getApi(endPoints.vehicles.getVehicleDetail(params?.id), {
      setResponse: setData,
    });
  }, [params]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  useEffect(() => {
    getApi(
      endPoints.vehicles.getActiveDtc({ truck: params?.id, page: currentPage }),
      {
        setResponse: setActiveDTC,
      }
    );
  }, [params, currentPage]);

  const uploadImage = (file) => {
    const fd = new FormData();
    fd.append("image", file);

    putApi(endPoints.vehicles.updateVehicleImage(params?.id), fd, {
      additionalFunctions: [fetchHandler],
    });
  };

  const fileHandler = () => {
    const target = document.getElementById("file");
    target.click();
  };

  const thead = [
    "Engine Light",
    "Fault Code",
    "First Detection",
    "Description",
  ];

  const tbody = activeDTC?.data?.docs?.map((i) => [
    <div className="flex justify-center items-center gap-1">
      <GoDotFill style={{ color: "#1E87F0" }} size={25} /> {i?.engineLight}
    </div>,
    <div>
      SPN: {i?.spn} , FMI: {i?.fmi}, OC: {i?.oc}
    </div>,
    dateFormatter(i?.createdAt),
    i?.logBookMode,
  ]);

  const options = [
    {
      value: "Overview",
      label: "Overview",
    },
    {
      value: "Active DTC Codes",
      label: "Active DTC Codes",
    },
  ];

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

        <Tabs setTab={setselectedTab} tab={selectedTab} option={options} />
        <hr className="mt-5" />

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
                      <div className="text-[#666666] font-semibold">Name:</div>
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
                        } days <img src={tickmark} alt="" />
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
                      <div className="text-[#666666] font-semibold">Name:</div>
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
                    <input
                      type="file"
                      id="file"
                      style={{ display: "none" }}
                      onChange={(e) => uploadImage(e.target.files[0])}
                    />
                    <div
                      className="bg-[#34B7C133] w-[180px] h-[220px] rounded-lg relative cursor-pointer"
                      onClick={() => fileHandler()}
                    >
                      <img
                        src={add}
                        alt=""
                        className="absolute bottom-0 right-0 p-2"
                      />
                    </div>
                    <div
                      className="bg-[#34B7C133] w-[180px] h-[220px] rounded-lg relative cursor-pointer"
                      onClick={() => fileHandler()}
                    >
                      <img
                        src={add}
                        alt=""
                        className="absolute bottom-0 right-0 p-2"
                      />
                    </div>
                    <div
                      className="bg-[#34B7C133] w-[180px] h-[220px] rounded-lg relative cursor-pointer"
                      onClick={() => fileHandler()}
                    >
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
            <div>
              <TableLayout
                thead={thead}
                className="vehicle-table mt-5 mb-5"
                tbody={tbody}
              />

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
    </>
  );
};

export default Vehicledetail;