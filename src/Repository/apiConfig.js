/** @format */

const getCompanyId = () => {
  const companyId = localStorage.getItem("companyId");
  return companyId ? companyId : "";
};

const endPoints = {
  auth: {
    login: "api/v1/auth/signInForSuperAdmin",
    forgetPassword: "api/v1/auth/forgetPassword",
    verifyOtp: (id) => `api/v1/auth/forgotVerifyotp/${id}`,
    changePassword: (id) => `api/v1/auth/changePassword/${id}`,
    getProfile: "api/v1/corporate/getProfile",
  },
  vehicles: {
    updateStatus: `api/v1/admin/Truck/updateTruckStatus`,
    updateRegestration: (id) =>
      `api/v1/admin/Truck/updateTruckRegistration/${id}`,
    updateCargoInsurance: (id) =>
      `api/v1/admin/Truck/updateTruckCargoInsurance/${id}`,
    editTruckLiability: (id) =>
      `api/v1/admin/Truck/updateTruckLiabilityInsurance/${id}`,
    updateVehicleImage: (id) => `api/v1/admin/Truck/updateTruckImage/${id}`,
    getActiveDtc: ({ truck = "", page = 1, limit = 10 }) =>
      `api/v1/admin/Truck/allTruckActiveDtcCode?truck=${truck}&page=${page}&limit=${limit}&company=${getCompanyId()}`,
    getActiveVehicle: ({ page = 1, limit = 10 }) =>
      `api/v1/admin/Truck/allTruck?page=${page}&limit=${limit}&company=${getCompanyId()}`,
    deactiveVehicles: ({ page = 1, limit = 10 }) =>
      `api/v1/admin/Truck/allInActiveTruck?page=${page}&limit=${limit}&company=${getCompanyId()}`,
    removeVehicle: (id) => `api/v1/admin/Truck/deleteTruck/${id}`,
    createVehicle: "api/v1/admin/Truck/addTruck",
    editVehicleDetails: (id) => `api/v1/admin/Truck/updateTruckDetails/${id}`,
    getVehicleDetail: (id) => `api/v1/admin/Truck/getTruck/${id}`,
    getAllVehicles: (query = "") =>
      `api/v1/admin/Truck/getAllTruck?company=${getCompanyId()}&${query}`,
  },
  drivers: {
    getAllDrivers: ({ page = 1, limit = 10 }) =>
      `api/v1/admin/allDriver?page=${page}&limit=${limit}&company=${getCompanyId()}`,
    updateDriverStatus: "api/v1/admin/Truck/updateDriverStatus",
    allInactiveDriver: ({ page = 1, limit = 10 }) =>
      `api/v1/admin/allInActiveDriver?page=${page}&limit=${limit}&company=${getCompanyId()}`,
    removeDriver: (id) => `api/v1/admin/deleteUser/${id}`,
    createDriver: "api/v1/admin/createDriver",
    unassignTruck: (id) => `api/v1/admin/removeTruckFromDriverProfile/${id}`,
    updateDriver: (id) => `api/v1/admin/updateDriver/${id}`,
    updateDriverSetting: (id) => `api/v1/admin/updateDriverSetting/${id}`,
    getDriverDetail: (id) => `api/v1/admin/getUser/${id}`,
    getDriversList: ({ page = 1, limit = 10 }) =>
      `api/v1/admin/getAllDriver?page=${page}&limit=${limit}&company=${getCompanyId()}`,
    allDeletedDriver: ({ page = 1, limit = 10 }) =>
      `api/v1/admin/allDeleteDriver?page=${page}&limit=${limit}&company=${getCompanyId()}`,
    allDriverQuery: (query = "") =>
      `api/v1/admin/allDriver?${query?.toString()}`,
  },
  devices: {
    getDevices: ({ driver = "", status = "", page = 1, limit = 10 }) =>
      `api/v1/admin/Device/allDevice?driver=${driver}&status=${status}&page=${page}&limit=${limit}&company=${getCompanyId()}`,
  },
  users: {
    getUser: ({ page = 1, limit = 10 }) =>
      `api/v1/admin/AllUser?page=${page}&limit=${limit}&company=${getCompanyId()}`,
    getDeactivatedUser: ({
      query = "",
      dutyStatus = "",
      fromDate = "",
      toDate = "",
      page = 1,
      limit = 10,
    }) =>
      `api/v1/admin/AllDeleteUser?search=${query}&dutyStatus=${dutyStatus}&fromDate=${fromDate}&toDate=${toDate}&page=${page}&limit=${limit}&company=${getCompanyId()}`,
    updateUserStatus: (userId) => `api/v1/admin/updateUserDeactivate/${userId}`,
    updateUserDetails: (userId) => `api/v1/admin/updateUser/${userId}`,
    updateUserPassword: (userId) => `api/v1/admin/changePassword/${userId}`,
    createNewUser: "api/v1/admin/createUser",
    getUserDetail: (id) => `api/v1/admin/getUser/${id}`,
  },
  terminals: {
    activeTerminal: ({ page = 1, limit = 10 }) =>
      `api/v1/admin/AllTerminal?page=${page}&limit=${limit}&company=${getCompanyId()}`,
    updateStatus: `api/v1/admin/updateTerminalStatus`,
    inactiveTerminals: ({ page = 1, limit = 10 }) =>
      `api/v1/admin/AllInActiveTerminal?page=${page}&limit=${limit}&company=${getCompanyId()}`,
    createTerminal: "api/v1/admin/createTerminal",
    updateTerminal: (id) => `api/v1/admin/updateTerminal/${id}`,
    removeTerminal: (id) => `api/v1/admin/deleteTerminal/${id}`,
    getTerminalDetail: (id) => `api/v1/admin/getTerminal/${id}`,
    assignDriver: (id) => `api/v1/admin/updateDriversInTerminal/${id}`,
    unAssignDriver: ({ id, arrayId }) =>
      `api/v1/admin/Truck/deleteDriversFromTerminal/${id}?arrayId=${arrayId}`,
  },
  companies: {
    getAll: ({ page = 1, limit = 10, search = "" }) =>
      `api/v1/admin/Company/allCompany?limit=${limit}&page=${page}&search=${search}`,
    getDetail: `api/v1/admin/Company/getCompany/${getCompanyId()}`,
    remove: (id) => `api/v1/admin/Company/deleteCompany/${id}`,
    updateDetail: (id) => `api/v1/admin/Company/updateCompany/${id}`,
    create: "api/v1/admin/Company/addCompany",
  },
  alert: {
    getAll: ({ page = 1, limit = 10 }) =>
      `api/v1/Alert/allAlert?page=${page}&limit=${limit}&company=${getCompanyId()}`,
  },
  diagnosisMalfunction: {
    getAll: ({ page = 1, limit = 10 }) =>
      `api/v1/DiagnosticAndMalfunctionEvents/allDiagnosticAndMalfunctionEvents?page=${page}&limit=${limit}&company=${getCompanyId()}`,
  },
  admin: {
    getAll: "api/v1/admin/allAdmin",
    create: "api/v1/admin/addAdmin",
    remove: (id) => `api/v1/admin/deleteAdmin/${id}`,
    update: (id) => `api/v1/admin/updateAdmin/${id}`,
  },
  dashboard: {
    get: "api/v1/auth/dashboard",
  },
  logbook: {
    getLogbookByDriver: (id, date) =>
      `api/v1/admin/AllElogForm?driver=${id}&date=${date}&company=${getCompanyId()}`,
    getDriverLoogbook: ({ id, date }) =>
      `api/v1/user/getDriverLogByDriverId?driver=${id}&date=${date}&limit=1000`,
    updateLogbook: (id) => `api/v1/user/updateDriverLog/${id}`,
    getRecap: (id) =>
      `api/v1/user/getAllDriverLogFromCurrentMonthByDriverId/${id}`,
    editLog: (id) => `api/v1/user/updateElogForm/${id}`,
    tripHistory: `api/v1/admin/Truck/getAllTruck?company=${getCompanyId()}`,
    tripAvg: `api/v1/corporate/Truck/getAllTruckDashboard?company=${getCompanyId()}`,
    allCompanyLog: (query = "") =>
      `api/v1/admin/AllElogForm?company=${getCompanyId()}&${query}`,
  },
  getTrackingLinks: (query = "") =>
    `api/v1/admin/getDriverLogDocs?company=${getCompanyId()}&${query}`,
  getAllSuperAdmin: "api/v1/admin/allSuperAdmin",
  inspectionMode: {
    create: "api/v1/admin/addInspectionMode",
    getAll: `api/v1/admin/allInspectionMode?company=${getCompanyId()}`,
  },
};

export default endPoints;
