/** @format */

import { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import profile from "../Assets/Header/profile.svg";
import { MenuBar, ViewProfile } from "../Components/Modals/Modals";
import { HiMenuAlt3 } from "react-icons/hi";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { returnFullName } from "../utils/utils";
import { IoChatbox } from "react-icons/io5";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const companyId = localStorage.getItem("companyId");

  useEffect(() => {
    if (companyId) {
      getApi(endPoints.companies.getDetail(companyId), {
        setResponse: setData,
      });
    }
  }, [companyId]);

  return (
    <>
      <MenuBar show={show} handleClose={() => setShow(false)} />
      <ViewProfile
        show={open}
        handleClose={() => setOpen(false)}
        data={data?.data}
      />
      <section className="navbar">
        <div className="right-div">
          <HiMenuAlt3
            size={26}
            style={{ color: "#34B7C1" }}
            className="ham-menu"
            onClick={() => setShow(true)}
          />
          <button>
            SRH LOGISTICS <RiArrowDropDownLine size={25} />
          </button>
        </div>
        <div className="flex items-center gap-8 left-div">
          <div
            className="flex gap-1 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <img src={profile} alt="" />

            <div className="flex flex-col text-[#1F384C]">
              <span className="font-semibold title">
                {" "}
                {returnFullName(data?.data)}{" "}
              </span>
              <span className="desc"> {data?.data?.email} </span>
            </div>
          </div>

          <Link to="/chat">
            <IoChatbox
              size={25}
              style={{ color: "#00A884", cursor: "pointer" }}
            />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Header;
