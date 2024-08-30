/** @format */
import React, { useEffect, useState, useCallback } from "react";
import { GoDotFill } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { deleteApi, getApi, putApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import {
  Loader,
  Pagination,
  SectionHeading,
  Tabs,
} from "../Components/HelpingComponent";
import TableLayout from "../Components/TableLayout/TableLayout";
import { CiCircleCheck } from "react-icons/ci";
import { CreateTruck } from "../Components/Modals/Modals";

const Vehicles = () => {
  const navigate = useNavigate("");
  const [selectedTab, setselectedTab] = useState("Active");
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ids, setIds] = useState([]);
  const [allPushed, setAllPushed] = useState(false);
  const [deactiveData, setDeactiveData] = useState({});
  const allIds = data?.data?.docs?.map((i) => i?._id);

  const pushInArr = (id) => {
    const alreadyPresent = ids.some((i) => i === id);
    if (alreadyPresent) {
      const filterData = ids.filter((i) => i !== id);
      setIds(filterData);
    } else {
      setIds((prev) => [...prev, id]);
    }
  };
  const checkIfAlreadyPresent = (id) => {
    const isPresent = ids.some((i) => i === id);
    if (isPresent) {
      return true;
    } else {
      return false;
    }
  };
  const pushAll = () => {
    setAllPushed(!allPushed);
    if (allPushed) {
      setIds([]);
    } else {
      setIds(allIds);
    }
  };

  useEffect(() => {
    if (selectedTab) {
      setCurrentPage(1);
    }
  }, [selectedTab]);

  const thead = [
    <input type="checkbox" onChange={() => pushAll()} />,
    <span style={{ textAlign: "left", width: "100%", display: "block" }}>
      Vehicle No. | Serial No.
    </span>,
    "Vehicle Type",
    "Status",
    "Relay Switch",
    "Fault Codes",
    "Driver",
    "Current Location (CDT)",
    "Mode",
    "Documents",
    "Add Date (CDT)",
    "Actions",
  ];

  const tbody = data?.data?.docs?.map((i) => [
    <input
      type="checkbox"
      className="checkbox"
      onChange={() => pushInArr(i._id)}
      checked={checkIfAlreadyPresent(i._id)}
    />,
    <div
      className="text-left"
      onClick={() => navigate(`/Vehicledetail/${i._id}`)}
    >
      <p className="bold">{i.vehicleNumber}</p>
      <p>----------------</p>
    </div>,
    i?.vehicleType,
    i?.status && (
      <div
        className="flex items-center gap-1"
        style={{ textTransform: "uppercase" }}
      >
        <GoDotFill style={{ color: "#1dbc60", fontSize: "20px" }} />
        Active
      </div>
    ),
    i?.relaySwitch?.length > 0 ? "Yes" : "----",
    i?.faultCode && <div className="danger-badge">{i?.faultCode} </div>,
    <div className="client-list">
      {i?.drivers?.map((item) => (
        <span key={i?._id}> {item?.fullName} </span>
      ))}
    </div>,
    <div className="client-list">
      {i?.location?.coordinates?.map((points, index) => (
        <span key={index}>
          {" "}
          {index + 1 === i?.location?.coordinates?.length
            ? points
            : `${points},`}{" "}
        </span>
      ))}
    </div>,
    i?.vehicleModel,
    <div>
      {i?.registrationNumber && (
        <div className="flex items-center  gap-1">
          <CiCircleCheck style={{ color: "#1dbc60", fontSize: "20px" }} />
          Registration
        </div>
      )}
      {i?.liabilityInsuranceIsEmail === true && (
        <div className="flex items-center  gap-1 mt-1">
          <CiCircleCheck style={{ color: "#1dbc60", fontSize: "20px" }} />
          Liability Insurance
        </div>
      )}
      {i?.cargoInsuranceIsEmail === true && (
        <div className="flex items-center  gap-1 mt-1">
          <CiCircleCheck style={{ color: "#1dbc60", fontSize: "20px" }} />
          Cargo Insurance
        </div>
      )}
    </div>,
    i?.createdAt?.slice(0, 10),
    <i
      className="fa-solid fa-trash-can"
      onClick={() => removeHandler(i?._id)}
    ></i>,
  ]);

  const DeativatedThead = [
    <div className="text-left">Vehicle No. | Serial No.</div>,
    "Vehicle Type",
    <div className="text-left">Status</div>,
    "Mode",
    "Add Date (CDT)",
    "Delete Date (CDT)",
    "Actions",
  ];

  const DeactivatedTBody = deactiveData?.data?.docs?.map((i) => [
    <div
      className="text-left"
      onClick={() => navigate(`/Vehicledetail/${i._id}`)}
    >
      <p className="bold">{i.vehicleNumber}</p>
      <p>----------------</p>
    </div>,
    i?.vehicleType,
    i?.status && (
      <div
        className="flex items-center  gap-1"
        style={{ textTransform: "uppercase" }}
      >
        <GoDotFill style={{ color: "#1dbc60", fontSize: "20px" }} />
        In-Active
      </div>
    ),
    i?.vehicleModel,
    i?.createdAt?.slice(0, 10),
    i?.updatedAt?.slice(0, 10),
    <button className="activate
    -btn" onClick={() => activeStatus(i?._id)}>
      Activate
      
    </button>,
    
  ]);
  

  

  const tabsOptions = [
    {
      
     
      value: "Active",
      label: `Active (
        ${data?.data?.totalDocs})`,
    },
    
    {
      
     
      value: "Deativated",
      label: `Deativated (
        ${deactiveData?.data?.totalDocs})`,
    },
    
  ];
  

  

  const ExtraComponent = () => {
    return (
      
      <>
      
        
        <div className="driver-actions-btn flex sm-padding gap-1">
          {ids.length > 0 && (
            
            <button
            
              class
              Name="bg-[#fff] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]"
              style={{
                
                color:
                 "#eb5757",
                border: "1px sol
                id #eb5757",
                fontWeight: 900,
                
              }}
              
              on
              Click={() => deactiveVehicle()}
            >
            
             
              <i className="fa-solid fa-trash-can"></i>Deactivate
            </button>
            
          )}
          



          <button
            class
            Name="bg-[#34B7C1] w-[173px] flex justify-center items-center gap-2  rounded-lg text-white h-[45px]"
            onClick={() => setOp
            en(true)}
          >
          
           
            <IoMdAdd style={{ color: "white" }} /> Add Truck
          </button>
          
        </div>
        
      </>
      
    );
    
  };
  

  

  const fetchHandler = useCallback(() => {
    getApi(endPoints.vehicles.ge
      tActiveVehicle({ page: currentPage }), {
      setResponse: setData,
      
    });
    
  }, [c
    urrentPage]);

  

  useEffect(() => {
    fetchHandler();
    
  }, [fetchHandler]
  );

  

  const fetchDeactiveData = useCallback(() => {
    getApi(endPoints.vehicles.de
      activeVehicles({ page: currentPage }), {
      setResponse: setDeactiveDa
      ta,
    });
    
  }, [c
    urrentPage]);

  

  useEffect(() => {
    fetchDeactiveDa
    ta();
  }, [fetchDeactiveData]
  );

  

  const deactiveVehicle = () => {
    const payload = {
      
      ids,
      
    };
    
    pu
    tApi(endPoints.vehicles.updateStatus, payload, {
      successMsg: "Updated",
      
      additionalFunctions: [
        fetchHandler, fetchDeactiveData],
    });
    
  };
  

  

  const activeStatus = (id) => {
    const payload = {
      
      ids: [id],
      
    };
    
    pu
    tApi(endPoints.vehicles.updateStatus, payload, {
      successMsg: "Activated",
      
      additionalFunctions: [fe
        tchHandler, fetchDeactiveData],
      setLoading,
      
    });
    
  };
  

  

  const removeHandler = (id) => {
    deleteApi(endPoints.vehicles
      .removeVehicle(id), {
      setLoading,
      
      additionalF
      unctions: [fetchHandler],
    });
    
  };
  

  

  return (
    <>
    
      
      <CreateTruck
        show={open
        }
        handleClose
        ={() => setOpen(false)}
        fetchApi={fetchHandler}
        
      />
      
      <d
      iv className="p-5">
        <SectionHeading tit
        le={"Vehicles"} />
        <Tabs
        
          set
          Tab={setselectedTab}
          tab={selectedTab}
          
          option={tabsOptio
          ns}
          isBtn={true}
          
          btnLabel={"A
          dd Truck"}
          onClickEvent={() => se
          tOpen(true)}
          ExtraComponent={ExtraC
          omponent}
        />
        
        <L
        oader isLoading={loading} />



        {selectedTab === "Active" && (
          <>
          
            
            <div className="mt-5">
              <TableLayout
              
                thead={the
                ad}
                className="ve
                hicle-table mt-5 mb-5"
                tbody={tbody}
                
              />
              
              <P
              agination
                className
                ={"mt-5"}
                totalPages={data
                ?.data?.totalPages}
                currentPage={cur
                rentPage}
                setCurrentPage={
                  setCurrentPage}
              />
              
            </di
            v>
          </>
          
        )}
        



        {selectedTab === "Deativated" && (
          <div className="mt-5">
          
            <TableLayout
            
              thead={Dea
              tivatedThead}
              className="vehicle
              -table mt-5 mb-5"
              tbody={Deactivated
              TBody}
            />
            
            <P
            agination
              className
              ={"mt-5"}
              totalPages={deacti
              veData?.data?.totalPages}
              currentPage={curre
              ntPage}
              setCurrentPage={se
              tCurrentPage}
            />
            
          </di
          v>
        )}
        
      </di
      v>
    </>
    
  );
  
};




export default Vehicles;

