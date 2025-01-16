/** @format */
import { useEffect, useRef, useState } from "react";
import { getApi, postApi, putApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { Modal, Drawer } from "antd";
import { ButtonComponent, InputComponent } from "../HelpingComponent";
import tickmark from "../../Assets/Vechicledetail/vihiclegallary.svg";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import profile from "../../Assets/Header/profile.svg";
import { LogOutHandler, returnFullName } from "../../utils/utils";
import logo from "../../Assets/logo.png";
import DateFilter from "../DateFilter";
import Select from "react-select";
import { innerMenuOptions, statusMapping } from "../../constant/constant";

const CreateNewUser = ({ handleClose, show, fetchApi }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [terminal, setTerminal] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const [terminals, setTerminals] = useState({});
  const fullName = firstName + " " + lastName;
  const companyId = localStorage.getItem("companyId");

  const payload = {
    firstName,
    lastName,
    fullName,
    terminal,
    email,
    password,
    userType,
    company: companyId,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    postApi(endPoints.users.createNewUser, payload, {
      successMsg: "New user created !",
      setLoading,
      additionalFunctions: [fetchApi, handleClose],
    });
  };

  useEffect(() => {
    if (show) {
      getApi(endPoints.terminals.activeTerminal({ limit: 100 }), {
        setResponse: setTerminals,
      });
    }
  }, [show]);

  return (
    <Modal
      centered
      title="Add User"
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
                  First Name <span className="text-[#a63019]">*</span>
                </label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  required={true}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">
                  Last Name <span className="text-[#a63019]">*</span>
                </label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setLastName(e.target.value)}
                  value={lastName}
                  required={true}
                />
              </div>
            </div>
            <div className="flex-inputs">
              <div>
                <label className="text-[#8E8F8F]">
                  Email address <span className="text-[#a63019]">*</span>
                </label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setEmail(e.target.value)}
                  value={email}
                  required={true}
                  type="email"
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">Role *</label>
                <br />
                <select
                  className="text-select"
                  onChange={(e) => setUserType(e.target.value)}
                  value={userType}
                  required
                >
                  <option value="">select your preference</option>
                  <option value="User">User</option>
                  <option value="Driver">Driver</option>
                </select>
              </div>
            </div>

            <div className="flex-inputs">
              <div>
                <label className="text-[#8E8F8F]">Terminal</label>
                <br />
                <select
                  className="text-select"
                  onChange={(e) => setTerminal(e.target.value)}
                  value={terminal}
                  required
                >
                  <option value="">select your preference</option>
                  {terminals?.data?.docs?.map((i) => (
                    <option value={i._id} key={i?._id}>
                      {" "}
                      {i?.name}{" "}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[#8E8F8F]">Confirm Password *</label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setPassword(e.target.value)}
                  value={password}
                  required={true}
                  type="password"
                />
              </div>
            </div>

            <div className="flex justify-center mt-5 gap-5">
              <ButtonComponent
                label={"Cancel"}
                className={
                  "text-[#F56C89] w-[50%] h-[45px] bg-white border border-[#F56C89]"
                }
                onClickEvent={handleClose}
                type="button"
              />

              <ButtonComponent
                label={"Add"}
                className={
                  "bg-[#34B7C1] w-[50%] h-[45px]  text-white flex justify-center items-center gap-2"
                }
                isLoading={loading}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const ResetUserPassword = ({ open, handleCancel, userId, fetchApi }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const payload = {
    newPassword,
    confirmPassword,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    putApi(endPoints.users.updateUserPassword(userId), payload, {
      setLoading,
      successMsg: "Success !",
      additionalFunctions: [
        handleCancel,
        fetchApi,
        () => {
          setConfirmPassword("");
          setNewPassword("");
        },
      ],
    });
  };

  return (
    <Modal
      centered
      title="Reset Password"
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={submitHandler}>
          <div className="pl-5 pr-5">
            <div className="flex-inputs">
              <div>
                <label className="text-[#8E8F8F]">New Password *</label>
                <br />
                <InputComponent
                  placeholder="Type here...."
                  className="text-input"
                  onChangeEvent={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  required={true}
                  type={"password"}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">Confirm Password *</label>
                <br />
                <InputComponent
                  placeholder="Type here...."
                  className="text-input"
                  onChangeEvent={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required={true}
                  type={"password"}
                />
              </div>
            </div>

            <div className="flex justify-center mt-10 gap-5">
              <ButtonComponent
                label={"Cancel"}
                className={
                  "text-[#F56C89] w-[50%] h-[45px] bg-white border border-[#F56C89]"
                }
                onClickEvent={handleCancel}
                type="button"
              />
              <ButtonComponent
                label={"Reset"}
                className={
                  "bg-[#34B7C1] w-[50%] h-[45px]  text-white flex justify-center items-center gap-2"
                }
                isLoading={loading}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const EditUserDetails = ({ handleClose, show, fetchApi, userId, prevData }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [terminal, setTerminal] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const [terminals, setTerminals] = useState({});
  const fullName = firstName + " " + lastName;

  const payload = {
    firstName,
    lastName,
    fullName,
    terminal,
    email,
    userType,
  };

  const resetHandler = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setTerminal("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    putApi(endPoints.users.updateUserDetails(userId), payload, {
      successMsg: "Success !",
      setLoading,
      additionalFunctions: [resetHandler, handleClose, fetchApi],
    });
  };

  useEffect(() => {
    if (show && prevData) {
      setFirstName(prevData?.firstName);
      setLastName(prevData?.lastName);
      setTerminal(prevData?.terminal?._id);
      setEmail(prevData?.email);
      setUserType(prevData?.userType);
    }
  }, [show, prevData]);

  useEffect(() => {
    if (show) {
      getApi(endPoints.terminal.getAll({ limit: 50 }), {
        setResponse: setTerminals,
      });
    }
  }, [show]);

  return (
    <Modal
      centered
      title="Edit User"
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
                  First Name <span className="text-[#a63019]">*</span>
                </label>
                <br />
                <InputComponent
                  placeholder="First Name"
                  className="text-input"
                  onChangeEvent={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  required={true}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">
                  Last Name <span className="text-[#a63019]">*</span>
                </label>
                <br />
                <InputComponent
                  placeholder="Last Name"
                  className="text-input"
                  onChangeEvent={(e) => setLastName(e.target.value)}
                  value={lastName}
                  required={true}
                />
              </div>
            </div>

            <div className="flex-inputs">
              <div>
                <label className="text-[#8E8F8F]">
                  Email address <span className="text-[#a63019]">*</span>
                </label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setEmail(e.target.value)}
                  value={email}
                  required={true}
                  type="email"
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">
                  Role <span className="text-[#a63019]">*</span>
                </label>
                <br />
                <select
                  className="text-select"
                  onChange={(e) => setUserType(e.target.value)}
                  value={userType}
                  required
                >
                  <option value="">select your preference</option>
                  <option value="User">User</option>
                  <option value="Driver">Driver</option>
                </select>
              </div>
            </div>

            <div className="flex-inputs">
              <div>
                <label className="text-[#8E8F8F]">
                  Terminal <span className="text-[#a63019]">*</span>
                </label>
                <br />
                <select
                  className="text-select"
                  onChange={(e) => setTerminal(e.target.value)}
                  value={terminal}
                  required
                >
                  <option value="">select your preference</option>
                  {terminals?.data?.docs?.map((i) => (
                    <option value={i._id} key={i?._id}>
                      {" "}
                      {i?.name}{" "}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center mt-5 gap-5">
              <ButtonComponent
                label={"Cancel"}
                className={
                  "text-[#F56C89] w-[50%] h-[45px] bg-white border border-[#F56C89]"
                }
                onClickEvent={handleClose}
                type="button"
              />

              <ButtonComponent
                label={"Submit"}
                className={
                  "bg-[#34B7C1] w-[50%] h-[45px]  text-white flex justify-center items-center gap-2"
                }
                isLoading={loading}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const CreateTerminal = ({ handleClose, show, fetchApi, isEdit, prevData }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [contact, setContact] = useState("");
  const companyId = localStorage.getItem("companyId");

  const payload = {
    name,
    address,
    timeZone,
    contact,
    company: companyId,
  };

  const resetHandler = () => {
    setName("");
    setAddress("");
    setTimeZone("");
    setContact("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    postApi(endPoints.terminals.createTerminal, payload, {
      setLoading,
      successMsg: "Success !",
      additionalFunctions: [handleClose, fetchApi, resetHandler],
    });
  };

  const updateHandler = (e) => {
    e.preventDefault();
    putApi(endPoints.terminals.updateTerminal(prevData?._id), payload, {
      setLoading,
      successMsg: "Success !",
      additionalFunctions: [handleClose, fetchApi, resetHandler],
    });
  };

  useEffect(() => {
    if (show && prevData && isEdit) {
      setName(prevData?.name);
      setAddress(prevData?.address);
      setTimeZone(prevData?.timeZone);
      setContact(prevData?.contact);
    } else {
      resetHandler();
    }
  }, [show, prevData, isEdit]);

  return (
    <Modal
      centered
      title={isEdit ? "Edit Terminal" : "Add Terminal"}
      open={show}
      onCancel={handleClose}
      footer={null}
      width={800}
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={isEdit ? updateHandler : submitHandler}>
          <div className="pl-5 pr-5">
            <div className="flex-inputs">
              <div style={{ width: "100%" }}>
                <label className="text-[#8E8F8F]">Terminal Name *</label>
                <br />
                <InputComponent
                  placeholder="Type here"
                  className="text-input"
                  onChangeEvent={(e) => setName(e.target.value)}
                  value={name}
                  required={true}
                />
              </div>
            </div>

            <div className="flex-inputs">
              <div>
                <label className="text-[#8E8F8F]">Terminal Address *</label>
                <br />
                <InputComponent
                  placeholder="Type here..."
                  className="text-input"
                  onChangeEvent={(e) => setAddress(e.target.value)}
                  value={address}
                  required={true}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">Timezone*</label>
                <br />

                <select
                  className="text-select"
                  onChange={(e) => setTimeZone(e.target.value)}
                  required
                  value={timeZone}
                >
                  <option value="">Select your preference</option>
                  <option value={"Eastern Time (US & Canada)"}>
                    Eastern Time (US & Canada)
                  </option>
                </select>
              </div>
            </div>

            <div className="flex-inputs">
              <div style={{ width: "100%" }}>
                <label className="text-[#8E8F8F]">
                  Select terminal contact
                </label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setContact(e.target.value)}
                  value={contact}
                  required={true}
                />
              </div>
            </div>

            <div className="flex justify-center mt-10 gap-5">
              <ButtonComponent
                label={"Cancel"}
                className={
                  "text-[#F56C89] w-[50%] h-[45px] bg-white border border-[#F56C89]"
                }
                onClickEvent={handleClose}
                type="button"
              />

              <ButtonComponent
                label={"Submit"}
                className={
                  "bg-[#34B7C1] w-[50%] h-[45px]  text-white flex justify-center items-center gap-2"
                }
                isLoading={loading}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const AddCompany = ({ handleClose, show, fetchApi }) => {
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Company Details");
  const [payload, setPayload] = useState({
    fullName: "",
    dot: "",
    contact: "",
    address: "",
    owner: "",
    email: "",
    password: "",
    officeAddress1: "",
    officeAddress: "",
    officeCity: "",
    officeState: "",
    officeCountry: "",
    officeZipCode: "",
    shippingAddress1: "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingCountry: "",
    shippingZipCode: "",
    terminalAddress1: "",
    terminalAddress: "",
    terminalCity: "",
    terminalState: "",
    terminalCountry: "",
    terminalZipCode: "",
  });

  const nextHandler = (value) => {
    setSelectedTab(value);
  };

  const updatePayload = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    postApi(endPoints.company.create, payload, {
      successMsg: "Created !",
      setLoading,
      additionalFunctions: [fetchApi, handleClose],
    });
  };

  const tabsOptions = [
    {
      value: "Company Details",
      label: "Company Details",
    },
    {
      value: "Office Address",
      label: "Office Address",
    },
    {
      value: "Shipping Address",
      label: "Shipping Address",
    },
    {
      value: "Terminal Address",
      label: "Terminal Address",
    },
  ];

  return (
    <Modal
      centered
      title="Add Company"
      open={show}
      onCancel={handleClose}
      footer={null}
      width={1000}
    >
      <div className="reset-password-modal">
        <hr />

        <form onSubmit={submitHandler}>
          <div className="pl-5 pr-5">
            <div
              className="add-steps mt-2"
              style={{ justifyContent: "center" }}
            >
              {tabsOptions?.map((item, index) => (
                <div
                  className={`step ${
                    selectedTab === item.value ? "active" : ""
                  } `}
                  style={{ width: "24%" }}
                  key={item?.value}
                >
                  <p className="count" style={{ fontSize: "12px" }}>
                    {" "}
                    {index + 1}{" "}
                  </p>
                  <p className="title" style={{ fontSize: "12px" }}>
                    {" "}
                    {item?.label}{" "}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {selectedTab === "Company Details" && (
            <div className="pl-5 pr-5">
              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Company Name*</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter company name"
                    className="text-input"
                    required
                    onChange={updatePayload}
                    name="fullName"
                    value={payload.fullName}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">DOT*</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter DOT"
                    className="text-input"
                    required
                    onChange={updatePayload}
                    name="dot"
                    value={payload.dot}
                  />
                </div>
              </div>

              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Contact*</label>
                  <br />

                  <input
                    type="text"
                    placeholder="Enter company contact"
                    className="text-input"
                    required
                    onChange={updatePayload}
                    name="contact"
                    value={payload.contact}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Address*</label>
                  <br />

                  <input
                    type="text"
                    placeholder="Enter company address"
                    className="text-input"
                    required
                    onChange={updatePayload}
                    name="address"
                    value={payload.address}
                  />
                </div>
              </div>

              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Owner*</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter owner name"
                    className="text-input"
                    required
                    onChange={updatePayload}
                    name="owner"
                    value={payload.owner}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Email*</label>
                  <br />
                  <input
                    type="email"
                    placeholder="Enter owner email"
                    className="text-input"
                    required
                    onChange={updatePayload}
                    name="email"
                    value={payload.email}
                  />
                </div>
              </div>

              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">
                    Password* (min length : 6)
                  </label>
                  <br />
                  <input
                    type="password"
                    className="text-input"
                    required
                    onChange={updatePayload}
                    name="password"
                    value={payload.password}
                    minLength={6}
                  />
                </div>
              </div>

              <div className="flex justify-center mt-5 gap-5 m-5">
                <ButtonComponent
                  label={"Cancel"}
                  className={
                    "text-[#F56C89] w-[180px] h-[45px] bg-white border border-[#F56C89]"
                  }
                  onClickEvent={handleClose}
                  type="button"
                />

                <ButtonComponent
                  label={"Continue"}
                  className={
                    "bg-[#86E3CE] w-[180px] h-[45px]  text-black font-semibold flex justify-center items-center gap-2"
                  }
                  type={"button"}
                  onClickEvent={() => nextHandler("Office Address")}
                />
              </div>
            </div>
          )}

          {selectedTab === "Office Address" && (
            <div className="pl-5 pr-5">
              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]"> Address Line 1</label>
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
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]"> Address Line 2</label>
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

              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">City</label>
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
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">State</label>
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

              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Country</label>
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
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Zipcode</label>
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

              <div className="flex justify-center mt-5 gap-5 m-5">
                <ButtonComponent
                  label={"Go Back"}
                  className={
                    "text-[#939Eb9] w-[180px] h-[45px] bg-white border border-[#939Eb9]"
                  }
                  onClickEvent={() => nextHandler("Company Details")}
                  type="button"
                />

                <ButtonComponent
                  label={"Continue"}
                  className={
                    "bg-[#86E3CE] w-[180px] h-[45px]  text-black font-semibold flex justify-center items-center gap-2"
                  }
                  type={"button"}
                  onClickEvent={() => nextHandler("Shipping Address")}
                />
              </div>
            </div>
          )}

          {selectedTab === "Shipping Address" && (
            <div className="pl-5 pr-5">
              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]"> Address Line 1</label>
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
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]"> Address Line 2</label>
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

              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">City</label>
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
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">State</label>
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

              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Country</label>
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
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Zipcode</label>
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

              <div className="flex justify-center mt-5 gap-5 m-5">
                <ButtonComponent
                  label={"Go Back"}
                  className={
                    "text-[#939Eb9] w-[180px] h-[45px] bg-white border border-[#939Eb9]"
                  }
                  onClickEvent={() => nextHandler("Office Address")}
                  type="button"
                />

                <ButtonComponent
                  label={"Continue"}
                  className={
                    "bg-[#86E3CE] w-[180px] h-[45px]  text-black font-semibold flex justify-center items-center gap-2"
                  }
                  type={"button"}
                  onClickEvent={() => nextHandler("Terminal Address")}
                />
              </div>
            </div>
          )}

          {selectedTab === "Terminal Address" && (
            <div className="pl-5 pr-5">
              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]"> Address Line 1</label>
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
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]"> Address Line 2</label>
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

              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">City</label>
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
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">State</label>
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

              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Country</label>
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
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Zipcode</label>
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

              <div className="flex justify-center mt-5 gap-5 m-5">
                <ButtonComponent
                  label={"Go Back"}
                  className={
                    "text-[#939Eb9] w-[180px] h-[45px] bg-white border border-[#939Eb9]"
                  }
                  onClickEvent={() => nextHandler("Shipping Address")}
                  type="button"
                />

                <ButtonComponent
                  label={"Submit"}
                  className={
                    "bg-[#86E3CE] w-[180px] h-[45px]  text-black font-semibold flex justify-center items-center gap-2"
                  }
                  type={"submit"}
                  isLoading={loading}
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </Modal>
  );
};

// Edit Company Details
const EditCompany = ({ handleClose, show, fetchApi, prevData }) => {
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Company Details");
  const [payload, setPayload] = useState({
    fullName: "",
    dot: "",
    contact: "",
    address: "",
    owner: "",
    email: "",
    officeAddress1: "",
    officeAddress: "",
    officeCity: "",
    officeState: "",
    officeCountry: "",
    officeZipCode: "",
    shippingAddress1: "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingCountry: "",
    shippingZipCode: "",
    terminalAddress1: "",
    terminalAddress: "",
    terminalCity: "",
    terminalState: "",
    terminalCountry: "",
    terminalZipCode: "",
  });

  useEffect(() => {
    if (show && prevData) {
      setPayload({
        fullName: prevData.fullName || "",
        dot: prevData.dot || "",
        contact: prevData.contact || "",
        address: prevData.address || "",
        owner: prevData.owner || "",
        email: prevData.email || "",
        officeAddress1: prevData.officeAddress1 || "",
        officeAddress: prevData.officeAddress || "",
        officeCity: prevData.officeCity || "",
        officeState: prevData.officeState || "",
        officeCountry: prevData.officeCountry || "",
        officeZipCode: prevData.officeZipCode || "",
        shippingAddress1: prevData.shippingAddress1 || "",
        shippingAddress: prevData.shippingAddress || "",
        shippingCity: prevData.shippingCity || "",
        shippingState: prevData.shippingState || "",
        shippingCountry: prevData.shippingCountry || "",
        shippingZipCode: prevData.shippingZipCode || "",
        terminalAddress1: prevData.terminalAddress1 || "",
        terminalAddress: prevData.terminalAddress || "",
        terminalCity: prevData.terminalCity || "",
        terminalState: prevData.terminalState || "",
        terminalCountry: prevData.terminalCountry || "",
        terminalZipCode: prevData.terminalZipCode || "",
      });
    }
  }, [show, prevData]);

  const updatePayload = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    putApi(endPoints.company.updateDetail(prevData?._id), payload, {
      successMsg: "updated !",
      setLoading,
      additionalFunctions: [fetchApi, handleClose],
    });
  };

  const tabsOptions = [
    {
      value: "Company Details",
      label: "Company Details",
    },
    {
      value: "Office Address",
      label: "Office Address",
    },
    {
      value: "Shipping Address",
      label: "Shipping Address",
    },
    {
      value: "Terminal Address",
      label: "Terminal Address",
    },
  ];

  const nextHandler = (value) => {
    setSelectedTab(value);
  };

  return (
    <Modal
      centered
      title="Edit Company"
      open={show}
      onCancel={handleClose}
      footer={null}
      width={1000}
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={submitHandler}>
          <div className="pl-5 pr-5">
            <div
              className="add-steps mt-2"
              style={{ justifyContent: "center" }}
            >
              {tabsOptions?.map((item, index) => (
                <div
                  className={`step cursor-pointer ${
                    selectedTab === item.value ? "active" : ""
                  } `}
                  style={{ width: "24%" }}
                  key={item?.value}
                  onClick={() => nextHandler(item.value)}
                >
                  <p className="count" style={{ fontSize: "12px" }}>
                    {" "}
                    {index + 1}{" "}
                  </p>
                  <p className="title" style={{ fontSize: "12px" }}>
                    {" "}
                    {item?.label}{" "}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {selectedTab === "Company Details" && (
            <div className="pl-5 pr-5">
              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Company Name*</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter company name"
                    className="text-input"
                    required
                    onChange={updatePayload}
                    name="fullName"
                    value={payload.fullName}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">DOT*</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter DOT"
                    className="text-input"
                    required
                    onChange={updatePayload}
                    name="dot"
                    value={payload.dot}
                  />
                </div>
              </div>

              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Contact*</label>
                  <br />

                  <input
                    type="text"
                    placeholder="Enter company contact"
                    className="text-input"
                    required
                    onChange={updatePayload}
                    name="contact"
                    value={payload.contact}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Address*</label>
                  <br />

                  <input
                    type="text"
                    placeholder="Enter company address"
                    className="text-input"
                    required
                    onChange={updatePayload}
                    name="address"
                    value={payload.address}
                  />
                </div>
              </div>

              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Owner*</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter owner name"
                    className="text-input"
                    required
                    onChange={updatePayload}
                    name="owner"
                    value={payload.owner}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Email*</label>
                  <br />
                  <input
                    type="email"
                    placeholder="Enter owner email"
                    className="text-input"
                    required
                    onChange={updatePayload}
                    name="email"
                    value={payload.email}
                  />
                </div>
              </div>

              <div className="flex justify-center mt-5 gap-5 m-5">
                <ButtonComponent
                  label={"Cancel"}
                  className={
                    "text-[#F56C89] w-[180px] h-[45px] bg-white border border-[#F56C89]"
                  }
                  onClickEvent={handleClose}
                  type="button"
                />

                <ButtonComponent
                  label={"Continue"}
                  className={
                    "bg-[#86E3CE] w-[180px] h-[45px]  text-black font-semibold flex justify-center items-center gap-2"
                  }
                  type={"button"}
                  onClickEvent={() => nextHandler("Office Address")}
                />
              </div>
            </div>
          )}

          {selectedTab === "Office Address" && (
            <div className="pl-5 pr-5">
              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]"> Address Line 1</label>
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
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]"> Address Line 2</label>
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

              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">City</label>
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
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">State</label>
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

              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Country</label>
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
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Zipcode</label>
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

              <div className="flex justify-center mt-5 gap-5 m-5">
                <ButtonComponent
                  label={"Go Back"}
                  className={
                    "text-[#939Eb9] w-[180px] h-[45px] bg-white border border-[#939Eb9]"
                  }
                  onClickEvent={() => nextHandler("Company Details")}
                  type="button"
                />

                <ButtonComponent
                  label={"Continue"}
                  className={
                    "bg-[#86E3CE] w-[180px] h-[45px]  text-black font-semibold flex justify-center items-center gap-2"
                  }
                  type={"button"}
                  onClickEvent={() => nextHandler("Shipping Address")}
                />
              </div>
            </div>
          )}

          {selectedTab === "Shipping Address" && (
            <div className="pl-5 pr-5">
              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]"> Address Line 1</label>
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
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]"> Address Line 2</label>
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

              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">City</label>
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
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">State</label>
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

              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Country</label>
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
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Zipcode</label>
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

              <div className="flex justify-center mt-5 gap-5 m-5">
                <ButtonComponent
                  label={"Go Back"}
                  className={
                    "text-[#939Eb9] w-[180px] h-[45px] bg-white border border-[#939Eb9]"
                  }
                  onClickEvent={() => nextHandler("Office Address")}
                  type="button"
                />

                <ButtonComponent
                  label={"Continue"}
                  className={
                    "bg-[#86E3CE] w-[180px] h-[45px]  text-black font-semibold flex justify-center items-center gap-2"
                  }
                  type={"button"}
                  onClickEvent={() => nextHandler("Terminal Address")}
                />
              </div>
            </div>
          )}

          {selectedTab === "Terminal Address" && (
            <div className="pl-5 pr-5">
              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]"> Address Line 1</label>
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
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]"> Address Line 2</label>
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

              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">City</label>
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
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">State</label>
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

              <div className="gap-5 justify-between mt-5 flex ">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Country</label>
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
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">Zipcode</label>
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

              <div className="flex justify-center mt-5 gap-5 m-5">
                <ButtonComponent
                  label={"Go Back"}
                  className={
                    "text-[#939Eb9] w-[180px] h-[45px] bg-white border border-[#939Eb9]"
                  }
                  onClickEvent={() => nextHandler("Shipping Address")}
                  type="button"
                />

                <ButtonComponent
                  label={"Submit"}
                  className={
                    "bg-[#86E3CE] w-[180px] h-[45px]  text-black font-semibold flex justify-center items-center gap-2"
                  }
                  type={"submit"}
                  isLoading={loading}
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </Modal>
  );
};

const EditVehicleDetails = ({ handleClose, show, fetchApi, prevData }) => {
  const [loading, setLoading] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vinNumber, setVinNumber] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [fuelTank, setFuelTank] = useState("");

  const payload = {
    vehicleNumber,
    vehicleType,
    vinNumber,
    vehicleModel,
    fuelTank,
    fuelType,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    putApi(endPoints.vehicles.editVehicleDetails(prevData?._id), payload, {
      successMsg: "Updated!",
      setLoading,
      additionalFunctions: [fetchApi, handleClose],
    });
  };

  useEffect(() => {
    if (show && prevData) {
      setVehicleNumber(prevData?.vehicleNumber);
      setVehicleType(prevData?.vehicleType);
      setVinNumber(prevData?.vinNumber);
      setVehicleModel(prevData?.vehicleModel);
      setFuelType(prevData?.fuelType);
      setFuelTank(prevData?.fuelTank);
    }
  }, [show && prevData]);

  return (
    <Modal
      centered
      title="Vehicle Details"
      open={show}
      onCancel={handleClose}
      footer={null}
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={submitHandler}>
          <div className="pl-5 pr-5">
            <div className="gap-5 justify-center mt-5 flex flex-col">
              <div>
                <label className="text-[#8E8F8F]">Vehicle Number*</label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setVehicleNumber(e.target.value)}
                  value={vehicleNumber}
                  required={true}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">Vehicle Type*</label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setVehicleType(e.target.value)}
                  value={vehicleType}
                  required={true}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">Vin Number*</label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setVinNumber(e.target.value)}
                  value={vinNumber}
                  required={true}
                />
              </div>

              <div>
                <label className="text-[#8E8F8F]">Vehicle Model</label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setVehicleModel(e.target.value)}
                  value={vehicleModel}
                  required={true}
                />
              </div>

              <div>
                <label className="text-[#8E8F8F]">Fuel Type</label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setFuelType(e.target.value)}
                  value={fuelType}
                  required={true}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">
                  Fuel tank Capacity (in gallons)
                </label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setFuelTank(e.target.value)}
                  value={fuelTank}
                  required={true}
                />
              </div>
            </div>

            <div className="flex justify-center mt-5 gap-5 m-5">
              <ButtonComponent
                label={"Cancel"}
                className={
                  "text-[#F56C89] w-[180px] h-[45px] bg-white border border-[#F56C89]"
                }
                onClickEvent={handleClose}
                type="button"
              />

              <ButtonComponent
                label={"Update"}
                className={
                  "bg-[#34B7C1] w-[180px] h-[45px]  text-white flex justify-center items-center gap-2"
                }
                isLoading={loading}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const EditVehicleRegestration = ({ handleClose, show, fetchApi, prevData }) => {
  const [loading, setLoading] = useState(false);
  const [registrationNumber, setRegestrationNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [emailAlertDaysPrior, setEmailAlertDaysPrios] = useState(0);

  const payload = {
    registrationNumber,
    expireDate,
    emailAlertDaysPrior,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    putApi(endPoints.vehicles.updateRegestration(prevData?._id), payload, {
      successMsg: "Updated!",
      setLoading,
      additionalFunctions: [fetchApi, handleClose],
    });
  };

  useEffect(() => {
    if (show && prevData) {
      setRegestrationNumber(prevData?.registrationNumber);
      setExpireDate(prevData?.expireDate?.slice(0, 10));
      setEmailAlertDaysPrios(prevData?.emailAlertDaysPrior);
    }
  }, [show && prevData]);

  return (
    <Modal
      centered
      title="Vehicle Registration"
      open={show}
      onCancel={handleClose}
      footer={null}
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={submitHandler}>
          <div className="pl-5 pr-5">
            <div className="gap-5 justify-center mt-5 flex flex-col">
              <div>
                <label className="text-[#8E8F8F]">Registration Number</label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setRegestrationNumber(e.target.value)}
                  value={registrationNumber}
                  required={true}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">Expiry Date</label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setExpireDate(e.target.value)}
                  value={expireDate}
                  required={true}
                  type="date"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <img src={tickmark} alt="" />
                  <label className="text-[#8E8F8F]">
                    Received email alerts
                  </label>
                </div>
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setEmailAlertDaysPrios(e.target.value)}
                  value={emailAlertDaysPrior}
                  required={true}
                  type="number"
                />
              </div>
            </div>

            <div className="flex flex-col mt-3">
              <div className="text-[#8E8F8F]">Days in prior</div>
            </div>

            <div className="flex justify-center mt-5 gap-5 m-5">
              <ButtonComponent
                label={"Cancel"}
                className={
                  "text-[#F56C89] w-[180px] h-[45px] bg-white border border-[#F56C89]"
                }
                onClickEvent={handleClose}
                type="button"
              />

              <ButtonComponent
                label={"Update"}
                className={
                  "bg-[#34B7C1] w-[180px] h-[45px]  text-white flex justify-center items-center gap-2"
                }
                isLoading={loading}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const EditTruckLiability = ({ handleClose, show, fetchApi, prevData }) => {
  const [loading, setLoading] = useState(false);
  const [liabilityInsuranceName, setLiabilityInsuranceName] = useState("");
  const [liabilityInsuranceNumber, setLiabilityInsuranceNumber] = useState("");
  const [liabilityInsuranceExpireDate, setLiabilityInsuranceExpireDate] =
    useState("");
  const [
    liabilityInsuranceEmailAlertDaysPrior,
    setLiabilityInsuranceEmailAlertDaysPrior,
  ] = useState("");

  const payload = {
    liabilityInsuranceName,
    liabilityInsuranceNumber,
    liabilityInsuranceExpireDate,
    liabilityInsuranceEmailAlertDaysPrior,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    putApi(endPoints.vehicles.editTruckLiability(prevData?._id), payload, {
      successMsg: "Updated!",
      setLoading,
      additionalFunctions: [fetchApi, handleClose],
    });
  };

  useEffect(() => {
    if (show && prevData) {
      setLiabilityInsuranceName(prevData?.liabilityInsuranceName);
      setLiabilityInsuranceNumber(prevData?.liabilityInsuranceNumber);
      setLiabilityInsuranceExpireDate(
        prevData?.liabilityInsuranceExpireDate?.slice(0, 10)
      );
      setLiabilityInsuranceEmailAlertDaysPrior(
        prevData?.liabilityInsuranceEmailAlertDaysPrior
      );
    }
  }, [show && prevData]);

  return (
    <Modal
      centered
      title="Liability Insurance"
      open={show}
      onCancel={handleClose}
      footer={null}
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={submitHandler}>
          <div className="pl-5 pr-5">
            <div className="gap-5 justify-center mt-5 flex flex-col">
              <div>
                <label className="text-[#8E8F8F]">Insurance Name</label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) =>
                    setLiabilityInsuranceName(e.target.value)
                  }
                  value={liabilityInsuranceName}
                  required={true}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">Insurance Number</label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) =>
                    setLiabilityInsuranceNumber(e.target.value)
                  }
                  value={liabilityInsuranceNumber}
                  required={true}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">Insurance expiry Date</label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) =>
                    setLiabilityInsuranceExpireDate(e.target.value)
                  }
                  value={liabilityInsuranceExpireDate}
                  required={true}
                  type="date"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <img src={tickmark} alt="" />
                  <label className="text-[#8E8F8F]">
                    Received email alerts
                  </label>
                </div>
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) =>
                    setLiabilityInsuranceEmailAlertDaysPrior(e.target.value)
                  }
                  value={liabilityInsuranceEmailAlertDaysPrior}
                  required={true}
                  type="number"
                />
              </div>
            </div>

            <div className="flex flex-col mt-3">
              <div className="text-[#8E8F8F]">Days in prior</div>
            </div>

            <div className="flex justify-center mt-5 gap-5 m-5">
              <ButtonComponent
                label={"Cancel"}
                className={
                  "text-[#F56C89] w-[180px] h-[45px] bg-white border border-[#F56C89]"
                }
                onClickEvent={handleClose}
                type="button"
              />

              <ButtonComponent
                label={"Update"}
                className={
                  "bg-[#34B7C1] w-[180px] h-[45px]  text-white flex justify-center items-center gap-2"
                }
                isLoading={loading}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const EditCargoInsurance = ({ handleClose, show, fetchApi, prevData }) => {
  const [loading, setLoading] = useState(false);
  const [cargoInsuranceName, setCargoInsuranceName] = useState("");
  const [cargoInsuranceNumber, setCargoInsuranceNumber] = useState("");
  const [cargoInsuranceExpireDate, setCargoInsuranceExpireDate] = useState("");
  const [
    cargoInsuranceEmailAlertDaysPrior,
    setCargoInsuranceEmailAlertDaysPrios,
  ] = useState(0);

  const payload = {
    cargoInsuranceName,
    cargoInsuranceNumber,
    cargoInsuranceExpireDate,
    cargoInsuranceEmailAlertDaysPrior,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    putApi(endPoints.vehicles.updateCargoInsurance(prevData?._id), payload, {
      successMsg: "Updated!",
      setLoading,
      additionalFunctions: [fetchApi, handleClose],
    });
  };

  useEffect(() => {
    if (show && prevData) {
      setCargoInsuranceName(prevData?.cargoInsuranceName);
      setCargoInsuranceNumber(prevData?.cargoInsuranceNumber);
      setCargoInsuranceExpireDate(
        prevData?.cargoInsuranceExpireDate?.slice(0, 10)
      );
      setCargoInsuranceEmailAlertDaysPrios(
        prevData?.cargoInsuranceEmailAlertDaysPrior
      );
    }
  }, [show && prevData]);

  return (
    <Modal
      centered
      title="Cargo Insurance"
      open={show}
      onCancel={handleClose}
      footer={null}
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={submitHandler}>
          <div className="pl-5 pr-5">
            <div className="gap-5 justify-center mt-5 flex flex-col">
              <div>
                <label className="text-[#8E8F8F]">Insurance Name</label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setCargoInsuranceName(e.target.value)}
                  value={cargoInsuranceName}
                  required={true}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">Insurance Number</label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setCargoInsuranceNumber(e.target.value)}
                  value={cargoInsuranceNumber}
                  required={true}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">Insurance expiry Date</label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) =>
                    setCargoInsuranceExpireDate(e.target.value)
                  }
                  value={cargoInsuranceExpireDate}
                  required={true}
                  type="date"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <img src={tickmark} alt="" />
                  <label className="text-[#8E8F8F]">
                    Received email alerts
                  </label>
                </div>
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) =>
                    setCargoInsuranceEmailAlertDaysPrios(e.target.value)
                  }
                  value={cargoInsuranceEmailAlertDaysPrior}
                  required={true}
                  type="number"
                />
              </div>
            </div>

            <div className="flex flex-col mt-3">
              <div className="text-[#8E8F8F]">Days in prior</div>
            </div>

            <div className="flex justify-center mt-5 gap-5 m-5">
              <ButtonComponent
                label={"Cancel"}
                className={
                  "text-[#F56C89] w-[180px] h-[45px] bg-white border border-[#F56C89]"
                }
                onClickEvent={handleClose}
                type="button"
              />

              <ButtonComponent
                label={"Update"}
                className={
                  "bg-[#34B7C1] w-[180px] h-[45px]  text-white flex justify-center items-center gap-2"
                }
                isLoading={loading}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const CreateTruck = ({ handleClose, show, fetchApi }) => {
  const [loading, setLoading] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [truckType, setTruckType] = useState("");
  const [vinNumber, setVinNumber] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [fuelTank, setFuelTank] = useState("");
  const [hourAvailablePerDay, setHourAvailablePerDay] = useState("");
  const [dormancyThreshold, setDormancyThreshold] = useState("");
  const [image, setImage] = useState([]);
  const [vehicleResponse, setVehicleResponse] = useState({});
  const [registrationNumber, setRegestrationNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [emailAlertDaysPrior, setEmailAlertDaysPrios] = useState(0);
  const [cargoInsuranceName, setCargoInsuranceName] = useState("");
  const [cargoInsuranceNumber, setCargoInsuranceNumber] = useState("");
  const [cargoInsuranceExpireDate, setCargoInsuranceExpireDate] = useState("");
  const [
    cargoInsuranceEmailAlertDaysPrior,
    setCargoInsuranceEmailAlertDaysPrios,
  ] = useState(0);
  const [step, setStep] = useState(1);
  const companyId = localStorage.getItem("companyId");

  const fd = new FormData();
  fd.append("vehicleNumber", vehicleNumber);
  fd.append("vehicleType", vehicleType);
  fd.append("truckType", truckType);
  fd.append("vinNumber", vinNumber);
  fd.append("vehicleModel", vehicleModel);
  fd.append("fuelType", fuelType);
  fd.append("fuelTank", fuelTank);
  fd.append("hourAvailablePerDay", hourAvailablePerDay);
  fd.append("dormancyThreshold", dormancyThreshold);
  fd.append("company", companyId);
  image.forEach((image) => {
    fd.append(`image`, image);
  });


  const submitHandler = (e) => {
    e.preventDefault();
    postApi(endPoints.vehicles.createVehicle, fd, {
      setLoading,
      additionalFunctions: [
        fetchApi,
        (res) => setVehicleResponse(res),
        () => setStep(step + 1),
      ],
    });
  };

  const uploadFiles = () => {
    const target = document.getElementById("image-file");
    target.click();
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImage(selectedFiles);
  };

  const updateRegestration = (e) => {
    e.preventDefault();
    const payload = {
      registrationNumber,
      expireDate,
      emailAlertDaysPrior,
    };
    putApi(
      endPoints.vehicles.updateRegestration(vehicleResponse?.data?._id),
      payload,
      {
        setLoading,
        additionalFunctions: [() => setStep(step + 1)],
      }
    );
  };

  const updateInsurance = (e) => {
    e.preventDefault();
    const payload = {
      cargoInsuranceName,
      cargoInsuranceNumber,
      cargoInsuranceExpireDate,
      cargoInsuranceEmailAlertDaysPrior,
    };

    putApi(
      endPoints.vehicles.updateCargoInsurance(vehicleResponse?.data?._id),
      payload,
      {
        setLoading,
        successMsg: "Updated",
        additionalFunctions: [handleClose],
      }
    );
  };

  useEffect(() => {
    if (show) {
      setStep(1);
    }
  }, [show]);

  return (
    <Modal
      centered
      title="Add New Vehicle"
      open={show}
      onCancel={handleClose}
      footer={null}
      width={1000}
    >
      <div className="reset-password-modal">
        <hr />
        <div className="add-steps mt-2">
          <div
            className={`step ${step === 1 ? "active" : ""}`}
            onClick={() => setStep(1)}
          >
            <p className="count">1</p>
            <p className="title">New Vehicle*</p>
          </div>
          <div className={`step ${step === 2 ? "active" : ""}`}>
            <p className="count">2</p>
            <p className="title">Registration</p>
          </div>
          <div className={`step ${step === 3 ? "active" : ""}`}>
            <p className="count">3</p>
            <p className="title">Insurance</p>
          </div>
        </div>

        {step === 1 && (
          <form onSubmit={submitHandler}>
            <div className="pl-5 pr-5">
              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">
                    Vehicle Type<span style={{ color: "red" }}>*</span>{" "}
                  </label>
                  <br />
                  <select
                    className="text-select"
                    onChange={(e) => setVehicleType(e.target.value)}
                    required
                  >
                    <option value=""></option>
                    <option value="Truck">Truck</option>
                    <option value="Bus">Bus</option>
                    <option value="Car">Car</option>
                    <option value="Bike">Bike</option>
                    <option value="Plane">Plane</option>
                    <option value="Locomotive">Locomotive</option>
                    <option value="Boat">Boat</option>
                    <option value="RV">RV</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#8E8F8F]">
                    Vehicle Number <span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <InputComponent
                    placeholder="Enter Vehicle Number"
                    className="text-input"
                    onChangeEvent={(e) => setVehicleNumber(e.target.value)}
                    value={vehicleNumber}
                    required={true}
                  />
                </div>
              </div>

              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">Truck Type</label>
                  <br />
                  <select
                    className="text-select"
                    onChange={(e) => setTruckType(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="Semi-Trailer Truck">
                      Semi-Trailer Truck
                    </option>
                    <option value="18-Wheeler Truck">18-Wheeler Truck</option>
                    <option value="Flatbed">Flatbed</option>
                    <option value="Box Truck">Box Truck</option>
                    <option value="Van">Van</option>
                    <option value="Refrigerator Truck">
                      Refrigerator Truck
                    </option>
                    <option value="Pickup Truck">Pickup Truck</option>
                    <option value="Power Unit only">Power Unit only</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#8E8F8F]">
                    VIN Number <span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <InputComponent
                    placeholder="Enter Number"
                    className="text-input"
                    required={true}
                    onChangeEvent={(e) => setVinNumber(e.target.value)}
                    value={vinNumber}
                  />
                </div>
              </div>

              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">Vehicle Model </label>
                  <br />
                  <InputComponent
                    placeholder="Enter model name"
                    className="text-input"
                    onChangeEvent={(e) => setVehicleModel(e.target.value)}
                    value={vehicleModel}
                  />
                </div>
                <div>
                  <label className="text-[#8E8F8F]">Fuel Type</label>
                  <br />
                  <select
                    className="text-select"
                    onChange={(e) => setFuelType(e.target.value)}
                  >
                    <option value="">Choose fuel type</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="CNG">CNG</option>
                  </select>
                </div>
              </div>

              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">
                    Fuel Tank Capacity (in gallons){" "}
                  </label>
                  <br />
                  <InputComponent
                    placeholder="Enter fuel capacity"
                    className="text-input"
                    type="number"
                    onChangeEvent={(e) => setFuelTank(e.target.value)}
                    value={fuelTank}
                  />
                </div>
                <div className="flex-inputs" style={{ marginTop: 0 }}>
                  <div>
                    <label className="text-[#8E8F8F]">
                      Hours Available/Day
                    </label>
                    <br />
                    <select
                      className="text-select"
                      onChange={(e) => setHourAvailablePerDay(e.target.value)}
                    >
                      <option value="">Choose</option>
                      <option value={1}>1 Hours</option>
                      <option value={2}>2 Hours</option>
                      <option value={3}>3 Hours</option>
                      <option value={4}>4 Hours</option>
                      <option value={5}>5 Hours</option>
                      <option value={6}>6 Hours</option>
                      <option value={7}>7 Hours</option>
                      <option value={8}>8 Hours</option>
                      <option value={9}>9 Hours</option>
                      <option value={10}>10 Hours</option>
                      <option value={11}>11 Hours</option>
                      <option value={12}>12 Hours</option>
                      <option value={13}>13 Hours</option>
                      <option value={14}>14 Hours</option>
                      <option value={15}>15 Hours</option>
                      <option value={16}>16 Hours</option>
                      <option value={17}>17 Hours</option>
                      <option value={18}>18 Hours</option>
                      <option value={19}>19 Hours</option>
                      <option value={20}>20 Hours</option>
                      <option value={21}>21 Hours</option>
                      <option value={22}>22 Hours</option>
                      <option value={23}>23 Hours</option>
                      <option value={24}>24 Hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[#8E8F8F]">Dormancy Threshold</label>
                    <br />
                    <select
                      className="text-select"
                      onChange={(e) => setDormancyThreshold(e.target.value)}
                    >
                      <option value="">Choose</option>
                      <option value={1}>1 Days</option>
                      <option value={2}>2 Days</option>
                      <option value={3}>3 Days</option>
                      <option value={4}>4 Days</option>
                      <option value={5}>5 Days</option>
                      <option value={6}>6 Days</option>
                      <option value={7}>7 Days</option>
                      <option value={8}>8 Days</option>
                      <option value={9}>9 Days</option>
                      <option value={10}>10 Days</option>
                      <option value={11}>11 Days</option>
                      <option value={12}>12 Days</option>
                      <option value={13}>13 Days</option>
                      <option value={14}>14 Days</option>
                      <option value={15}>15 Days</option>
                      <option value={16}>16 Days</option>
                      <option value={17}>17 Days</option>
                      <option value={18}>18 Days</option>
                      <option value={19}>19 Days</option>
                      <option value={20}>20 Days</option>
                      <option value={21}>21 Days</option>
                      <option value={22}>22 Days</option>
                      <option value={23}>23 Days</option>
                      <option value={24}>24 Days</option>
                      <option value={25}>25 Days</option>
                      <option value={26}>26 Days</option>
                      <option value={27}>27 Days</option>
                      <option value={28}>28 Days</option>
                      <option value={29}>29 Days</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="text-[#8E8F8F]">Upload Vehicle Images</label>
                <br />
                <div className="upload-image mt-2">
                  <button type="button" onClick={() => uploadFiles()}>
                    <i className="fa-solid fa-upload"></i> Upload Image
                  </button>
                  <input
                    type="file"
                    id="image-file"
                    multiple
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <p className="text">
                    You can upload upto 6 images <br />
                    Formats supported- jpg, png, svg of not more than 2mb each
                  </p>
                </div>
              </div>

              <div className="flex justify-center mt-5 gap-5 m-5">
                <ButtonComponent
                  label={"Cancel"}
                  className={
                    "text-[#F56C89] w-[180px] h-[45px] bg-white border border-[#F56C89]"
                  }
                  onClickEvent={handleClose}
                  type="button"
                />

                <ButtonComponent
                  label={"Next"}
                  className={
                    "bg-[#86E3CE] w-[180px] h-[45px]  text-black font-bold flex justify-center items-center gap-2"
                  }
                  isLoading={loading}
                  type="submit"
                />
              </div>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={updateRegestration}>
            <div className="pl-5 pr-5">
              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">
                    Registration Number <span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <InputComponent
                    placeholder=""
                    className="text-input"
                    onChangeEvent={(e) => setRegestrationNumber(e.target.value)}
                    value={registrationNumber}
                    required={true}
                  />
                </div>
                <div>
                  <label className="text-[#8E8F8F]">Expiry Date</label>
                  <br />
                  <InputComponent
                    placeholder=""
                    className="text-input"
                    onChangeEvent={(e) => setExpireDate(e.target.value)}
                    value={expireDate}
                    required={true}
                    type="date"
                  />
                </div>
              </div>
              <div className="mt-5">
                <div className="flex items-center gap-2">
                  <img src={tickmark} alt="" />
                  <label className="text-[#8E8F8F]">
                    Received email alerts
                  </label>
                </div>
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setEmailAlertDaysPrios(e.target.value)}
                  value={emailAlertDaysPrior}
                  required={true}
                  type="number"
                />
              </div>

              <div className="flex justify-center mt-5 gap-5 m-5">
                <ButtonComponent
                  label={"Cancel"}
                  className={
                    "text-[#F56C89] w-[180px] h-[45px] bg-white border border-[#F56C89]"
                  }
                  onClickEvent={handleClose}
                  type="button"
                />

                <ButtonComponent
                  label={"Next"}
                  className={
                    "bg-[#86E3CE] font-bold w-[180px] h-[45px]  text-black flex justify-center items-center gap-2"
                  }
                  isLoading={loading}
                  type="submit"
                />
              </div>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={updateInsurance}>
            <div className="pl-5 pr-5">
              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">
                    Insurance Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <InputComponent
                    placeholder=""
                    className="text-input"
                    onChangeEvent={(e) => setCargoInsuranceName(e.target.value)}
                    value={cargoInsuranceName}
                    required={true}
                  />
                </div>
                <div>
                  <label className="text-[#8E8F8F]">
                    Insurance Number <span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <InputComponent
                    placeholder=""
                    className="text-input"
                    onChangeEvent={(e) =>
                      setCargoInsuranceNumber(e.target.value)
                    }
                    value={cargoInsuranceNumber}
                    required={true}
                  />
                </div>
              </div>

              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">
                    Insurance expiry Date{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <InputComponent
                    placeholder=""
                    className="text-input"
                    onChangeEvent={(e) =>
                      setCargoInsuranceExpireDate(e.target.value)
                    }
                    value={cargoInsuranceExpireDate}
                    required={true}
                    type="date"
                  />
                </div>
                <div>
                  <label className="text-[#8E8F8F]">
                    Received email alerts
                  </label>
                  <br />
                  <InputComponent
                    placeholder=""
                    className="text-input"
                    onChangeEvent={(e) =>
                      setCargoInsuranceEmailAlertDaysPrios(e.target.value)
                    }
                    value={cargoInsuranceEmailAlertDaysPrior}
                    required={true}
                  />
                </div>
              </div>

              <div className="flex justify-center mt-5 gap-5 m-5">
                <ButtonComponent
                  label={"Cancel"}
                  className={
                    "text-[#F56C89] w-[180px] h-[45px] bg-white border border-[#F56C89]"
                  }
                  onClickEvent={handleClose}
                  type="button"
                />

                <ButtonComponent
                  label={"Submit"}
                  className={
                    "bg-[#86E3CE] font-bold w-[180px] h-[45px]  text-black flex justify-center items-center gap-2"
                  }
                  isLoading={loading}
                  type="submit"
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

const AssignDriverInTerminal = ({ handleClose, show, fetchApi, id }) => {
  const [loading, setLoading] = useState(false);
  const [driverId, setDriverId] = useState("");
  const [truckId, setTruckId] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [drivers, setDrivers] = useState({});
  const [vehicles, setVehicles] = useState({});

  const payload = {
    driver: driverId,
    truck: truckId,
    unitNumber,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    putApi(endPoints.terminals.assignDriver(id), payload, {
      successMsg: "Assigned !",
      setLoading,
      additionalFunctions: [fetchApi, handleClose],
    });
  };

  useEffect(() => {
    if (show) {
      getApi(endPoints.drivers.getAllDrivers({ limit: 100 }), {
        setResponse: setDrivers,
      });
      getApi(endPoints.vehicles.getActiveVehicle({ limit: 100 }), {
        setResponse: setVehicles,
      });
      setTruckId("");
      setDriverId("");
      setUnitNumber("");
    }
  }, [show]);

  return (
    <Modal
      centered
      title="Assign Vehicle"
      open={show}
      onCancel={handleClose}
      footer={null}
      width={600}
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={submitHandler}>
          <div className="pl-5 pr-5">
            <div className="gap-5 justify-center mt-5 flex flex-col">
              <div>
                <label className="text-[#8E8F8F]">Unit Number</label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setUnitNumber(e.target.value)}
                  value={unitNumber}
                  required={true}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">Driver</label>
                <br />
                <select
                  required
                  onChange={(e) => setDriverId(e.target.value)}
                  value={driverId}
                  className="text-select"
                >
                  <option value="">Select your preference</option>
                  {drivers?.data?.docs?.map((i) => (
                    <option key={i?._id} value={i?._id}>
                      {returnFullName(i)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[#8E8F8F]">Current Vehicle</label>
                <br />
                <select
                  required
                  onChange={(e) => setTruckId(e.target.value)}
                  value={truckId}
                  className="text-select"
                >
                  <option value="">Select your preference</option>
                  {vehicles?.data?.docs?.map((i) => (
                    <option key={i?._id} value={i?._id}>
                      {i?.vehicleNumber}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center mt-5 gap-5">
              <ButtonComponent
                label={"Cancel"}
                className={
                  "text-[#F56C89] w-[50%] h-[45px] bg-white border border-[#F56C89]"
                }
                onClickEvent={handleClose}
                type="button"
              />

              <ButtonComponent
                label={"Assign"}
                className={
                  "bg-[#34B7C1] w-[50%] h-[45px]  text-white flex justify-center items-center gap-2"
                }
                isLoading={loading}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const UnAssignDriverInTerminal = ({
  handleClose,
  show,
  fetchApi,
  id,
  data,
}) => {
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    putApi(
      endPoints.terminals.unAssignDriver({ id, arrayId: data?._id }),
      {},
      {
        successMsg: "Unassigned !",
        setLoading,
        additionalFunctions: [fetchApi, handleClose],
      }
    );
  };

  return (
    <Modal
      centered
      title="Unassign Vehicle"
      open={show}
      onCancel={handleClose}
      footer={null}
      width={800}
    >
      <div className="reset-password-modal">
        <hr />

        <form onSubmit={submitHandler}>
          <div className="pl-5 pr-5">
            <div className="gap-5 justify-center mt-5 flex flex-col">
              <div>
                <label className="text-[#8E8F8F]">Unit Number</label>
                <br />
                <input
                  type={"text"}
                  value={data?.unitNumber}
                  className="text-input"
                  disabled
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">Driver</label>
                <br />
                <input
                  type={"text"}
                  value={data?.driver?.fullName}
                  className="text-input"
                  disabled
                />
              </div>
            </div>

            <div className="h-[44px]  flex items-center justify-center  text-[#FC8041] text-center">
              Please unassign in order to assign a new vehicle
            </div>

            <div className="flex justify-end mt-5 gap-5">
              <ButtonComponent
                label={"Unassign"}
                className={
                  "bg-[#34B7C1] w-[180px] h-[45px]  text-white flex justify-center items-center gap-2"
                }
                isLoading={loading}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const CreateDriver = ({ handleClose, show, fetchApi }) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [license, setLicense] = useState("");
  const [response, setResponse] = useState({});
  const [step, setStep] = useState(1);
  const [cell, setCell] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [licenseExpire, setLicenseExpire] = useState("");
  const [startDate, setStartDate] = useState("");
  const [note, setNote] = useState("");
  const [fullName, setFullName] = useState("");
  const [reStart, setRestart] = useState("");
  const [cycle, setCycle] = useState("");
  const [cargoType, setCargoType] = useState("");
  const [breakCycle, setBreakCycle] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const companyId = localStorage.getItem("companyId");

  const payload = {
    firstName,
    lastName,
    fullName,
    email,
    license,
    cell,
    mobileNumber: cell,
    country,
    state,
    licenseExpire,
    startDate,
    note,
    company: companyId,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    postApi(endPoints.drivers.createDriver, payload, {
      additionalFunctions: [(res) => setResponse(res), nextStep],
      setLoading,
    });
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  useEffect(() => {
    if (show) {
      setStep(1);
    }
  }, [show]);

  const editCycleInfo = (e) => {
    e.preventDefault();
    const payload = {
      cycle,
      reStart,
      cargoType,
      breakCycle,
      timeZone,
    };
    putApi(endPoints.drivers.updateDriver(response?.data?._id), payload, {
      additionalFunctions: [handleClose, fetchApi],
      setLoading,
    });
  };

  return (
    <Modal
      centered
      title="Add Driver"
      open={show}
      onCancel={handleClose}
      footer={null}
      width={1000}
    >
      <div className="reset-password-modal">
        <hr />
        <div className="pl-5 pr-5">
          <div className="add-steps mt-2">
            <div className={`step ${step === 1 ? "active" : ""}`}>
              <p className="count">1</p>
              <p className="title">Basic</p>
            </div>
            <div className={`step ${step === 2 ? "active" : ""}`}>
              <p className="count">2</p>
              <p className="title">Cycle Info</p>
            </div>
            <div className={`step ${step === 3 ? "active" : ""}`}>
              <p className="count">3</p>
              <p className="title">Vehicle Info</p>
            </div>
          </div>

          {step === 1 && (
            <form onSubmit={submitHandler}>
              {/* <div className="upload-img-svg mt-4">
                    <img
                      src="https://www.svgrepo.com/show/382101/male-avatar-boy-face-man-user.svg"
                      alt=""
                    />
                    <i
                      className="fa-solid fa-pen"
                      onClick={() => uploadImg()}
                    ></i>
                    <input type="file" id="file" style={{ display: "none" }} />
                  </div> */}

              <div className="flex-inputs">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">
                    First Name <span className="text-[#a63019]">*</span>{" "}
                  </label>
                  <br />
                  <InputComponent
                    className="text-input"
                    onChangeEvent={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                    placeholder="First name"
                  />
                </div>
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">
                    Last Name <span className="text-[#a63019]">*</span>
                  </label>
                  <br />
                  <InputComponent
                    className="text-input"
                    onChangeEvent={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">Nick Name </label>
                  <br />
                  <InputComponent
                    className="text-input"
                    required
                    placeholder="Nick Name"
                    onChangeEvent={(e) => setFullName(e.target.value)}
                    value={fullName}
                  />
                </div>
                <div>
                  <label className="text-[#8E8F8F]">
                    Cell <span className="text-[#a63019]">*</span>
                  </label>
                  <br />
                  <InputComponent
                    className="text-input"
                    onChangeEvent={(e) => setCell(e.target.value)}
                    value={cell}
                    required
                  />
                </div>
              </div>

              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">
                    Email Address
                    <span className="text-[#a63019]">*</span>
                  </label>
                  <br />
                  <InputComponent
                    className="text-input"
                    onChangeEvent={(e) => setEmail(e.target.value)}
                    value={email}
                    type={"email"}
                    required
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label className="text-[#8E8F8F]">License</label>
                  <br />
                  <InputComponent
                    className="text-input"
                    onChangeEvent={(e) => setLicense(e.target.value)}
                    value={license}
                    required
                    placeholder="License no."
                  />
                </div>
              </div>

              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">
                    Country <span className="text-[#a63019]">*</span>
                  </label>
                  <br />
                  <InputComponent
                    className="text-input"
                    onChangeEvent={(e) => setCountry(e.target.value)}
                    value={country}
                    required
                  />
                </div>
                <div>
                  <label className="text-[#8E8F8F]">
                    License State <span className="text-[#a63019]">*</span>
                  </label>
                  <br />
                  <InputComponent
                    className="text-input"
                    onChangeEvent={(e) => setState(e.target.value)}
                    value={state}
                    required
                  />
                </div>
              </div>

              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">
                    License Expiration <span className="text-[#a63019]">*</span>
                  </label>
                  <br />
                  <InputComponent
                    className="text-input"
                    required={true}
                    type="date"
                    onChangeEvent={(e) => setLicenseExpire(e.target.value)}
                    value={licenseExpire?.slice(0, 10)}
                  />
                </div>
                <div>
                  <label className="text-[#8E8F8F]">
                    Start Date <span className="text-[#a63019]">*</span>
                  </label>
                  <br />
                  <InputComponent
                    className="text-input"
                    required={true}
                    type="date"
                    onChangeEvent={(e) => setStartDate(e.target.value)}
                    value={startDate?.slice(0, 10)}
                  />
                </div>
              </div>

              <div className="flex-inputs">
                <div style={{ width: "100%" }}>
                  <label className="text-[#8E8F8F]">Note</label>
                  <br />
                  <InputComponent
                    placeholder="Please enter note"
                    className="text-input"
                    required={true}
                    onChangeEvent={(e) => setNote(e.target.value)}
                    value={note}
                  />
                </div>
              </div>

              <div className="flex justify-center mt-5 gap-5">
                <ButtonComponent
                  label={"Cancel"}
                  className={
                    "text-[#F56C89] w-[50%] h-[45px] bg-white border border-[#F56C89]"
                  }
                  onClickEvent={handleClose}
                  type="button"
                />

                <ButtonComponent
                  label={"Next"}
                  className={
                    "bg-[#34B7C1] w-[50%] h-[45px]  text-white flex justify-center items-center gap-2"
                  }
                  type="submit"
                />
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={editCycleInfo}>
              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">
                    Home Terminal Timezone
                    <span className="text-[#a63019]">*</span>{" "}
                  </label>
                  <br />
                  <select
                    className="text-select"
                    onChange={(e) => setTimeZone(e.target.value)}
                    required
                  >
                    <option value=""></option>
                    <option value="Central Time (Us & Canada)">
                      Central Time (Us & Canada)
                    </option>
                    <option value="Alaska">Alaska</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#8E8F8F]">
                    Cycle Type
                    <span className="text-[#a63019]">*</span>{" "}
                  </label>
                  <br />
                  <select
                    className="text-select"
                    onChange={(e) => setCycle(e.target.value)}
                    required
                  >
                    <option value=""></option>
                    <option value="USA 70 hours / 8 days (Interstate)">
                      USA 70 hours / 8 days (Interstate)
                    </option>
                    <option value="Alaska 70 hours / 8 days (Interstate)">
                      Alaska 70 hours / 8 days (Interstate)
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">
                    Cargo Type
                    <span className="text-[#a63019]">*</span>{" "}
                  </label>
                  <br />
                  <select
                    className="text-select"
                    onChange={(e) => setCargoType(e.target.value)}
                    required
                  >
                    <option value=""></option>
                    <option value="Property (Truck)">Property (Truck)</option>
                    <option value="Oil and Gas">Oil and Gas</option>
                    <option value="Passenger (Bus)">Passenger (Bus)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#8E8F8F]">
                    Restart hours
                    <span className="text-[#a63019]">*</span>{" "}
                  </label>
                  <br />
                  <select
                    className="text-select"
                    onChange={(e) => setRestart(e.target.value)}
                    required
                  >
                    <option value=""></option>
                    <option value="24 Hour Restart">24 Hour Restart</option>
                    <option value="34 Hour Restart">34 Hour Restart</option>
                    <option value="No Restart">No Restart</option>
                  </select>
                </div>
              </div>

              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">
                    Rest break required
                    <span className="text-[#a63019]">*</span>{" "}
                  </label>
                  <br />
                  <select
                    className="text-select"
                    onChange={(e) => setBreakCycle(e.target.value)}
                    required
                  >
                    <option value=""></option>
                    <option value="30min break required">
                      30min break required
                    </option>
                    <option value="No break required">No break required</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center mt-5 gap-5">
                <ButtonComponent
                  label={"Cancel"}
                  className={
                    "text-[#F56C89] w-[50%] h-[45px] bg-white border border-[#F56C89]"
                  }
                  onClickEvent={handleClose}
                  type="button"
                />

                <ButtonComponent
                  label={"Next"}
                  className={
                    "bg-[#34B7C1] w-[50%] h-[45px]  text-white flex justify-center items-center gap-2"
                  }
                  type="submit"
                  isLoading={loading}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
};

const EditDriver = ({ handleClose, show, fetchApi, data }) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [license, setLicense] = useState("");
  const [step, setStep] = useState(1);
  const [cell, setCell] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [licenseExpire, setLicenseExpire] = useState("");
  const [startDate, setStartDate] = useState("");
  const [note, setNote] = useState("");
  const [fullName, setFullName] = useState("");
  const [reStart, setRestart] = useState("");
  const [cycle, setCycle] = useState("");
  const [cargoType, setCargoType] = useState("");
  const [breakCycle, setBreakCycle] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [blockDriverEdits, setBlockDriverEdits] = useState("");
  const [disableELDVin, setDisableELDVin] = useState("");
  const [extend14hoursWithSplitSleeperRule, setExtend] = useState("");
  const [restrictPersonalConveyance, setRestrictPersonalConveyance] =
    useState("");
  const [restrictYardMove, setRestrictYardMove] = useState("");

  const payload = {
    firstName,
    lastName,
    fullName,
    email,
    license,
    cell,
    mobileNumber: cell,
    country,
    state,
    licenseExpire,
    startDate,
    note,
  };

  const updateBasicDetails = (e) => {
    e.preventDefault();
    putApi(endPoints.drivers.updateDriver(data?._id), payload, {
      setLoading,
      additionalFunctions: [() => setStep(step + 1)],
    });
  };

  const editCycleInfo = (e) => {
    e.preventDefault();
    const payload = {
      cycle,
      reStart,
      cargoType,
      breakCycle,
      timeZone,
    };
    putApi(endPoints.drivers.updateDriver(data?._id), payload, {
      additionalFunctions: [() => setStep(step + 1)],
      setLoading,
    });
  };

  const updateSetting = (e) => {
    e.preventDefault();
    const payload = {
      blockDriverEdits,
      disableELDVin,
      extend14hoursWithSplitSleeperRule,
      restrictPersonalConveyance,
      restrictYardMove,
    };

    putApi(endPoints.drivers.updateDriverSetting(data?._id), payload, {
      additionalFunctions: [handleClose, fetchApi],
      setLoading,
    });
  };

  useEffect(() => {
    if (show) {
      setStep(1);
    }
  }, [show]);

  useEffect(() => {
    if (show) {
      setFirstName(data?.firstName);
      setLastName(data?.lastName);
      setEmail(data?.email);
      setLicense(data?.license);
      setCell(data?.cell);
      setCountry(data?.country);
      setState(data?.state);
      setLicenseExpire(data?.licenseExpire);
      setStartDate(data?.startDate);
      setNote(data?.note);
      setFullName(data?.fullName);
      setRestart(data?.reStart);
      setCycle(data?.cycle);
      setCargoType(data?.cargoType);
      setBreakCycle(data?.breakCycle);
      setBlockDriverEdits(data?.blockDriverEdits);
      setDisableELDVin(data?.disableELDVin);
      setExtend(data?.extend14hoursWithSplitSleeperRule);
      setRestrictPersonalConveyance(data?.restrictPersonalConveyance);
      setRestrictYardMove(data?.restrictYardMove);
    }
  }, [show]);

  return (
    <Modal
      centered
      title="Edit Driver"
      open={show}
      onCancel={handleClose}
      footer={null}
      width={1000}
    >
      <div className="reset-password-modal">
        <hr />
        <div className="pl-5 pr-5">
          <div className="add-steps mt-2">
            <div className={`step ${step === 1 ? "active" : ""}`}>
              <p className="count">1</p>
              <p className="title">Basic</p>
            </div>
            <div className={`step ${step === 2 ? "active" : ""}`}>
              <p className="count">2</p>
              <p className="title">Cycle Info</p>
            </div>
            <div className={`step ${step === 3 ? "active" : ""}`}>
              <p className="count">3</p>
              <p className="title">Settings</p>
            </div>
          </div>

          {step === 1 && (
            <form onSubmit={updateBasicDetails} className="mt-5">
              <div className="flex-inputs">
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">
                    First Name <span className="text-[#a63019]">*</span>{" "}
                  </label>
                  <br />
                  <InputComponent
                    className="text-input"
                    onChangeEvent={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                    placeholder="First name"
                  />
                </div>
                <div className="w-[50%]">
                  <label className="text-[#8E8F8F]">
                    Last Name <span className="text-[#a63019]">*</span>
                  </label>
                  <br />
                  <InputComponent
                    className="text-input"
                    onChangeEvent={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">Nick Name </label>
                  <br />
                  <InputComponent
                    className="text-input"
                    required
                    placeholder="Nick Name"
                    onChangeEvent={(e) => setFullName(e.target.value)}
                    value={fullName}
                  />
                </div>
                <div>
                  <label className="text-[#8E8F8F]">
                    Cell <span className="text-[#a63019]">*</span>
                  </label>
                  <br />
                  <InputComponent
                    className="text-input"
                    onChangeEvent={(e) => setCell(e.target.value)}
                    value={cell}
                    required
                  />
                </div>
              </div>

              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">
                    Email Address
                    <span className="text-[#a63019]">*</span>
                  </label>
                  <br />
                  <InputComponent
                    className="text-input"
                    onChangeEvent={(e) => setEmail(e.target.value)}
                    value={email}
                    type={"email"}
                    required
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label className="text-[#8E8F8F]">License</label>
                  <br />
                  <InputComponent
                    className="text-input"
                    onChangeEvent={(e) => setLicense(e.target.value)}
                    value={license}
                    required
                    placeholder="License no."
                  />
                </div>
              </div>

              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">
                    Country <span className="text-[#a63019]">*</span>
                  </label>
                  <br />
                  <InputComponent
                    className="text-input"
                    onChangeEvent={(e) => setCountry(e.target.value)}
                    value={country}
                    required
                  />
                </div>
                <div>
                  <label className="text-[#8E8F8F]">
                    License State <span className="text-[#a63019]">*</span>
                  </label>
                  <br />
                  <InputComponent
                    className="text-input"
                    onChangeEvent={(e) => setState(e.target.value)}
                    value={state}
                    required
                  />
                </div>
              </div>

              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">
                    License Expiration <span className="text-[#a63019]">*</span>
                  </label>
                  <br />
                  <InputComponent
                    className="text-input"
                    required={true}
                    type="date"
                    onChangeEvent={(e) => setLicenseExpire(e.target.value)}
                    value={licenseExpire?.slice(0, 10)}
                  />
                </div>
                <div>
                  <label className="text-[#8E8F8F]">
                    Start Date <span className="text-[#a63019]">*</span>
                  </label>
                  <br />
                  <InputComponent
                    className="text-input"
                    required={true}
                    type="date"
                    onChangeEvent={(e) => setStartDate(e.target.value)}
                    value={startDate?.slice(0, 10)}
                  />
                </div>
              </div>

              <div className="flex-inputs">
                <div style={{ width: "100%" }}>
                  <label className="text-[#8E8F8F]">Note</label>
                  <br />
                  <InputComponent
                    placeholder="Please enter note"
                    className="text-input"
                    required={true}
                    onChangeEvent={(e) => setNote(e.target.value)}
                    value={note}
                  />
                </div>
              </div>

              <div className="flex justify-center mt-5 gap-5">
                <ButtonComponent
                  label={"Cancel"}
                  className={
                    "text-[#F56C89] w-[50%] h-[45px] bg-white border border-[#F56C89]"
                  }
                  onClickEvent={handleClose}
                  type="button"
                />

                <ButtonComponent
                  label={"Next"}
                  className={
                    "bg-[#34B7C1] w-[50%] h-[45px]  text-white flex justify-center items-center gap-2"
                  }
                  type="submit"
                  isLoading={loading}
                />
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={editCycleInfo}>
              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">
                    Home Terminal Timezone
                    <span className="text-[#a63019]">*</span>{" "}
                  </label>
                  <br />
                  <select
                    className="text-select"
                    onChange={(e) => setTimeZone(e.target.value)}
                    required
                    value={timeZone}
                  >
                    <option value=""></option>
                    <option value="Central Time (Us & Canada)">
                      Central Time (Us & Canada)
                    </option>
                    <option value="Alaska">Alaska</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#8E8F8F]">
                    Cycle Type
                    <span className="text-[#a63019]">*</span>{" "}
                  </label>
                  <br />
                  <select
                    className="text-select"
                    onChange={(e) => setCycle(e.target.value)}
                    required
                    value={cycle}
                  >
                    <option value=""></option>
                    <option value="USA 70 hours / 8 days (Interstate)">
                      USA 70 hours / 8 days (Interstate)
                    </option>
                    <option value="Alaska 70 hours / 8 days (Interstate)">
                      Alaska 70 hours / 8 days (Interstate)
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">
                    Cargo Type
                    <span className="text-[#a63019]">*</span>{" "}
                  </label>
                  <br />
                  <select
                    className="text-select"
                    onChange={(e) => setCargoType(e.target.value)}
                    required
                    value={cargoType}
                  >
                    <option value=""></option>
                    <option value="Property (Truck)">Property (Truck)</option>
                    <option value="Oil and Gas">Oil and Gas</option>
                    <option value="Passenger (Bus)">Passenger (Bus)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#8E8F8F]">
                    Restart hours
                    <span className="text-[#a63019]">*</span>{" "}
                  </label>
                  <br />
                  <select
                    className="text-select"
                    onChange={(e) => setRestart(e.target.value)}
                    required
                    value={reStart}
                  >
                    <option value=""></option>
                    <option value="24 Hour Restart">24 Hour Restart</option>
                    <option value="34 Hour Restart">34 Hour Restart</option>
                    <option value="No Restart">No Restart</option>
                  </select>
                </div>
              </div>

              <div className="flex-inputs">
                <div>
                  <label className="text-[#8E8F8F]">
                    Rest break required
                    <span className="text-[#a63019]">*</span>{" "}
                  </label>
                  <br />
                  <select
                    className="text-select"
                    onChange={(e) => setBreakCycle(e.target.value)}
                    required
                    value={breakCycle}
                  >
                    <option value=""></option>
                    <option value="30min break required">
                      30min break required
                    </option>
                    <option value="No break required">No break required</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center mt-5 gap-5">
                <ButtonComponent
                  label={"Cancel"}
                  className={
                    "text-[#F56C89] w-[50%] h-[45px] bg-white border border-[#F56C89]"
                  }
                  onClickEvent={handleClose}
                  type="button"
                />

                <ButtonComponent
                  label={"Next"}
                  className={
                    "bg-[#34B7C1] w-[50%] h-[45px]  text-white flex justify-center items-center gap-2"
                  }
                  type="submit"
                  isLoading={loading}
                />
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={updateSetting}>
              <div className="flex-inputs">
                <div className="w-100">
                  <input
                    type="checkbox"
                    className="text-input mr-4"
                    onChange={() => setBlockDriverEdits(!blockDriverEdits)}
                  />
                  <label className="text-[#8E8F8F]">Block Driver edits</label>
                </div>
              </div>

              <div className="flex-inputs">
                <div>
                  <input
                    type="checkbox"
                    className="text-input mr-4"
                    onChange={() => setDisableELDVin(!disableELDVin)}
                  />
                  <label className="text-[#8E8F8F]">Disable ELD VIN</label>
                </div>
              </div>

              <div className="flex-inputs">
                <div>
                  <input
                    type="checkbox"
                    className="text-input mr-4"
                    onChange={() =>
                      setExtend(!extend14hoursWithSplitSleeperRule)
                    }
                  />
                  <label className="text-[#8E8F8F]">
                    Extend 14 hours with Split Sleeper Rule
                  </label>
                </div>
              </div>

              <div className="flex-inputs">
                <div>
                  <input
                    type="checkbox"
                    className="text-input mr-4"
                    onChange={() =>
                      setRestrictPersonalConveyance(!restrictPersonalConveyance)
                    }
                  />
                  <label className="text-[#8E8F8F]">
                    Restrict Personal Conveyance
                  </label>
                </div>
              </div>
              <div className="flex-inputs">
                <div>
                  <input
                    type="checkbox"
                    className="text-input mr-4"
                    onChange={() => setRestrictYardMove(!restrictYardMove)}
                  />
                  <label className="text-[#8E8F8F]">Restrict Yard Move</label>
                </div>
              </div>

              <div className="flex justify-center mt-5 gap-5">
                <ButtonComponent
                  label={"Cancel"}
                  className={
                    "text-[#F56C89] w-[50%] h-[45px] bg-white border border-[#F56C89]"
                  }
                  onClickEvent={handleClose}
                  type="button"
                />

                <ButtonComponent
                  label={"Next"}
                  className={
                    "bg-[#34B7C1] w-[50%] h-[45px]  text-white flex justify-center items-center gap-2"
                  }
                  type="submit"
                  isLoading={loading}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
};

const UnAssignDriver = ({ show, handleClose, data, fetchApi }) => {
  const [loading, setLoading] = useState(false);

  const unAssignHandler = (e) => {
    e.preventDefault();
    putApi(
      endPoints.drivers.unassignTruck(data?._id),
      {},
      {
        successMsg: "Success !",
        setLoading,
        additionalFunctions: [fetchApi, handleClose],
      }
    );
  };

  return (
    <Modal
      centered
      title="Assign/Unassign Vehicle"
      open={show}
      onCancel={handleClose}
      footer={null}
      width={800}
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={unAssignHandler}>
          <div className="pl-5 pr-5">
            <div className="gap-5 justify-center mt-5 flex flex-col">
              <div>
                <label className="text-[#8E8F8F]">Driver</label>
                <br />
                <InputComponent
                  className="text-input"
                  required
                  value={returnFullName(data)}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">Current Vehicle</label>
                <br />
                <InputComponent
                  className="text-input"
                  required
                  value={data?.unitNumber}
                />
              </div>
              <div>
                <label className="text-[#ff8718] bold text-center w-[100%] block">
                  Please unassign in order to assign a new vehicle
                </label>
              </div>
            </div>

            <div className="flex justify-end mt-5 gap-5 m-5">
              <ButtonComponent
                label={"Unassign"}
                className={
                  "bg-[#34B7C1] w-[180px] h-[45px]  text-white flex justify-center items-center gap-2"
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

const ShareApiKey = ({ show, handleClose }) => {
  return (
    <Modal
      centered
      title="Share Link with API Partner"
      open={show}
      onCancel={handleClose}
      footer={null}
      width={600}
    >
      <div className="reset-password-modal">
        <hr />
        <form>
          <div className="pl-5 pr-5">
            <div className="flex-inputs" style={{ flexWrap: "wrap" }}>
              <div style={{ width: "100%" }}>
                <label>
                  Select API Partner  <span style={{ color: "red" }}>*</span>
                </label>{" "}
                <br />
                <select className="text-select">
                  <option>Select API Partner</option>
                </select>
              </div>
              <div style={{ width: "100%" }}>
                <label>
                  Select Driver <span style={{ color: "red" }}>*</span>
                </label>{" "}
                <br />
                <select className="text-select">
                  <option>Select driver from list </option>
                </select>
              </div>
              <div style={{ width: "100%" }}>
                <label>
                  Select Truck Number(s) <span style={{ color: "red" }}>*</span>
                </label>{" "}
                <br />
                <select className="text-select">
                  <option>Select Truck Number(s) from list </option>
                </select>
              </div>
              <div style={{ width: "100%" }}>
                <label>
                  Select Trailer Number(s){" "}
                  <span style={{ color: "red" }}>*</span>
                </label>{" "}
                <br />
                <select className="text-select">
                  <option>Select Trailer Number(s) from list </option>
                </select>
              </div>
            </div>

            <div className="flex-inputs">
              <div style={{ width: "100%" }}>
                <input type="checkbox" className="text-input mr-4" />
                <label className="text-[#8E8F8F]">
                  {" "}
                  I agree to share NXT Location Sharing API Key with API
                  Partner. This will give API Partner access to location
                  information for selected vehicles.
                </label>
              </div>
            </div>

            <div className="flex justify-end mt-5 gap-5">
              <ButtonComponent
                label={"Send API Key"}
                className={
                  "w-[156px] h-[45px] bg-[#34B7C1] font-semibold text-white rounded-3xl"
                }
                type="button"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const EditElog = ({ show, handleClose, title, data, fetchHandler }) => {
  const [id, setId] = useState("info");
  const [driver, setDriver] = useState(null);
  const [trailerId, setTrailerId] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState("");
  const [distance, setDistance] = useState(null);
  const [milesDriven, setMilesDriven] = useState(null);
  const [cycleType, setCycleType] = useState(null);
  const [dotNumber, setDotNumber] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState(null);
  const [carrierName, setCarrierName] = useState(null);
  const [driverName, setDriverName] = useState(null);
  const [coDriverName, setCoDriverName] = useState(null);
  const [shippingDoc, setShippingDoc] = useState(null);
  const [twentyForHourStartTime, setTwentyForHourStartTime] = useState(null);
  const [odometerReading, setOdometerReading] = useState(null);
  const [officeAddress, setOfficeAddress] = useState(null);
  const [officeCity, setOfficeCity] = useState("");
  const [officeZip, setOfficeZip] = useState("");
  const [officeState, setOfficeState] = useState("");
  const [officeCountry, setOfficeCountry] = useState("");
  const [terminalAddress, setTerminalAddress] = useState("");
  const [terminalCity, setTerminalCity] = useState("");
  const [terminalZip, setTerminalZip] = useState("");
  const [terminalState, setTerminalState] = useState("");
  const [terminalCountry, setTerminalCountry] = useState("");
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);
  const officeAddRef = useRef(null);
  const cityRef = useRef(null);
  const postalRef = useRef(null);
  const stateRef = useRef(null);
  const countryRef = useRef(null);
  const terminalAddressRef = useRef(null);
  const terminalCityRef = useRef(null);
  const terminalZipRef = useRef(null);
  const terminalStateRef = useRef(null);
  const terminalCountryRef = useRef(null);

  useEffect(() => {
    if (window.google && show) {
      const inputElement = inputRef.current;
      if (inputElement) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputElement,
          {
            types: ["(cities)"], // Restrict autocomplete to city results
          }
        );

        // Listen for place selection
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          // Update the state with the formatted address
          setDestinationLocation(place?.formatted_address || "");
        });

        // Cleanup the event listener
        return () => {
          window.google.maps.event.clearInstanceListeners(autocomplete);
        };
      }
    }
  }, [inputRef, show]);

  useEffect(() => {
    if (window.google && show) {
      const inputElement = officeAddRef.current;
      if (inputElement) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputElement,
          {
            types: ["address"],
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          setOfficeAddress(place?.formatted_address || "");
        });

        return () => {
          window.google.maps.event.clearInstanceListeners(autocomplete);
        };
      }
    }
  }, [officeAddRef, show]);

  useEffect(() => {
    if (window.google && show) {
      const inputElement = cityRef.current;
      if (inputElement) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputElement,
          {
            types: ["(cities)"],
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          setOfficeCity(place?.name || "");
        });

        return () => {
          window.google.maps.event.clearInstanceListeners(autocomplete);
        };
      }
    }
  }, [cityRef, show]);

  useEffect(() => {
    if (window.google && show) {
      const inputElement = postalRef.current;
      if (inputElement) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputElement,
          {
            types: ["postal_code"],
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          setOfficeZip(place?.name || "");
        });

        return () => {
          window.google.maps.event.clearInstanceListeners(autocomplete);
        };
      }
    }
  }, [postalRef, show]);

  useEffect(() => {
    if (window.google && show) {
      const inputElement = stateRef.current;
      if (inputElement) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputElement,
          {
            types: ["(cities)"],
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          setOfficeState(place?.name || "");
        });

        return () => {
          window.google.maps.event.clearInstanceListeners(autocomplete);
        };
      }
    }
  }, [stateRef, show]);

  useEffect(() => {
    if (window.google && show) {
      const inputElement = countryRef.current;
      if (inputElement) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputElement,
          {
            types: ["country"],
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          setOfficeCountry(place?.name || "");
        });

        return () => {
          window.google.maps.event.clearInstanceListeners(autocomplete);
        };
      }
    }
  }, [countryRef, show]);

  useEffect(() => {
    if (window.google && show) {
      const inputElement = terminalAddressRef.current;
      if (inputElement) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputElement,
          {
            types: ["address"],
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          setTerminalAddress(place?.formatted_address || "");
        });

        return () => {
          window.google.maps.event.clearInstanceListeners(autocomplete);
        };
      }
    }
  }, [terminalAddressRef, show]);

  useEffect(() => {
    if (window.google && show) {
      const inputElement = terminalCityRef.current;
      if (inputElement) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputElement,
          {
            types: ["(cities)"],
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          setTerminalCity(place?.name || "");
        });

        return () => {
          window.google.maps.event.clearInstanceListeners(autocomplete);
        };
      }
    }
  }, [terminalCityRef, show]);

  useEffect(() => {
    if (window.google && show) {
      const inputElement = terminalZipRef.current;
      if (inputElement) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputElement,
          {
            types: ["postal_code"],
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          setTerminalZip(place?.name || "");
        });

        return () => {
          window.google.maps.event.clearInstanceListeners(autocomplete);
        };
      }
    }
  }, [terminalZipRef, show]);

  useEffect(() => {
    if (window.google && show) {
      const inputElement = terminalStateRef.current;
      if (inputElement) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputElement,
          {
            types: ["(cities)"],
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          setTerminalState(place?.name || "");
        });

        return () => {
          window.google.maps.event.clearInstanceListeners(autocomplete);
        };
      }
    }
  }, [terminalStateRef, show]);

  useEffect(() => {
    if (window.google && show) {
      const inputElement = terminalCountryRef.current;
      if (inputElement) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputElement,
          {
            types: ["country"],
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          setTerminalCountry(place?.name || "");
        });

        return () => {
          window.google.maps.event.clearInstanceListeners(autocomplete);
        };
      }
    }
  }, [terminalCountryRef, show]);

  useEffect(() => {
    if (show && data) {
      setDriver(data?.driver?._id);
      setDestinationLocation(data?.destinationLocation || "");
      setDistance(data?.distance);
      setMilesDriven(data?.milesDriven);
      setCycleType(data?.cycleType);
      setDotNumber(data?.dotNumber);
      setVehicleNumber(data?.vehicleNumber);
      setCarrierName(data?.carrierName);
      setDriverName(returnFullName(data?.driver));
      setCoDriverName(data?.coDriverName);
      setShippingDoc(data?.shippingDoc);
      setTwentyForHourStartTime(data?.twentyForHourStartTime);
      setOdometerReading(data?.odometerReading);
      setOfficeAddress(data?.officeAddress);
      setTrailerId(data?.trailerId);
      setOfficeCity(data?.officeCity);
      setOfficeZip(data?.officeZip);
      setOfficeState(data?.officeState);
      setOfficeCountry(data?.officeCountry);
      setTerminalAddress(data?.terminalAddress);
      setTerminalCity(data?.terminalCity);
      setTerminalZip(data?.terminalZip);
      setTerminalState(data?.terminalState);
      setTerminalCountry(data?.terminalCountry);
      setComment(data?.comment);
    }
  }, [show, data]);

  const payload = {
    driver,
    trailerId,
    destinationLocation,
    distance,
    milesDriven,
    cycleType,
    dotNumber,
    vehicleNumber,
    carrierName,
    driverName,
    coDriverName,
    shippingDoc,
    twentyForHourStartTime,
    odometerReading,
    officeAddress,
    officeCity,
    officeZip,
    officeState,
    officeCountry,
    terminalAddress,
    terminalCity,
    terminalZip,
    terminalState,
    terminalCountry,
    comment,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    putApi(endPoints.logbook.editLog(data?._id), payload, {
      successMsg: "Success",
      additionalFunctions: [handleClose, fetchHandler],
      setLoading,
    });
  };

  return (
    <Modal
      centered
      title={`Edit Elog Form - ${title}`}
      open={show}
      onCancel={handleClose}
      footer={null}
      width={1000}
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={submitHandler}>
          <div className="pl-5 pr-5">
            <div className="add-steps mt-2">
              <div className={`step ${id === "info" ? "active" : ""}`}>
                <a href="#info" onClick={() => setId("info")}>
                  <p className="title">Trip Info*</p>
                </a>
              </div>
              <div className={`step ${id === "office" ? "active" : ""}`}>
                <a href="#office" onClick={() => setId("office")}>
                  <p className="title">Office Address</p>
                </a>
              </div>
              <div className={`step ${id === "terminal" ? "active" : ""}`}>
                <a href="#terminal" onClick={() => setId("terminal")}>
                  <p className="title">Terminal Address</p>
                </a>
              </div>
            </div>
            <div className="trip-box-container">
              <div
                className="trip-box"
                id="info"
                onMouseEnter={() => setId("info")}
              >
                <h4 className="heading">Trip Info</h4>

                <div className="bg-[#fff] p-4 mt-3">
                  <div className="flex-inputs ">
                    <div>
                      <label className="text-[#8E8F8F]">Driver</label>
                      <br />

                      <input
                        type="text"
                        className="text-input"
                        disabled
                        defaultValue={driver}
                      />
                    </div>
                    <div>
                      <label className="text-[#8E8F8F]">
                        Destination Location
                      </label>
                      <br />
                      <input
                        onChange={(e) => setDestinationLocation(e.target.value)}
                        value={destinationLocation}
                        className="text-input"
                        type="text"
                        required
                        ref={inputRef}
                      />
                    </div>
                    <div>
                      <label className="text-[#8E8F8F]">Distance </label>
                      <br />
                      <InputComponent
                        className="text-input"
                        required
                        value={distance}
                        onChangeEvent={(e) => setDistance(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex-inputs ">
                    <div>
                      <label className="text-[#8E8F8F]">Miles Driven</label>
                      <br />
                      <InputComponent
                        className="text-input"
                        required
                        value={milesDriven}
                        onChangeEvent={(e) => setMilesDriven(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[#8E8F8F]">Cycle Type</label>
                      <br />

                      <select
                        value={cycleType}
                        onChange={(e) => setCycleType(e.target.value)}
                        className="text-select"
                      >
                        <option value=""></option>
                        <option value="USA 70 hours / 8 days (Interstate)">
                          USA 70 hours / 8 days (Interstate)
                        </option>
                        <option value="Alaska 70 hours / 7 days (Interstate)">
                          Alaska 70 hours / 7 days (Interstate)
                        </option>
                        <option value="Alaska 80 hours / 8 days (Interstate)">
                          {" "}
                          Alaska 80 hours / 8 days (Interstate)
                        </option>
                        <option value="Caifornia 80 hours / 8 days (Interstate)">
                          {" "}
                          Caifornia 80 hours / 8 days (Interstate)
                        </option>
                        <option value="Florida 70 hours / 7 days (Interstate)">
                          {" "}
                          Florida 70 hours / 7 days (Interstate)
                        </option>
                        <option value="Florida 80 hours / 8 days (Interstate)">
                          {" "}
                          Florida 80 hours / 8 days (Interstate)
                        </option>

                        <option value="Oregon 70 hours / 7 days (Interstate)">
                          {" "}
                          Oregon 70 hours / 7 days (Interstate)
                        </option>
                        <option value="Oregon 80 hours / 8 days (Interstate)">
                          {" "}
                          Oregon 80 hours / 8 days (Interstate)
                        </option>

                        <option value="Texas 70 hours / 7 days (Interstate)">
                          {" "}
                          Texas 70 hours / 7 days (Interstate)
                        </option>

                        <option value="USA 60 hours / 7 days (Interstate)">
                          {" "}
                          USA 60 hours / 7 days (Interstate)
                        </option>
                        <option value="USA 70 hours / 8 days (Interstate)">
                          {" "}
                          USA 70 hours / 8 days (Interstate)
                        </option>

                        <option value="Wisconsin 70 hours / 7 days (Interstate)">
                          {" "}
                          Wisconsin 70 hours / 7 days (Interstate)
                        </option>
                        <option value="Wisconsin 80 hours / 8 days (Interstate)">
                          {" "}
                          Wisconsin 80 hours / 8 days (Interstate)
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[#8E8F8F]">DOT number</label>
                      <br />
                      <InputComponent
                        className="text-input"
                        required
                        value={dotNumber}
                        onChangeEvent={(e) => setDotNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex-inputs ">
                    <div>
                      <label className="text-[#8E8F8F]">Vehicle Number</label>
                      <br />
                      <InputComponent
                        className="text-input"
                        required
                        value={vehicleNumber}
                        onChangeEvent={(e) => setVehicleNumber(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[#8E8F8F]">Trailer ID</label>
                      <br />
                      <InputComponent
                        className="text-input"
                        required
                        value={trailerId}
                        onChangeEvent={(e) => setTrailerId(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[#8E8F8F]">Carrier Name</label>
                      <br />
                      <InputComponent
                        className="text-input"
                        required
                        value={carrierName}
                        onChangeEvent={(e) => setCarrierName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex-inputs ">
                    <div>
                      <label className="text-[#8E8F8F]">Driver Name</label>
                      <br />
                      <InputComponent
                        className="text-input"
                        required
                        value={driverName}
                        onChangeEvent={(e) => setDriverName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[#8E8F8F]">Co-Driver</label>
                      <br />
                      <InputComponent
                        className="text-input"
                        required
                        value={coDriverName}
                        onChangeEvent={(e) => setCoDriverName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[#8E8F8F]">Shipping Doc</label>
                      <br />
                      <InputComponent
                        className="text-input"
                        required
                        value={shippingDoc}
                        onChangeEvent={(e) => setShippingDoc(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex-inputs ">
                    <div>
                      <label className="text-[#8E8F8F]">
                        24 Hours Start Time
                      </label>
                      <br />
                      <InputComponent
                        className="text-input"
                        required
                        value={twentyForHourStartTime}
                        onChangeEvent={(e) =>
                          setTwentyForHourStartTime(e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="text-[#8E8F8F]">Odometer Reading</label>
                      <br />
                      <InputComponent
                        className="text-input"
                        required
                        value={odometerReading}
                        onChangeEvent={(e) =>
                          setOdometerReading(e.target.value)
                        }
                      />
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>

              <div
                className="trip-box"
                id="office"
                onMouseEnter={() => setId("office")}
              >
                <h4 className="heading">Office Address</h4>

                <div className="bg-[#fff] p-4 mt-3">
                  <div className="flex-inputs ">
                    <div>
                      <label className="text-[#8E8F8F]">Address</label>
                      <br />

                      <input
                        onChange={(e) => setOfficeAddress(e.target.value)}
                        value={officeAddress}
                        className="text-input"
                        type="text"
                        required
                        ref={officeAddRef}
                      />
                    </div>
                    <div>
                      <label className="text-[#8E8F8F]">City</label>
                      <br />
                      <input
                        onChange={(e) => setOfficeCity(e.target.value)}
                        value={officeCity}
                        className="text-input"
                        type="text"
                        required
                        ref={cityRef}
                      />
                    </div>
                    <div>
                      <label className="text-[#8E8F8F]">Zip</label>
                      <br />
                      <input
                        onChange={(e) => setOfficeZip(e.target.value)}
                        value={officeZip}
                        className="text-input"
                        type="text"
                        required
                        ref={postalRef}
                      />
                    </div>
                  </div>
                  <div className="flex-inputs ">
                    <div>
                      <label className="text-[#8E8F8F]">State </label>
                      <br />
                      <input
                        onChange={(e) => setOfficeState(e.target.value)}
                        value={officeState}
                        className="text-input"
                        type="text"
                        required
                        ref={stateRef}
                      />
                    </div>
                    <div>
                      <label className="text-[#8E8F8F]">Country </label>
                      <br />
                      <input
                        onChange={(e) => setOfficeCountry(e.target.value)}
                        value={officeCountry}
                        className="text-input"
                        type="text"
                        required
                        ref={countryRef}
                      />
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>

              <div
                className="trip-box"
                id="terminal"
                onMouseEnter={() => setId("terminal")}
              >
                <h4 className="heading">Terminal Address</h4>

                <div className="bg-[#fff] p-4 mt-3">
                  <div className="flex-inputs ">
                    <div>
                      <label className="text-[#8E8F8F]">Address</label>
                      <br />
                      <input
                        onChange={(e) => setTerminalAddress(e.target.value)}
                        value={terminalAddress}
                        className="text-input"
                        type="text"
                        required
                        ref={terminalAddressRef}
                      />
                    </div>
                    <div>
                      <label className="text-[#8E8F8F]">City</label>
                      <br />
                      <input
                        onChange={(e) => setTerminalCity(e.target.value)}
                        value={terminalCity}
                        className="text-input"
                        type="text"
                        required
                        ref={terminalCityRef}
                      />
                    </div>
                    <div>
                      <label className="text-[#8E8F8F]">Zip</label>
                      <br />
                      <input
                        onChange={(e) => setTerminalZip(e.target.value)}
                        value={terminalZip}
                        className="text-input"
                        type="text"
                        required
                        ref={terminalZipRef}
                      />
                    </div>
                  </div>
                  <div className="flex-inputs ">
                    <div>
                      <label className="text-[#8E8F8F]">State </label>
                      <br />
                      <input
                        onChange={(e) => setTerminalState(e.target.value)}
                        value={terminalState}
                        className="text-input"
                        type="text"
                        required
                        ref={terminalStateRef}
                      />
                    </div>
                    <div>
                      <label className="text-[#8E8F8F]">Country </label>
                      <br />
                      <input
                        onChange={(e) => setTerminalCountry(e.target.value)}
                        value={terminalCountry}
                        className="text-input"
                        type="text"
                        required
                        ref={terminalCountryRef}
                      />
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-[#8E8F8F]">Comment</label>
                <br />
                <InputComponent
                  className="text-input"
                  placeholder="Enter Comment..."
                  required
                  value={comment}
                  onChangeEvent={(e) => setComment(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-between mt-5 gap-5 m-5">
              <ButtonComponent
                label={"Cancel"}
                className={
                  "bg-[#fff] w-[50%] h-[45px] text-[#eb5757] flex justify-center items-center gap-2 border border-red-500"
                }
                type="button"
              />
              <ButtonComponent
                label={"Update"}
                className={
                  "bg-[#34B7C1] w-[50%] h-[45px]  text-white flex justify-center items-center gap-2"
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

const EditElogEvent = ({
  show,
  handleClose,
  title,
  graph,
  date,
  data,
  fetchDetails,
}) => {
  const [chartState, setChartState] = useState({
    series: [
      {
        name: "Status",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
      },
      stroke: {
        curve: "stepline",
        width: 2,
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      title: {
        text: "",
        align: "left",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        categories: [
          "M",
          "",
          "1",
          "",
          "2",
          "",
          "3",
          "",
          "4",
          "",
          "5",
          "",
          "6",
          "",
          "7",
          "",
          "8",
          "",
          "9",
          "",
          "10",
          "",
          "11",
          "",
          "N",
          "",
          "1",
          "",
          "2",
          "",
          "3",
          "",
          "4",
          "",
          "5",
          "",
          "6",
          "",
          "7",
          "",
          "8",
          "",
          "9",
          "",
          "10",
          "",
          "11",
          "",
          "M",
        ],
      },
      yaxis: {
        min: 1,
        max: 4,
        labels: {
          formatter: function (value) {
            const statusLabels = { 2: "D", 1: "On", 3: "SB", 4: "Off" };
            // const statusLabels = { 2: "D", 1: "On", 3: "Off", 4: "SB" };
            return statusLabels[value] || "";
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#e0e0e0", // Match gridlines to desired style
        xaxis: {
          lines: {
            show: true, // Show vertical gridlines
          },
        },
        yaxis: {
          lines: {
            show: false, // Show horizontal gridlines
          },
        },
      },
      colors: ["#3E7B27"],
    },
  });
  const [dutyStatus, setDutyStatus] = useState("");
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (graph && show) {
      const timeArray = graph?.data?.docs?.map((item) => {
        const date = new Date(item.fromTime);
        return isNaN(date.getTime()) ? null : date;
      });
      const statusArr = graph?.data?.docs?.map(
        (item) => statusMapping[item.dutyStatus]
      );
      const chartData = new Array(50).fill(null);
      let lastStatus = null;
      let lastTimeIndex = -1;
      let statusMap = {};
      timeArray.forEach((time, index) => {
        if (time) {
          const hour = time.getHours();
          const minutes = time.getMinutes();
          let categoryIndex = hour * 2 + (minutes >= 30 ? 1 : 0);
          if (minutes >= 15 && minutes < 30) {
            categoryIndex = hour * 2 + 1;
          }
          if (!(categoryIndex in statusMap)) {
            statusMap[categoryIndex] = statusArr[index];
          }
          if (lastTimeIndex !== -1 && categoryIndex > lastTimeIndex) {
            for (let i = lastTimeIndex + 1; i < categoryIndex; i++) {
              if (!statusMap[i]) {
                statusMap[i] = lastStatus;
              }
            }
          }

          lastStatus = statusArr[index];
          lastTimeIndex = categoryIndex;
        }
      });

      Object.keys(statusMap).forEach((index) => {
        chartData[index] = statusMap[index];
      });

      setChartState((prevState) => ({
        ...prevState,
        series: [
          {
            name: "Duty Status",
            data: chartData,
          },
        ],
      }));
    }
  }, [graph, show]);

  const formatTimeHandler = (time, setState) => {
    const originalData = new Date(time);
    const year = originalData.getUTCFullYear();
    const month = String(originalData.getUTCMonth() + 1).padStart(2, "0");
    const day = String(originalData.getUTCDate()).padStart(2, "0");
    const hours = String(originalData.getHours()).padStart(2, "0");
    const minutes = String(originalData.getMinutes()).padStart(2, "0");
    const seconds = String(originalData.getSeconds()).padStart(2, "0");
    const milliseconds = String(originalData.getMilliseconds()).padStart(
      3,
      "0"
    );
    const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    if (typeof time !== "string") {
      console.warn("Invalid time input:", time);
      return "";
    }
    const splitTime = isoString?.split("T")?.[1];
    const slicedTime = splitTime?.slice(0, 5);
    setState(`${slicedTime}:00.000Z`);
  };

  useEffect(() => {
    if (show && data) {
      if (data?.fromTime) {
        formatTimeHandler(data?.fromTime, setFromTime);
      }
      if (data?.toTime) {
        formatTimeHandler(data?.toTime, setToTime);
      }

      setComment(data?.comment);
      setDutyStatus(data?.dutyStatus);
      setLocation(data?.location);
    }
  }, [show && data]);
  const convertDateFormat = (dateString) => {
    if (!dateString) {
      return;
    }
    const [day, month, year] = dateString?.split("-");
    return `${year}-${month}-${day}T`;
  };

  const handleFromTimeChange = (newTime) => {
    const updatedTime = `${newTime}:00.000Z`;
    setFromTime(updatedTime);
  };

  const handleToTimeChange = (newTime) => {
    const updatedTime = `${newTime}:00.000Z`;
    setToTime(updatedTime);
  };

  const formatTime = (time) => {
    if (typeof time !== "string") {
      console.warn("Invalid time input:", time);
      return "";
    }
    const slicedTime = time.slice(0, 5);
    convertDateFormat(data?.date);
    return slicedTime;
  };

  const payload = {
    comment,
    dutyStatus,
    location,
    fromTime: `${convertDateFormat(data?.date)}${fromTime}`,
    toTime: `${convertDateFormat(data?.date)}${toTime}`,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    putApi(endPoints.logbook.updateLogbook(data?._id), payload, {
      setLoading,
      successMsg: "Edited !",
      additionalFunctions: [handleClose, fetchDetails],
    });
  };

  return (
    <Modal
      centered
      title={`Edit Elog Form -  ${title}`}
      open={show}
      onCancel={handleClose}
      footer={null}
      width={1000}
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={submitHandler}>
          <div className="pl-5 pr-5">
            <div className="p-2">
              <ReactApexChart
                options={chartState.options}
                series={graph?.data?.docs ? chartState.series : []}
                type="line"
                height={350}
              />
            </div>

            <div className="flex-inputs">
              <div className="flex gap-2 item-center">
                <div>
                  <label className="text-[#8E8F8F]">Start Time</label>
                  <br />
                  <InputComponent
                    className="text-input"
                    type="time"
                    onChangeEvent={(e) => handleFromTimeChange(e.target.value)}
                    value={fromTime && formatTime(fromTime)}
                  />
                </div>
                <div>
                  <label className="text-[#8E8F8F]">End Time</label>
                  <br />
                  <InputComponent
                    className="text-input"
                    type="time"
                    onChangeEvent={(e) => handleToTimeChange(e.target.value)}
                    value={toTime && formatTime(toTime)}
                  />
                </div>
              </div>
              <div>
                <label className="text-[#8E8F8F]">Event Type</label>
                <br />
                <select
                  className="text-input"
                  onChange={(e) => setDutyStatus(e.target.value)}
                  value={dutyStatus}
                >
                  <option value="">select</option>
                  <option value="On">On Duty</option>
                  <option value="Off">Off Duty</option>
                  <option value="D">Driving</option>
                  <option value="SB">Slepeer Berth</option>
                </select>
              </div>
            </div>

            <div className="flex-inputs">
              <div>
                <label className="text-[#8E8F8F]">Geo Location</label>
                <br />
                <InputComponent
                  className="text-input"
                  onChangeEvent={(e) => setLocation(e.target.value)}
                  value={location}
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="text-[#8E8F8F]">
                Comment <span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <InputComponent
                className="text-input"
                required
                type="text"
                onChangeEvent={(e) => setComment(e.target.value)}
                value={comment}
              />
            </div>

            <div className="flex justify-between mt-5 gap-5">
              <ButtonComponent
                label={"Cancel"}
                className={
                  "bg-[#fff] w-[50%] h-[45px] text-[#eb5757] flex justify-center items-center gap-2 border border-red-500"
                }
                type="button"
              />
              <ButtonComponent
                label={"Update"}
                className={
                  "bg-[#86e3ce] w-[50%] h-[45px]  text-black font-bold flex justify-center items-center gap-2"
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

const ViewProfile = ({ show, handleClose, data }) => {
  const navigate = useNavigate();

  const navigationHandler = (link) => {
    navigate(link);
    handleClose();
  };

  return (
    <Modal
      centered
      title="Profile"
      open={show}
      onCancel={handleClose}
      footer={null}
    >
      <hr />
      <div className="text-center text-[#1F384C] flex items-center flex-col pb-4 mt-3">
        <span className="font-bold "> {returnFullName(data)} </span>
        <span> {data?.email} </span>
      </div>
      <div className="flex items-center p-2 justify-between w-full bg-[#ECF5FF] hover:text-[#34B7C1] cursor-pointer">
        <div className="flex gap-2">
          <img
            src={data?.profilePic}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "100%",
              objectFit: "cover",
              objectPosition: "top",
            }}
            alt=""
          />
          <div>
            <p className="text-[#86E3CE] font-[700]"> {data?.owner} </p>
            <p className="text-[#1F384C] font-[700]">DOT {data?.dot} </p>
          </div>
        </div>
        <div>
          <img src="../Vector (17).png" alt="" />
        </div>
      </div>

      <ul>
        <li
          onClick={() => navigationHandler("/Companyprofile")}
          className="px-10 py-4 text-[#1F384C] font-[700] cursor-pointer flex gap-2"
        >
          Company profile
        </li>

        <li
          onClick={() => navigationHandler("/Billingdetails")}
          className="px-10 py-4 text-[#1F384C] font-[700] cursor-pointer flex gap-1"
        >
          Billing Details
        </li>

        <li
          className="px-10 py-4  font-[700] text-[#EB5757] cursor-pointer flex gap-2"
          onClick={() => LogOutHandler(navigate)}
        >
          Logout
        </li>
      </ul>
    </Modal>
  );
};

const EditHomeTerminal = ({ show, handleClose, fetchProfile, data }) => {
  const [timeZone, setTimeZone] = useState("");
  const [loading, setLoading] = useState(false);

  const payload = {
    timeZone,
  };

  useEffect(() => {
    if (show && profile) {
      setTimeZone(data?.data?.timeZone);
    }
  }, [show, profile]);

  const submitHandler = (e) => {
    e.preventDefault();
    putApi(endPoints.companies.updateDetail(data?.data?._id), payload, {
      setLoading,
      successMsg: "Timezone updated successfully !",
      additionalFunctions: [handleClose, fetchProfile],
    });
  };

  return (
    <Modal
      centered
      title="Edit Home Terminal Timezone"
      open={show}
      onCancel={handleClose}
      footer={null}
      width={800}
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={submitHandler}>
          <div className="pl-5 pr-5">
            <div className="flex-inputs" style={{ flexWrap: "wrap" }}>
              <div style={{ width: "100%" }}>
                <label>
                  Home Terminal Timezone
                  <span style={{ color: "red" }}>*</span>
                </label>{" "}
                <br />
                <select
                  className="text-select"
                  onChange={(e) => setTimeZone(e.target.value)}
                  value={timeZone}
                >
                  <option value="">Select your preference</option>
                  <option value={"Eastern Time (US & Canada)"}>
                    Eastern Time (US & Canada)
                  </option>
                  <option value={"Central Time (US & Canada)"}>
                    Central Time (US & Canada)
                  </option>
                  <option value={"Mountain Daylight Time (US & Canada)"}>
                    Mountain Daylight Time (US & Canada)
                  </option>
                  <option value={"Mountain Standard Time (US & Canada)"}>
                    Mountain Standard Time (US & Canada)
                  </option>
                  <option value={"Pacific Time (US & Canada)"}>
                    Pacific Time (US & Canada)
                  </option>
                  <option value={"Arizona"}>Arizona</option>
                  <option value={"Alaska"}>Alaska</option>
                </select>
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
                  "bg-[#86E3CE] border-[#86E3CE] w-[50%] h-[45px]  text-white flex justify-center items-center gap-2"
                }
                isLoading={loading}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const EditCompanyAddress = ({ show, handleClose, type }) => {
  return (
    <Modal
      centered
      title={type}
      open={show}
      onCancel={handleClose}
      footer={null}
      width={800}
    >
      <div className="reset-password-modal">
        <hr />
        <form>
          <div className="pl-5 pr-5">
            <div className="flex-inputs">
              <div>
                <label className="text-[#8E8F8F]">
                  Address Line 1 <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <InputComponent className="text-input" required />
              </div>
              <div>
                <label className="text-[#8E8F8F]">
                  Address Line 2 <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <InputComponent className="text-input" required />
              </div>
            </div>

            <div className="flex-inputs">
              <div>
                <label className="text-[#8E8F8F]">
                  City <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <InputComponent className="text-input" required />
              </div>
              <div>
                <label className="text-[#8E8F8F]">
                  State <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <InputComponent className="text-input" required />
              </div>
            </div>

            <div className="flex-inputs">
              <div>
                <label className="text-[#8E8F8F]">
                  Country <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <InputComponent className="text-input" required />
              </div>
              <div>
                <label className="text-[#8E8F8F]">
                  Zipcode <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <InputComponent className="text-input" required />
              </div>
            </div>

            <div className="flex justify-between mt-5 gap-5">
              <ButtonComponent
                label={"Cancel"}
                className={
                  "bg-[#fff] w-[50%] h-[45px] text-[#eb5757] flex justify-center items-center gap-2 border border-red-500"
                }
                type="button"
              />
              <ButtonComponent
                label={"Update"}
                className={
                  "bg-[#34B7C1] w-[50%] h-[45px]  text-white flex justify-center items-center gap-2"
                }
                type="button"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const MenuBar = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const data = [
    {
      link: "/Logbook",
      title: "Logbook",
    },
    {
      link: "/location",
      title: "Location",
    },
    {
      link: "/Trackinglinks",
      title: "Tracking Links",
    },
    {
      link: "/Geofences",
      title: "Geofences",
    },
    {
      link: "/Dashcams",
      title: "Dashcams",
    },
    {
      link: "/Reports",
      title: "Reports",
    },
    {
      link: "/Iftatrips",
      title: "IFTA",
    },
    {
      link: "/Iftareports",
      title: "IFTA Reports",
    },
    {
      link: "/vehicles",
      title: "Vehicles",
    },
    {
      link: "/Vehicles/trailers",
      title: "Trailers",
    },
    {
      link: "/Drivers",
      title: "Drivers",
    },
    {
      link: "/Devices",
      title: "Devices",
    },
    {
      link: "/Devices/TrackingDevices",
      title: "Tracking Devices",
    },
    {
      link: "/Devices/SensorDevices",
      title: "Sensor Drives",
    },
    {
      link: "/Devices/DashcamDevices",
      title: "Dashcam Devices",
    },
    {
      link: "/Userroles",
      title: "User Roles",
    },
    {
      link: "/Terminals",
      title: "Terminals",
    },
    {
      link: "/Alerts",
      title: "Alerts",
    },
    {
      link: "/Diagnosticevents",
      title: "Diagnostic",
    },
    {
      link: "/Apisharing",
      title: "FMCSA",
    },
  ];

  const navigationHandler = (link) => {
    handleClose();
    navigate(link);
  };

  return (
    <Drawer
      title={null}
      placement={"left"}
      closable={false}
      onClose={handleClose}
      open={show}
      style={{ backgroundColor: "#34B7C1" }}
    >
      <div className="menu-bar">
        <div className="close-icon">
          <i className="fa-solid fa-close" onClick={handleClose} />
        </div>

        <div className="sidebar-container full-width">
          <img src={logo} alt="" className="sidebar-logo-img" />
        </div>

        <ul>
          {data.map((i, index) => (
            <li key={index} onClick={() => navigationHandler(i.link)}>
              {" "}
              {i.title}{" "}
            </li>
          ))}
        </ul>
      </div>
    </Drawer>
  );
};

const AlertDateSelector = ({ show, handleClose }) => {
  return (
    <Modal
      centered
      title={"Date Filter"}
      open={show}
      onCancel={handleClose}
      footer={null}
      width={700}
      className="custom-modal"
    >
      <hr className="mb-4" />
      <DateFilter />
    </Modal>
  );
};

const CreateAdmin = ({ handleClose, show, fetchApi, isEdit, prevData }) => {
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const payload = {
    fullName,
    password,
    contact,
    email,
    permissions: permissions?.map((i) => i.value),
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (isEdit) {
      putApi(endPoints.admin.update(prevData?._id), payload, {
        successMsg: "Success !",
        setLoading,
        additionalFunctions: [fetchApi, handleClose],
      });
    } else {
      postApi(endPoints.admin.create, payload, {
        successMsg: "Created !",
        setLoading,
        additionalFunctions: [fetchApi, handleClose],
      });
    }
  };

  const options = innerMenuOptions.map((item) => ({
    value: item.link,
    label: item.label,
  }));

  useEffect(() => {
    if (show && isEdit) {
      setFullName(prevData?.fullName);
      setContact(prevData?.mobileNumber);
      setEmail(prevData?.email);
      if (prevData?.permissions?.length > 0) {
        const filteredPer = options?.filter((option) =>
          prevData?.permissions?.includes(option.value)
        );
        setPermissions(filteredPer);
      }
    } else {
      setFullName("");
      setContact("");
      setEmail("");
      setPassword("");
      setPermissions([]);
    }
  }, [show, isEdit, prevData]);

  return (
    <Modal
      centered
      title={isEdit ? "Edit Sub-Admin" : "Create Sub-Admin"}
      open={show}
      onCancel={handleClose}
      footer={null}
      width={600}
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={submitHandler}>
          <div className="p-5">
            <div>
              <label className="text-[#8E8F8F]">
                Full Name <span className="text-[#a63019]">*</span>
              </label>
              <br />
              <InputComponent
                className="text-input"
                onChangeEvent={(e) => setFullName(e.target.value)}
                value={fullName}
                required={true}
              />
            </div>

            <div className="mt-4">
              <label className="text-[#8E8F8F]">
                Mobile Number <span className="text-[#a63019]">*</span>
              </label>
              <br />
              <InputComponent
                className="text-input"
                onChangeEvent={(e) => setContact(e.target.value)}
                value={contact}
                required={true}
                type="tel"
              />
            </div>

            <div className="mt-4">
              <label className="text-[#8E8F8F]">
                Email Address <span className="text-[#a63019]">*</span>
              </label>
              <br />
              <InputComponent
                className="text-input"
                onChangeEvent={(e) => setEmail(e.target.value)}
                value={email}
                required={true}
                type="email"
              />
            </div>

            <div className="mt-4">
              <label className="text-[#8E8F8F]">
                Password {!isEdit && <span className="text-[#a63019]">*</span>}
              </label>
              <br />
              <InputComponent
                className="text-input"
                onChangeEvent={(e) => setPassword(e.target.value)}
                value={password}
                required={isEdit ? false : true}
                type="password"
              />
            </div>

            <div className="mt-4">
              <label className="text-[#8E8F8F]">
                Permissions <span className="text-[#a63019]">*</span>
              </label>
              <br />
              <Select
                isMulti
                options={options}
                placeholder="Select Permission"
                value={permissions}
                onChange={(e) => setPermissions(e)}
              />
            </div>

            <div className="flex justify-center mt-5 gap-5">
              <ButtonComponent
                label={"Cancel"}
                className={
                  "text-[#F56C89] w-[50%] h-[45px] bg-white border border-[#F56C89]"
                }
                onClickEvent={handleClose}
                type="button"
              />

              <ButtonComponent
                label={isEdit ? "Update" : "Create"}
                className={
                  "bg-[#34B7C1] w-[50%] h-[45px]  text-white flex justify-center items-center gap-2"
                }
                isLoading={loading}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const EditThreshold = ({ show, handleClose }) => {
  return (
    <Modal
      centered
      title={"Edit Dormancy Threshold"}
      open={show}
      onCancel={handleClose}
      footer={null}
      width={400}
    >
      <div className="reset-password-modal">
        <hr />
        <form>
          <div className="pl-5 pr-5">
            <div className="w-full mt-5">
              <label className="text-[#8E8F8F]">Number of Dormant Days</label>
              <br />
              <select className="text-select" required>
                <option value=""></option>
              </select>
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
                label={"Save"}
                className={
                  "bg-[#34B7C1] w-[50%] h-[45px]  text-white flex justify-center items-center gap-2"
                }
                type="button"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const EditHour = ({ show, handleClose }) => {
  return (
    <Modal
      centered
      title={"Edit Daily Hours Available"}
      open={show}
      onCancel={handleClose}
      footer={null}
      width={400}
    >
      <div className="reset-password-modal">
        <hr />
        <form>
          <div className="pl-5 pr-5">
            <div className="w-full mt-5">
              <label className="text-[#8E8F8F]">
                Number of Hours Available
              </label>
              <br />
              <select className="text-select" required>
                <option value=""></option>
              </select>
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
                label={"Save"}
                className={
                  "bg-[#34B7C1] w-[50%] h-[45px]  text-white flex justify-center items-center gap-2"
                }
                type="button"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export {
  EditCompany,
  CreateAdmin,
  CreateNewUser,
  ResetUserPassword,
  EditUserDetails,
  CreateTerminal,
  AddCompany,
  EditVehicleDetails,
  EditVehicleRegestration,
  EditTruckLiability,
  EditCargoInsurance,
  CreateTruck,
  AssignDriverInTerminal,
  UnAssignDriverInTerminal,
  CreateDriver,
  EditDriver,
  UnAssignDriver,
  ShareApiKey,
  EditElog,
  EditElogEvent,
  ViewProfile,
  EditHomeTerminal,
  EditCompanyAddress,
  MenuBar,
  AlertDateSelector,
  EditThreshold,
  EditHour,
};
