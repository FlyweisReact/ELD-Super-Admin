/** @format */

import { useEffect, useState } from "react";
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

  useEffect(() => {
    getApi(endPoints.companies.getDetail, {
      setResponse: setData,
    });
  }, []);

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
            className="ham-menu"
            color="#86E3CE"
            onClick={() => setShow(true)}
          />
          <button style={{ cursor: "default" }}>{data?.data?.owner}</button>
        </div>
        <div className="flex items-center gap-8 left-div">
          <div
            className="flex gap-1 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <img
              src={data?.data?.profilePic}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "100%",
                objectFit: "cover",
                objectPosition: "top",
              }}
              alt=""
            />

            <div className="flex flex-col text-[#1F384C]">
              <span className="font-semibold title">
                {" "}
                {returnFullName(data?.data)}{" "}
              </span>
              <span className="desc"> {data?.data?.email} </span>
            </div>
          </div>

          <Link to="/chat">
            <IoChatbox size={25} cursor={"pointer"} color="#86E3CE" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Header;
