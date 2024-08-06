/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { LuArrowUpDown } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { Pagination } from "../Components/HelpingComponent";
import { CreateDriver } from "../Components/Modals/Modals";

const Drivers = () => {
  const [editseletedtab, seteditselectedteb] = useState("Basic");
  const [Editdriver, setEditdriver] = useState(false);
  const [selectedTab, setselectedTab] = useState("Active");
  const [Action, setAction] = useState(false);
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);

  const fetchHandler = useCallback(() => {
    getApi(endPoints.driver.getAll({ page: currentPage }), {
      setResponse: setData,
    });
  }, [currentPage]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);


  return (
    <>
      <CreateDriver
        show={open}
        handleClose={() => setOpen(false)}
        fetchApi={fetchHandler}
      />

      {Editdriver ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[600px] bg-white outline-none focus:outline-none p-5">
                <div className="flex items-start justify-between rounded-t">
                  <h3 className="text-xl font-semibold text-[#666666]">
                    Edit driver
                  </h3>

                  <span
                    onClick={() => setEditdriver(false)}
                    className="cursor-pointer"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
                <hr className="mt-2" />

                <div className="mt-5">
                  <div className="flex">
                    <div
                      className={`cursor-pointer ${
                        editseletedtab === "Basic"
                          ? "w-[150px] h-[45px] flex items-center justify-center  gap-2 underline-custom"
                          : "w-[150px] h-[45px] flex items-center justify-center    gap-2"
                      }`}
                      onClick={() => seteditselectedteb("Basic")}
                    >
                      Basic
                    </div>
                    <div
                      className={`cursor-pointer ${
                        editseletedtab === "Cycle info"
                          ? "w-[150px] h-[45px] flex items-center justify-center   gap-2 underline-custom"
                          : "w-[150px] h-[45px] flex items-center justify-center   gap-2"
                      }`}
                      onClick={() => seteditselectedteb("Cycle info")}
                    >
                      Cycle info
                    </div>
                    <div
                      className={`cursor-pointer ${
                        editseletedtab === "Settings"
                          ? "w-[150px] h-[45px] flex items-center justify-center   gap-2 underline-custom"
                          : "w-[150px] h-[45px] flex items-center justify-center   gap-2"
                      }`}
                      onClick={() => seteditselectedteb("Settings")}
                    >
                      Settings
                    </div>
                  </div>
                </div>

                {editseletedtab && (
                  <div>
                    {editseletedtab === "Basic" && (
                      <>
                        <div className="mt-5 relative">
                          <FaRegUserCircle
                            size={100}
                            style={{ color: "#34B7C1" }}
                          />

                          <div className="bg-[#34B7C1] absolute -bottom-0 left-[4rem] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                            <CiEdit style={{ color: "white" }} size={25} />
                          </div>
                        </div>
                        <div className="flex  gap-4 mt-5">
                          <div>
                            <div>
                              <label className="text-[#8E8F8F]">
                                First Name *
                              </label>
                              <br />
                              <input
                                placeholder="First Name "
                                className="placeholder: block w-[270px] mt-1  border-b py-1.5 pr-4 text-gray-900  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div>
                            <div>
                              <label className="text-[#8E8F8F]">
                                Last Name *
                              </label>
                              <br />
                              <input
                                placeholder="Last Name "
                                className="placeholder: block mt-1 w-[270px]  border-b py-1.5 pr-4 text-gray-900  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex  gap-4 mt-5">
                          <div>
                            <div>
                              <label className="text-[#8E8F8F]">
                                Nick Name
                              </label>
                              <br />
                              <input
                                placeholder="Nick Name "
                                className="placeholder: block w-[270px] mt-1  border-b py-1.5 pr-4 text-gray-900  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div>
                            <div>
                              <label className="text-[#8E8F8F]">Cell *</label>
                              <br />
                              <input
                                placeholder="Cell"
                                className="placeholder: block mt-1 w-[270px]  border-b py-1.5 pr-4 text-gray-900  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex  gap-4 mt-5">
                          <div>
                            <div>
                              <label className="text-[#8E8F8F]">Email *</label>
                              <br />
                              <input
                                placeholder="Email"
                                className="placeholder: block w-[270px] mt-1  border-b py-1.5 pr-4 text-gray-900  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div>
                            <div>
                              <label className="text-[#8E8F8F]">
                                License *
                              </label>
                              <br />
                              <input
                                placeholder="License"
                                className="placeholder: block mt-1 w-[270px]  border-b py-1.5 pr-4 text-gray-900  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center mt-5 gap-5 ">
                          <button
                            className="text-[#F56C89] w-[429px] rounded-lg  h-[45px] bg-white border border-[#F56C89]"
                            onClick={() => setEditdriver(false)}
                          >
                            Cancel
                          </button>
                          <button className="bg-[#34B7C1] w-[429px] h-[45px]  rounded-lg text-white flex justify-center items-center gap-2">
                            Save
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <div className="p-5">
        <div className="text-[28px] font-semibold flex justify-start">
          Drivers
        </div>

        <div className="mt-10 flex justify-between">
          <div className="flex">
            <div
              className={`cursor-pointer ${
                selectedTab === "Active"
                  ? "w-[208px] flex items-center justify-center  gap-2 underline-custom"
                  : "w-[208px] flex items-center justify-center   gap-2"
              }`}
              onClick={() => setselectedTab("Active")}
            >
              Active (2)
            </div>
            <div
              className={`cursor-pointer ${
                selectedTab === "Inactive"
                  ? "w-[208px] flex items-center justify-center   gap-2 underline-custom"
                  : "w-[208px] flex items-center justify-center   gap-2"
              }`}
              onClick={() => setselectedTab("Inactive")}
            >
              Inactive (4)
            </div>
          </div>
          <div className="">
            <button
              className="bg-[#34B7C1] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]"
              onClick={() => setOpen(true)}
            >
              <IoMdAdd style={{ color: "white" }} /> Add Driver
            </button>
          </div>
        </div>
        <hr className="mt-5" />

        {selectedTab && (
          <div>
            {selectedTab === "Active" && (
              <div className="mt-5">
                <table class="border ">
                  <thead>
                    <tr className="bg-[#F0FAFB] h-[65px]  ">
                      <th className="w-[180px] flex items-center gap-2 justify-between pl-2 h-[65px]">
                        <span>
                          <input type="checkbox" /> Name
                        </span>{" "}
                        <LuArrowUpDown />
                      </th>
                      <th className="w-[180px] text-center ">Start Date</th>
                      <th className="w-[180px] text-center">Cellphone</th>
                      <th className="w-[180px] text-center">Email Address</th>
                      <th className="w-[180px] text-center">License</th>
                      <th className="w-[180px] text-center">Terminal</th>
                      <th className="w-[180px] text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.docs?.map((i, index) => (
                      <tr className="border-b h-[79px]" key={index}>
                        <td className="flex gap-2 justify-start h-[79px] items-center pl-2">
                          <input type="checkbox" /> {i?.fullName}
                        </td>
                        <td className="text-center">
                          {" "}
                          {i?.createdAt?.slice(0, 10)}{" "}
                        </td>
                        <td className="text-center"> {i.mobileNumber} </td>
                        <td className="text-center"> {i.email} </td>
                        <td className="text-center"> {i.license} </td>
                        <td className="text-center"> {i.terminal} </td>
                        <td>
                          {" "}
                          <div className="flex justify-center z-20 relative cursor-pointer">
                            <HiOutlineDotsVertical />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Pagination
                  className={"mt-5"}
                  totalPages={data?.data?.totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Drivers;
