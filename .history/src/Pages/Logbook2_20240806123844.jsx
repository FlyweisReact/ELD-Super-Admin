/** @format */

import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuArrowUpDown } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";

const Logbook2 = () => {
  const navigate = useNavigate();
  const [ data ,setData ] = useState({})

  const fetchHandler = () => {
    getApi(endPoints.company.getAll({}) , {
      setResponse : setData
    })
  }

  useEffect(() => {
    fetchHandler()
  },[])

  console.log(data?.data?.docs)


  return (
    <div className="mt-4 mx-4">
      <p className="text-[28px] font-[500]">Logbook</p>

      <div className="mt-5">
        <table class="border w-full ">
          <thead>
            <tr className="bg-[#F0FAFB] h-[65px]  ">
              <th className=" flex items-center gap-2 justify-left pl-2 h-[65px]">
                <input type="checkbox" />
                Date
                <LuArrowUpDown />
              </th>
              <th className="">
                <div className="flex items-center gap-1 justify-center">
                  <input type="checkbox" />
                  Company name <LuArrowUpDown />
                </div>
              </th>
              <th className="">
                <div className="flex items-center gap-1 justify-center">
                  Drivers <LuArrowUpDown />
                </div>
              </th>
              <th className="">
                <div className="flex items-center gap-1 justify-center">
                  Assets <LuArrowUpDown />
                </div>
              </th>
              <th className=" text-center">Timezone</th>
              <th className="flex items-center gap-2 justify-center  h-[65px]">
                Created On (EDT)
                <LuArrowUpDown />
              </th>
              <th className=" text-center">DOT</th>
              <th className=" text-center">Action</th>
            </tr>
          </thead>
          <tbody>
          {data?.data?.docs}
            <tr className="border-b h-[79px] cursor-pointer">
              <td
                className=" pl-2 text-left"
                onClick={() => navigate("/Dashboard")}
              >
                <div>
                  <input type="checkbox" /> Created On (EDT)
                </div>
              </td>
              <td
                className="text-center"
                onClick={() => navigate("/Dashboard")}
              >
                <div>
                  <input type="checkbox" /> Company Name
                </div>
              </td>
              <td className="text-center">6</td>
              <td className="text-center">2</td>
              <td className="text-center">EDT</td>
              <td className="text-center">Jul 17, 2023 02:28 PM</td>
              <td className="text-center">123456</td>
              <td>
                <div className="flex justify-center z-20 relative ">
                  <HiOutlineDotsVertical />
                </div>
              </td>
            </tr>
            <tr className="border-b h-[79px] cursor-pointer">
              <td
                className=" pl-2 text-left"
                onClick={() => navigate("/Dashboard")}
              >
                <div>
                  <input type="checkbox" /> Created On (EDT)
                </div>
              </td>
              <td
                className="text-center"
                onClick={() => navigate("/Dashboard")}
              >
                <div>
                  <input type="checkbox" /> Company Name
                </div>
              </td>
              <td className="text-center">6</td>
              <td className="text-center">2</td>
              <td className="text-center">EDT</td>
              <td className="text-center">Jul 17, 2023 02:28 PM</td>
              <td className="text-center">123456</td>
              <td>
                <div className="flex justify-center z-20 relative ">
                  <HiOutlineDotsVertical />
                </div>
              </td>
            </tr>
            <tr className="border-b h-[79px] cursor-pointer">
              <td
                className=" pl-2 text-left"
                onClick={() => navigate("/Dashboard")}
              >
                <div>
                  <input type="checkbox" /> Created On (EDT)
                </div>
              </td>
              <td
                className="text-center"
                onClick={() => navigate("/Dashboard")}
              >
                <div>
                  <input type="checkbox" /> Company Name
                </div>
              </td>
              <td className="text-center">6</td>
              <td className="text-center">2</td>
              <td className="text-center">EDT</td>
              <td className="text-center">Jul 17, 2023 02:28 PM</td>
              <td className="text-center">123456</td>
              <td>
                <div className="flex justify-center z-20 relative ">
                  <HiOutlineDotsVertical />
                </div>
              </td>
            </tr>
            <tr className="border-b h-[79px] cursor-pointer">
              <td
                className=" pl-2 text-left"
                onClick={() => navigate("/Dashboard")}
              >
                <div>
                  <input type="checkbox" /> Created On (EDT)
                </div>
              </td>
              <td
                className="text-center"
                onClick={() => navigate("/Dashboard")}
              >
                <div>
                  <input type="checkbox" /> Company Name
                </div>
              </td>
              <td className="text-center">6</td>
              <td className="text-center">2</td>
              <td className="text-center">EDT</td>
              <td className="text-center">Jul 17, 2023 02:28 PM</td>
              <td className="text-center">123456</td>
              <td>
                <div className="flex justify-center z-20 relative ">
                  <HiOutlineDotsVertical />
                </div>
              </td>
            </tr>
            <tr className="border-b h-[79px] cursor-pointer">
              <td
                className=" pl-2 text-left"
                onClick={() => navigate("/Dashboard")}
              >
                <div>
                  <input type="checkbox" /> Created On (EDT)
                </div>
              </td>
              <td
                className="text-center"
                onClick={() => navigate("/Dashboard")}
              >
                <div>
                  <input type="checkbox" /> Company Name
                </div>
              </td>
              <td className="text-center">6</td>
              <td className="text-center">2</td>
              <td className="text-center">EDT</td>
              <td className="text-center">Jul 17, 2023 02:28 PM</td>
              <td className="text-center">123456</td>
              <td>
                <div className="flex justify-center z-20 relative ">
                  <HiOutlineDotsVertical />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Logbook2;
