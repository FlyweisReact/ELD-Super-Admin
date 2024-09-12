/** @format */

import React from "react";

const TableLayout = ({
  thead,
  tbody,
  className = "",
  theadTrClass = "",
  tbodyTrClass = "",
}) => {
  return (
    <div className="overflow-table">
      <table className={className}>
        <thead>
          <tr className={theadTrClass}>{thead?.map((i) => i)}</tr>
        </thead>
        <tbody>
          {tbody?.map((rowData, rowIndex) => (
            <tr key={`row${rowIndex}`} className={tbodyTrClass}>
              {rowData?.map((cellData) => cellData)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableLayout;