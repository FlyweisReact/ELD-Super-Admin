/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  Loader,
  Pagination,
  SectionHeading,
} from "../Components/HelpingComponent";
import TableLayout from "../Components/TableLayout/TableLayout";
import { getApi, deleteApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { dateFormatter } from "../utils/utils";
import { Dropdown } from "antd";

const Logbook2 = () => {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchHandler = useCallback(() => {
    getApi(endPoints.company.getAll({ page: currentPage }), {
      setResponse: setData,
      setLoading,
    });
  }, [currentPage]);

  console.log(data);

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
    "Date",
    "Company name",
    "Drivers",
    "Assets",
    "Timezone",
    "Created On (EDT)",
    "DOT",
    "",
  ];

  const collegeDetails = data?.data?.docs?.map((i) => [
    dateFormatter(i?.updatedAt),
    i?.name,
    "",
    "",
    "",
    dateFormatter(i?.createdAt),
    i?.dot,
    <td>
      <Dropdown
        menu={{
          items: [
            {
              label: (
                <div
                  className="text-[#F56C89] text-left cursor-pointer font-bold"
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
      <SectionHeading title={"Logbook"} />
      <Loader isLoading={loading} />
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
  );
};

export default Logbook2;
