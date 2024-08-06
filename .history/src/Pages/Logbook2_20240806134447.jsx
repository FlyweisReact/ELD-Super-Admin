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
import {} from 'antd'

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
    <th className="flex items-center gap-2  pl-2 pr-5 h-[65px] justify-between">
      <span className="flex gap-1 items-center">
        <input type="checkbox" />
        Date
      </span>
      <LuArrowUpDown />
    </th>,
    <th>
      <div className="flex items-center justify-between pr-5 gap-1">
        <span className="flex gap-1 items-center">
          <input type="checkbox" />
          Company name
        </span>
        <LuArrowUpDown />
      </div>
    </th>,
    <th>
      <div className="flex items-center gap-1 ">
        Drivers <LuArrowUpDown />
      </div>
    </th>,
    <th>
      <div className="flex items-center gap-1 ">
        Assets <LuArrowUpDown />
      </div>
    </th>,
    <th>Timezone</th>,
    <th className="flex items-center gap-2   h-[65px]">
      Created On (EDT)
      <LuArrowUpDown />
    </th>,
    <th>DOT</th>,
    <th className="text-right pr-2">Action</th>,
  ];

  const collegeDetails = data?.data?.docs?.map((i) => [
    <td className=" pl-2 text-left" onClick={() => navigate("/Dashboard")}>
      <div>
        <input type="checkbox" /> {dateFormatter(i?.updatedAt)}
      </div>
    </td>,
    <td>
      <div>
        <input type="checkbox" /> {i?.name}
      </div>
    </td>,
    <td></td>,
    <td></td>,
    <td></td>,
    <td> {dateFormatter(i?.createdAt)} </td>,
    <td> {i?.dot} </td>,
    <td className="text-right pr-5">
      <div className="flex z-20 relative justify-end ">
        <HiOutlineDotsVertical />
      </div>
    </td>,
  ]);

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
