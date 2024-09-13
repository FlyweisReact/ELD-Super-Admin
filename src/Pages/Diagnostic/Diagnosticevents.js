/** @format */

import { useCallback, useEffect, useState } from "react";
import {
  Pagination,
  SectionHeading,
  Tabs,
} from "../../Components/HelpingComponent";
import TableLayout from "../../Components/TableLayout/TableLayout";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";
import { returnFullName } from "../../utils/utils";

const Diagnosticevents = () => {
  const [selectedTab, setselectedTab] = useState("Active");
  const [data, setData] = useState({ data: { docs: [] } });
  const [currentPage, setCurrentPage] = useState(1);

  const fetchHandler = useCallback(() => {
    getApi(endPoints.diagnosisMalfunction.getAll({ page: currentPage }), {
      setResponse: setData,
    });
  }, [currentPage]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const thead = ["Vehicle", "Event", "Date Raised", "Event Location", "Driver"];

  const tbody = data?.data?.docs?.map((i) => [
    i?.truck?.vehicleNumber,
    i?.event,
    i?.date,
    i?.location,
    returnFullName(i?.driver),
  ]);

  const tabsOptions = [
    {
      value: "Active",
      label: `Active (${data.data.docs.length})`,
    },
  ];

  return (
    <div className="p-5">
      <SectionHeading title={"Diagnostic and Malfunction Events"} />
      <Tabs setTab={setselectedTab} tab={selectedTab} option={tabsOptions} />
      <TableLayout
        thead={thead}
        className="vehicle-table mt-5 mb-5"
        tbody={tbody}
      />
      <Pagination
        className={"mt-5"}
        totalPages={data?.data?.totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Diagnosticevents;
