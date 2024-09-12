/** @format */

import React, { useCallback } from "react";

const fetchActiveVehicle = React.useCallback(
  (currentPage) => {
    getApi(endPoints.vehicles.getActiveVehicle({ page: currentPage }), {
      setResponse: setData,
    });
  },
  [currentPage]
);
