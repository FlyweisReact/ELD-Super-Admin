/** @format */
import { useEffect, useState } from "react";
import { getApi, postApi, putApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { Modal } from "antd";
import { ButtonComponent, InputComponent } from "../HelpingComponent";
import tickmark from "../../Assets/Vechicledetail/vihiclegallary.svg";

const CreateNewUser = ({ handleClose, show, fetchApi }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [terminal, setTerminal] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const fullName = firstName + " " + lastName;

  const payload = {
    firstName,
    lastName,
    fullName,
    terminal,
    email,
    password,
    userType,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    postApi(endPoints.user.createUser, payload, {
      successMsg: "New user created !",
      setLoading,
      additionalFunctions: [fetchApi, handleClose],
    });
  };

  return (
    <Modal
      centered
      title="Add User"
      open={show}
      onCancel={handleClose}
      footer={null}
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={submitHandler}>
          <div className="pl-5 pr-5">
            <div className="gap-5 justify-between mt-5 flex ">
              <div>
                <label className="text-[#8E8F8F]">First name *</label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input merger-one"
                  onChangeEvent={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  required={true}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">Last name *</label>
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
            <div className="gap-5 justify-center mt-5 flex flex-col">
              <div>
                <label className="text-[#8E8F8F]">Email address *</label>
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
                  <option value="SuperAdmin">Super Admin</option>
                  <option value="Corporate">Corporate</option>
                  <option value="User">User</option>
                  <option value="Driver">Driver</option>
                </select>
              </div>

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
                  <option value="SRH Logistic LLC">SRH Logistic LLC</option>
                </select>
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
    putApi(endPoints.user.resetPassword(userId), payload, {
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
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={submitHandler}>
          <div className="pl-10 pr-10">
            <div className=" gap-5 justify-center mt-5 flex flex-col">
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

            <div className="flex justify-center mt-10 gap-5 m-5">
              <ButtonComponent
                label={"Cancel"}
                className={
                  "text-[#F56C89] w-[180px] h-[45px] bg-white border border-[#F56C89]"
                }
                onClickEvent={handleCancel}
                type="button"
              />
              <ButtonComponent
                label={"Reset"}
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

const EditUserDetails = ({ handleClose, show, fetchApi, userId, prevData }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [terminal, setTerminal] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
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
    putApi(endPoints.user.updateDetails(userId), payload, {
      successMsg: "Success !",
      setLoading,
      additionalFunctions: [resetHandler, handleClose, fetchApi],
    });
  };

  useEffect(() => {
    if (show && prevData) {
      setFirstName(prevData?.firstName);
      setLastName(prevData?.lastName);
      setTerminal(prevData?.terminal);
      setEmail(prevData?.email);
      setUserType(prevData?.userType);
    }
  }, [show, prevData]);

  return (
    <Modal
      centered
      title="Edit User"
      open={show}
      onCancel={handleClose}
      footer={null}
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={submitHandler}>
          <div className="pl-5 pr-5">
            <div className="gap-5 justify-between mt-5 flex ">
              <div>
                <label className="text-[#8E8F8F]">First name *</label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input merger-one"
                  onChangeEvent={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  required={true}
                />
              </div>
              <div>
                <label className="text-[#8E8F8F]">Last name *</label>
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
            <div className="gap-5 justify-center mt-5 flex flex-col">
              <div>
                <label className="text-[#8E8F8F]">Email address *</label>
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
                  <option value="SuperAdmin">Super Admin</option>
                  <option value="Corporate">Corporate</option>
                  <option value="User">User</option>
                  <option value="Driver">Driver</option>
                </select>
              </div>

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
                  <option value="SRH Logistic LLC">SRH Logistic LLC</option>
                </select>
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

const CreateTerminal = ({ handleClose, show, fetchApi, isEdit, prevData }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [contact, setContact] = useState("");

  const payload = {
    name,
    address,
    timeZone,
    contact,
  };

  const resetHandler = () => {
    setName("");
    setAddress("");
    setTimeZone("");
    setContact("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    postApi(endPoints.terminal.createNew, payload, {
      setLoading,
      successMsg: "Success !",
      additionalFunctions: [handleClose, fetchApi, resetHandler],
    });
  };

  const updateHandler = (e) => {
    e.preventDefault();
    putApi(endPoints.terminal.update(prevData?._id), payload, {
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
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={isEdit ? updateHandler : submitHandler}>
          <div className="pl-5 pr-5">
            <div className="mt-5 justify-center flex">
              <div className="w-full">
                <label className="text-[#8E8F8F]">Terminal Name *</label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setName(e.target.value)}
                  value={name}
                  required={true}
                />
              </div>
            </div>

            <div className="gap-5 justify-between mt-5 flex ">
              <div>
                <label className="text-[#8E8F8F]">Terminal Address *</label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input merger-one"
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

            <div className="mt-5  flex-col justify-center">
              <div>
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

            <div className="flex justify-center mt-10 gap-5 m-5">
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

const AddCompany = ({ handleClose, show, fetchApi }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [dot, setDot] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [owner, setOwner] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");

  const payload = {
    name,
    dot,
    contact,
    address,
    owner,
    ownerEmail,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    postApi(endPoints.company.create, payload, {
      successMsg: "Created !",
      setLoading,
      additionalFunctions: [fetchApi, handleClose],
    });
  };

  return (
    <Modal
      centered
      title="Add Company"
      open={show}
      onCancel={handleClose}
      footer={null}
      width={680}
    >
      <div className="reset-password-modal">
        <hr />
        <form onSubmit={submitHandler}>
          <div className="pl-5 pr-5">
            <div className="gap-5 justify-between mt-5 flex ">
              <div className="w-[50%]">
                <label className="text-[#8E8F8F]">Company Name*</label>
                <br />
                <InputComponent
                  placeholder="Enter company name"
                  className="text-input merger-one"
                  onChangeEvent={(e) => setName(e.target.value)}
                  value={name}
                  required={true}
                />
              </div>
              <div className="w-[50%]">
                <label className="text-[#8E8F8F]">DOT*</label>
                <br />
                <InputComponent
                  placeholder="Enter DOT"
                  className="text-input"
                  onChangeEvent={(e) => setDot(e.target.value)}
                  value={dot}
                  required={true}
                />
              </div>
            </div>

            <div className="gap-5 justify-between mt-5 flex ">
              <div className="w-[50%]">
                <label className="text-[#8E8F8F]">Contact*</label>
                <br />
                <InputComponent
                  placeholder="Enter company contact"
                  className="text-input merger-one"
                  onChangeEvent={(e) => setContact(e.target.value)}
                  value={contact}
                  required={true}
                />
              </div>
              <div className="w-[50%]">
                <label className="text-[#8E8F8F]">Address*</label>
                <br />
                <InputComponent
                  placeholder="Enter company address"
                  className="text-input"
                  onChangeEvent={(e) => setAddress(e.target.value)}
                  value={address}
                  required={true}
                />
              </div>
            </div>

            <div className="gap-5 justify-between mt-5 flex ">
              <div className="w-[50%]">
                <label className="text-[#8E8F8F]">Owner*</label>
                <br />
                <InputComponent
                  placeholder="Enter owner name"
                  className="text-input merger-one"
                  onChangeEvent={(e) => setOwner(e.target.value)}
                  value={owner}
                  required={true}
                />
              </div>
              <div className="w-[50%]">
                <label className="text-[#8E8F8F]">Owner Email*</label>
                <br />
                <InputComponent
                  placeholder="Enter owner email"
                  className="text-input"
                  onChangeEvent={(e) => setOwnerEmail(e.target.value)}
                  value={ownerEmail}
                  required={true}
                  type={"email"}
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
                label={"Add"}
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
    putApi(endPoints.truck.editVehicleDetails(prevData?._id), payload, {
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
    putApi(endPoints.truck.editRegistration(prevData?._id), payload, {
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
    putApi(endPoints.truck.editTruckLiability(prevData?._id), payload, {
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
    putApi(endPoints.truck.editCargoInsurance(prevData?._id), payload, {
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

const CreateTruck = ({ handleClose, show, fetchApi }) => {
  const [loading, setLoading] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState("");

  const payload = {
    vehicleNumber,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    postApi(endPoints.truck.createTruck, payload, {
      successMsg: "Added !",
      setLoading,
      additionalFunctions: [fetchApi, handleClose],
    });
  };

  return (
    <Modal
      centered
      title="Add Truck"
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
                <label className="text-[#8E8F8F]">Vehicle Number</label>
                <br />
                <InputComponent
                  placeholder=""
                  className="text-input"
                  onChangeEvent={(e) => setVehicleNumber(e.target.value)}
                  value={vehicleNumber}
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
                label={"Create"}
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

const AssignDriverInTerminal = ({ handleClose, show, fetchApi, id }) => {
  const [loading, setLoading] = useState(false);
  const [driverId, setDriverId] = useState("");
  const [truckId, setTruckId] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [drivers, setDrivers] = useState({});
  const [vehicles, setVehicles] = useState({});

  const [ ]


  const payload = {
    driver: driverId,
    truck: truckId,
    unitNumber,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    putApi(endPoints.terminal.assignDriver(id), payload, {
      successMsg: "Assigned !",
      setLoading,
      additionalFunctions: [fetchApi, handleClose],
    });
  };

  useEffect(() => {
    if (show) {
      getApi(endPoints.driver.getAll({ limit: 100 }), {
        setResponse: setDrivers,
      });
      getApi(endPoints.truck.paginatedTrucks({ limit: 100 }), {
        setResponse: setVehicles,
      });
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
                      {i?.fullName}
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
                label={"Assign"}
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
      endPoints.terminal.unAssignDriver({ id, arrayId: data?._id }),
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
              <div>
                <label className="text-[#8E8F8F]">Current Vehicle</label>
                <br />
                <input
                  type={"text"}
                  value={data?.truck}
                  className="text-input"
                  disabled
                />
              </div>
            </div>

            <div className="h-[44px]  flex items-center justify-start  text-[#FC8041]">
              Please unassign in order to assign a new vehicle
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

export {
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
};
