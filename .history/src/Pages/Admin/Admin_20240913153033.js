/** @format */

import React, { useEffect, useState } from "react";
import { SectionHeading } from "../../Components/HelpingComponent";
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
    fetchHandler()
  },[])

  console.log(data)

  return (
    <div className="p-5">
      <div className="flex gap-2 driver-actions-btn justify-between">
        <SectionHeading title={"Sub-Admin"} />
        <button className="bg-[#34B7C1] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]">
          Create New
        </button>
      </div>
      
    </div>
  );
};

export default Admin;
