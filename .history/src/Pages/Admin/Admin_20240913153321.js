/** @format */

import React, { useEffect, useState } from "react";
import { Loader, SectionHeading } from "../../Components/HelpingComponent";
import TableLayout from "../../Components/TableLayout/TableLayout";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const fetchHandler = () => {
    getApi(endPoints.admin.getAll, {
      setResponse: setData,
      setLoading,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  console.log(data);

  const thead = ["Sno", "Full Name", "Contact", "Email", "Permissions", ""];

  return (
    <div className="p-5">
      <div className="flex gap-2 driver-actions-btn justify-between">
        <SectionHeading title={"Sub-Admin"} />
        <button className="bg-[#34B7C1] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]">
          Create New
        </button>
      </div>
      <Loader isLoading={loading} />
      <TableLayout className="vehicle-table mt-5 mb-5" thead={thead} />
    </div>
  );
};

export default Admin;