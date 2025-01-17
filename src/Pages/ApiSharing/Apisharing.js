/** @format */
import React, { useState, useEffect } from "react";
import { SectionHeading } from "../../Components/HelpingComponents";
import TableLayout from "../../Components/TableLayout/TableLayout";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { returnFullName } from "../../utils/utils";
import { InspectionMode } from "../../Components/Modals/Modals";

const Apisharing = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState(null);

  const fetchHandler = () => {
    getApi(endPoints.inspectionMode.getAll, {
      setResponse: setData,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const activeTableHead = [
    "Driver",
    "Vehicle",
    "Start Date",
    "End Date",
    "Web Code",
  ];

  const tbody = data?.data?.docs?.map((item) => [
    returnFullName(item?.driver),
    item?.truck?.vehicleNumber,
    item?.startDate?.slice(0, 10),
    item?.endDate?.slice(0, 10),
    item?.webCode,
  ]);

  return (
    <>
      <InspectionMode
        show={isOpen}
        handleClose={() => setIsOpen(false)}
        fetchProfile={fetchHandler}
      />

      <div className="p-5">
        <SectionHeading title={"Inspection Mode"} />

        <div className="mt-5">
          <TableLayout
            thead={activeTableHead}
            tbody={tbody}
            className="vehicle-table mt-5 mb-5"
          />
        </div>
      </div>
    </>
  );
};

export default Apisharing;
