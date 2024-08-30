/** @format */

import { useCallback, useEffect, useState } from "react";
import { Pagination } from "../Components/HelpingComponent";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";

const Diagnosticevents = () => {
  const [selectedTab, setselectedTab] = useState("Active");
  const [data, setData] = useState({ data: {} });
  const [currentPage, setCurrentPage] = useState(1);

  const fetchHandler = useCallback(() => {
    getApi(endPoints.diagnosisMalfunction.getAll({ page: currentPage }), {
      setResponse: setData,
    });
  }, [currentPage]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  return (
    <div className="p-5">
      <div className="text-[28px] font-semibold flex justify-start">
        Diagnostic and Malfunction Events
      </div>

      <div className="mt-10 flex justify-between">
        <div className="flex">
          <div
            className={`cursor-pointer ${
              selectedTab === "Active"
                ? "w-[208px] flex items-center justify-center h-[44px]  gap-2 underline-custom"
                : "w-[208px] flex items-center justify-center  h-[44px]   gap-2"
            }`}
            onClick={() => setselectedTab("Active")}
          >
            Active ({data?.data?.docs?.length})
          </div>
        </div>
      </div>
      <hr className="" />

      <div className="mt-5">
        <table class="border w-full">
          <thead>
            <tr className="bg-[#F0FAFB] h-[65px] ">
              <th className="w-[250px] ">Vehicle</th>
              <th className="w-[250px] ">Event</th>
              <th className="w-[250px]">Date Raised  </th>
              <th className="w-[250px]">Event Location</th>
              <th className="w-[250px]">Dirver</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.docs?.map((i, index) => (
              <tr key={index}>
                <td className="p-5 text-center"> {i?.truck?.vehicleNumber} </td>
                <td className="p-5 text-center"> {i?.event} </td>
                <td className="p-5 text-center"> {i?.date} </td>
                <td className="p-5 text-center"> {i?.location} </td>
                <td className="p-5 text-center"> {i?.driver?.fullName} </td>
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
  );
};

export default Diagnosticevents;
