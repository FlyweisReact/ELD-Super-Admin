import React from "react";

const EditDocs = () => {
  return (
    <div className="flex flex-col  mt-10 gap-8">
      <div className="text-[#34B7C1] text-[34px] font-[700] shadow px-4 py-1 mx-[50px] lg:mx-[100px]">
        Edit Docs
      </div>
      <div className="flex flex-col justify-center lg:flex-row gap-6">
        <div>
          <p className="text-[24px] font-bold pb-4">Driver & Carrier Details</p>
          <div className="shadow px-3 py-2 rounded-md flex flex-col gap-2 w-[340px]">
            <div>
              <p className="text-[#19565B] font-[600] text-[20px]">
                Co-driver Name
              </p>
              <p>Cody Fisher</p>
            </div>
            <div>
              <p className="text-[#19565B] font-[600] text-[20px]">
                Driver Name
              </p>
              <p>John Doe</p>
            </div>
            <div>
              <p className="text-[#19565B] font-[600] text-[20px]">
                Cycle Info
              </p>
              <p>USA_00_0</p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-[#19565B] font-[600] text-[20px]">USDOT</p>
                <p>00000</p>
              </div>
              <div>
                <p className="text-[#19565B] font-[600] text-[20px]">
                  Carrier Name
                </p>
                <p>Carrier Transportation LLC</p>
              </div>
            </div>
            <div>
              <p className="text-[#19565B] font-[600] text-[20px]">
                Main Office Address
              </p>
              <p>2972 Westheimer Rd. Santa Ana, Illinois 85486 </p>
            </div>
            <div>
              <p className="text-[#19565B] font-[600] text-[20px]">
                Home Terminal Timezone
              </p>
              <p>Eastern Time (US Canada)</p>
            </div>
          </div>
          <p className="text-[24px] font-bold pt-4">Vehicle Details:</p>
          <div className="shadow px-3 py-2 rounded-md flex flex-col gap-2 w-[340px]">
            <div>
              <p className="text-[#19565B] font-[600] text-[20px]">
                Truck Number
              </p>
              <p>XYZ 0000</p>
            </div>
            <div>
              <p className="text-[#19565B] font-[600] text-[20px]">
                Trailer Number
              </p>
              <p>XYZ 0000</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-[24px] font-bold pb-4">Trip Details:</p>
          <div className="shadow px-3 py-2 rounded-md flex flex-col gap-2 w-[340px]">
            <div>
              <p className="text-[#19565B] font-[600] text-[20px]">
                Start Location
              </p>
              <p>2972 Westheimer Rd. Santa Ana, Illinois 85486 </p>
            </div>
            <div>
              <p className="text-[#19565B] font-[600] text-[20px]">
                Destination Location
              </p>
              <p>2972 Westheimer Rd. Santa Ana, Illinois 85486 </p>
            </div>
            <div>
              <p className="text-[#19565B] font-[600] text-[20px]">
                Delivery Date
              </p>
              <p>00/ 00/ 0000</p>
            </div>

            <div>
              <p className="text-[#19565B] font-[600] text-[20px]">
                Shipping Document
              </p>
              <p>-- -- -- </p>
            </div>
            <div>
              <p className="text-[#19565B] font-[600] text-[20px]">
                Upload Fuel Reciept
              </p>
              <p>-- -- -- </p>
            </div>
            <div className="flex justify-between opacity-50">
              <div>
                <p className="text-[#19565B] font-[600] text-[20px] flex items-center gap-2">
                  Miles Driven
                  <img src="../iconamoon_lock-fill.png" alt="" />
                </p>
                <p>0000 miles</p>
                <p>(Updates every 15 minutes)</p>
              </div>
              <div>
                <p className="text-[#19565B] font-[600] text-[20px] flex items-center gap-2">
                  Miles Driven
                  <img src="../iconamoon_lock-fill.png" alt="" />
                </p>
                <p>0000 miles</p>
                <p>(Updates every 15 minutes)</p>
              </div>
            </div>
            <div>
              <p className="text-[#19565B] font-[600] text-[20px]">Comments</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-[24px] font-bold pb-4">Driver & Carrier Details</p>
          <div className="shadow px-3 py-2 rounded-md flex flex-col gap-2 w-[340px]">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <p className="opacity-60 font-[500]">UTC-4</p>
                <div className="">
                <p className="pb-2">Eastern Daylight Time (EDT)</p>
                    <p className="opacity-40">Washington</p>
                </div>
                <div>
                  <input
                    type="radio"
                    id="html"
                    name="fav_language"
                    value="HTML"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="opacity-60 font-[500]">UTC-5</p>
                <div className="">
                <p className="pb-2">Central Daylight Time (CDT)</p>
                    <p className="opacity-40">Chicago</p>
                </div>
                <div>
                  <input
                    type="radio"
                    id="html"
                    name="fav_language"
                    value="HTML"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="opacity-60 font-[500]">UTC-6</p>
                <div className="">
                <p className="pb-2">Mountain Daylight Time (MDT)</p>
                    <p className="opacity-40">Denver</p>
                </div>
                <div>
                  <input
                    type="radio"
                    id="html"
                    name="fav_language"
                    value="HTML"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="opacity-60 font-[500]">UTC-7</p>
                <div className="">
                <p className="pb-2">Pacific Daylight Time (PDT)</p>
                    <p className="opacity-40">Los Angeles</p>
                </div>
                <div>
                  <input
                    type="radio"
                    id="html"
                    name="fav_language"
                    value="HTML"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="opacity-60 font-[500]">UTC-8</p>
                <div className="">
                <p className="pb-2">Mountain Standard Time (MST)</p>
                    <p className="opacity-40">Phoenix</p>
                </div>
                <div>
                  <input
                    type="radio"
                    id="html"
                    name="fav_language"
                    value="HTML"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="opacity-60 font-[500]">UTC-9</p>
                <div className="">
                <p className="pb-2">Alaska Daylight Time (AKDT)</p>
                    <p className="opacity-40">Anchorage</p>
                </div>
                <div>
                  <input
                    type="radio"
                    id="html"
                    name="fav_language"
                    value="HTML"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="opacity-60 font-[500]">UTC-10</p>
                <div className="">
                <p className="pb-2">Hawaii-Aleutian Standard <br /> Time (HAST)</p>
                    <p className="opacity-40">Honolulu</p>
                </div>
                <div>
                  <input
                    type="radio"
                    id="html"
                    name="fav_language"
                    value="HTML"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="bg-[#34B7C1] mx-[50px] lg:mx-[100px] text-white font-bold text-[30px] rounded-xl py-2">Save</button>
    </div>
  );
};

export default EditDocs;
