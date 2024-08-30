/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuArrowUpDown } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { Loader, Pagination } from "../Components/HelpingComponent";
import TableLayout from "../Components/TableLayout/TableLayout";
import { getApi, deleteApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { dateFormatter } from "../utils";
import { Dropdown } from "antd";

const Logbook2 = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchHandler = useCallback(() => {
    getApi(endPoints.company.getAll({ page: currentPage }), {
      setResponse: setData,
      setLoading,
    });
  }, [currentPage]);

  console.log(data)

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const deleteHandler = (id) => {
    deleteApi(endPoints.company.delete(id), {
      successMsg: "Removed",
      additionalFunctions: [fetchHandler],
      setLoading,
    });
  };

  const thead = [
    "Date" ,
    "Company name",
    "Drivers",
    "Assets",
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
    <td>
      <Dropdown
        menu={{
          items: [
            {
              label: (
                <div
                  className="text-[#F56C89] text-left cursor-pointer"
                  onClick={() => deleteHandler(i?._id)}
                >
                  Remove
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
      </Dropdown>
    </td>,
  ]);

  return (
    <div className="mt-4 mx-4">
      <p className="text-[28px] font-[500]">Logbook</p>
      <Loader isLoading={loading} />
      <div className="mt-5">
        <TableLayout
          thead={thead}
          className="vehicle-table mt-5 mb-5"
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
