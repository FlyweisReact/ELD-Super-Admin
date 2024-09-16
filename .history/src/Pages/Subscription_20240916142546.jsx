/** @format */

import React from "react";
import { SectionHeading } from "../Components/HelpingComponent";
import TableLayout from "../Components/TableLayout/TableLayout";

const Subscription = () => {
  const thead = ["Date", "Company name", "DOT", "Action"];
  const tbody = [
    [
      "Jul 17, 2023 02:28 PM",
      "ZOHO",
      "123456",
      <span className="text-center text-[#01B81E] font-[700]">Active</span>,
    ],
    [
      "Jul 17, 2023 02:28 PM",
      "ZEEN-X",
      "123456",
      <span className="text-center text-[#FF2A1C] font-[700]">In-Active</span>,
    ],
    [
      "Jul 17, 2023 02:28 PM",
      "ZOHO",
      "123456",
      <span className="text-center text-[#01B81E] font-[700]">Active</span>,
    ],
    [
      "Jul 17, 2023 02:28 PM",
      "ZEEN-X",
      "123456",
      <span className="text-center text-[#FF2A1C] font-[700]">In-Active</span>,
    ],
  ];
  return (
    <section className="p-5">
      <SectionHeading title={"Subscription"} />
      <TableLayout
        thead={thead}
        tbody={tbody}
        className="mt-5 mb-5 vehicle-table"
      />
    </section>
  );
};

export default Subscription;
