/** @format */

import React, { useCallback, useState, useEffect } from "react";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import styles from "../css/modules/location.module.css";
import { convertSecondsToHHMM, returnFullName } from "../utils/utils";
import { IoLocationOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { locationSwiperConfig } from "../constant/constant";

const center = {
  lat: 38.9072,
  lng: -77.0369,
};

function convertToEST(isoString) {
  const date = new Date(isoString);
  const options = {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedTime = new Intl.DateTimeFormat("en-US", options).format(date);
  return `${formattedTime} EST`;
}

const returnClassName = (status) => {
  if (status === "idling") {
    return styles.idling;
  } else if (status === "inactive") {
    return styles.inactive;
  } else if (status === "Moving") {
    return styles.Moving;
  }
};

const checkStatus = (status) => {
  if (status === "onDuty") {
    return (
      <div className="logbook-dutystatus on-duty">
        <p>ON</p>
      </div>
    );
  } else if (status === "off-duty") {
    return (
      <div className="logbook-dutystatus off-duty">
        <p>OFF</p>
      </div>
    );
  } else if (status === "Drive") {
    return (
      <div className="logbook-dutystatus drive">
        <p>D</p>
      </div>
    );
  } else if (status === "SB") {
    return (
      <div className="logbook-dutystatus drive">
        <p>SB</p>
      </div>
    );
  } else if (status === "Personal") {
    return (
      <div className="logbook-dutystatus drive">
        <p>P</p>
      </div>
    );
  } else if (status === "Yard") {
    return (
      <div className="logbook-dutystatus drive">
        <p>Y</p>
      </div>
    );
  } else {
    return (
      <div className="logbook-dutystatus sb">
        <p>{status}</p>
      </div>
    );
  }
};

const Location = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [vehicle, setVehicles] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [truckStatus, setTruckStatus] = useState([
    "Truck",
    "Bus",
    "Car",
    "Bike",
    "Plane",
    "Locomotive",
    "Boat",
    "RV",
  ]);
  const [vehicleType, setVehicleType] = useState([
    "Parked",
    "idling",
    "Moving",
  ]);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleCloseInfoWindow = () => {
    setSelectedMarker(null);
  };

  const fetchHandler = useCallback(() => {
    const queryParams = new URLSearchParams({
      page: 1,
      limit: 1000,
    });

    if (truckStatus?.length > 0) {
      truckStatus.forEach((item) => {
        queryParams.append("vehicleType[]", item);
      });
    }
    if (vehicleType?.length > 0) {
      vehicleType.forEach((item) => {
        queryParams.append("truckStatus[]", item);
      });
    }

    getApi(endPoints.vehicles.getAllVehicles(queryParams?.toString()), {
      setResponse: setVehicles,
      showErr: false,
    });
  }, [truckStatus, vehicleType]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const VehicleArray = [
    { label: "Truck", value: "Truck" },
    { label: "Bus", value: "Bus" },
    { label: "Car", value: "Car" },
    { label: "Bike", value: "Bike" },
    { label: "Plane", value: "Plane" },
    { label: "Locomotive", value: "Locomotive" },
    { label: "Boat", value: "Boat" },
    { label: "RV", value: "RV" },
  ];

  const allMarkerLocation = vehicle?.data?.docs?.map((item) => ({
    id: item?._id,
    position: {
      lat: item?.location?.coordinates?.[0],
      lng: item?.location?.coordinates?.[1],
    },
    data: item,
  }));

  const checkboxHandler = (name, type) => {
    if (type === "truck") {
      const isAlreadyPresent = truckStatus?.some((i) => i === name);
      if (isAlreadyPresent) {
        const filteredItem = truckStatus?.filter((i) => i !== name);
        setTruckStatus(filteredItem);
      } else {
        setTruckStatus((prev) => [...prev, name]);
      }
    } else {
      const isAlreadyPresent = vehicleType?.some((i) => i === name);
      if (isAlreadyPresent) {
        const filteredItem = vehicleType?.filter((i) => i !== name);
        setVehicleType(filteredItem);
      } else {
        setVehicleType((prev) => [...prev, name]);
      }
    }
  };

  const isChecked = (name, type) => {
    if (type === "truck") {
      const isAlreadyPresent = truckStatus?.some((i) => i === name);
      if (isAlreadyPresent) {
        return true;
      } else {
        return false;
      }
    } else {
      const isAlreadyPresent = vehicleType?.some((i) => i === name);
      if (isAlreadyPresent) {
        return true;
      } else {
        return false;
      }
    }
  };
  return (
    <div className={styles.container}>
      {isDrawerOpen ? (
        <div>
          <div className="flex relative">
            <div className={styles.vehicle_menu_container}>
              <div className={styles.head}>
                <p className={styles.headline}>List View</p>
                <div
                  className={styles.toolbar}
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <img src="../ion_filter.png" alt="" />
                </div>
                {isFilterOpen && (
                  <div className={styles.filter_box}>
                    <h6 className={styles.title}>Filters</h6>
                    <h6 className={styles.sub_title}>Vehicle Type</h6>

                    <ul>
                      {VehicleArray?.map((d, index) => (
                        <li key={`vehicle${index}`}>
                          <input
                            type="checkbox"
                            value=""
                            onChange={() => checkboxHandler(d?.value, "truck")}
                            checked={isChecked(d?.value, "truck")}
                          />
                          <label>{d?.label}</label>
                        </li>
                      ))}
                    </ul>
                    <h6
                      className={styles.sub_title}
                      style={{ marginTop: "10px" }}
                    >
                      Status
                    </h6>

                    <ul>
                      <li>
                        <input
                          type="checkbox"
                          onChange={() => checkboxHandler("idling", "status")}
                          checked={isChecked("idling", "status")}
                        />
                        <label style={{ color: "#ff8717" }}>Idling</label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          onChange={() => checkboxHandler("inactive", "status")}
                          checked={isChecked("inactive", "status")}
                        />
                        <label>Inactive</label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          onChange={() => checkboxHandler("Moving", "status")}
                          checked={isChecked("Moving", "status")}
                        />
                        <label style={{ color: "#1dbc60" }}>Moving</label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          onChange={() => checkboxHandler("Parked", "status")}
                          checked={isChecked("Parked", "status")}
                        />
                        <label style={{ color: "#1890ff" }}>Parked</label>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <button className={styles.dropdown_btn}>
                Truck
                <img src="../chevron_down2.png" alt="" />
              </button>

              <div className={styles.menu_list}>
                {vehicle?.data?.docs?.map((i, index) => (
                  <div className={styles.card} key={index}>
                    <div className={styles.status}>
                      <p className={styles.vehicle_number}>
                        {" "}
                        {i?.vehicleNumber}
                      </p>
                      <div
                        className={`${styles.truck_status} ${returnClassName(
                          i?.truckStatus
                        )} `}
                      >
                        {" "}
                        {i?.truckStatus}{" "}
                      </div>
                    </div>
                    {i?.drivers?.length > 0 && (
                      <p className={styles.user_list}>
                        {returnFullName(i?.drivers?.[0])}
                        {i?.drivers?.length > 1 && ` +${i.drivers.length - 1}`}
                      </p>
                    )}

                    <div className={styles.location}>
                      <p className={styles.timing}> {i?.locationInWord} </p>
                      <p className={styles.timing}>
                        {i?.locationUpdate && convertToEST(i?.locationUpdate)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.chevron_btn} onClick={toggleDrawer}>
              <img src="../chevron_down.png" alt="" />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.chevron_btn} onClick={toggleDrawer}>
          <img src="../chevron_down.png" alt="" />
        </div>
      )}

      <div className={styles.map_container}>
        <APIProvider apiKey={process.env.React_App_Map_Key}>
          <Map
            defaultCenter={center}
            defaultZoom={10}
            mapId="49ae42fed52588c3"
            mapTypeId="roadmap"
            gestureHandling={"greedy"}
            zoomControl={false}
            streetViewControl={false}
            fullscreenControl={false}
            mapTypeControl={false}
          >
            {" "}
            {allMarkerLocation?.map((marker) => (
              <AdvancedMarker
                position={marker.position}
                onClick={() => handleMarkerClick(marker)}
                key={marker?.position?.lat + marker?.position?.lng}
              ></AdvancedMarker>
            ))}
            {selectedMarker && (
              <InfoWindow
                position={selectedMarker.position}
                onCloseClick={handleCloseInfoWindow}
              >
                <div className={styles.marker_detail}>
                  <div className={styles.head}>
                    <div className={styles.truck_info}>
                      <button className={styles.vehicle_type}>
                        {" "}
                        {selectedMarker?.data?.vehicleType}{" "}
                      </button>
                      <p className={styles.vehicle_number}>
                        {selectedMarker?.data?.vehicleNumber}
                      </p>
                    </div>
                    <div className={styles.status}>
                      <p className={styles.rpm}>
                        {selectedMarker?.data?.rpm &&
                          `${selectedMarker?.data?.rpm} rpm`}
                      </p>
                      <button
                        className={` ${styles.vehicle_status} ${returnClassName(
                          selectedMarker?.data?.truckStatus
                        )} `}
                      >
                        {selectedMarker?.data?.truckStatus}
                      </button>
                    </div>
                  </div>

                  <div className={styles.location_tab}>
                    <IoLocationOutline size={20} />
                    <div className={styles.info}>
                      <p className={styles.address}>
                        {selectedMarker?.data?.locationInWord}
                      </p>
                      <p className={styles.time}>
                        {selectedMarker?.data?.locationUpdate &&
                          convertToEST(selectedMarker?.data?.locationUpdate)}
                      </p>
                    </div>
                  </div>

                  <div className="swiper-container">
                    {selectedMarker?.data?.drivers?.length > 0 && (
                      <Swiper {...locationSwiperConfig} className="mySwiper">
                        {selectedMarker?.data?.drivers?.map((item, index) => (
                          <SwiperSlide key={index}>
                            <div className={styles.user_info}>
                              <div className={styles.user}>
                                <p className={styles.name}>
                                  {" "}
                                  {returnFullName(item)}{" "}
                                </p>
                                {checkStatus(item?.dutyStatus)}
                              </div>

                              <div className={styles.log_detail}>
                                <div className={styles.upcoming}>
                                  <p className={styles.title}>Upcoming</p>
                                  <p className={styles.sub_title}>BREAK</p>
                                  <p className={styles.count}>
                                    {" "}
                                    {item?.break}{" "}
                                  </p>
                                </div>
                                <div className={styles.remaining}>
                                  <p className={styles.title}>Remaining</p>
                                  <div className={styles.value_container}>
                                    <div className={styles.item}>
                                      <p className={styles.sub_title}>DRIVE</p>
                                      <p className={styles.count}>
                                        {" "}
                                        {item?.driveLeft &&
                                          convertSecondsToHHMM(
                                            item?.driveLeft
                                          )}{" "}
                                      </p>
                                    </div>
                                    <div className={styles.item}>
                                      <p className={styles.sub_title}>SHIFT</p>
                                      <p className={styles.count}>
                                        {item?.driveLeft &&
                                          convertSecondsToHHMM(item?.shiftLeft)}
                                      </p>
                                    </div>
                                    <div className={styles.item}>
                                      <p className={styles.sub_title}>CYCLE</p>
                                      <p className={styles.count}>
                                        {item?.driveLeft &&
                                          convertSecondsToHHMM(
                                            item?.cycleInSec
                                          )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    )}
                  </div>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
};

export default Location;
