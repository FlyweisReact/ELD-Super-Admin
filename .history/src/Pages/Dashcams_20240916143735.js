import React from "react";
import dashcam from "../Assets/Dashcamra/dashcamra.svg";

const Dashcams = () => {
  return (
    <div className="flex geofences"  >
      <div className="bg-[#F4F6FA] w-full p-5">
        <div className="rounded-xl bg-[#F4F6FA] p-5 ">
          <div className="text-[28px] font-[500]">Driver Monitoring System Preview</div>
          <div className="flex justify-between mb-2">
          <p className="text-[#858B9A] text-[18px]">
            You are viewing a NXT placeholder powered by a sample data set!
          </p>
          <div className="flex gap-2">
            <div className="w-[18px] h-[18px] rounded-full bg-[#34B7C1]"></div>
            <div className="w-[18px] h-[18px] rounded-full border border-1 border-[#34B7C1] "></div>
          </div>
        </div>
        
          <img src={dashcam} alt="" />
        </div>
      </div>
    
       <div className=" bg-white p-5 ">
      <div className="text-left font-semibold"> You are viewing a NXT placeholder powered by a sample data set!</div>
      <div className="text-[#858B9A] text-left mt-2">
      Prevent accidents and exonerate drivers.
      </div>
      <div className="border border-1 border-[#D8D8D8] shadow rounded-md p-4 mt-4">
          <div className="flex items-center justify-between text-[#858B9A] pb-4">
            <div className="w-[18px] h-[18px] rounded-full border border-1 border-[#34B7C1] "></div>
            <p className="text-[20px]">Add a Dashcam</p>
            <img src="../Vector6.png" alt="" />
          </div>
          <div className="border border-1 border-[#D8D8D8] shadow rounded-md p-4 text-[#858B9A]">
            <p className="text-[20px] text-center pb-2">
            How to add a Dashcam
            </p>
            <div className="flex justify-center items-center">
            <iframe
              width="260"
              height="120"
              style={{ borderRadius: "8px" }}
              src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"
            ></iframe>

            </div>
          </div>
        </div>
      <div className="border border-1 text-[20px]  border-[#D8D8D8] shadow rounded-md p-4 mt-8 text-[#858B9A]">
            <p className="text-left font-[500] pb-4">Additional Resources</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
            <img src="../Vector6.png" alt="" className="h-fit" />
            <p>Don't have a Dashcam? Buy Now!</p>

            </div>
            <img src="../Vector6.png" alt="" className="h-fit"/>
          </div>
          <hr className="my-4"/>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
            <img src="../Vector6.png" alt="" className="h-fit" />
            <p>Help Center</p>

            </div>
            <img src="../Vector6.png" alt="" className="h-fit"/>
          </div>
          <hr className="my-4"/>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
            <img src="../Vector6.png" alt="" className="h-fit" />
            <p>Contact US</p>

            </div>
            <img src="../Vector6.png" alt="" className="h-fit"/>
          </div>
          </div>
    </div>
    </div>
  );
};

export default Dashcams;
