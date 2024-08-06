/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuArrowUpDown } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../Components/HelpingComponent";
import TableLayout from "../Components/TableLayout/TableLayout";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { dateFormatter } from "../utils";

const Logbook2 = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const fetchHandler = useCallback(() => {
    getApi(endPoints.company.getAll({ page: currentPage }), {
      setResponse: setData,
    });
  }, [currentPage]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const thead = [
    <th className="flex items-center gap-2 justify-left pl-2 h-[65px]">
      <input type="checkbox" />
      Date
      <LuArrowUpDown />
    </th>,
    <th>
      <div className="flex items-center gap-1 justify-center">
        <input type="checkbox" />
        Company name <LuArrowUpDown />
      </div>
    </th>,
    <th>
      <div className="flex items-center gap-1 justify-center">
        Drivers <LuArrowUpDown />
      </div>
    </th>,
    <th>
      <div className="flex items-center gap-1 justify-center">
        Assets <LuArrowUpDown />
      </div>
    </th>,
    <th className="text-center">Timezone</th>,
    <th className="flex items-center gap-2 justify-center  h-[65px]">
      Created On (EDT)
      <LuArrowUpDown />
    </th>,
    <th className="text-center">DOT</th>,
    <th className="text-center">Action</th>,
  ];

  // const tbody = data?.data?.docs?.map?.map((i) => [
  //   <td className=" pl-2 text-left" onClick={() => navigate("/Dashboard")}>
  //     <div>
  //       <input type="checkbox" /> {dateFormatter(i?.updatedAt)}
  //     </div>
  //   </td>,
  //   <td className="text-center" onClick={() => navigate("/Dashboard")}>
  //     <div>
  //       <input type="checkbox" /> {i?.name}
  //     </div>
  //   </td>,
  //   <td className="text-center">6</td>,
  //   <td className="text-center">2</td>,
  //   <td className="text-center">EDT</td>,
  //   <td className="text-center"> {i?.createdAt} </td>,
  //   <td className="text-center"> {i?.dot} </td>,
  //   <td>
  //     <div className="flex justify-center z-20 relative ">
  //       <HiOutlineDotsVertical />
  //     </div>
  //   </td>,
  // ]);

  const collegeDetails = data?.data?.docs?.map((i) => [
    <td
                  className=" pl-2 text-left"
                  onClick={() => navigate("/Dashboard")}
                >
                  <div>
                    <input type="checkbox" /> {dateFormatter(i?.updatedAt)}
                  </div>
                </td>,
                  <td
                  className="text-center"
                  onClick={() => navigate("/Dashboard")}
                >
                  <div>
                    <input type="checkbox" /> {i?.name}
                  </div>
                </td>
  ]);

  console.log(collegeDetails)

  return (
    <div className="mt-4 mx-4">
      <p className="text-[28px] font-[500]">Logbook</p>

      <div className="mt-5">
        <TableLayout
          thead={thead}
          theadTrClass={"bg-[#F0FAFB] h-[65px]"}
          className={"border w-full"}
          tbodyTrClass={"border-b h-[79px] cursor-pointer"}
          tbody={collegeDetails}
        />

        <table class="border w-full">
          <thead>
            <tr className="bg-[#F0FAFB] h-[65px]  ">
              <th className=" flex items-center gap-2 justify-left pl-2 h-[65px]">
                <input type="checkbox" />
                Date
                <LuArrowUpDown />
              </th>
              <th className="">
                <div className="flex items-center gap-1 justify-center">
                  <input type="checkbox" />
                  Company name <LuArrowUpDown />
                </div>
              </th>
              <th className="">
                <div className="flex items-center gap-1 justify-center">
                  Drivers <LuArrowUpDown />
                </div>
              </th>
              <th className="">
                <div className="flex items-center gap-1 justify-center">
                  Assets <LuArrowUpDown />
                </div>
              </th>
              <th className=" text-center">Timezone</th>
              <th className="flex items-center gap-2 justify-center  h-[65px]">
                Created On (EDT)
                <LuArrowUpDown />
              </th>
              <th className=" text-center">DOT</th>
              <th className=" text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.docs?.map((i, index) => (
              <tr className="border-b h-[79px] cursor-pointer" key={index}>
                <td
                  className=" pl-2 text-left"
                  onClick={() => navigate("/Dashboard")}
                >
                  <div>
                    <input type="checkbox" /> {dateFormatter(i?.updatedAt)}
                  </div>
                </td>
                <td
                  className="text-center"
                  onClick={() => navigate("/Dashboard")}
                >
                  <div>
                    <input type="checkbox" /> {i?.name}
                  </div>
                </td>
                <td className="text-center">6</td>
                <td className="text-center">2</td>
                <td className="text-center">EDT</td>
                <td className="text-center"> {i?.createdAt} </td>
                <td className="text-center"> {i?.dot} </td>
                <td>
                  <div className="flex justify-center z-20 relative ">
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
    </div>
  );
};

export default Logbook2;
