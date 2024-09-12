/** @format */
const companyId = localStorage.getItem("companyId");

const endPoints = {
  auth: {
    login: "api/v1/auth/signin",
    forgetPassword: "api/v1/auth/forgetPassword",
    verifyOtp: (id) => `api/v1/auth/forgotVerifyotp/${id}`,
    changePassword: (id) => `api/v1/auth/changePassword/${id}`,
  },
  user: {
    getUsers: ({
      query = "",
      dutyStatus = "",
      fromDate = "",
      toDate = "",
      page = 1,
      limit = 10,
    }) =>
      `api/v1/admin/AllUser?search=${query}&dutyStatus=${dutyStatus}&fromDate=${fromDate}&toDate=${toDate}&page=${page}&limit=${limit}`,
    createUser: "api/v1/admin/createUser",
    resetPassword: (userId) => `api/v1/admin/changePassword/${userId}`,
    updateDetails: (userId) => `api/v1/admin/updateUser/${userId}`,
    deactivateUser: (userId) => `api/v1/admin/updateUserDeactivate/${userId}`,
  },
  truck: {
    getAllTrucks: "api/v1/admin/Truck/allTruck",
    paginatedTrucks: ({ page = 1, limit = 10 }) =>
      `api/v1/admin/Truck/allTruck?page=${page}&limit=${limit}`,
    editVehicleDetails: (id) => `api/v1/admin/Truck/updateTruckDetails/${id}`,
    editRegistration: (id) =>
      `api/v1/admin/Truck/updateTruckRegistration/${id}`,
    editTruckLiability: (id) =>
      `api/v1/admin/Truck/updateTruckLiabilityInsurance/${id}`,
    editCargoInsurance: (id) =>
      `api/v1/admin/Truck/updateTruckCargoInsurance/${id}`,
    createTruck: "api/v1/admin/Truck/addTruck",
    uploadImages: (id) => `api/v1/admin/Truck/updateTruckImage/${id}`,
  },
  terminal: {
    getAll: ({ page = 1, limit = 15 }) =>
      `api/v1/admin/AllTerminal?page=${page}&limit=${limit}`,
    createNew: "api/v1/admin/createTerminal",
    update: (id) => `api/v1/admin/updateTerminal/${id}`,
    getDetail: (id) => `api/v1/admin/getTerminal/${id}`,
    assignDriver: (id) => `api/v1/admin/updateDriversInTerminal/${id}`,
    unAssignDriver: ({ id, arrayId }) =>
      `api/v1/admin/Truck/deleteDriversFromTerminal/${id}?arrayId=${arrayId}`,
    remove: (id) => `api/v1/admin/deleteTerminal/${id}`,
  },
  alert: {
    getAll: ({ page = 1, limit = 10 }) =>
      `api/v1/Alert/allAlert?page=${page}&limit=${limit}`,
  },
  diagnosisMalfunction: {
    getAll: ({ page = 1, limit = 10 }) =>
      `api/v1/DiagnosticAndMalfunctionEvents/allDiagnosticAndMalfunctionEvents?page=${page}&limit=${limit}`,
  },
  eldDevice: {
    getAll: ({ driver = "", status = "", page = 1, limit = 10 }) =>
      `api/v1/admin/Device/allDevice?driver=${driver}&status=${status}&page=${page}&limit=${limit}`,
  },
  driver: {
    getAll: ({
      query = "",
      dutyStatus = "",
      fromDate = "",
      toDate = "",
      page = 1,
      limit = 10,
    }) =>
      `api/v1/admin/allDriver?search=${query}&dutyStatus=${dutyStatus}&fromDate=${fromDate}&toDate=${toDate}&page=${page}&limit=${limit}`,
    createNew: "api/v1/admin/createDriver",
  },
  company: {
    getAll: ({ page = 1, limit = 10, search = "" }) =>
      `api/v1/admin/Company/allCompany?page=${page}&limit=${limit}&search=${search}`,
    create: "api/v1/admin/Company/addCompany",
    delete: (id) => `api/v1/admin/Company/deleteCompany/${id}`,
    getById: (id) => `api/v1/admin/Company/getCompany/${id}`,
  },
  activeDTC: {
    getAll: ({ truck = "", page = 1, limit = 10 }) =>
      `api/v1/admin/Truck/allTruckActiveDtcCode?truck=${truck}&page=${page}&limit=${limit}`,
  },
  // ---
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
      `api/v1/admin/Truck/allTruckActiveDtcCode?truck=${truck}&page=${page}&limit=${limit}&company=${companyId}`,
    getActiveVehicle: ({ page = 1, limit = 10 }) =>
      `api/v1/admin/Truck/allTruck?page=${page}&limit=${limit}&company=${companyId}`,
    deactiveVehicles: ({ page = 1, limit = 10 }) =>
      `api/v1/admin/Truck/allInActiveTruck?page=${page}&limit=${limit}&company=${companyId}`,
    removeVehicle: (id) => `api/v1/admin/Truck/deleteTruck/${id}`,
    createVehicle: "api/v1/admin/Truck/addTruck",
    editVehicleDetails: (id) => `api/v1/admin/Truck/updateTruckDetails/${id}`,
    getVehicleDetail: (id) => `api/v1/admin/Truck/getTruck/${id}`,
  },
  drivers: {
    getAllDrivers: ({ page = 1, limit = 10 }) =>
      `api/v1/admin/allDriver?page=${page}&limit=${limit}&company=${companyId}`,
    updateDriverStatus: "api/v1/admin/Truck/updateDriverStatus",
    allInactiveDriver: ({ page = 1, limit = 10 }) =>
      `api/v1/admin/allInActiveDriver?page=${page}&limit=${limit}&company=${companyId}`,
    allDeletedDriver: ({ page = 1, limit = 10 }) =>
      `api/v1/admin/allDeleteDriver?page=${page}&limit=${limit}&company=${companyId}`,
    removeDriver: (id) => `api/v1/admin/deleteUser/${id}`,
    createDriver: "api/v1/admin/createDriver",
    unassignTruck: (id) => `api/v1/admin/removeTruckFromDriverProfile/${id}`,
    updateDriver: (id) => `api/v1/admin/updateDriver/${id}`,
    updateDriverSetting: (id) => `api/v1/admin/updateDriverSetting/${id}`,
    getDriverDetail: (id) => `api/v1/admin/getUser/${id}`,
  },
  devices: {
    getDevices: ({ driver = "", status = "", page = 1, limit = 10 }) =>
      `api/v1/admin/Device/allDevice?driver=${driver}&status=${status}&page=${page}&limit=${limit}&company=${companyId}`,
  },
  users: {
    getUser: ({ page = 1, limit = 10 }) =>
      `api/v1/admin/AllUser?page=${page}&limit=${limit}&company=${companyId}`,
    getDeactivatedUser: ({
      query = "",
      dutyStatus = "",
      fromDate = "",
      toDate = "",
      page = 1,
      limit = 10,
    }) =>
      `api/v1/admin/AllDeleteUser?search=${query}&dutyStatus=${dutyStatus}&fromDate=${fromDate}&toDate=${toDate}&page=${page}&limit=${limit}`,
    updateUserStatus: (userId) =>
      `api/v1/admin/updateUserDeactivate/${userId}`,
    updateUserDetails: (userId) => `api/v1/admin/updateUser/${userId}`,
    updateUserPassword: (userId) => `api/v1/admin/changePassword/${userId}`,
    createNewUser: "api/v1/admin/createUser",
  },
};

export default endPoints;
