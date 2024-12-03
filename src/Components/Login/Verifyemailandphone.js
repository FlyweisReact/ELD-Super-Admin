/** @format */

import React, { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { postApi, showMsg } from "../../Repository/Api";
import { InputComponent } from "../HelpingComponent";
import endPoints from "../../Repository/apiConfig";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Verifyemailandphone = () => {
  const userType = "SuperAdmin";
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendOtp = (e) => {
    e.preventDefault();
    const payload = {
      userType,
      email,
    };

    const showOtp = (res) => {
      setId(res?.data?._id);
      showMsg("", res?.data?.otp, "info");
    };

    postApi(endPoints.auth.forgetPassword, payload, {
      additionalFunctions: [(res) => showOtp(res), () => setStep(2)],
      setLoading,
    });
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    const payload = {
      otp,
    };
    postApi(endPoints.auth.verifyOtp(id), payload, {
      additionalFunctions: [() => setStep(3)],
      setLoading,
    });
  };

  const resetPassword = (e) => {
    e.preventDefault();
    const payload = {
      otp,
      newPassword,
      confirmPassword,
    };
    postApi(endPoints.auth.changePassword(id), payload, {
      successMsg: "Password Reset !",
      additionalFunctions: [() => navigate("/")],
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
              <div className="font-bold text-3xl">Enter Email</div>
              <div className="text-[#77878F]">
                You’ll receive a verification code shortly.
              </div>
            </div>
            <form onSubmit={sendOtp}>
              <div className="p-10">
                {/* <div>
                  <label>Mobile</label>
                  <br />
                  <input className="border w-full h-[57px] mt-2" />
                </div>

                <div className="flex items-center gap-2 mt-2 justify-between">
                  <hr className="border w-full" />
                  or
                  <hr className="border w-full" />
                </div> */}
                <div className="mt-2">
                  <label>Email</label>
                  <br />
                  <InputComponent
                    className="border w-full h-[57px] mt-2 placeholder:pl-2"
                    type="email"
                    onChangeEvent={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>

                <div className="mt-5">
                  <button
                    className="bg-[#34B7C1] uppercase font-bold flex justify-center items-center gap-2 text-xl text-[white] h-[63px] w-full"
                    type="submit"
                  >
                    {loading ? (
                      <ClipLoader color="#fff" />
                    ) : (
                      <>
                        NEXT <IoArrowForward />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
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
            <form onSubmit={verifyOtp}>
              <div className="p-10">
                <div>
                  <label>Verification Code</label>
                  <br />

                  <InputComponent
                    className="border w-full h-[57px] mt-2 placeholder:pl-2"
                    type="text"
                    onChangeEvent={(e) => setOtp(e.target.value)}
                    value={otp}
                    required
                  />
                </div>

                <div className="mt-5">
                  <button
                    className="bg-[#34B7C1] uppercase font-bold flex justify-center items-center gap-2 text-xl text-[white] h-[63px] w-full"
                    type="submit"
                  >
                    {loading ? (
                      <ClipLoader color="#fff" />
                    ) : (
                      <>
                        Send Code <IoArrowForward />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
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
            <form onSubmit={resetPassword}>
              <div className="p-10">
                <div>
                  <label>New Password</label>
                  <br />

                  <InputComponent
                    className="border w-full h-[57px] mt-2 placeholder:pl-2"
                    type="password"
                    onChangeEvent={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    required
                  />
                </div>

                <div className="mt-2">
                  <label>Confirm Password</label>
                  <br />
                  <InputComponent
                    className="border w-full h-[57px] mt-2 placeholder:pl-2"
                    type="password"
                    onChangeEvent={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                  />
                </div>

                <div className="mt-5">
                  <button
                    className="bg-[#34B7C1] uppercase font-bold flex justify-center items-center gap-2 text-xl text-[white] h-[63px] w-full"
                    type="submit"
                  >
                    {loading ? <ClipLoader color="#fff" /> : " Set Password "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verifyemailandphone;
