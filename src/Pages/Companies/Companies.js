/** @format */

import { Dropdown } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Pagination, SectionHeading } from "../../Components/HelpingComponent";
import { AddCompany } from "../../Components/Modals/Modals";
import TableLayout from "../../Components/TableLayout/TableLayout";
import { deleteApi, getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

const Companies = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const fetchData = useCallback(() => {
    getApi(endPoints.companies.getAll({ page }), {
      setResponse: setData,
    });
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const CompanyDetailSaver = (id) => {
    localStorage.setItem("companyId", id);
    navigate(`/Logbook`);
  };

  const removeHandler = (id) => {
    deleteApi(endPoints.companies.remove(id), {
      successMsg: "Removed !",
      additionalFunctions: [fetchData],
    });
  };

  const thead = ["Sno.", "Owner", "Email", "DOT", "Status", ""];
  const tbody = data?.data?.docs?.map((i, index) => [
    `#${index + 1}`,
    <span
      style={{ color: "blue", textDecoration: "underline" }}
      onClick={() => CompanyDetailSaver(i?._id)}
    >
      {i?.owner}
    </span>,
    i?.email,
    i?.dot,
    i?.status,
    <Dropdown
      menu={{
        items: [
          {
            label: (
              <div
                className="text-[#F56C89] text-left cursor-pointer"
                onClick={() => removeHandler(i?._id)}
              >
                <i className="fa-solid fa-trash-can"></i> Delete
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
    </Dropdown>,
  ]);

  return (
    <section className="p-5">
      <AddCompany
        handleClose={() => setOpen(false)}
        show={open}
        fetchApi={fetchData}
      />
      <SectionHeading title={"Companies"} />
      <div className="flex gap-2 driver-actions-btn mt-3 justify-end">
        <button
          className="bg-[#34B7C1] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]"
          onClick={() => setOpen(true)}
        >
          Create New
        </button>
      </div>

      <TableLayout
        thead={thead}
        tbody={tbody}
        className="mt-5 mb-5 vehicle-table"
      />
      <Pagination
        className={"mt-5"}
        totalPages={data?.data?.totalPages}
        currentPage={page}
        setCurrentPage={setPage}
      />
    </section>
  );
};

export default Companies;
