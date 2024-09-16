/** @format */
import React, { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { postApi } from "../../Repository/Api";
import { InputComponent } from "../HelpingComponent";
import endPoints from "../../Repository/apiConfig";
import { ClipLoader } from "react-spinners";
import { logo } from "../../Assets";
import { showMsg } from "../../Repository/Api";
import { useNavigate } from "react-router-dom";

const Forgetpassword = () => {
  return (
    <div className="background h-screen flex justify-center items-center">
      <div className="w-[500px] h-[700px] rounded-lg bg-[white]">
        <div className="flex justify-center border-b">
          <img
            src="../nxt-eld-high-resolution-logo.png"
            alt=""
            className="w-[250px]"
          />
        </div>
        <div className=" border-b p-10">
          <div className="font-bold text-3xl">Set New Password</div>
          <div className="text-[#77878F]">
            Use combination of uppercase letter(XYZ), lowercase letter(xyz),
            numbers(1234) and symbols(!@&).
          </div>
        </div>
        <div className="p-10">
          <div>
            <label>New Password</label>
            <br />
            <input className="border w-full h-[57px] mt-2" />
          </div>

          <div className="mt-2">
            <label>Confirm Password</label>
            <br />
            <div className="relative">
              <input
                className="border w-full h-[50px] mt-2 pl-4 pr-12 placeholder:pl-2 "
                placeholder="Password"
              />
              <img src="../Eye.png" alt="" className="absolute top-5 right-4" />
            </div>
          </div>

          <div className="mt-5">
            <Link to="/Verifyemailandphone">
              <button className="bg-[#34B7C1] uppercase font-bold flex justify-center items-center gap-2 text-xl text-[white] h-[63px] w-full">
                Set PAssword <IoArrowForward />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgetpassword;
