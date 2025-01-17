/** @format */

import React, { useEffect, useState } from "react";
import TableLayout from "../Components/TableLayout/TableLayout";
import { SectionHeading } from "../Components/HelpingComponents";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";

const formatDateInEST = (isoDateString) => {
  const inputDate = new Date(isoDateString);
  const options = {
    timeZone: "America/New_York",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedEST = new Intl.DateTimeFormat("en-US", options).format(
    inputDate
  );
  return formattedEST;
};

const Trackinglinks = () => {
  const [response, setResponse] = useState(null);

  const fetchHandler = () => {
    getApi(endPoints.getTrackingLinks(), {
      setResponse,
      showErr: false,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const thead = [
    "Load ID",
    "Vehicle Number",
    "Vehicle Type",
    "Pickup Date (EST)",
    "Delivery Date (EST)",
    "Broker/Shiper Name",
    "Broker/Shiper Email",
    "Shared Link",
    "Action",
  ];

  const data = response?.data?.map((item) => [
    "---",
    item?.truck?.vehicleNumber,
    item?.truck?.vehicleType,
    item?.dateTime && formatDateInEST(item?.dateTime),
    item?.deliveryDate && formatDateInEST(item?.deliveryDate),
    "---",
    "---",
    "---",
    "---",
  ]);

  return (
    <div className="p-5">
      <SectionHeading title={"Tracking Links"} />

      <TableLayout
        thead={thead}
        className="vehicle-table mt-5 mb-5"
        tbody={data}
      />
    </div>
  );
};

export default Trackinglinks;
