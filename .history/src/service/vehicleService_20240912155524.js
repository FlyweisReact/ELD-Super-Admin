import React, {  useCallback } from "react";


const fetchActiveVehicle =React.useCallback(() => {
    getApi(endPoints.vehicles.getActiveVehicle({ page: currentPage }), {
        setResponse: setData,
      });
},[currentPage]) 
