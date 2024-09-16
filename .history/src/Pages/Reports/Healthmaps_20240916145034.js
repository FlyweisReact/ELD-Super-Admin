/** @format */

import React, { useState } from "react";
import { Tabs } from "../../Components/HelpingComponents";
import { AlertDateSelector } from "../../Components/Modal/Modal";

const HealthMaps = () => {
  const [selectedTabs, setSelectedTabs] = useState("Critical Events");
  const [open, setOpen] = useState(false);

  const tabsOption = [
    {
      value: "Critical Events",
      label: "Critical Events",
    },
    {
      value: "HOS Stops",
      label: "HOS Stops",
    },
  ];

  const ExtraComponent = () => {
    return (
      <div className="relative" onClick={() => setOpen(true)}>
        <input
          type="text"
          className="w-[380px] h-[45px] pl-9 border border-[#8E8F8F] rounded-lg p-2 "
          style={{ color: "#8E8F8F" }}
          placeholder="06 Mar, 2024 at 12:00 AM - Today at 11:59 PM"
        />
        <img
          src="../Vector (11).png"
          alt=""
          className="absolute top-3 left-2"
        />
      </div>
    );
  };

  return (
    <section className="dormancy-report-page p-5 pt-0 pl-0 ">
      <Helmet title={"Healthmap Report"} />
      <AlertDateSelector show={open} handleClose={() => setOpen(false)} />

      <Tabs
        option={tabsOption}
        setTab={setSelectedTabs}
        tab={selectedTabs}
        ExtraComponent={ExtraComponent}
      />
      <div className="google-maps">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112173.0301265187!2d77.1265843696302!3d28.527478163402456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1725618925683!5m2!1sen!2sin"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default HealthMaps;
