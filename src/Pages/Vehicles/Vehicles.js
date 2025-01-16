/** @format */
import React, { useEffect, useState, useCallback } from "react";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { deleteApi, getApi, putApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import {
  Pagination,
  Loader,
  SectionHeading,
  Tabs,
} from "../../Components/HelpingComponents";
import { CreateTruck } from "../../Components/Modals/Modals";
import TableLayout from "../../Components/TableLayout/TableLayout";
import { CiCircleCheck } from "react-icons/ci";
import { returnFullName, formatDateInEST } from "../../utils/utils";

const CheckDeviceConnection = (status) => {
  if (status === "Connected") {
    return (
      <div className="logbook-device-connect connected">
        <span className="color-dot" />
        Connected
      </div>
    );
  } else if (status === "Disconnected") {
    return (
      <div className="logbook-device-connect disconnected">
        <span className="color-dot" />
        Disconnected
      </div>
    );
  } else {
    return (
      <div className="logbook-device-connect">
        <span className="color-dot" />
        {status}
      </div>
    );
  }
};

const Vehicles = () => {
  const companyId = localStorage.getItem("companyId");
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
  const deactiveIds = deactiveData?.data?.docs?.map((i) => i?._id);
  const [status, setStatus] = useState(null);

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
      if (selectedTab === "Deativated") {
        setIds(deactiveIds);
      } else {
        setIds(allIds);
      }
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
    "Current Location (EST)",
    "Mode",
    "Documents",
    "Add Date (EST)",
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
      <p> {i?.serialNumber} </p>
    </div>,
    i?.vehicleType,
    CheckDeviceConnection(i?.isDeviceConnected),
    i?.relaySwitch?.length > 0 ? "Yes" : "----",
    i?.faultCode && <div className="danger-badge">{i?.faultCode} </div>,
    <div className="client-list">
      {i?.drivers?.map((item, index) => (
        <span key={i?._id} style={{ textTransform: "capitalize" }}>
          {returnFullName(item)} {i?.drivers?.length !== index + 1 && ", "}
        </span>
      ))}
    </div>,
    <div className="client-list">
      <span> {i?.locationInWord} </span>
      <span> {i?.locationUpdate && formatDateInEST(i?.locationUpdate)} </span>
    </div>,
    i?.mode,
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
    i?.createdAt && formatDateInEST(i?.createdAt),
    <i
      className="fa-solid fa-trash-can"
      onClick={() => removeHandler(i?._id)}
    ></i>,
  ]);

  const DeativatedThead = [
    <input type="checkbox" onChange={() => pushAll()} />,
    <div className="text-left">Vehicle No. | Serial No.</div>,
    "Vehicle Type",
    <div className="text-left">Status</div>,
    "Mode",
    "Add Date (EST)",
    "Delete Date (EST)",
    "Actions",
  ];

  useEffect(() => {
    setStatus(selectedTab === "Deativated");
    setIds([]);
  }, [selectedTab]);

  const DeactivatedTBody = deactiveData?.data?.docs?.map((i) => [
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
      <p>{i?.serialNumber} </p>
    </div>,
    i?.vehicleType,
    CheckDeviceConnection(i?.isDeviceConnected),
    i?.mode,
    i?.createdAt && formatDateInEST(i?.createdAt),
    i?.deletedDate && formatDateInEST(i?.deletedDate),
    <button className="activate-btn" onClick={() => activeStatus(i?._id)}>
      Activate
    </button>,
  ]);

  const tabsOptions = [
    {
      value: "Active",
      label: `Active (${data?.data?.totalDocs || 0})`,
    },
    {
      value: "Deativated",
      label: `Deativated (${deactiveData?.data?.totalDocs || 0})`,
    },
  ];

  const ExtraComponent = () => {
    return (
      <>
        <div className="driver-actions-btn flex sm-padding gap-1">
          {status === false && ids?.length > 0 && (
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
          {status === true && ids?.length > 0 && (
            <button
              className="bg-[#86E3CE] w-[173px] flex justify-center items-center gap-2 rounded-lg text-black font-bold h-[45px]"
              onClick={() => activateVehicles()}
            >
              <i className="fa-solid fa-check"></i>Activate
            </button>
          )}
          <button
            className="bg-[#86E3CE] w-[173px] flex justify-center items-center gap-2  rounded-lg text-black font-bold h-[45px]"
            onClick={() => setOpen(true)}
          >
            <IoMdAdd color="#000" /> Add Truck
          </button>
        </div>
      </>
    );
  };

  const fetchHandler = useCallback(() => {
    getApi(endPoints.vehicles.getActiveVehicle({ page: currentPage }), {
      setResponse: setData,
      showErr: false,
    });
  }, [currentPage]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const fetchDeactiveData = useCallback(() => {
    getApi(endPoints.vehicles.deactiveVehicles({ page: currentPage }), {
      setResponse: setDeactiveData,
      showErr: false,
    });
  }, [currentPage]);

  useEffect(() => {
    fetchDeactiveData();
  }, [fetchDeactiveData]);

  const deactiveVehicle = () => {
    const payload = {
      ids,
      company: companyId,
    };
    putApi(endPoints.vehicles.updateStatus, payload, {
      successMsg: "Updated",
      additionalFunctions: [fetchHandler, fetchDeactiveData],
    });
  };

  const activateVehicles = () => {
    const payload = {
      ids,
      company: companyId,
    };
    putApi(endPoints.vehicles.updateStatus, payload, {
      successMsg: "Activated",
      additionalFunctions: [fetchHandler, fetchDeactiveData],
    });
  };

  const activeStatus = (id) => {
    const payload = {
      ids: [id],
      company: companyId,
    };
    putApi(endPoints.vehicles.updateStatus, payload, {
      successMsg: "Activated",
      additionalFunctions: [fetchHandler, fetchDeactiveData],
      setLoading,
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
                hasNextPage={data?.data?.hasNextPage}
                hasPrevPage={data?.data?.hasPrevPage}
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
              hasNextPage={deactiveData?.data?.hasNextPage}
              hasPrevPage={deactiveData?.data?.hasPrevPage}
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
