/** @format */

import React, { useEffect, useState, useCallback } from "react";
import isymbol from "../Assets/Logbook/isymbol.svg";
import { LuArrowUpDown } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { deleteApi, getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import {
  Pagination,
  SectionHeading,
  Tabs,
} from "../Components/HelpingComponent";
import { CreateTruck } from "../Components/Modals/Modals";
import TableLayout from "../Components/TableLayout/TableLayout";
import { CiCircleCheck } from "react-icons/ci";

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


  const removeHandler = (id) => {
    deleteApi(endPoints.vehicles.removeVehicle(id), {
      setLoading,
      additionalFunctions: [fetchHandler],
    });
  };

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

  // active table
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
    i?.status && (
      <div
        className="flex items-center gap-1"
        style={{ textTransform: "uppercase" }}
      >
        <GoDotFill style={{ color: "#1dbc60", fontSize: "20px" }} />
        Active
      </div>
    ),
    i?.relaySwitch?.length > 0 ? "Yes" : "----",
    i?.faultCode && <div className="danger-badge">{i?.faultCode} </div>,
    <div className="client-list">
      {i?.drivers?.map((item) => (
        <span key={i?._id}> {item?.fullName} </span>
      ))}
    </div>,
    <div className="client-list">
      {i?.location?.coordinates?.map((points, index) => (
        <span key={index}>
          {" "}
          {index + 1 === i?.location?.coordinates?.length
            ? points
            : `${points},`}{" "}
        </span>
      ))}
    </div>,
    i?.vehicleModel,
    <div>
      {i?.registrationNumber && (
        <div className="flex items-center  gap-1">
          <CiCircleCheck style={{ color: "#1dbc60", fontSize: "20px" }} />
          Registration
        </div>
      )}
      {i?.liabilityInsuranceIsEmail === true && (
        <div className="flex items-center  gap-1 mt-1">
          <CiCircleCheck style={{ color: "#1dbc60", fontSize: "20px" }} />
          Liability Insurance
        </div>
      )}
      {i?.cargoInsuranceIsEmail === true && (
        <div className="flex items-center  gap-1 mt-1">
          <CiCircleCheck style={{ color: "#1dbc60", fontSize: "20px" }} />
          Cargo Insurance
        </div>
      )}
    </div>,
    i?.createdAt?.slice(0, 10),
    <i
      className="fa-solid fa-trash-can"
      onClick={() => removeHandler(i?._id)}
    ></i>,
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
