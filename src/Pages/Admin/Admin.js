/** @format */

import React, { useEffect, useState } from "react";
import { Loader, SectionHeading } from "../../Components/HelpingComponents";
import { CreateAdmin } from "../../Components/Modals/Modals";
import TableLayout from "../../Components/TableLayout/TableLayout";
import { deleteApi, getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Dropdown } from "antd";

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [ prevData , setPrevData ] = useState({})

  const fetchHandler = () => {
    getApi(endPoints.admin.getAll, {
      setResponse: setData,
      setLoading,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const removeHandler = (id) => {
    deleteApi(endPoints.admin.remove(id), {
      successMsg: "Removed !",
      additionalFunctions: [fetchHandler],
    });
  };

  const thead = [
    "Sno",
    "Full Name",
    "Mobile Number",
    "Email",
    "Permissions",
    "",
  ];

  const tbody = data?.data?.docs?.map((i, index) => [
    `#${index + 1}`,
    i?.fullName,
    i?.mobileNumber,
    i?.email,
    i?.permissions?.map((item, index) =>
      index + 1 === i?.permissions?.length ? (
        <span key={`permission${index}`}> {item} </span>
      ) : (
        <span key={`permission${index}`}> {item},</span>
      )
    ),
    <Dropdown
      menu={{
        items: [
          {
            label: (
              <div
                className="text-[#F56C89] text-left cursor-pointer"
                onClick={() => removeHandler(i?._id)}
              >
                <i className="fa-solid fa-trash-can"></i> Delete
              </div>
            ),
            key: "0",
          },
          {
            label: (
              <div
                className="text-[blue] text-left cursor-pointer"
                onClick={() => {
                  setPrevData(i)
                  setIsEdit(true);
                  setOpen(true);
                }}
              >
                <i className="fa-solid fa-edit"></i> Edit
              </div>
            ),
            key: "0",
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
    <div className="p-5">
      <CreateAdmin
        show={open}
        handleClose={() => setOpen(false)}
        fetchApi={fetchHandler}
        isEdit={isEdit}
        prevData={prevData}
      />
      <div className="flex gap-2 driver-actions-btn justify-between">
        <SectionHeading title={"Sub-Admin"} />
        <button
          className="bg-[#34B7C1] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]"
          onClick={() => {
            setIsEdit(false);
            setOpen(true);
          }}
        >
          Create New
        </button>
      </div>
      <Loader isLoading={loading} />
      <TableLayout
        className="vehicle-table mt-5 mb-5"
        thead={thead}
        tbody={tbody}
      />
    </div>
  );
};

export default Admin;
