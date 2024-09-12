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
} from "../Components/Modals/Modals";
import { Dropdown } from "antd";
import { Loader, Pagination } from "../Components/HelpingComponent";

const Userroles = () => {
  const [adduser, setaddUser] = useState(false);
  const [resetpassword, setResetpassword] = useState(false);
  const [EditUser, setEditUser] = useState(false);
  const [selectedTab, setselectedTab] = useState("Users");
  const [users, setUsers] = useState({ data: {} });
  const [prevDetail, setPrevDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(() => {
    getApi(endPoints.user.getUsers({ limit: 10, page: currentPage }), {
      setResponse: setUsers,
      setLoading,
    });
  }, [currentPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Deactivate User  function
  const deativeUserHandler = (id) => {
    putApi(
      endPoints.user.deactivateUser(id),
      {},
      {
        successMsg: "Success !",
        setLoading,
        additionalFunctions: [fetchUsers],
      }
    );
  };

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
        <div className="text-[28px] font-semibold flex justify-start">
          User Roles
        </div>

        <div className="mt-10 flex justify-between">
          <div className="flex">
            <div
              className={`cursor-pointer ${
                selectedTab === "Users"
                  ? "w-[208px] flex items-center justify-center  gap-2 underline-custom"
                  : "w-[208px] flex items-center justify-center   gap-2"
              }`}
              onClick={() => setselectedTab("Users")}
            >
              Users ({users?.data?.totalDocs})
            </div>
            {/* <div
              className={`cursor-pointer ${
                selectedTab === "Roles"
                  ? "w-[208px] flex items-center justify-center   gap-2 underline-custom"
                  : "w-[208px] flex items-center justify-center   gap-2"
              }`}
              onClick={() => setselectedTab("Roles")}
            >
              Roles (1)
            </div> */}
          </div>
          <div className="flex gap-2">
            {/* <button className="border-[#F56C89] border w-[173px] flex justify-center items-center gap-2  rounded-lg text-[#F56C89] h-[45px]">
              <IoMdAdd style={{ color: "#F56C89" }} /> Deactivated Users
            </button> */}
            <button
              className="bg-[#34B7C1] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]"
              onClick={() => setaddUser(true)}
            >
              <IoMdAdd style={{ color: "white" }} /> Add User
            </button>
          </div>
        </div>
        <hr className="mt-5" />

        <Loader isLoading={loading} />

        {selectedTab && (
          <div>
            {selectedTab === "Users" && (
              <div className="mt-5">
                <table class="border w-full ">
                  <thead>
                    <tr className="bg-[#F0FAFB] h-[65px]">
                      <th className="w-[180px] flex items-center gap-2 justify-center h-[65px]">
                        Name <LuArrowUpDown />
                      </th>
                      <th className="w-[180px]">Email</th>
                      <th className="w-[240px] flex items-center gap-2 justify-center h-[65px]">
                        Roles <LuArrowUpDown />
                      </th>
                      <th className="w-[240px]">Terminals</th>
                      {/* <th className="w-[300px] flex items-center gap-2 justify-center h-[65px]">
                        Session Activity
                        <LuArrowUpDown /> <IoFilterSharp />
                      </th> */}
                      <th className="w-[180px]">Status</th>
                      <th className="w-[180px]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.data?.docs?.map((i, index) => (
                      <tr className="border-b h-[79px]" key={index}>
                        <td className=" pl-2 text-left"> {i?.fullName} </td>
                        <td> {i?.email} </td>
                        <td>
                          <div className="flex gap-2 items-center justify-center">
                            <div className="w-[162px] h-[34px] bg-[#32D29633] rounded-2xl text-[#18A88C] flex justify-center gap-1 items-center">
                              {i?.userType}
                            </div>
                          </div>
                        </td>
                        <td>
                          {i?.terminal && (
                            <div className="flex gap-2 items-center justify-center">
                              <div className="w-[188px] h-[34px] bg-[#32D29633] rounded-2xl text-[#18A88C] flex justify-center  items-center">
                                {i?.terminal}
                              </div>
                            </div>
                          )}
                        </td>
                        {/* <td className="">
                          <div className="flex items-center justify-center">
                            <div>
                              <GoDotFill style={{ color: "#A44C4C " }} />
                            </div>
                            <div className="flex flex-col items-start">
                              <span>Offline</span>
                              <span>Last logout at 17 Jul, 2023</span>
                            </div>
                          </div>
                        </td> */}
                        <td>
                          <div className="flex gap-2 items-center justify-center">
                            <div
                              className={`w-[188px] h-[34px] rounded-2xl  flex justify-center  items-center ${
                                i?.status === "inActive"
                                  ? "text-[#A02334]  bg-[#fadee2]"
                                  : "text-[#18A88C]  bg-[#32D29633]"
                              } `}
                            >
                              {i?.status}
                            </div>
                          </div>
                        </td>
                        <td>
                          <Dropdown
                            menu={{
                              items: [
                                {
                                  label: (
                                    <div
                                      className="text-[#8E8F8F] cursor-pointer"
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
                                      className="text-[#8E8F8F] text-left cursor-pointer"
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
                                      className="text-[#F56C89] text-left cursor-pointer"
                                      onClick={() => deativeUserHandler(i?._id)}
                                    >
                                      {i?.status === "inActive"
                                        ? "Activate User"
                                        : "Deactivate User"}
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
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Pagination
                  className={"mt-5"}
                  totalPages={users?.data?.totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
          </div>
        )}
      </div>{" "}
    </>
  );
};

export default Userroles;
