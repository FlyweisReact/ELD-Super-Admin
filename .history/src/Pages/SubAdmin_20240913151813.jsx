/** @format */

import React , { useState} from "react";
import { LuArrowUpDown } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";

const SubAdmin = () => {
  const navigate = useNavigate();
  const [ data , setData ] = useState({})

  const fetchHandler = () => {
    getApi(endPoints.admin.getAll , {
      setResponse : setData
    })
  }


  useEf

  return (
    <div className="mt-4 mx-4">
      <div className="flex justify-between">
        <p className="text-[28px] font-[500]">Sub Admin</p>
        <button
          className="bg-[#34B7C1] text-white w-[180px] py-1 rounded-lg font-semibold"
          onClick={() => navigate("/create-subadmin")}
        >
          Create Sub Admin
        </button>
      </div>

      <div className="mt-5">
        <table class="border w-full ">
          <thead>
            <tr className="bg-[#F0FAFB] h-[65px]  ">
              <th className="">
                <div className="flex items-center gap-1 justify-center">
                  <input type="checkbox" />
                  Company name <LuArrowUpDown />
                </div>
              </th>

              <th className=" text-center">DOT</th>
              <th className=" text-center">Plans</th>
              <th className=" text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b h-[79px] cursor-pointer">
              <td
                className="text-center"
                onClick={() => navigate("/Dashboard")}
              >
                <div>
                  <input type="checkbox" /> ZOHO
                </div>
              </td>
              <td className="text-center">123456</td>
              <td className="text-center">base plan</td>
              <td className="text-center text-[#01B81E] font-[700]">Active</td>
            </tr>
            <tr className="border-b h-[79px] cursor-pointer">
              <td
                className="text-center"
                onClick={() => navigate("/Dashboard")}
              >
                <div>
                  <input type="checkbox" /> ZEEN-X
                </div>
              </td>
              <td className="text-center">123456</td>
              <td className="text-center">base plan</td>
              <td className="text-center text-[#FF2A1C] font-[700]">
                In-Active
              </td>
            </tr>

            <tr className="border-b h-[79px] cursor-pointer">
              <td
                className="text-center"
                onClick={() => navigate("/Dashboard")}
              >
                <div>
                  <input type="checkbox" /> ZOHO
                </div>
              </td>
              <td className="text-center">123456</td>
              <td className="text-center">GPS+Base Plan+ IFTA </td>
              <td className="text-center text-[#01B81E] font-[700]">Active</td>
            </tr>
            <tr className="border-b h-[79px] cursor-pointer">
              <td
                className="text-center"
                onClick={() => navigate("/Dashboard")}
              >
                <div>
                  <input type="checkbox" /> ZEEN-X
                </div>
              </td>
              <td className="text-center">123456</td>
              <td className="text-center">GPS+ Base plan</td>
              <td className="text-center text-[#FF2A1C] font-[700]">
                In-Active
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubAdmin;
