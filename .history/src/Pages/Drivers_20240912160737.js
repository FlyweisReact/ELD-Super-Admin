/** @format */

import React, { useEffect, useState, useCallback } from "react";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { getApi, deleteApi, putApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { Dropdown } from "antd";
import {
  Loader,
  Pagination,
  SectionHeading,
  Tabs,
} from "../c";
import {
  CreateDriver,
  EditDriver,
  UnAssignDriver,
} from "../Components/Modal/Modal";
import TableLayout from "../Components/TableLayout";
import { returnFullName } from "../utils/utils";
import { Link } from "react-router-dom";

const Drivers = () => {
  const [Editdriver, setEditdriver] = useState(false);
  const [selectedTab, setselectedTab] = useState("Active");
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletedDriver, setDeletedDriver] = useState({});
  const [unassignModal, setUnassignModal] = useState(false);
  const [ids, setIds] = useState([]);
  const [allPushed, setAllPushed] = useState(false);
  const [inactiveDrivers, setInactiveDrivers] = useState({});
  const [driverData, setDriverData] = useState({});
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

  const fetchDeleteDrivers = useCallback(() => {
    getApi(endPoints.drivers.allDeletedDriver({ page: currentPage }), {
      setResponse: setDeletedDriver,
    });
  }, [currentPage]);

  const fetchHandler = useCallback(() => {
    getApi(endPoints.drivers.getAllDrivers({ page: currentPage }), {
      setResponse: setData,
    });
  }, [currentPage]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const fetchInactiveDrivers = useCallback(() => {
    getApi(endPoints.drivers.allInactiveDriver({ page: currentPage }), {
      setResponse: setInactiveDrivers,
    });
  }, [currentPage]);

  useEffect(() => {
    fetchInactiveDrivers();
  }, [fetchInactiveDrivers]);

  useEffect(() => {
    fetchDeleteDrivers();
  }, []);

  const fetchAll = () => {
    fetchDeleteDrivers();
    fetchInactiveDrivers();
    fetchHandler();
  };

  const deactivateDriver = () => {
    const payload = {
      ids,
    };
    putApi(endPoints.drivers.updateDriverStatus, payload, {
      successMsg: "Updated",
      additionalFunctions: [fetchAll, () => setIds([])],
      setLoading,
    });
  };

  const activateDriver = (id) => {
    const payload = {
      ids: [id],
    };
    putApi(endPoints.drivers.updateDriverStatus, payload, {
      successMsg: "Driver activated",
      additionalFunctions: [fetchAll],
      setLoading,
    });
  };

  const deleteHandler = (id) => {
    deleteApi(endPoints.drivers.removeDriver(id), {
      setLoading,
      additionalFunctions: [fetchAll],
    });
  };

  const tabsOptions = [
    {
      value: "Active",
      label: `Active (${data?.data?.totalDocs})`,
    },
    {
      value: "Inactive",
      label: `Inactive (${inactiveDrivers?.data?.totalDocs}) `,
    },
    {
      value: "Deleted",
      label: `Deleted (${deletedDriver?.data?.totalDocs})`,
    },
  ];

  const ExtraComponent = () => {
    return (
      <div className="flex gap-2 driver-actions-btn">
        {ids.length > 0 && (
          <button
            className="bg-[#fff] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]"
            style={{
              color: "#eb5757",
              border: "1px solid #eb5757",
              fontWeight: 900,
            }}
            onClick={() => deactivateDriver()}
          >
            <i className="fa-solid fa-trash-can"></i> Deactivate
          </button>
        )}

        <button
          className="bg-[#34B7C1] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]"
          onClick={() => setOpen(true)}
        >
          <IoMdAdd style={{ color: "white" }} /> Add Driver
        </button>
      </div>
    );
  };

  const activeTableHead = [
    <input type="checkbox" onChange={() => pushAll()} />,
    "Name",
    "Start Date",
    "Cellphone",
    "Unit No",
    "Timezone",
    "License",
    "Mode",
    "Cycle",
    "Restart",
    "Break",
    "Action",
  ];

  const activeTableBody = data?.data?.docs?.map((i) => [
    <input
      type="checkbox"
      className="checkbox"
      onChange={() => pushInArr(i._id)}
      checked={checkIfAlreadyPresent(i._id)}
    />,
    returnFullName(i),
    i?.createdAt?.slice(0, 10),
    i?.mobileNumber,
    i?.truck && (
      <div
        className="flex gap-1 items-center justify-center"
        onClick={() => {
          setDriverData(i);
          setUnassignModal(true);
        }}
      >
        {i?.unitNumber}
        <i className="fa-solid fa-pen"></i>
      </div>
    ),
    i?.timeZone,
    i?.license,
    "",
    i?.cycle,
    i?.reStart,
    i?.break,
    <Dropdown
      menu={{
        items: [
          {
            label: (
              <div
                className="text-[#8E8F8F] cursor-pointer"
                onClick={() => {
                  setDriverData(i);
                  setEditdriver(true);
                }}
              >
                <i className="fa-solid fa-pen-to-square"></i> Edit
              </div>
            ),
            key: "0",
          },

          {
            label: (
              <div
                className="text-[#F56C89] text-left cursor-pointer"
                onClick={() => deleteHandler(i._id)}
              >
                <i className="fa-solid fa-trash-can"></i> Delete
              </div>
            ),
            key: "2",
          },
        ],
      }}
      trigger={["click"]}
    >
      <div className="flex justify-center z-20 relative cursor-pointer">
        <HiOutlineDotsVertical />
      </div>
    </Dropdown>,
  ]);

  const deletedTableBody = deletedDriver?.data?.docs?.map((i) => [
    returnFullName(i),
    <Link to={`/Logbook/${i?._id}`}>View Logbook</Link>,
    i?.createdAt?.slice(0, 10),
    i?.deleteDate?.slice(0, 10),
    i?.license,
    "",
    i?.mobileNumber,
    i?.email,
    i?.cycle,
    i?.timeZone,
    i?.reStart,
    i?.break,
  ]);

  const deletedTableHead = [
    "Name",
    "Action",
    "Start Date",
    "Last Date",
    "License",
    "Mode",
    "Phone Number",
    "Email",
    "Cycle Type",
    "Timezone",
    "Restart Hours",
    "Break",
  ];

  const InactiveTableHead = [
    "Name",
    "Start Date",
    "Cellphone",
    "Unit No",
    "Timezone",
    "License",
    "Mode",
    "Cycle",
    "Restart",
    "Break",
    "Action",
  ];

  const InactiveTableBody = inactiveDrivers?.data?.docs?.map((i) => [
    returnFullName(i),
    i?.createdAt?.slice(0, 10),
    i?.mobileNumber,
    i?.truck && (
      <div
        className="flex gap-1 items-center justify-center"
        onClick={() => {
          setDriverData(i);
          setUnassignModal(true);
        }}
      >
        {i?.unitNumber}
        <i className="fa-solid fa-pen"></i>
      </div>
    ),
    i?.timeZone,
    i?.license ? i?.license : "---",
    "---",
    i?.cycle,
    i?.reStart,
    i?.break,
    <Dropdown
      menu={{
        items: [
          {
            label: (
              <div
                className="text-[#F56C89] text-left cursor-pointer"
                onClick={() => deleteHandler(i._id)}
              >
                <i className="fa-solid fa-trash-can"></i> Delete
              </div>
            ),
            key: "2",
          },
          {
            label: (
              <div
                className="text-[#2787db] text-left cursor-pointer"
                onClick={() => activateDriver(i._id)}
              >
                <i className="fa-solid fa-user-pen"></i> Activate
              </div>
            ),
            key: "3",
          },
        ],
      }}
      trigger={["click"]}
    >
      <div className="flex justify-center z-20 relative cursor-pointer">
        <HiOutlineDotsVertical />
      </div>
    </Dropdown>,
  ]);
  return (
    <>
      <CreateDriver
        show={open}
        handleClose={() => setOpen(false)}
        fetchApi={fetchAll}
      />
      <EditDriver
        show={Editdriver}
        handleClose={() => setEditdriver(false)}
        data={driverData}
        fetchApi={fetchAll}
      />
      <UnAssignDriver
        show={unassignModal}
        handleClose={() => setUnassignModal(false)}
        data={driverData}
        fetchApi={fetchAll}
      />

      <div className="p-5">
        <SectionHeading title={"Drivers"} />

        <Tabs
          setTab={setselectedTab}
          tab={selectedTab}
          option={tabsOptions}
          ExtraComponent={ExtraComponent}
        />

        <Loader isLoading={loading} />

        {selectedTab === "Active" && (
          <div className="mt-5">
            <TableLayout
              thead={activeTableHead}
              className="vehicle-table mt-5 mb-5"
              tbody={activeTableBody}
            />
            <Pagination
              className={"mt-5"}
              totalPages={data?.data?.totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}

        {selectedTab === "Inactive" && (
          <div className="mt-5">
            <TableLayout
              thead={InactiveTableHead}
              className="vehicle-table mt-5 mb-5"
              tbody={InactiveTableBody}
            />
          </div>
        )}

        {selectedTab === "Deleted" && (
          <div className="mt-5">
            <TableLayout
              thead={deletedTableHead}
              className="vehicle-table mt-5 mb-5"
              tbody={deletedTableBody}
            />
            <Pagination
              className={"mt-5"}
              totalPages={deletedDriver?.data?.totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Drivers;
