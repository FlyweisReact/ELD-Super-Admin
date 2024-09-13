/** @format */

import React from "react";
import { SectionHeading } from "../../Components/HelpingComponent";

const Admin = () => {
  return (
    <div className="p-5">
      <div className="flex gap-2 driver-actions-btn">
        <SectionHeading title={"Sub-Admin"} />
        <button
          className="bg-[#34B7C1] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]"
          onClick={() => setOpen(true)}
        >
          <IoMdAdd style={{ color: "white" }} /> Add Driver
        </button>
      </div>
    </div>
  );
};

export default Admin;
