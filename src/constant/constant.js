/** @format */
import { Navigation } from "swiper/modules";


export const innerMenuOptions = [
  {
    link: "Logbook",
    label: "LogBook",
  },
  {
    link: "location",
    label: "Location",
  },
  {
    link: "Trackinglinks",
    label: "Traking Links",
  },
  {
    link: "Geofences",
    label: "Geofences",
  },
  {
    link: "Dashcams",
    label: "Dashcams",
  },
  {
    link: "Reports",
    label: "Reports",
  },
  {
    link: "Iftatrips",
    label: "IFTA Trips",
  },
  {
    link: "Iftareports",
    label: "IFTA Reports",
  },
  {
    link: "vehicles",
    label: "Vehicles",
  },
  {
    link: "Vehicles/trailers",
    label: "Trailers",
  },
  {
    link: "Drivers",
    label: "Drivers",
  },
  {
    link: "Devices",
    label: "Devices",
  },
  {
    link: "Devices/TrackingDevices",
    label: "Tracking Devices",
  },
  {
    link: "Devices/SensorDevices",
    label: "Sensor Devices",
  },
  {
    link: "Devices/DashcamDevices",
    label: "Dashcam Devices",
  },
  {
    link: "Userroles",
    label: "User Roles",
  },
  {
    link: "Terminals",
    label: "Terminals",
  },
  {
    link: "Alerts",
    label: "Alerts",
  },
  {
    link: "Diagnosticevents",
    label: "Diagnostic",
  },
  {
    link: "Apisharing",
    label: "FMCSA",
  },
];

export const statusMapping = {
  On: 1,
  D: 2,
  Off: 3,
  SB: 4,
};

export const locationSwiperConfig = {
  spaceBetween: 20,
  loop: false,
  slidesPerView: "auto",
  speed: 500,
  resistance: false,
  resistanceRatio: 0,
  modules: [Navigation],
  navigation : true
};