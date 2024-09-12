/** @format */
import React, { useEffect, useState, useCallback } from "react";
import { GoDotFill } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { deleteApi, getApi, putApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import {
  Loader,
  Pagination,
  SectionHeading,
  Tabs,
} from "../";
import { CreateTruck } from "../Components/Modal/Modal";
import TableLayout from "../Components/TableLayout";
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
  const companyId = localStorage.getItem("companyId");


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

  const DeativatedThead = [
    <div className="text-left">Vehicle No. | Serial No.</div>,
    "Vehicle Type",
    <div className="text-left">Status</div>,
    "Mode",
    "Add Date (CDT)",
    "Delete Date (CDT)",
    "Actions",
  ];

  const DeactivatedTBody = deactiveData?.data?.docs?.map((i) => [
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
        className="flex items-center  gap-1"
        style={{ textTransform: "uppercase" }}
      >
        <GoDotFill style={{ color: "#1dbc60", fontSize: "20px" }} />
        In-Active
      </div>
    ),
    i?.vehicleModel,
    i?.createdAt?.slice(0, 10),
    i?.updatedAt?.slice(0, 10),
    <button className="activate-btn" onClick={() => activeStatus(i?._id)}>
      Activate
    </button>,
  ]);

  const tabsOptions = [
    {
      value: "Active",
      label: `Active (${data?.data?.totalDocs})`,
    },
    {
      value: "Deativated",
      label: `Deativated (${deactiveData?.data?.totalDocs})`,
    },
  ];

  const ExtraComponent = () => {
    return (
      <>
        <div className="driver-actions-btn flex sm-padding gap-1">
          {ids.length > 0 && (
            <button
              className="bg-[#fff] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]"
              style={{
                color: "#eb5757",
                border: "1px solid #eb5757",
                fontWeight: 900,
              }}
              onClick={() => deactiveVehicle()}
            >
              <i className="fa-solid fa-trash-can"></i>Deactivate
            </button>
          )}

          <button
            className="bg-[#34B7C1] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]"
            onClick={() => setOpen(true)}
          >
            <IoMdAdd style={{ color: "white" }} /> Add Truck
          </button>
        </div>
      </>
    );
  };


  const fetchHandler = useCallback(() => {
    getApi(endPoints.vehicles.getActiveVehicle({ page: currentPage }), {
      setResponse: setData,
    });
  }, [currentPage]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);


  const fetchDeactiveData = useCallback(() => {
    getApi(endPoints.vehicles.deactiveVehicles({ page: currentPage }), {
      setResponse: setDeactiveData,
    });
  }, [currentPage]);

  useEffect(() => {
    fetchDeactiveData();
  }, [fetchDeactiveData]);


  const deactiveVehicle = () => {
    const payload = {
      ids,
    };
    putApi(endPoints.vehicles.updateStatus, payload, {
      successMsg: "Updated",
      additionalFunctions: [fetchHandler, fetchDeactiveData],
    });
  };

  const activeStatus = (id) => {
    const payload = {
      ids: [id],
    };
    putApi(endPoints.vehicles.updateStatus, payload, {
      successMsg: "Activated",
      additionalFunctions: [fetchHandler, fetchDeactiveData],
      setLoading
    });
  };


  const removeHandler = (id) => {
    deleteApi(endPoints.vehicles.removeVehicle(id), {
      setLoading,
      additionalFunctions: [fetchHandler],
    });
  };

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
          isBtn={true}
          btnLabel={"Add Truck"}
          onClickEvent={() => setOpen(true)}
          ExtraComponent={ExtraComponent}
        />

        <Loader isLoading={loading} />

        {selectedTab === "Active" && (
          <>
            <div className="mt-5">
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
        )}

        {selectedTab === "Deativated" && (
          <div className="mt-5">
            <TableLayout
              thead={DeativatedThead}
              className="vehicle-table mt-5 mb-5"
              tbody={DeactivatedTBody}
            />
            <Pagination
              className={"mt-5"}
              totalPages={deactiveData?.data?.totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Vehicles;
