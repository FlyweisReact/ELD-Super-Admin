/** @format */

const endPoints = {
  auth: {
    login: "api/v1/auth/signin",
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
    //---
    resetPassword: (userId) => `api/v1/admin/changePassword/${userId}`,
    updateDetails: (userId) => `api/v1/admin/updateUser/${userId}`,
    deactivateUser: (userId) => `api/v1/admin/updateUserDeactivate/${userId}`,
  },
  truck: {
    getAllTrucks: "api/v1/admin/Truck/allTruck",
    paginatedTrucks: ({ page=1, limit=10 }) =>
      `api/v1/admin/Truck/allTruck?page=${page}&limit=${limit}`,
  },
  terminal: {
    getAll: ({ page = 1, limit = 15 }) =>
      `api/v1/admin/AllTerminal?page=${page}&limit=${limit}`,
    createNew: "api/v1/admin/createTerminal",
    update: (id) => `api/v1/admin/updateTerminal/${id}`,
    getDetail: (id) => `api/v1/admin/getTerminal/${id}`,
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
  },
};

export default endPoints;