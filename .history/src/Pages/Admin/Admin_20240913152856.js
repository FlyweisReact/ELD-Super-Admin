/** @format */

import React from "react";
import { SectionHeading } from "../../Components/HelpingComponent";

const Admin = () => {
  return (
    <div className="p-5">
      <div className="flex gap-2 driver-actions-btn justify-betwen">
        <SectionHeading title={"Sub-Admin"} />
        <button className="bg-[#34B7C1] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]">
          Create New
        </button>
      </div>
    </div>
  );
};

export default Admin;