/** @format */

import React, { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import {
  SectionHeading,
  ButtonComponent,
} from "../Components/HelpingComponents.js";
import style from "../css/modules/profile.module.css";
import { getApi, putApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { EditHomeTerminal } from "../Components/Modals/Modals";
import { Modal } from "antd";

// Edit Company Office address
const EditOfficeAddress = ({ show, handleClose, fetchDetails, data }) => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    officeAddress1: "",
    officeAddress: "",
    officeCity: "",
    officeState: "",
    officeCountry: "",
    officeZipCode: "",
  });

  const updatePayload = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    putApi(endPoints.companies.updateDetail(data?._id), payload, {
      setLoading,
      successMsg: "Address updated successfully !",
      additionalFunctions: [fetchDetails, handleClose],
    });
  };

  // Populate form data when model is open and data is available
  useEffect(() => {
    if (show && data) {
      setPayload({
        officeAddress1: data.officeAddress1 || "",
        officeAddress: data.officeAddress || "",
        officeCity: data.officeCity || "",
        officeState: data.officeState || "",
        officeCountry: data.officeCountry || "",
        officeZipCode: data?.officeZipCode || "",
      });
    }
  }, [show, data]);

  return (
    <Modal
      centered
      title={"Edit Office Address"}
      open={show}
      onCancel={handleClose}
      footer={null}
      width={800}
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={submitHandler}>
          <div className="pl-5 pr-5">
            <div className="flex-inputs">
              <div>
                <label className="text-[#8E8F8F]">
                  Address Line 1 <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="text-input"
                  required
                  value={payload.officeAddress1}
                  name="officeAddress1"
                  onChange={updatePayload}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">
                  Address Line 2 <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="text-input"
                  required
                  value={payload.officeAddress}
                  name="officeAddress"
                  onChange={updatePayload}
                />
              </div>
            </div>

            <div className="flex-inputs">
              <div>
                <label className="text-[#8E8F8F]">
                  City <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="text-input"
                  required
                  value={payload.officeCity}
                  name="officeCity"
                  onChange={updatePayload}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">
                  State <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="text-input"
                  required
                  value={payload.officeState}
                  name="officeState"
                  onChange={updatePayload}
                />
              </div>
            </div>

            <div className="flex-inputs">
              <div>
                <label className="text-[#8E8F8F]">
                  Country <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="text-input"
                  required
                  value={payload.officeCountry}
                  name="officeCountry"
                  onChange={updatePayload}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">
                  Zipcode <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="text-input"
                  required
                  value={payload.officeZipCode}
                  name="officeZipCode"
                  onChange={updatePayload}
                />
              </div>
            </div>

            <div className="flex justify-between mt-5 gap-5">
              <ButtonComponent
                label={"Cancel"}
                className={
                  "bg-[#fff] w-[50%] h-[45px] text-[#eb5757] flex justify-center items-center gap-2 border border-red-500"
                }
                type="button"
                onClickEvent={handleClose}
              />
              <ButtonComponent
                label={"Update"}
                className={
                  "bg-[#86E3CE] border-[#86E3CE] w-[50%] h-[45px]  text-black font-bold flex justify-center items-center gap-2"
                }
                type="submit"
                isLoading={loading}
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

// Edit Company Shipping Address
const EditShippingAddress = ({ show, handleClose, fetchDetails, data }) => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    shippingAddress1: "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingCountry: "",
    shippingZipCode: "",
  });

  const updatePayload = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    putApi(endPoints.companies.updateDetail(data?._id), payload, {
      setLoading,
      successMsg: "Address updated successfully !",
      additionalFunctions: [fetchDetails, handleClose],
    });
  };

  // Populate form data when model is open and data is available
  useEffect(() => {
    if (show && data) {
      setPayload({
        shippingAddress1: data.shippingAddress1 || "",
        shippingAddress: data.shippingAddress || "",
        shippingCity: data.shippingCity || "",
        shippingState: data.shippingState || "",
        shippingCountry: data.shippingCountry || "",
        shippingZipCode: data.shippingZipCode || "",
      });
    }
  }, [show, data]);

  return (
    <Modal
      centered
      title={"Edit Shipping  Address"}
      open={show}
      onCancel={handleClose}
      footer={null}
      width={800}
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={submitHandler}>
          <div className="pl-5 pr-5">
            <div className="flex-inputs">
              <div>
                <label className="text-[#8E8F8F]">
                  Address Line 1 <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="text-input"
                  required
                  value={payload.shippingAddress1}
                  name="shippingAddress1"
                  onChange={updatePayload}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">
                  Address Line 2 <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="text-input"
                  required
                  value={payload.shippingAddress}
                  name="shippingAddress"
                  onChange={updatePayload}
                />
              </div>
            </div>

            <div className="flex-inputs">
              <div>
                <label className="text-[#8E8F8F]">
                  City <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="text-input"
                  required
                  value={payload.shippingCity}
                  name="shippingCity"
                  onChange={updatePayload}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">
                  State <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="text-input"
                  required
                  value={payload.shippingState}
                  name="shippingState"
                  onChange={updatePayload}
                />
              </div>
            </div>

            <div className="flex-inputs">
              <div>
                <label className="text-[#8E8F8F]">
                  Country <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="text-input"
                  required
                  value={payload.shippingCountry}
                  name="shippingCountry"
                  onChange={updatePayload}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">
                  Zipcode <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="text-input"
                  required
                  value={payload.shippingZipCode}
                  name="shippingZipCode"
                  onChange={updatePayload}
                />
              </div>
            </div>

            <div className="flex justify-between mt-5 gap-5">
              <ButtonComponent
                label={"Cancel"}
                className={
                  "bg-[#fff] w-[50%] h-[45px] text-[#eb5757] flex justify-center items-center gap-2 border border-red-500"
                }
                type="button"
                onClickEvent={handleClose}
              />
              <ButtonComponent
                label={"Update"}
                className={
                  "bg-[#86E3CE] border-[#86E3CE] w-[50%] h-[45px]  text-black font-bold flex justify-center items-center gap-2"
                }
                type="submit"
                isLoading={loading}
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

// Edit Terminal Address
const EditTerminalAddress = ({ show, handleClose, fetchDetails, data }) => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    terminalAddress1: "",
    terminalAddress: "",
    terminalCity: "",
    terminalState: "",
    terminalCountry: "",
    terminalZipCode: "",
  });

  const updatePayload = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    putApi(endPoints.companies.updateDetail(data?._id), payload, {
      setLoading,
      successMsg: "Address updated successfully !",
      additionalFunctions: [fetchDetails, handleClose],
    });
  };

  // Populate form data when model is open and data is available
  useEffect(() => {
    if (show && data) {
      setPayload({
        terminalAddress1: data.terminalAddress1 || "",
        terminalAddress: data.terminalAddress || "",
        terminalCity: data.terminalCity || "",
        terminalState: data.terminalState || "",
        terminalCountry: data.terminalCountry || "",
        terminalZipCode: data.terminalZipCode || "",
      });
    }
  }, [show, data]);

  return (
    <Modal
      centered
      title={"Edit Terminal  Address"}
      open={show}
      onCancel={handleClose}
      footer={null}
      width={800}
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={submitHandler}>
          <div className="pl-5 pr-5">
            <div className="flex-inputs">
              <div>
                <label className="text-[#8E8F8F]">
                  Address Line 1 <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="text-input"
                  required
                  value={payload.terminalAddress1}
                  name="terminalAddress1"
                  onChange={updatePayload}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">
                  Address Line 2 <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="text-input"
                  required
                  value={payload.terminalAddress}
                  name="terminalAddress"
                  onChange={updatePayload}
                />
              </div>
            </div>

            <div className="flex-inputs">
              <div>
                <label className="text-[#8E8F8F]">
                  City <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="text-input"
                  required
                  value={payload.terminalCity}
                  name="terminalCity"
                  onChange={updatePayload}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">
                  State <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="text-input"
                  required
                  value={payload.terminalState}
                  name="terminalState"
                  onChange={updatePayload}
                />
              </div>
            </div>

            <div className="flex-inputs">
              <div>
                <label className="text-[#8E8F8F]">
                  Country <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="text-input"
                  required
                  value={payload.terminalCountry}
                  name="terminalCountry"
                  onChange={updatePayload}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">
                  Zipcode <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="text-input"
                  required
                  value={payload.terminalZipCode}
                  name="terminalZipCode"
                  onChange={updatePayload}
                />
              </div>
            </div>

            <div className="flex justify-between mt-5 gap-5">
              <ButtonComponent
                label={"Cancel"}
                className={
                  "bg-[#fff] w-[50%] h-[45px] text-[#eb5757] flex justify-center items-center gap-2 border border-red-500"
                }
                type="button"
                onClickEvent={handleClose}
              />
              <ButtonComponent
                label={"Update"}
                className={
                  "bg-[#86E3CE] border-[#86E3CE] w-[50%] h-[45px]  text-black font-bold flex justify-center items-center gap-2"
                }
                type="submit"
                isLoading={loading}
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const Companyprofile = () => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [editOfficeAddress, setEditOfficeAddress] = useState(false);
  const [editShippingAddress, setEditShippingAddress] = useState(false);
  const [editTerminalAddress, setEditTerminalAddress] = useState(false);

  const updateImg = (file) => {
    const fd = new FormData();
    fd.append("image", file);

    putApi(endPoints.companies.updateDetail(profile?.data?._id), fd, {
      additionalFunctions: [() => window.location.reload()],
      successMsg: "Updated successfully",
    });
  };

  const updateUnitSysytem = (value) => {
    const fd = new FormData();
    fd.append("unitSystem", value);

    putApi(endPoints.companies.updateDetail(profile?.data?._id), fd, {
      additionalFunctions: [fetchProfile],
      successMsg: "Updated successfully",
    });
  };

  const fetchProfile = () => {
    getApi(endPoints.companies.getDetail, {
      setResponse: setProfile,
    });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const returnAddress = ({
    address1 = "",
    address2 = "",
    city = "",
    state = "",
    postalCode = "",
    country = "",
  }) => {
    const parts = [address1, address2, city, state, postalCode, country].filter(
      Boolean
    );
    return parts.join(", "); // Join the remaining parts with a comma
  };

  return (
    <div className="p-5">
      <EditHomeTerminal
        show={open}
        handleClose={() => setOpen(false)}
        fetchProfile={fetchProfile}
        data={profile}
      />
      <EditOfficeAddress
        show={editOfficeAddress}
        handleClose={() => setEditOfficeAddress(false)}
        fetchDetails={fetchProfile}
        data={profile?.data}
      />
      <EditShippingAddress
        show={editShippingAddress}
        handleClose={() => setEditShippingAddress(false)}
        fetchDetails={fetchProfile}
        data={profile?.data}
      />
      <EditTerminalAddress
        show={editTerminalAddress}
        handleClose={() => setEditTerminalAddress(false)}
        fetchDetails={fetchProfile}
        data={profile?.data}
      />

      <SectionHeading title={"Company Profile"} />

      <div className={style.flex_box}>
        <div className={style.info}>
          <div className={style.user_img}>
            {profile?.data?.profilePic ? (
              <img src={profile?.data?.profilePic} alt="" />
            ) : (
              <FaRegUserCircle color="#86E3CE" className={style.user_avatar} />
            )}
            <div className={style.edit_btn}>
              <CiEdit
                onClick={() => document.getElementById("avatar").click()}
              />
              <input
                type="file"
                style={{ display: "none" }}
                onChange={(e) => updateImg(e.target.files[0])}
                id="avatar"
              />
            </div>
          </div>
          <div className={style.detail}>
            <h5 className={style.owner_name}> {profile?.data?.owner} </h5>
            <div className={style.value_detail}>
              <p className={style.title}>Admin Email:</p>
              <p className={style.value}>{profile?.data?.email}</p>
            </div>
            <div className={style.value_detail}>
              <p className={style.title}>DOT:</p>
              <p className={style.value}>{profile?.data?.dot}</p>
            </div>
          </div>
        </div>

        <div className={style.remaining_option}>
          <div className={style.box}>
            <p className={style.label}>
              Change the Unit System for your Dashboard
            </p>

            <div className={style.icon}>
              <div className={style.input_container}>
                <input
                  type="radio"
                  name="unit"
                  id="miles"
                  value={"miles"}
                  checked={profile?.data?.unitSystem === "miles"}
                  onChange={(e) => updateUnitSysytem(e.target.value)}
                />
                <label className={style.input_label} htmlFor="miles">
                  Miles
                </label>
              </div>
              <div className={style.input_container}>
                <input
                  type="radio"
                  name="unit"
                  id="km"
                  value={"KiloMeter"}
                  checked={profile?.data?.unitSystem === "KiloMeter"}
                  onChange={(e) => updateUnitSysytem(e.target.value)}
                />
                <label className={style.input_label} htmlFor="km">
                  {" "}
                  Kilometers(km)
                </label>
              </div>
            </div>
          </div>
          <hr />
          <div className={style.box}>
            <p className={style.label}>
              Home Terminal Timezone
              <br />
              <span style={{ color: "#666666" }}>
                {profile?.data?.timeZone}
              </span>
            </p>

            <div className={style.icon}>
              <MdOutlineEdit
                style={{ color: "#86E3CE", cursor: "pointer" }}
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-5 flex-column">
        <div className="w-full  pl-5 pr-10 p-5 rounded-lg box-shadow">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <FaLocationDot color="#86E3CE" />{" "}
              <div
                className="text-slate-500"
                style={{ fontWeight: "600", fontSize: "14px" }}
              >
                Office Address
              </div>
            </div>
            <MdOutlineEdit
              color="#86E3CE"
              cursor={"pointer"}
              onClick={() => setEditOfficeAddress(true)}
            />
          </div>
          <div
            className="text-[#666666] font-semibold mt-1"
            style={{ fontWeight: "600", fontSize: "14px" }}
          >
            {returnAddress({
              address1: profile?.data?.officeAddress1,
              address2: profile?.data?.officeAddress,
              city: profile?.data?.officeCity,
              state: profile?.data?.officeState,
              country: profile?.data?.officeCountry,
              postalCode: profile?.data?.officeZipCode,
            })}
          </div>
        </div>
        <div className="w-full pl-5 pr-10 p-5 rounded-lg box-shadow">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <FaLocationDot color="#86E3CE" />{" "}
              <div
                className="text-slate-500"
                style={{ fontWeight: "600", fontSize: "14px" }}
              >
                Shipping Address
              </div>
            </div>
            <MdOutlineEdit
              color="#86E3CE"
              cursor="pointer"
              onClick={() => setEditShippingAddress(true)}
            />
          </div>
          <div
            className="text-[#666666] font-semibold mt-1"
            style={{ fontWeight: "600", fontSize: "14px" }}
          >
            {returnAddress({
              address1: profile?.data?.shippingAddress1,
              address2: profile?.data?.shippingAddress,
              city: profile?.data?.shippingCity,
              state: profile?.data?.shippingState,
              country: profile?.data?.shippingCountry,
              postalCode: profile?.data?.shippingZipCode,
            })}
          </div>
        </div>
        <div className="w-full pl-5 pr-10 p-5 rounded-lg box-shadow">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <FaLocationDot color="#86E3CE" />{" "}
              <div
                className="text-slate-500"
                style={{ fontWeight: "600", fontSize: "14px" }}
              >
                Terminal Address
              </div>
            </div>
            <MdOutlineEdit
              color="#86E3CE"
              cursor="pointer"
              onClick={() => setEditTerminalAddress(true)}
            />
          </div>
          <div
            className="text-[#666666] font-semibold mt-1"
            style={{ fontWeight: "600", fontSize: "14px" }}
          >
            {returnAddress({
              address1: profile?.data?.terminalAddress1,
              address2: profile?.data?.terminalAddress,
              city: profile?.data?.terminalCity,
              state: profile?.data?.terminalState,
              country: profile?.data?.terminalCountry,
              postalCode: profile?.data?.terminalZipCode,
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companyprofile;
