/** @format */
import React, { useState, useEffect } from "react";
import AutocompleteSearch from "../Components/AutoSearch";
import { useNavigate } from "react-router-dom";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { AddCompany } from "../Components/Modals/Modals";

const Cards = ({ title, count, link, onClickEvent }) => {
  const navigate = useNavigate();

  return onClickEvent ? (
    <div className="dashboard-cards" onClick={onClickEvent}>
      <div className="flex justify-between">
        <img src="../Group 357.png" alt="" className="h-fit" />
        <span className="text-center font-bold text-[#1FADEA]">{title}</span>
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
  ) : (
    count && (
      <div className="dashboard-cards" onClick={() => navigate(link)}>
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
    )
  );
};

const Home = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    fetchHandler();
  }, []);

  const fetchHandler = () => {
    getApi(endPoints.dashboard.get, {
      setResponse: setData,
    });
  };
  console.log(data);

  return (
    <>
      <AddCompany
        show={open}
        handleClose={() => setOpen(false)}
        fetchApi={fetchHandler}
      />
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
          <div className="flex-container mt-5">
            <Cards
              title={"Companies"}
              count={data?.data?.totalCorporate}
              link={"/companies"}
            />
            <Cards title={"Admin"} count={data?.data?.totalAdmin} />
            <Cards title={"Driver"} count={data?.data?.totalDriver} />
            <Cards title={"Truck"} count={data?.data?.totalTruck} />
            <Cards title={"User"} count={data?.data?.totalUser} />
            <Cards
              title={"# ADD NEW COMPANY"}
              onClickEvent={() => setOpen(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
