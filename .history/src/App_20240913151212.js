/** @format */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Dashboard from "./Pages/Dashboard";
import Logbook from "./Pages/Logbook";
import Reports from "./Pages/Reports";
import Dashcams from "./Pages/Dashcams";
import Reportdetails from "./Pages/Reportdetails";
import Iftatrips from "./Pages/Iftatrips";
import Iftareports from "./Pages/Iftareports";
import Vehicles from "./Pages/Vehicles/Vehicles";
import Vehicledetail from "./Pages/Vehicles/Vehicledetail";
import Drivers from "./Pages/Drivers/Drivers";
import Deleteddrivers from "./Pages/Deleteddrivers";
import Devices from "./Pages/Devices/Devices";
import Trackingdevices from "./Pages/Trackingdevices";
import Userroles from "./Pages/Users/Userroles";
import Terminals from "./Pages/Terminal/Terminals";
import Sensordevices from "./Pages/Sensordevices";
import Dashcamdevices from "./Pages/Dashcamdevices";
import Companyprofile from "./Pages/Companyprofile";
import Billingdetails from "./Pages/Billingdetails";
import Apisharing from "./Pages/ApiSharing/Apisharing";
import Alerts from "./Pages/Alerts/Alerts";
import Login from "./Components/Login/Login";
import Diagnosticevents from "./Pages/Diagnostic/Diagnosticevents";
import Trackinglinks from "./Pages/Trackinglinks";
import Forgetpassword from "./Components/Login/Forgetpassword";
import Verifyemailandphone from "./Components/Login/Verifyemailandphone";
import Verificationcode from "./Components/Login/Verificationcode";
import LogbookDetails from "./Pages/LogbookDetails";
import Location from "./Pages/Location";
import Park from "./Pages/Park";
import ParkedCar from "./Pages/ParkedCar";
import Geofences from "./Pages/Geofences";
import IftatripsDetails from "./Pages/IftatripsDetails";
import IftareportsDetails from "./Pages/IftareportsDetails";
import TerminalsDatils from "./Pages/Terminal/TerminalsDatils.jsx";
import Trailers from "./Pages/Trailers";
import EditDocs from "./Pages/EditDocs";
import Logbook2 from "./Pages/Logbook2";
import Subscription from "./Pages/Subscription";
import Home from "./Pages/Home";
import LayoutSuper from "./Layout/LayoutSuper";
import SubAdmin from "./Pages/SubAdmin";
import SubAdminForm from "./Pages/SubAdminForm";
import { ReactNotifications } from "react-notifications-component";
import "./css/style.css";
import "./css/mediaQuery.css";
import Companies from "./Pages/Companies/Companies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgetpassword",
    element: <Forgetpassword />,
  },
  {
    path: "/Verifyemailandphone",
    element: <Verifyemailandphone />,
  },
  {
    path: "/Verificationcode",
    element: <Verificationcode />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
  
      { path: "/edit-docs", element: <EditDocs /> },
      { path: "/subscription", element: <Subscription /> },
      { path: "/home", element: <Home /> },
      { path: "/sub-admin", element: <SubAdmin /> },
      { path: "/create-subadmin", element: <SubAdminForm /> },
      { path: "/companies", element: <Companies /> },
    ],
  },
  {
    path: "/",
    element: <LayoutSuper />,
    children: [
      { path: "/Dashboard/:id", element: <Dashboard /> },
      { path: "/Logbook", element: <Logbook /> },
      { path: "/Logbook/:id", element: <LogbookDetails /> },
      { path: "/location", element: <Location /> },
      { path: "/park", element: <Park /> },
      { path: "/parked", element: <ParkedCar /> },
      { path: "/Trackinglinks", element: <Trackinglinks /> },
      { path: "/Geofences", element: <Geofences /> },
      { path: "/Reports", element: <Reports /> },
      { path: "/Reportdetails", element: <Reportdetails /> },
      { path: "/Dashcams", element: <Dashcams /> },
      { path: "/Iftatrips", element: <Iftatrips /> },
      { path: "/Iftatrips/:id", element: <IftatripsDetails /> },
      { path: "/Iftareports", element: <Iftareports /> },
      { path: "/Iftareports/:id", element: <IftareportsDetails /> },
      { path: "/Vehicles", element: <Vehicles /> },
      { path: "/Vehicledetail/:id", element: <Vehicledetail /> },
      { path: "/Vehicles/trailers", element: <Trailers /> },
      { path: "/Drivers", element: <Drivers /> },
      { path: "/DeleteDrivers", element: <Deleteddrivers /> },
      { path: "/Devices", element: <Devices /> },
      { path: "/Userroles", element: <Userroles /> },
      { path: "/Devices/TrackingDevices", element: <Trackingdevices /> },
      { path: "/Devices/SensorDevices", element: <Sensordevices /> },
      { path: "/Devices/DashcamDevices", element: <Dashcamdevices /> },
      { path: "/Terminals", element: <Terminals /> },
      { path: "/Terminals/:id", element: <TerminalsDatils /> },
      { path: "/Alerts", element: <Alerts /> },
      { path: "/Companyprofile", element: <Companyprofile /> },
      { path: "/Billingdetails", element: <Billingdetails /> },
      { path: "/Apisharing", element: <Apisharing /> },
      { path: "/Diagnosticevents", element: <Diagnosticevents /> },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <ReactNotifications />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
