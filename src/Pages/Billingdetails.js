/** @format */

import React, { useState } from "react";
import { IoIosInformationCircle } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { SectionHeading, Tabs } from "../Components/HelpingComponent";
import TableLayout from "../Components/TableLayout/TableLayout";

const Billingdetails = () => {
  const [selectedTab, setselectedTab] = useState("Overdues");
  const [selectPopupTab, setSelectedPopupTab] = useState("Direct Debit (ACH)");
  const [makepaymentpopup, setMakepaymentpopup] = useState(false);
  const [editbillingaddress, setEditbillingaddress] = useState(false);
  const [addPaymentMethodPopup, setAddPaymentMethodPopup] = useState(false);

  const thead = ["Date", "Amount", "Payment Source", "Invoices"];

  const tbody = [
    [
      "01/03/2022",
      "$877.33",
      "Visa-8733",
      <div>
        <button className="border-[#86e3ce] border text-[#86e3ce] rounded-lg font-bold  w-[140px] h-[44px]">
          View
        </button>
      </div>,
    ],
    [
      "01/03/2022",
      "$877.33",
      "Visa-8733",
      <div>
        <button className="border-[#86e3ce] border text-[#86e3ce] font-bold rounded-lg   w-[140px] h-[44px]">
          View
        </button>
      </div>,
    ],
  ];

  const tabsOptions = [
    {
      value: "Overdues",
      label: "Overdues (1)",
    },
    {
      value: "Next Billing",
      label: "Next Billing",
    },
    {
      value: "History",
      label: "History",
    },
  ];

  const ExtraComponent = () => {
    return (
      <div className="flex gap-2 driver-actions-btn">
        <button
          className="bg-[#86e3ce] w-[200px] flex justify-center items-center gap-2  rounded-lg text-black font-semibold h-[45px]"
          onClick={() => setMakepaymentpopup(true)}
        >
          Make Payment
        </button>
      </div>
    );
  };

  return (
    <>
      {makepaymentpopup ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[600px] bg-white outline-none focus:outline-none p-5">
                <div className="flex items-start justify-between rounded-t">
                  <h3 className="text-xl font-semibold text-[#666666]">
                    Make Payment(s)
                  </h3>

                  <span
                    onClick={() => setMakepaymentpopup(false)}
                    className="cursor-pointer"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
                <hr className="mt-2" />
                <div className="h-[44px] rounded-lg flex items-center justify-start pl-5 mt-5 ">
                  This will execute all pending payments. Continue?
                </div>

                <div className="flex justify-center mt-5 gap-5 ">
                  <button
                    className="text-[#F56C89] w-[429px] rounded-lg  h-[45px] bg-white border border-[#F56C89]"
                    onClick={() => setMakepaymentpopup(false)}
                  >
                    No
                  </button>
                  <button className="bg-[#86e3ce] w-[429px] h-[45px]  rounded-lg text-black font-semibold flex justify-center items-center gap-2">
                    Make Payment(s)
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {editbillingaddress ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[600px] bg-white outline-none focus:outline-none p-5">
                <div className="flex items-start justify-between rounded-t">
                  <h3 className="text-xl font-semibold text-[#666666]">
                    Edit Billing Address
                  </h3>

                  <span
                    onClick={() => setEditbillingaddress(false)}
                    className="cursor-pointer"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
                <hr className="mt-2" />

                <div className="flex  gap-4 mt-5">
                  <div>
                    <div>
                      <label className="text-[#8E8F8F]">
                        Address Line 1  *
                      </label>
                      <br />
                      <input
                        placeholder="Write adress"
                        className="placeholder: block w-[270px] mt-1  border-b py-1.5 pr-4 text-gray-900  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label className="text-[#8E8F8F]">
                        Address Line 2  *
                      </label>
                      <br />
                      <input
                        placeholder="Write adress "
                        className="placeholder: block mt-1 w-[270px]  border-b py-1.5 pr-4 text-gray-900  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex  gap-4 mt-5">
                  <div>
                    <div>
                      <label className="text-[#8E8F8F]">City *</label>
                      <br />
                      <select className="w-[270px] border-b mt-2">
                        <option>Select here...</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label className="text-[#8E8F8F]">State *</label>
                      <br />
                      <select className="w-[270px] border-b mt-2">
                        <option>Select here...</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex  gap-4 mt-5">
                  <div>
                    <div>
                      <label className="text-[#8E8F8F]">Country *</label>
                      <br />
                      <select className="w-[270px] border-b mt-5">
                        <option>Select here...</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label className="text-[#8E8F8F]">Zip code *</label>
                      <br />
                      <input
                        placeholder="Zip code "
                        className="placeholder: block mt-1 w-[270px]  border-b py-1.5 pr-4 text-gray-900  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-5 gap-5 ">
                  <button
                    className="text-[#F56C89] w-[429px] rounded-lg  h-[45px] bg-white border border-[#F56C89]"
                    onClick={() => setEditbillingaddress(false)}
                  >
                    Cancel
                  </button>
                  <button className="bg-[#34B7C1] w-[429px] h-[45px]  rounded-lg text-white flex justify-center items-center gap-2">
                    Add New Card
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {addPaymentMethodPopup ? (
        <>
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
              <div className="relative w-auto my-6 mx-auto max-w-5xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[600px] bg-white outline-none focus:outline-none p-5">
                  <div className="flex items-start justify-between rounded-t">
                    <h3 className="text-xl font-semibold text-[#666666]">
                      Update Payment Details
                    </h3>

                    <span
                      onClick={() => setAddPaymentMethodPopup(false)}
                      className="cursor-pointer"
                    >
                      <IoCloseSharp />
                    </span>
                  </div>
                  <hr className="mt-2" />

                  <div className="mt-10 flex justify-between">
                    <div className=" flex">
                      <div
                        className={`cursor-pointer ${
                          selectPopupTab === "Direct Debit (ACH)"
                            ? "w-[208px]  h-[45px] flex items-center justify-center  gap-2 underline-custom "
                            : "w-[208px] h-[45px] flex items-center justify-center   gap-2"
                        }`}
                        onClick={() =>
                          setSelectedPopupTab("Direct Debit (ACH)")
                        }
                      >
                        Direct Debit (ACH)
                      </div>
                      <div
                        className={`cursor-pointer ${
                          selectPopupTab === "Credit/ Debit Cards"
                            ? "w-[208px] h-[45px] flex items-center justify-center   gap-2 underline-custom"
                            : "w-[208px] h-[45px] flex items-center justify-center   gap-2"
                        }`}
                        onClick={() =>
                          setSelectedPopupTab("Credit/ Debit Cards")
                        }
                      >
                        Credit/ Debit Cards
                      </div>
                    </div>
                  </div>
                  <div>
                    {selectPopupTab && (
                      <div>
                        {selectPopupTab === "Direct Debit (ACH)" && (
                          <>
                            <div className="mt-5">No ACH bank added yet</div>
                            <div className="flex justify-start mt-5 gap-5 ">
                              <button className="bg-[#86e3ce] w-[145px] h-[45px]  rounded-lg text-black font-semibold flex justify-center items-center gap-2">
                                Make Payment
                              </button>
                            </div>
                          </>
                        )}

                        {selectPopupTab === "Credit/ Debit Cards" && (
                          <>
                            <div className="bg-[#F0506E1A] mt-5 rounded-lg text-sm h-[44px] flex justify-center items-center border-[#EB5757] text-[#EB5757]">
                              A 2.75 % fee would be charged on credit card
                              payments, starting from jan 15, 2021
                            </div>
                            <div className="mt-5">
                              <div className="font-semibold">Current</div>
                              <div className="bg-[#F0FAFB33] border-b p-2">
                                <label>4623</label>
                                <div className="text-[#666666]">
                                  {" "}
                                  VISA | Valid Till 4/2342
                                </div>
                              </div>
                              <div className="mt-5">
                                <div className="font-semibold">Saved</div>
                                <div className="bg-[#F0FAFB33] border-b p-2">
                                  <label>4623</label>
                                  <div className="flex justify-between items-center">
                                    <div className="text-[#666666]">
                                      {" "}
                                      VISA | Valid Till 4/2342
                                    </div>
                                    <button className="text-[#86e3ce] w-[140px] rounded-lg  h-[44px] bg-white border border-[#86e3ce] font-semibold">
                                      Default
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-center mt-5 gap-5 ">
                                <button className="text-[#F56C89] w-[429px] rounded-lg  h-[45px] bg-white border border-[#F56C89]">
                                  Cancel
                                </button>
                                <button className="bg-[#86e3ce] w-[429px] h-[45px]  rounded-lg text-black font-semibold flex justify-center items-center gap-2">
                                  Add New Card
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        </>
      ) : null}

      <div className="p-5">
        <SectionHeading title={"Billing Details"} />

        <div className="mt-5">
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-[60%] full-width">
              <div className="h-[80px] flex justify-between pl-10 pr-10 items-center rounded-lg border-[#EB5757] border text-[#EB5757] bg-[#F0506E33]">
                <div className="text-slate-500 flex items-center gap-2">
                  <IoIosInformationCircle style={{ color: "#EB5757" }} />
                  Pending payment
                </div>
                <div className="text-[#EB5757]">1</div>
              </div>
              <div className="p-5 box-shadow rounded-lg flex flex-col lg:flex-row justify-between items-center mt-5">
                <div>
                  <div className="text-slate-500 flex  items-center gap-2">
                    <MdOutlinePayment size={20} style={{ color: "#34B7C1" }} />{" "}
                    Payment Details
                  </div>
                  <div className="text-[#666666] p-4 text-[16px] mt-2 font-semibold">
                    XXXX XXXX XXXX 9821, VISa | Valid Till 4/2342
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    onClick={(e) => setAddPaymentMethodPopup(true)}
                    className="w-[200px] h-[44px] border-[#86e3ce] border text-[#86e3ce] font-semibold rounded-lg"
                  >
                    Add Payment Method
                  </button>
                </div>
              </div>
              <div className="p-5 box-shadow  flex flex-col gap-1 justify-center rounded-lg  mt-5">
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center text-slate-500">
                    <IoLocationSharp size={20} style={{ color: "#34B7C1" }} />{" "}
                    Billing Address
                  </div>
                  <div>
                    <MdOutlineEdit
                      style={{ color: "#34B7C1" }}
                      onClick={() => setEditbillingaddress(true)}
                    />
                  </div>
                </div>
                <div className="text-[#666666] font-semibold">
                  5421 Claridge Dr, Chesterfield Virginia 23212,United States.
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[60%]  border rounded-lg p-5">
              <div className="flex justify-between items-center">
                <div className="text-[22px]">Plan Details</div>
                <div className="flex flex-col lg:flex-row gap-2">
                  <button className="bg-[#86e3ce] border-[#86e3ce] text-black font-semibold rounded-lg   w-[150px] h-[44px]">
                    Upgrade
                  </button>
                  <button className="bg-[#86e3ce] border-[#86e3ce ] text-black font-semibold rounded-lg   w-[150px] h-[44px]">
                    Add More Devices
                  </button>
                </div>
              </div>
              <div className="border rounded-lg h-[230px] mt-3">
                <table class="table-auto">
                  <thead>
                    <tr className="border-b h-[40px]">
                      <th className="w-[200px]">Plan Name</th>
                      <th className="w-[200px]">Total Devices</th>
                      <th className="w-[200px] text-left">Add-Ons</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="h-[80px]">
                      <td className="text-center">
                        {" "}
                        NXT Premium Plus Quartely
                      </td>
                      <td className="text-center">2</td>
                      <td>
                        <div>
                          <button className="bg-[#86e3ce] text-black font-semibold rounded-lg   w-[150px] h-[44px]">
                            Buy Accessories
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="h-[80px]">
                      <td className="text-center ">
                        {" "}
                        NXT Premium Plus Quartely
                      </td>
                      <td className="text-center">2</td>
                      <td>
                        <div>
                          <button className="bg-[#86e3ce]  text-black font-semibold rounded-lg   w-[150px] h-[44px]">
                            Buy Accessories
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <Tabs
          setTab={setselectedTab}
          tab={selectedTab}
          option={tabsOptions}
          ExtraComponent={ExtraComponent}
        />

        <TableLayout
          thead={thead}
          className="vehicle-table mt-5 mb-5"
          tbody={tbody}
        />
      </div>
    </>
  );
};

export default Billingdetails;
