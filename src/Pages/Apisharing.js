import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

const Apisharing = () => {
  const [selectedTab, setselectedTab] = useState("Active");
  const [shareApiKeyPopup, setShareApiKeyPopup] = useState(false);

  return (
    <>
      {shareApiKeyPopup ? (
        <>
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
              <div className="relative w-auto my-6 mx-auto max-w-5xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[600px] bg-white outline-none focus:outline-none p-5">
                  <div className="flex items-start justify-between rounded-t">
                    <h3 className="text-xl font-semibold text-[#666666]">
                      Share Link with API Partner
                    </h3>

                    <span
                      onClick={() => setShareApiKeyPopup(false)}
                      className="cursor-pointer"
                    >
                      <IoCloseSharp />
                    </span>
                  </div>
                  <hr className="mt-2" />
                  <div className="mt-5 flex justify-center flex-col gap-4">
                    <div>
                      <label className="text-[#8E8F8F]">
                        Select API Partner  *
                      </label>
                      <br />
                      <select
                        className="w-full border h-[40px] rounded-lg"
                        style={{ color: "#8E8F8F" }}
                      >
                        <option className="">Select API Partner</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[#8E8F8F]">Select Driver  *</label>
                      <br />
                      <select
                        className="w-full border h-[40px] rounded-lg"
                        style={{ color: "#8E8F8F" }}
                      >
                        <option className="">Select Driver from list</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[#8E8F8F]">
                        Select Truck Number(s)  *
                      </label>
                      <br />
                      <select
                        className="w-full border h-[40px] rounded-lg"
                        style={{ color: "#8E8F8F" }}
                      >
                        <option className="">
                          Select Truck Number(s) from list
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[#8E8F8F]">
                        Select Trailer Number(s)  *
                      </label>
                      <br />
                      <select
                        className="w-full border h-[40px] rounded-lg"
                        style={{ color: "#8E8F8F" }}
                      >
                        <option className="">
                          Select Trailer Numbers(s) from list
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex items-start gap-2">
                    <input type="checkbox" />
                    <div className="text-[#8E8F8F] font-bold">
                      I agree to share NXT Location Sharing API Key with API
                      Partner. This will give API Partner access to location
                      information for selected vehicles.
                    </div>
                  </div>
                  <div className=" flex justify-end ">
                    <button className="w-[156px] h-[45px] bg-[#34B7C1] font-semibold text-white rounded-3xl">
                      Send API Key
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        </>
      ) : null}

      <div className="p-5">
        <div className="text-[28px] font-semibold flex justify-start">
          Location Sharing API Key
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
              Active (0)
            </div>
            <div
              className={`cursor-pointer ${
                selectedTab === "Expired"
                  ? "w-[208px] flex items-center justify-center   gap-2 underline-custom"
                  : "w-[208px] flex items-center justify-center   gap-2"
              }`}
              onClick={() => setselectedTab("Expired")}
            >
              Expired   (0)
            </div>
          </div>
          <div className="">
            <button
              onClick={(e) => setShareApiKeyPopup(true)}
              className="bg-[#34B7C1] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]"
            >
              <IoMdAdd style={{ color: "white" }} /> Share API Key
            </button>
          </div>
        </div>
        <hr className="mt-5" />
        <div className="mt-5">
          <table className="border w-full ">
            <thead>
              <tr className="bg-[#F0FAFB] h-[65px]  ">
                <th className="w-[250px] text-center ">Shared With</th>
                <th className="w-[250px] text-center ">Shared Assets</th>
                <th className="w-[250px] text-center">API Key </th>
                <th className="w-[250px] text-center">API Expiration</th>
                <th className="w-[250px] text-center">Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Apisharing;
