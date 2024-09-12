/** @format */

import { Sidebar } from "flowbite-react";
import { ReactComponent as logbook } from "../Assets/Sidebar/logbook.svg";
import { ReactComponent as report } from "../Assets/Sidebar/report.svg";
import { ReactComponent as ifta } from "../Assets/Sidebar/ifta.svg";
import { ReactComponent as Devices } from "../Assets/Sidebar/devices.svg";
import { ReactComponent as fmcsa } from "../Assets/Sidebar/fmcsa.svg";
import { ReactComponent as logOut } from "../Assets/Sidebar/logout.svg";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogOutHandler } from "../utils";

const SuperSidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      className={`bg-[#F9FBFF] h-[1500px] ${
        open ? "w-64 " : "w-24"
      } duration-500 text-gray-100 px-4`}
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <div className="py-3 flex justify-between">
            {!open ? (
              <HiMenuAlt3
                size={26}
                style={{ color: "#34B7C1" }}
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            ) : (
              <>
                <Sidebar.Item
                  to="#"
                  className="text-[#34B7C1] text-center text-3xl font-bold"
                >
                  Dashboard
                </Sidebar.Item>
              </>
            )}
          </div>
          <>
            <Link to="/super-logbook">
              <Sidebar.Item
                className="bg-white text-[#80848F] text-[18px] p-2 mb-2 hover:text-[#34B7C1]"
                icon={logbook}
              >
                Logbook
              </Sidebar.Item>
            </Link>
            <Link to="/Reports">
              <Sidebar.Item
                className="bg-white text-[#80848F] text-[18px] p-2 mb-2  hover:text-[#34B7C1]"
                icon={report}
              >
                Reports
              </Sidebar.Item>
            </Link>
            <Link to="/Iftatrips">
              <Sidebar.Item
                className="bg-white text-[#80848F] text-[18px] p-2 mb-2  hover:text-[#34B7C1]"
                icon={ifta}
              >
                IFTA
              </Sidebar.Item>
            </Link>
            <Link to="/sub-admin">
              <Sidebar.Item
                className="bg-white text-[#80848F] text-[18px] p-2 mb-2  hover:text-[#34B7C1]"
                icon={Devices}
              >
                Sub admin
              </Sidebar.Item>
            </Link>
            <Link to="/subscription">
              <Sidebar.Item
                className="bg-white text-[#80848F] text-[18px] p-2 mb-2  hover:text-[#34B7C1]"
                icon={Devices}
              >
                Subscription
              </Sidebar.Item>
            </Link>
            <Link to="/Apisharing">
              <Sidebar.Item
                className="bg-white text-[#80848F] text-[18px] p-2 mb-2  hover:text-[#34B7C1]"
                icon={fmcsa}
              >
                FMCSA
              </Sidebar.Item>
            </Link>
            <Sidebar.Item
              className="bg-white text-[#80848F] text-[18px] p-2 mb-2  hover:text-[#34B7C1] cursor-pointer"
              icon={logOut}
              onClick={() => LogOutHandler(navigate)}
            >
              Log-out
            </Sidebar.Item>
          </>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
export default SuperSidebar;
