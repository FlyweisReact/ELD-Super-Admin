/** @format */

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
    getAll: ({ page = 1, limit = 10 }) =>
      `api/v1/admin/Company/allCompany?page=${page}&limit=${limit}`,
    create: "api/v1/admin/Company/addCompany",
    delete: (id) => `api/v1/admin/Company/deleteCompany/${id}`,
    getById: (id) => `api/v1/admin/Company/getCompany/${id}`,
  },
  activeDTC: {
    getAll: ({ truck = "", page = 1, limit = 10 }) =>
      `api/v1/admin/Truck/allTruckActiveDtcCode?truck=${truck}&page=${page}&limit=${limit}`,
  },
  // 
};

export default endPoints;
