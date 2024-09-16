/** @format */
import React, { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { postApi } from "../../Repository/Api";
import { InputComponent } from "../HelpingComponent";
import endPoints from "../../Repository/apiConfig";
import { ClipLoader } from "react-spinners";
import { logo } from "../../Assets";
import { showMsg } from "../../Repository/Api";
import { useNavigate, Link } from "react-router-dom";

const Forgetpassword = () => {
  const userType = "SuperAdmin";
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [otp, setOtp] = useState("");
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
      showMsg("", res?.data?.otp, "success");
    };

    postApi(endPoints.auth.forgetPassword, payload, {
      additionalFunctions: [(res) => showOtp(res), () => setStep(step + 1)],
      setLoading,
    });
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    const payload = { otp };
    postApi(endPoints.auth.verifyOtp(id), payload, {
      additionalFunctions: [() => setStep(step + 1)],
      setLoading,
    });
  };

  const resetPassword = (e) => {
    e.preventDefault();
    const payload = {
      newPassword,
      confirmPassword,
      otp,
    };

    postApi(endPoints.auth.changePassword(id), payload, {
      successMsg: "Password Reset !",
      additionalFunctions: [() => navigate("/")],
      setLoading,
    });
  };

  return (
    <div className=" login-page">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="" />
        </div>

        {step === 1 && (
          <div>
            <div className="detail-tab">
              <div className="title">Enter Mobile or Email</div>
              <div className="desc">
                {" "}
                You’ll receive a verification code shortly.
              </div>
            </div>

            <form onSubmit={sendOtp}>
              <div className="form-container">
                <div>
                  <label className="font-bold">Mobile</label>
                  <br />
                  <input className="border w-full h-[57px] mt-2 font-bold" />
                </div>

                <div className="flex items-center gap-2 mt-2 justify-between">
                  <hr className="border w-full" />
                  or
                  <hr className="border w-full" />
                </div>
                <div className="mt-2">
                  <label className="font-bold">Email</label>
                  <br />
                  <InputComponent
                    className="border font-bold w-full h-[57px] mt-2 placeholder:pl-2"
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
                  <label className="font-bold">Verification Code</label>
                  <br />
                  <InputComponent
                    className="border font-bold w-full h-[57px] mt-2 placeholder:pl-2"
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
                        NEXT <IoArrowForward />
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
                  <label className="font-bold">New Password</label>
                  <br />
                  <InputComponent
                    className="border font-bold w-full h-[57px] mt-2 placeholder:pl-2"
                    type="password"
                    onChangeEvent={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    required
                  />
                </div>

                <div className="mt-2">
                  <label className="font-bold">Confirm Password</label>
                  <br />
                  <InputComponent
                    className="border font-bold w-full h-[57px] mt-2 placeholder:pl-2"
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
                    {loading ? <ClipLoader color="#fff" /> : "Reset"}
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

export default Forgetpassword;
