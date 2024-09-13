/** @format */

import React, { useEffect, useState } from "react";
import { Loader, SectionHeading } from "../../Components/HelpingComponent";
import { CreateAdmin } from "../../Components/Modals/Modals";
import TableLayout from "../../Components/TableLayout/TableLayout";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);

  const fetchHandler = () => {
    getApi(endPoints.admin.getAll, {
      setResponse: setData,
      setLoading,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const thead = [
    "Sno",
    "Full Name",
    "Mobile Number",
    "Email",
    "Permissions",
    "",
  ];

  const tbody = data?.data?.docs?.map((i, index) => [
    `#${index + 1}`,
    i?.fullName,
    i?.mobileNumber,
    i?.email,

    i?.permissions?.map((item, index) =>
      index + 1 === i?.permissions?.length ? (
        <span key={`permission${index}`}> {item} </span>
      ) : (
        <span key={`permission${index}`}> {item},</span>
      )
    ),
    "",
  ]);

  return (
    <div className="p-5">
      <CreateAdmin show={open} handleClose={() => setOpen(false)} />
      <div className="flex gap-2 driver-actions-btn justify-between">
        <SectionHeading title={"Sub-Admin"} />
        <button
          className="bg-[#34B7C1] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]"
          onClick={() => setOpen(true)}
        >
          Create New
        </button>
      </div>
      <Loader isLoading={loading} />
      <TableLayout
        className="vehicle-table mt-5 mb-5"
        thead={thead}
        tbody={tbody}
      />
      bfjkksldj sfjkkfjselkjflkjkcjklsjflksfofo kjhdkjhakjdkjklvjsdkosipfoi 
      dfsnsdhf8wu8098       
    </div>
  );
};

export default Admin;
