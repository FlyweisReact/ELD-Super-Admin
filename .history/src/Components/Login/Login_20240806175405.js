/** @format */

import React, { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { postApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
  const userType = "SuperAdmin";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState(true);
  const [loading, setLoading] = useState(false);

  const payload = {
    email,
    password,
    userType,
  };

  const tokenSaver = (res) => {
    const token = res?.accessToken;
    localStorage.setItem("user-token", token);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    postApi(endPoints.auth.login, payload, {
      successMsg: "Welcome Back !",
      additionalFunctions: [(res) => tokenSaver(res), () => navigate("/home")],
      setLoading,
    });
  };

  return (
    <div className="background h-screen flex justify-center items-center">
      <div className="w-[500px] rounded-lg bg-[white]">
        <div className="flex justify-center border-b">
          <img
            src="../nxt-eld-high-resolution-logo.png"
            alt=""
            className="w-[250px]"
          />
        </div>
        <div className=" border-b p-10">
          <div className="font-bold text-3xl">Welcome to NXT ELD!</div>
          <div className="text-[#77878F]">Please log-in your account</div>
        </div>
        <form onSubmit={submitHandler}>
          <div className="px-10 py-6">
            <div>
              <label>Email Address / Mobile Number</label>
              <br />
              <input
                className="border w-full h-[50px] mt-2 pl-4"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-2">
              <label>Password</label>
              <br />
              <div className="relative">
                <input
                  className="border w-full h-[50px] mt-2 pl-4 pr-12 placeholder:pl-2 "
                  placeholder="Password"
                  required
                  type={inputType ? "password" : "text"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {inputType ? (
                  <i
                    className="fa-solid fa-eye-slash absolute top-5 right-4 cursor-pointer"
                    onClick={() => setInputType(!inputType)}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-eye absolute top-5 right-4 cursor-pointer"
                    onClick={() => setInputType(!inputType)}
                  ></i>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="h-[20px] w-[20px]" />
                <div className="text-[#475156]">Remember me</div>
              </div>
              <Link to="/Verifyemailandphone">
                <div className="text-[#252A34] font-semibold">
                  Forget Password?
                </div>
              </Link>
            </div>
            <div className="mt-5">
              {loading ? (
                <button
                  type="button"
                  className="bg-[#34B7C1] font-bold flex justify-center items-center gap-2 text-xl text-[white] h-[63px] w-full"
                >
                  <ClipLoader color="#fff" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-[#34B7C1] font-bold flex justify-center items-center gap-2 text-xl text-[white] h-[63px] w-full"
                >
                  Login <IoArrowForward />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
