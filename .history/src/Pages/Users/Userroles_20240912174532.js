/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { LuArrowUpDown } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { getApi, putApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import {
  CreateNewUser,
  EditUserDetails,
  ResetUserPassword,
} from "../Components/Modal/Modal.js";
import { Dropdown } from "antd";
import {
  Loader,
  Pagination,
  SectionHeading,
  Tabs,
} from "../Components/HelpingComponents";
import TableLayout from "../Components/TableLayout";
import { returnFullName } from "../utils/utils";

const Userroles = () => {
  const [adduser, setaddUser] = useState(false);
  const [resetpassword, setResetpassword] = useState(false);
  const [EditUser, setEditUser] = useState(false);
  const [selectedTab, setselectedTab] = useState("Active");
  const [users, setUsers] = useState({ data: {} });
  const [prevDetail, setPrevDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deactiveUser, setDeactiveUser] = useState({});

  const fetchUsers = useCallback(() => {
    getApi(endPoints.users.getUser({ page: currentPage }), {
      setResponse: setUsers,
      setLoading,
    });
  }, [currentPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const fetchDeavtivatedUser = useCallback(() => {
    getApi(endPoints.users.getDeactivatedUser({ page: currentPage }), {
      setResponse: setDeactiveUser,
      setLoading,
    });
  }, [currentPage]);

  useEffect(() => {
    fetchDeavtivatedUser();
  }, [fetchDeavtivatedUser]);

  const fetchAll = () => {
    fetchUsers();
    fetchDeavtivatedUser();
  };

  const deativeUserHandler = (id) => {
    putApi(
      endPoints.users.updateUserStatus(id),
      {},
      {
        successMsg: "Success !",
        setLoading,
        additionalFunctions: [fetchAll],
      }
    );
  };

  const tabsOptions = [
    {
      value: "Active",
      label: `Active (${users?.data?.totalDocs})`,
    },
    {
      value: "Deactivated",
      label: `Deactivated (${deactiveUser?.data?.totalDocs})`,
    },
  ];

  const ExtraComponent = () => {
    return (
      <div className="flex driver-actions-btn">
        <button
          className="bg-[#34B7C1] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]"
          onClick={() => setaddUser(true)}
        >
          <IoMdAdd style={{ color: "white" }} /> Add User
        </button>
      </div>
    );
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab]);

  const activeTableBody = users?.data?.docs?.map((i) => [
    returnFullName(i),
    i?.email,
    i?.userType && (
      <div className="light-green-highlight-text">{i?.userType}</div>
    ),
    i?.terminal && (
      <div className="light-green-highlight-text">{i?.terminal?.name}</div>
    ),
    <Dropdown
      menu={{
        items: [
          {
            label: (
              <div
                className="text-[#8E8F8F] cursor-pointer font-bold"
                onClick={() => {
                  setPrevDetails(i);
                  setEditUser(true);
                }}
              >
                Edit
              </div>
            ),
            key: "0",
          },
          {
            label: (
              <div
                className="text-[#8E8F8F] text-left cursor-pointer font-bold"
                onClick={() => {
                  setPrevDetails(i);
                  setResetpassword(true);
                }}
              >
                Reset Password
              </div>
            ),
            key: "1",
          },
          {
            label: (
              <div
                className="text-[#F56C89] text-left cursor-pointer font-bold"
                onClick={() => deativeUserHandler(i?._id)}
              >
                {i?.status === "inActive" ? "Activate User" : "Deactivate User"}
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

  const deactiveTableBody = deactiveUser?.data?.docs?.map((i) => [
    returnFullName(i),
    i?.email,
    i?.userType && (
      <div className="light-green-highlight-text">{i?.userType}</div>
    ),
    i?.terminal && (
      <div className="light-green-highlight-text">{i?.terminal?.name}</div>
    ),
    <button className="activate-btn" onClick={() => deativeUserHandler(i?._id)}>
      Activate
    </button>,
  ]);

  const activeTableHead = [
    <div className="flex justify-center items-center gap-2">
      Name <LuArrowUpDown />
    </div>,
    "Email",
    <div className="flex justify-center items-center gap-2">
      Roles <LuArrowUpDown />
    </div>,
    <div className="flex justify-center items-center gap-2">
      Terminals <LuArrowUpDown />
    </div>,

    "Actions",
  ];

  return (
    <>
      <CreateNewUser
        handleClose={() => setaddUser(false)}
        show={adduser}
        fetchApi={fetchUsers}
      />
      <ResetUserPassword
        open={resetpassword}
        handleCancel={() => setResetpassword(false)}
        userId={prevDetail?._id}
        fetchApi={fetchUsers}
      />
      <EditUserDetails
        show={EditUser}
        handleClose={() => setEditUser(false)}
        userId={prevDetail?._id}
        fetchApi={fetchUsers}
        prevData={prevDetail}
      />
      <div className="p-5">
        <SectionHeading title={"User Roles"} />
        <Tabs
          setTab={setselectedTab}
          tab={selectedTab}
          option={tabsOptions}
          isBtn={true}
          ExtraComponent={ExtraComponent}
        />
        <Loader isLoading={loading} />

        {selectedTab === "Active" ? (
          <TableLayout
            thead={activeTableHead}
            className="vehicle-table mt-5 mb-5"
            tbody={activeTableBody}
          />
        ) : (
          <TableLayout
            thead={activeTableHead}
            className="vehicle-table mt-5 mb-5"
            tbody={deactiveTableBody}
          />
        )}

        {selectedTab === "Active" ? (
          <Pagination
            totalPages={users?.data?.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          <Pagination
            totalPages={deactiveUser?.data?.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>{" "}
    </>
  );
};

export default Userroles;
