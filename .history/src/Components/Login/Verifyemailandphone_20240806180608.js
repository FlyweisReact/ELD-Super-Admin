/** @format */

import React, { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import { postApi } from "../../Repository/Api";
import { InputComponent } from "../HelpingComponent";
import endPoints from "../../Repository/apiConfig";

const Verifyemailandphone = () => {
  const userType = "SuperAdmin";
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = (e) => {
    e.preventDefault();
    const payload = {
      userType,
      email,
    };

    const showOtp = (res) => {
      console.log(res);
    };

    postApi(endPoints.auth.forgetPassword, payload, {
      additionalFunctions: [(res) => showOtp(res)],
      setLoading,
    });
  };

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
        {step === 1 && (
          <div>
            <div className="border-b p-10">
              <div className="font-bold text-3xl">Enter Mobile or Email</div>
              <div className="text-[#77878F]">
                You’ll receive a verification code shortly.
              </div>
            </div>
            <div className="p-10">
              <div>
                <label>Mobile</label>
                <br />
                <input className="border w-full h-[57px] mt-2" />
              </div>

              <div className="flex items-center gap-2 mt-2 justify-between">
                <hr className="border w-full" />
                or
                <hr className="border w-full" />
              </div>
              <div className="mt-2">
                <label>Email</label>
                <br />
                <InputComponent
                  className="border w-full h-[57px] mt-2 placeholder:pl-2"
                  type="email"
                  onChangeEvent={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div className="mt-5">
                <button
                  className="bg-[#34B7C1] uppercase font-bold flex justify-center items-center gap-2 text-xl text-[white] h-[63px] w-full"
                  onClick={() => setStep(step + 1)}
                >
                  {" "}
                  NEXt <IoArrowForward />{" "}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className=" border-b p-10">
              <div className="font-bold text-3xl">Enter Verification code.</div>
              <div className="text-[#77878F]">
                Verification code sent to your mobile number or email.
              </div>
            </div>
            <div className="p-10">
              <div>
                <label>Verification Code</label>
                <br />
                <input className="border w-full h-[57px] mt-2" />
              </div>

              <div className="mt-5">
                <button
                  onClick={() => setStep(step + 1)}
                  className="bg-[#34B7C1] uppercase font-bold flex justify-center items-center gap-2 text-xl text-[white] h-[63px] w-full"
                >
                  Send Code <IoArrowForward />
                </button>
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
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
                  <img
                    src="../Eye.png"
                    alt=""
                    className="absolute top-5 right-4"
                  />
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
        )}
      </div>
    </div>
  );
};

export default Verifyemailandphone;
