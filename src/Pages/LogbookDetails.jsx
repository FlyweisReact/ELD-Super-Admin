import React, { useState } from "react";
import profile from "../Assets/Header/profile.svg";
import { BiSolidBell } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";

const LogbookDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [selectedTab, setselectedTab] = useState("Active");

  return (
    <>
      <div className="flex gap-2">
        <div>
          <div className="flex flex-col gap-2 bg-[#F4F6FA]">
            <div className="flex justify-between items-center gap-6 bg-white px-[30px] py-[20px] w-full">
              <div className=" flex items-center gap-2">
                <img src={profile} alt="" />
                <div>
                  <div className="text-[#1F384C] font-[700]">
                    Adam Blake Powers
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      src="../Ellipse 30.png"
                      alt=""
                      className="w-[10px] h-[10px]"
                    />
                    <span className="text-[#1F384C] text-[14px]">Offline</span>
                  </div>
                </div>
                <BiSolidBell
                  size={25}
                  style={{ color: "#B0C3CC", cursor: "pointer" }}
                />
              </div>
              <div className="flex gap-3">
                <div className="relative w-[180px] rounded-md border border-1 border-[#8E8F8F]">
                  <input
                    className="placeholder: ml-2 block w-[160px] h-[45px] bg-[#F9F9F9] rounded-xl border-0 py-1.5 pr-4 text-gray-900  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="date"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
                </div>
                <div  onClick={() => setOpenModal2(true)} className="flex items-center cursor-pointer gap-2 py-2 px-3 bg-[#34B7C1] rounded-md border border-1 border-[#34B7C1]">
                  <img src="../Vector4.png" alt="" className="h-fit" />
                  <span className="text-white">Edit Elog Form</span>
                </div>
                <div className="flex items-center gap-2 py-2 px-3 bg-[#34B7C1] rounded-md border border-1 border-[#34B7C1]">
                  <img src="../Vector3.png" alt="" className="h-fit" />
                  <span className="text-white">Generate Report</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-4 px-[20px] py-[10px] m-[10px]  bg-white">
              <div className="text-[#8E8F8F]">
                <p>Start Location</p>
                <p>---</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Start / End Odometer</p>
                <p>20332 / 20332</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Co Driver Name</p>
                <p>---</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Shipping ID</p>
                <p>---</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Signature</p>
                <p>---</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Destination</p>
                <p>---</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Miles Today</p>
                <p>---</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Truck Number</p>
                <p>---</p>
              </div>
              <div className="text-[#8E8F8F]">
                <p>Trailer ID</p>
                <p>---</p>
              </div>
              <div className="flex items-center justify-center border border-dashed border-[#F56C89] gap-2 text-[#F56C89]">
                <img src="../Vector2.png" alt="" className="h-fit w-fit" />
                <p>Missing Signature</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[28px] pl-[40px] p-4">Apr 05, 2024</p>
            <img
              src="../Screenshot 2024-04-05 152714 1.png"
              alt=""
              className="w-[65vw]"
            />
          </div>
          <div className="mt-5">
            <table className="border w-full ">
              <thead>
                <tr className="bg-[#F0FAFB] h-[65px] ">
                  <th className="flex items-center justify-center h-[65px]">
                    Status
                  </th>
                  <th className=" text-center ">Duration</th>
                  <th className=" text-center ">Location</th>
                  <th className=" text-center "> Comment</th>
                  {/* <th className="text-center ">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b py-1">
                  <td className="flex justify-center items-center">
                    <div className="bg-[#f298a933] text-[#FB6262] px-4 py-1 rounded-2xl mt-2">
                      OFF
                    </div>
                  </td>
                  <td>
                    <p className="font-[600] text-center">OverspOff Duty</p>
                    <p className="text-center ">00:00:00|06hrs 04minseeding</p>
                    
                  </td>
                  <td className="text-center ">Kingsville, TX, 78363</td>
                  <td className="text-center ">No comment</td>
                  {/* <td className="flex justify-center items-center">
                    <img
                      src="../Vector.png"
                      alt=""
                      className="cursor-pointer"
                      onClick={() => setOpenModal(true)}
                    />
                  </td> */}
                </tr>
                <tr className="border-b py-1">
                  <td className="flex justify-center items-center">
                    <div className="bg-[#f298a933] text-[#FB6262] px-4 py-1 rounded-2xl mt-2">
                      OFF
                    </div>
                  </td>
                  <td>
                    <p className="font-[600] text-center">OverspOff Duty</p>
                    <p className="text-center ">00:00:00|06hrs 04minseeding</p>
                    
                  </td>
                  <td className="text-center ">Kingsville, TX, 78363</td>
                  <td className="text-center ">No comment</td>
                  {/* <td className="flex justify-center items-center">
                    <img
                      src="../Vector.png"
                      alt=""
                      className="cursor-pointer"
                      onClick={() => setOpenModal(true)}
                    />
                  </td> */}
                </tr>
                <tr className="border-b py-1">
                  <td className="flex justify-center items-center">
                    <div className="bg-[#f298a933] text-[#FB6262] px-4 py-1 rounded-2xl mt-2">
                      OFF
                    </div>
                  </td>
                  <td>
                    <p className="font-[600] text-center">OverspOff Duty</p>
                    <p className="text-center ">00:00:00|06hrs 04minseeding</p>
                    
                  </td>
                  <td className="text-center ">Kingsville, TX, 78363</td>
                  <td className="text-center ">No comment</td>
                  {/* <td className="flex justify-center items-center">
                    <img
                      src="../Vector.png"
                      alt=""
                      className="cursor-pointer"
                      onClick={() => setOpenModal(true)}
                    />
                  </td> */}
                </tr>
            
              </tbody>
            </table>
          </div>
        </div>
        <div className="px-6 py-4 w-[18vw]">
          <p>Recap</p>
          <span className="text-[#858B9A]">
            Increase utilization and productivity using Geofence monitoring
          </span>
          <div
            className="p-2 mt-4 text-[#858B9A]"
            style={{
              boxShadow: "0px 12px 12px 0px #EDEDED40",
              borderRadius: "12px",
              border: "1px solid #D8D8D8",
            }}
          >
            <p className="pb-4">Additional Resources</p>
            <div className="flex flex-col gap-4 pr-3">
              <div className="flex justify-between">
                <p>04/04</p>
                <p>07:28</p>
              </div>
              <div className="flex justify-between">
                <p>04/04</p>
                <p>07:28</p>
              </div>
              <div className="flex justify-between">
                <p>04/04</p>
                <p>07:28</p>
              </div>
              <div className="flex justify-between">
                <p>04/04</p>
                <p>07:28</p>
              </div>
              <div className="flex justify-between">
                <p>04/04</p>
                <p>07:28</p>
              </div>
              <div className="flex justify-between">
                <p>04/04</p>
                <p>07:28</p>
              </div>
            </div>
            <hr style={{ margin: "16px 0px" }} />
            <div>
              <p>Cycle Left</p>
              <p>31:05 / 4 day(s)</p>
              <hr style={{ margin: "16px 0px" }} />
            </div>
            <div>
              <p>Available Today</p>
              <p>01:21</p>
              <hr style={{ margin: "16px 0px" }} />
            </div>
            <div>
              <p>Worked Today</p>
              <p>12:39</p>
              <hr style={{ margin: "16px 0px" }} />
            </div>
          </div>
        </div>
      </div>

      {openModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full px-5 pb-4 bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between py-5 rounded-t">
                  <h3 className="text-xl font-semibold text-[#646E87]">Edit Elog Event - Adam Blake Powers/ Apr 10, 2024</h3>

                  <span
                    onClick={() => setOpenModal(false)}
                    className="cursor-pointer"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
                <hr className="mb-4"/>
                <div>
          <img src="../Frame 494.png" alt="" />
          <div className="flex justify-between mt-4">
            <div>
              <p className="text-[#8E8F8F]">Start Time</p>
              <input
                type="time"
                id="appt"
                name="appt"
                min="09:00"
                max="18:00"
                style={{
                  boxShadow: "0px 1px 2px 0px #0B3F6F0D",
                  borderRadius: "5px",
                }}
                required
              />
            </div>
            <div>
              <p className="text-[#8E8F8F]">End Time</p>
              <input
                type="time"
                id="appt"
                name="appt"
                min="09:00"
                max="18:00"
                style={{
                  boxShadow: "0px 1px 2px 0px #0B3F6F0D",
                  borderRadius: "5px",
                }}
                required
              />
            </div>
            <div>
              <p className="text-[#8E8F8F]">Event Type</p>
              <select
                name="cars"
                id="cars"
                style={{
                  boxShadow: "0px 1px 2px 0px #0B3F6F0D",
                  borderRadius: "5px",
                  width: "250px",
                }}
              >
                <option value="On Duty">On Duty</option>
                <option value="Off Duty">Off Duty</option>
                <option value="Driving">Driving</option>
                <option value="Sleeper Berth">Sleeper Berth</option>
                <option value="Yard">Yard</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
          </div>
          <div>
            <div class="relative mt-4">
              <input
                type="text"
                id="floating_filled"
                className="block w-[400px] rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
              />
              <label
                for="floating_filled"
                className="absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Geo loaction
              </label>
            </div>
            <div class="relative mt-4">
              <input
                type="text"
                id="floating_filled1"
                className="block w-full rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
              />
              <label
                for="floating_filled1"
                className="absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Comment
              </label>
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <button onClick={() => setOpenModal(false)} className="text-[#F56C89] w-full py-2 rounded-sm" style={{border:"1px solid #F56C89"}}>Cancel</button>
                <button className="text-white w-full py-2 bg-[#34B7C1] rounded-sm" style={{border:"1px solid #34B7C1"}}>Update</button>
          </div>
        </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {openModal2 ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full px-5 pb-4 bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between py-5 rounded-t">
                  <h3 className="text-xl font-semibold text-[#666666]">Edit Elog Form - Adam Blake Powers/ Apr 4,2024</h3>

                  <span
                    onClick={() => setOpenModal2(false)}
                    className="cursor-pointer"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
                <hr className="mb-4"/>
                <div className=" flex">
          <div
            className={`cursor-pointer ${
              selectedTab === "Active"
                ? "w-[208px] flex items-center justify-center  gap-2 underline-custom pb-2"
                : "w-[208px] flex items-center justify-center   gap-2"
            }`}
            onClick={() => setselectedTab("Active")}
          >
            Active (1)
           
          </div>
          <div
            className={`cursor-pointer ${
              selectedTab === "Inactive"
                ? "w-[208px] flex items-center justify-center   gap-2 underline-custom pb-2"
                : "w-[208px] flex items-center justify-center   gap-2"
            }`}
            onClick={() => setselectedTab("Inactive")}
          >
            Inactive (4) {" "}
           
          </div>
          <div
            className={`cursor-pointer ${
              selectedTab === "All"
                ? "w-[208px] flex items-center justify-center  gap-2 underline-custom pb-2"
                : "w-[208px] flex items-center  justify-center  gap-2"
            }`}
            onClick={() => setselectedTab("All")}
          >
            All (4)  
          </div>
        </div>

        <div className="mt-4 border border-1 border-[#D8D8D8]" style={{boxShadow: '0px 12px 12px 0px #EDEDED40' , borderRadius:"12px"}}>
            <div className="bg-[#F0FAFB] p-3" style={{borderRadius:"12px"}}>
            Trip Info
            </div>
            <div className="grid grid-cols-3 gap-4 m-4">
            <div class="relative mt-4">
              <input
                type="text"
                id="floating_filled"
                className="block w-[300px] rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
              />
              <label
                for="floating_filled"
                className="absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Star location
              </label>
            </div>
            <div class="relative mt-4">
              <input
                type="text"
                id="floating_filled"
                className="block w-[300px] rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
              />
              <label
                for="floating_filled"
                className="absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Destination Location
              </label>
            </div>
            <div class="relative mt-4">
              <input
                type="text"
                id="floating_filled"
                className="block w-[300px] rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
              />
              <label
                for="floating_filled"
                className="absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
               Distance
              </label>
            </div>
            <div class="relative mt-4">
              <input
                type="text"
                id="floating_filled"
                className="block w-[300px] rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
              />
              <label
                for="floating_filled"
                className="absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Miles Driven
              </label>
            </div>
            <div class="relative mt-4">
              <input
                type="text"
                id="floating_filled"
                className="block w-[300px] rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
              />
              <label
                for="floating_filled"
                className="absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Cycle Type
              </label>
            </div>
            <div class="relative mt-4">
              <input
                type="text"
                id="floating_filled"
                className="block w-[300px] rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
              />
              <label
                for="floating_filled"
                className="absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                DOT Number
              </label>
            </div>
            </div>
        </div>
        <div className="flex justify-center gap-4 mt-8">
            <button onClick={() => setOpenModal2(false)} className="text-[#F56C89] w-[250px] py-2 rounded-sm" style={{border:"1px solid #F56C89"}}>Cancel</button>
                <button className="text-white w-[250px] py-2 bg-[#34B7C1] rounded-sm" style={{border:"1px solid #34B7C1"}}>Update</button>
          </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
     
    </>
  );
};

export default LogbookDetails;
