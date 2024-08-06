/** @format */

import React, { useState, useEffect } from "react";
import AutocompleteSearch from "../Components/AutoSearch";
import { PopUp } from "../Components/PopUp";
import { useNavigate } from "react-router-dom";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { AddCompany } from "../Components/Modals/Modals";

const Cards = ({ title, count, link }) => {
  const navigate = useNavigate();
  return (
    <div
      className="shadow shadow-white bg-white rounded-lg px-6 py-3 w-full cursor-pointer"
      onClick={() => navigate(link)}
    >
      <div className="flex justify-between">
        <img src="../Group 357.png" alt="" className="h-fit" />
        <span className="text-center font-semibold">{title} </span>
        <p></p>
      </div>
      <div className="flex justify-center items-center mt-10 mb-6">
        <div className="roundBg flex justify-center items-center ">
          <p className="bg-white w-[100px] h-[100px] rounded-full flex justify-center items-center text-[40px] text-[#1FADEA] font-bold">
            {count}
          </p>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate("");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [trucks, setTrucks] = useState({});
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState({
    data: {
      totalDocs: 0,
    },
  });

  useEffect(() => {
    getApi(endPoints.truck.getAllTrucks, {
      setResponse: setTrucks,
    });
    getApi(endPoints.company.getAll({}), {
      setResponse: setCompany,
    });
  }, []);

  return (
    <>
      <AddCompany show={open} handleClose={() => setOpen(false)} />
      <div className="homebackground h-[100%] pb-10">
        <div className="flex justify-center">
          <div className="mt-[80px] ">
            <p className="text-[20px]">Search</p>
            <div className="relative w-[280px] lg:w-[340px] mt-4">
              <AutocompleteSearch />
            </div>
          </div>
        </div>

        <div>
          <div className="mt-20 flex flex-col lg:flex-row justify-between gap-5 mx-4">
            <Cards title={"# TRUCKS"} count={trucks?.data?.totalDocs} />
            <Cards title={"# DRIVERS"} count={50} />
            <Cards
              title={"# COMPANIES"}
              count={company.data.totalDocs}
              link={"/super-logbook"}
            />
          </div>
          <div className="mt-20 flex flex-col lg:flex-row justify-center gap-5 mx-4">
            <div
              className=" basis-1/3 shadow shadow-white bg-[#E8FDFF] rounded-lg px-6 py-3 w-full cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <div className="flex justify-between">
                <img src="../Group 357.png" alt="" className="h-fit" />
                <span className="text-center font-bold text-[#1FADEA]">
                  # ADD NEW COMPANY
                </span>
                <p></p>
              </div>
              <div className="flex justify-center items-center mt-10 mb-6">
                <div className="rounded-full w-[180px] h-[180px] bg-white flex justify-center items-center ">
                  <p className="bg-[#E8FDFF] w-[100px] h-[100px] rounded-full flex justify-center items-center text-[40px] text-[#1FADEA] font-bold">
                    <img src="../Vector (19).png" alt="" />
                  </p>
                </div>
              </div>
              
            </div>
        
          </div>
          <div className="mt-20 flex flex-col lg:flex-row justify-center gap-5 mx-4">
            <div
              className=" basis-1/3 shadow shadow-white bg-[#E8FDFF] rounded-lg px-6 py-3 w-full cursor-pointer"
              onClick={() => setOpenPopUp(true)}
            >
              <div className="flex justify-between">
                <img src="../Group 357.png" alt="" className="h-fit" />
                <span className="text-center font-bold text-[#1FADEA]">
                  # ADD NEW COMPANY
                </span>
                <p></p>
              </div>
              <div className="flex justify-center items-center mt-10 mb-6">
                <div className="rounded-full w-[180px] h-[180px] bg-white flex justify-center items-center ">
                  <p className="bg-[#E8FDFF] w-[100px] h-[100px] rounded-full flex justify-center items-center text-[40px] text-[#1FADEA] font-bold">
                    <img src="../Vector (19).png" alt="" />
                  </p>
                </div>
              </div>
            </div>
       
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
