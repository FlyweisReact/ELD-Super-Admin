/** @format */

import React from "react";
import TableLayout from "../Components/TableLayout/TableLayout";
import { SectionHeading } from "../Components/HelpingComponent";

const Trackinglinks = () => {
  const thead = [
    "Load ID",
    "Vehicle Number",
    "Vehicle Type",
    "Pickup Date (ETD)",
    "Delivery Date (ETD)",
    "Broker/Shiper Name",
    "Droker/Shiper Email",
    "Shared Link",
    "Action",
  ];
  return (
    <div className="p-5">
      <SectionHeading title={"Tracking Links"} />

      <TableLayout
        thead={thead}
        className="vehicle-table mt-5 mb-5"
        tbody={[]}
      />
    </div>
  );
};

export default Trackinglinks;