/** @format */

import { Sidebar } from "flowbite-react";
import { ReactComponent as logbook } from "../Assets/Sidebar/logbook.svg";
import { ReactComponent as location } from "../Assets/Sidebar/location.svg";
import { ReactComponent as dascams } from "../Assets/Sidebar/dascams.svg";
import { ReactComponent as report } from "../Assets/Sidebar/report.svg";
import { ReactComponent as ifta } from "../Assets/Sidebar/ifta.svg";
import { ReactComponent as vehicles } from "../Assets/Sidebar/vehicles.svg";
import { ReactComponent as drivers } from "../Assets/Sidebar/drivers.svg";
import { ReactComponent as Devices } from "../Assets/Sidebar/devices.svg";
import { ReactComponent as userrole } from "../Assets/Sidebar/userrole.svg";
import { ReactComponent as testimonial } from "../Assets/Sidebar/testimonial.svg";
import { ReactComponent as alert } from "../Assets/Sidebar/alert.svg";
import { ReactComponent as fmcsa } from "../Assets/Sidebar/fmcsa.svg";
import { ReactComponent as diagonos } from "../Assets/Sidebar/diagonos.svg";
import { HiMenuAlt3, HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../Assets/logo.png";
import { twMerge } from "tailwind-merge";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";

const sideMenu = [
  {
    link: "Logbook",
    title: "Logbook",
    icon: logbook,
  },
  {
    link: "location",
    title: "Location",
    icon: location,
    subLinks: [
      { link: "Trackinglinks", title: "Traking Links" },
      { link: "Geofences", title: "Geofences" },
    ],
  },
  {
    link: "Dashcams",
    title: "Dashcams",
    icon: dascams,
  },
  {
    link: "Reports",
    title: "Reports",
    icon: report,
  },
  {
    title: "IFTA",
    icon: ifta,
    subLinks: [
      { link: "Iftatrips", title: "IFTA Trips" },
      { link: "Iftareports", title: "IFTA Reports" },
    ],
  },
  {
    title: "Vehicles",
    link: "vehicles",
    icon: vehicles,
    subLinks: [{ link: "Vehicles/trailers", title: "Trailers" }],
  },
  {
    link: "Drivers",
    title: "Drivers",
    icon: drivers,
  },
  {
    title: "Devices",
    link: "Devices",
    icon: Devices,
    subLinks: [
      { link: "Devices/TrackingDevices", title: "Tracking Devices" },
      { link: "Devices/SensorDevices", title: "Sensor Devices" },
      { link: "Devices/DashcamDevices", title: "Dashcam Devices" },
    ],
  },
  {
    link: "Userroles",
    title: "User Roles",
    icon: userrole,
  },
  {
    link: "Terminals",
    title: "Terminals",
    icon: testimonial,
  },
  {
    link: "Alerts",
    title: "Alerts",
    icon: alert,
  },
  {
    link: "Diagnosticevents",
    title: "Diagnostic",
    icon: diagonos,
  },
  {
    link: "Apisharing",
    title: "FMCSA",
    icon: fmcsa,
  },
];

const Newsidebar = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem("loggenIn-user");
  const [open, setOpen] = useState(true);
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    getApi(endPoints.users.getUserDetail(userData), {
      setResponse: setUserDetail,
    });
  }, [userData]);

  const permissions = userDetail?.data?.permissions || [];
  const hasPermission = (permission) => permissions.includes(permission);

  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      className={`bg-[#F9FBFF] h-[1500px] ${
        open ? "w-64 " : "w-24"
      } duration-500 text-gray-100 px-4`}
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <div className="sidebar-container">
            {!open ? (
              <HiMenuAlt3
                size={26}
                style={{ color: "#34B7C1" }}
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            ) : (
              <div style={{ width: "100%" }}>
                <div className="flex justify-end">
                  <HiMenuAlt3
                    size={26}
                    style={{ color: "#34B7C1" }}
                    className="cursor-pointer"
                    onClick={() => setOpen(!open)}
                  />
                </div>
                <div className="sibebar-logo-container">
                  <img
                    src={logo}
                    alt=""
                    className="sidebar-logo-img"
                    onClick={() => navigate("/home")}
                  />
                </div>
              </div>
            )}
          </div>

          {open ? (
            <>
              {sideMenu.map((item, index) =>
                item.subLinks
                  ? hasPermission(item.link) && (
                      <Link to={`/${item.link}`}>
                        <Sidebar.Collapse
                          key={index}
                          icon={item.icon}
                          label={item.title}
                          renderChevronIcon={(theme, open) => {
                            const IconComponent = open
                              ? HiOutlineMinusSm
                              : HiOutlinePlusSm;

                            return (
                              <IconComponent
                                aria-hidden
                                className={twMerge(
                                  theme.label.icon.open[open ? "on" : "off"]
                                )}
                              />
                            );
                          }}
                        >
                          {item.subLinks?.map((subItem, subIndex) => (
                            <Link to={`/${subItem.link}`} key={subIndex}>
                              <Sidebar.Item> {subItem.title} </Sidebar.Item>
                            </Link>
                          ))}
                        </Sidebar.Collapse>
                      </Link>
                    )
                  : hasPermission(item.link) && (
                      <Link to={`/${item.link}`} key={index}>
                        <Sidebar.Item icon={item.icon}>
                          {" "}
                          {item.title}{" "}
                        </Sidebar.Item>
                      </Link>
                    )
              )}
         
      
      
          ) : (
            <>
              <Link to="/Logbook">
                <Sidebar.Item icon={logbook}></Sidebar.Item>
              </Link>
              <Link to="/location">
                <Sidebar.Item icon={location}></Sidebar.Item>
              </Link>
              <Link to="/Dashcams">
                <Sidebar.Item icon={dascams}></Sidebar.Item>
              </Link>
              <Link to="/Reports">
                <Sidebar.Item icon={report}></Sidebar.Item>
              </Link>
              <Link to="/Iftatrips">
                <Sidebar.Item icon={ifta}></Sidebar.Item>
              </Link>
              <Link to="/vehicles">
                <Sidebar.Item icon={vehicles}></Sidebar.Item>
              </Link>
              <Link to="/Drivers">
                <Sidebar.Item icon={drivers}></Sidebar.Item>
              </Link>
              <Link to="/Devices">
                <Sidebar.Item icon={Devices}></Sidebar.Item>
              </Link>
              <Link to="/Userroles">
                <Sidebar.Item icon={userrole}></Sidebar.Item>
              </Link>
              <Link to="/Terminals">
                <Sidebar.Item icon={testimonial}></Sidebar.Item>
              </Link>
              <Link to="/Alerts">
                <Sidebar.Item icon={alert}></Sidebar.Item>
              </Link>
              <Link to="/Diagnosticevents">
                <Sidebar.Item icon={diagonos}></Sidebar.Item>
              </Link>
              <Link to="/Apisharing">
                <Sidebar.Item icon={fmcsa}></Sidebar.Item>
              </Link>
            </>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
export default Newsidebar;
