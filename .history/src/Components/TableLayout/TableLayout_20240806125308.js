/** @format */

import React from "react";

const TableLayout = ({ thead, tbody, className='', theadTrClass }) => {
  return (
    <div className="overflow-table">
      <table className={className}>
        <thead>
          <tr className={theadTrClass}>{thead?.map((i) => i)}</tr>
        </thead>
        <tbody>
          {tbody?.map((rowData, rowIndex) => (
            <tr key={`row${rowIndex}`}>
              {rowData?.map((cellData, cellIndex) => (
                <td key={`cell${cellIndex}`}>{cellData}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableLayout;
