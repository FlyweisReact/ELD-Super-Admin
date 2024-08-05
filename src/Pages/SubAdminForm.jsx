/** @format */

import React from "react";

const SubAdminForm = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="border p-4 rounded-md">
        <p className="text-[#222222] font-[600] text-[22px] text-center pb-6">
          Create Sub Admin
        </p>
        <div className="flex flex-col gap-4 text-[#484857]">
          <div>
            <label>Company Name</label>
            <input
              type="text"
              className="w-full border border-[#8F8F8F] rounded-lg"
              //   value={currentPassword}
              //   onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div>
            <label>DOT No</label>
            <input
              type="text"
              className="w-full border border-[#8F8F8F] rounded-lg"
              //   value={newPassword}
              //   onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Plans</label>

            <select
              className="w-full border border-[#8F8F8F] rounded-lg"
              name=""
              id=""
            >
              <option value="">Base plan</option>
              <option value="">GPS+ Base plan</option>
              <option value="">GPS+Base Plan+IFTA</option>
            </select>
          </div>
          <div>
            <label>Action</label>
            <input
              type="text"
              className="w-full border border-[#8F8F8F] rounded-lg"
              //   value={newPassword}
              //   onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center mt-[30px]">
          <button className="bg-[#34B7C1] text-white w-[180px] py-1 rounded-lg font-semibold">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubAdminForm;
