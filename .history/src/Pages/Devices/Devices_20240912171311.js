/** @format */

import React, { useState, useCallback, useEffect } from "react";
import { LuArrowUpDown } from "react-icons/lu";
import { Pagination } from "../../Components/HelpingComponent";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { dateFormatter } from "../../utils/utils";

const Devices = () => {
  const [data, setData] = useState({});
  const [status, setStatus] = useState("Connected");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchHandler = useCallback(() => {
    getApi(endPoints.eldDevice.getAll({ status, page: currentPage }), {
      setResponse: setData,
    });
  }, [status, currentPage]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  return (
    <div className="p-5">
      <div className="text-[28px] font-semibold flex justify-start">
        ELD Devices
      </div>

      <div className="mt-10 flex justify-between">
        <div className=" flex">
          <div
            className={`cursor-pointer ${
              status === "Connected"
                ? "w-[208px]  h-[45px] flex items-center justify-center  gap-2 underline-custom "
                : "w-[208px] h-[45px] flex items-center justify-center   gap-2"
            }`}
            onClick={() => setStatus("Connected")}
          >
            Active
          </div>
          <div
            className={`cursor-pointer ${
              status === "Disconnected"
                ? "w-[208px] h-[45px] flex items-center justify-center   gap-2 underline-custom"
                : "w-[208px] h-[45px] flex items-center justify-center   gap-2"
            }`}
            onClick={() => setStatus("Disconnected")}
          >
            Disconnected
          </div>
        </div>
      </div>
      <hr className="mt-5" />

      <div>
        <div className="mt-5">
          <table class="border ">
            <thead>
              <tr className="bg-[#F0FAFB] h-[65px]  ">
                <th className="w-[300px] flex items-center gap-2 justify-center pl-2 h-[65px]">
                  Driver <LuArrowUpDown />
                </th>
                <th className="w-[300px]">Serial Number</th>
                <th className="w-[300px] ">VIN Number</th>
                <th className="w-[300px]">Status</th>
                <th className="w-[300px] flex items-center gap-2 justify-center  h-[65px]">
                  Last Connected (EDT)  
                  <LuArrowUpDown />
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.docs?.map((i, index) => (
                <tr className="border-b h-[79px]" key={index}>
                  <td className="text-center"> {i?.driver?.fullName} </td>
                  <td className="text-center"> {i?.serialNumber} </td>
                  <td className="text-center"> {i?.vinNumber} </td>
                  <td>
                    {i?.status === "Disconnected" ? (
                      <div className="flex gap-2 items-center justify-center">
                        <div className="w-[139px] h-[34px] bg-[#fadee2] rounded-2xl text-[#A02334] flex justify-center gap-1 items-center">
                          Disconnected <img src={status} alt="" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center justify-center">
                        <div className="w-[139px] h-[34px] bg-[#32D29633] rounded-2xl text-[#18A88C] flex justify-center gap-1 items-center">
                          Connected <img src={status} alt="" />
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="text-center">
                    {" "}
                    {dateFormatter(i?.lastConnected)}{" "}
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
      </div>
    </div>
  );
};

export default Devices;
