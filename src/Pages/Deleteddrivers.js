/** @format */

import React from "react";
import { LuArrowUpDown } from "react-icons/lu";

const Deleteddrivers = () => {
  return (
    <div className="p-5">
      <div className="text-[28px] font-semibold flex justify-start">
        Deleted Drivers
      </div>

      <div className="mt-5">
        <table class="border ">
          <thead>
            <tr className="bg-[#F0FAFB] h-[65px]  ">
              <th className="w-[150px] flex items-center gap-2 justify-center pl-2 h-[65px]">
                Name <LuArrowUpDown />
              </th>
              <th className="w-[180px] text-center  ">Action</th>
              <th className="w-[200px] text-center ">Start Date (EDT)</th>
              <th className="w-[180px] text-center">Last Date (EDT) </th>
              <th className="w-[200px] text-center">License</th>
              <th className="w-[180px] text-center">Mode</th>
              <th className="w-[180px] text-center">Phone Number</th>
              <th className="w-[100px] text-center">Email</th>
              <th className="w-[180px] text-center">Cycle Type</th>
              <th className="w-[180px] text-center">Timezone</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b h-[79px]">
              <td className=" text-center pl-2">Adam Blake</td>
              <td>
                <div className="bg-[#F0FAFB] w-[115px] text-[14px] flex justify-center items-center h-[30px] rounded-2xl text-[#34B7C1] ">
                  View Logbook
                </div>
              </td>
              <td className="text-center">2024-02-28</td>
              <td className="text-center">2024-02-28</td>
              <td className="text-center">T67529974</td>
              <td className="text-center">ELD</td>
              <td className="text-center">5404235926</td>
              <td className="text-center">Srhlogistics@outlook.com</td>
              <td className="text-center">USA 70 hour / 8 day (Interstate)</td>
              <td className="text-center">Eastern Time (US & Canada)</td>
            </tr>
            <tr className="border-b h-[79px]">
              <td className=" text-center pl-2">Adam Blake</td>
              <td>
                <div className="bg-[#F0FAFB] w-[115px] text-[14px] flex justify-center items-center h-[30px] rounded-2xl text-[#34B7C1] ">
                  View Logbook
                </div>
              </td>
              <td className="text-center">2024-02-28</td>
              <td className="text-center">2024-02-28</td>
              <td className="text-center">T67529974</td>
              <td className="text-center">ELD</td>
              <td className="text-center">5404235926</td>
              <td className="text-center">Srhlogistics@outlook.com</td>
              <td className="text-center">USA 70 hour / 8 day (Interstate)</td>
              <td className="text-center">Eastern Time (US & Canada)</td>
            </tr>
            <tr className="border-b h-[79px]">
              <td className=" text-center pl-2">Adam Blake</td>
              <td>
                <div className="bg-[#F0FAFB] w-[115px] text-[14px] flex justify-center items-center h-[30px] rounded-2xl text-[#34B7C1] ">
                  View Logbook
                </div>
              </td>
              <td className="text-center">2024-02-28</td>
              <td className="text-center">2024-02-28</td>
              <td className="text-center">T67529974</td>
              <td className="text-center">ELD</td>
              <td className="text-center">5404235926</td>
              <td className="text-center">Srhlogistics@outlook.com</td>
              <td className="text-center">USA 70 hour / 8 day (Interstate)</td>
              <td className="text-center">Eastern Time (US & Canada)</td>
            </tr>
            <tr className="border-b h-[79px]">
              <td className=" text-center pl-2">Adam Blake</td>
              <td>
                <div className="bg-[#F0FAFB] w-[115px] text-[14px] flex justify-center items-center h-[30px] rounded-2xl text-[#34B7C1] ">
                  View Logbook
                </div>
              </td>
              <td className="text-center">2024-02-28</td>
              <td className="text-center">2024-02-28</td>
              <td className="text-center">T67529974</td>
              <td className="text-center">ELD</td>
              <td className="text-center">5404235926</td>
              <td className="text-center">Srhlogistics@outlook.com</td>
              <td className="text-center">USA 70 hour / 8 day (Interstate)</td>
              <td className="text-center">Eastern Time (US & Canada)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deleteddrivers;
