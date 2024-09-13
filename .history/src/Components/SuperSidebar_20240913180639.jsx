/** @format */

import { Sidebar } from "flowbite-react";
import { ReactComponent as Devices } from "../Assets/Sidebar/devices.svg";
import { ReactComponent as logOut } from "../Assets/Sidebar/logout.svg";
import { ReactComponent as Layer } from "../Assets/Sidebar/layer.svg";
import { ReactComponent as CompanySvg } from "../Assets/Sidebar/company.svg";
import { ReactComponent as AdminSvg } from "../Assets/Sidebar/admin.svg";
import { Link, useNavigate } from "react-router-dom";
import { LogOutHandler } from "../utils/utils";
import logo from "../Assets/logo.png";

const SuperSidebar = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem("loggenIn-user");
  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      className={`bg-[#F9FBFF] h-[1500px] duration-500 text-gray-100 px-4`}
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <div className="siderbar-container">
            <div className="sibebar-logo-container">
              <img
                src={logo}
                alt=""
                className="sidebar-logo-img"
                onClick={() => navigate("/home")}
              />
            </div>
          </div>
          <Link to="/home">
            <Sidebar.Item
              className="bg-white text-[#80848F] text-[16px]  p-2 mb-2  hover:text-[#34B7C1]"
              icon={Layer}
            >
              Home
            </Sidebar.Item>
          </Link>
          <Link to="/companies">
            <Sidebar.Item
              className="bg-white text-[#80848F] text-[16px] p-2 mb-2  hover:text-[#34B7C1]"
              icon={CompanySvg}
            >
              Companies
            </Sidebar.Item>
          </Link>
          <Link to="/sub-admin">
            <Sidebar.Item
              className="bg-white text-[#80848F] text-[16px] p-2 mb-2  hover:text-[#34B7C1]"
              icon={AdminSvg}
            >
              Sub admin
            </Sidebar.Item>
          </Link>
          <Link to="/subscription">
            <Sidebar.Item
              className="bg-white text-[#80848F] text-[16px] p-2 mb-2  hover:text-[#34B7C1]"
              icon={Devices}
            >
              Subscription
            </Sidebar.Item>
          </Link>

          <Sidebar.Item
            className="bg-white text-[#80848F] text-[16px] p-2 mb-2  hover:text-[#34B7C1] cursor-pointer"
            icon={logOut}
            onClick={() => LogOutHandler(navigate)}
          >
            Log-out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
export default SuperSidebar;
