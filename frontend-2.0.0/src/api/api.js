import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  localStorage.removeItem("token");
  delete apiClient.defaults.headers.common["Authorization"];
  window.location.href = "/login";
};

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const logout = async () => {
  try {
    const res = await apiClient.get("/auth/logout", {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    if (res.data.success) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const authToken = async () => {
  try {
    const response = await apiClient.post("/auth/auth");
    return response.data;
  } catch (error) {
    console.error("Auth token error:", error);
    throw error;
  }
};

export const login = async () => {
  try {
    const response = await apiClient.post("/auth/login", {});
    if (response.data.token) {
      setAuthToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
export const getUserRoles = async () => {
  try {
    const response = await apiClient.get("/company-users/get-roles");
    return response.data;
  } catch (error) {
    console.error("Get user roles error:", error);
    throw error;
  }
};

export const getSystems = async () => {
  return [
    { id: 1, name: "system1" },
    { id: 2, name: "system2" },
  ];
};

export const addCompany = async (company) => {
  try {
    const response = await apiClient.post("/company", company);
    return response.data;
  } catch (error) {
    console.error("Add company error:", error);
    throw error;
  }
};

export const getCompany = async ({ id }) => {
  try {
    const response = await apiClient.get(`/company/get-company/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get company error:", error);
    throw error;
  }
};

export const getCompaniesSelect = async () => {
  try {
    const response = await apiClient.get("/company/get-company-select");
    return response.data;
  } catch (error) {
    console.error("Get companies select error:", error);
    throw error;
  }
};

export const getCompanies = async () => {
  try {
    const response = await apiClient.get("/company/get-companies");
    return response.data;
  } catch (error) {
    console.error("Get companies error:", error);
    throw error;
  }
};

export const createCompany = async (company) => {
  try {
    const response = await apiClient.post("/company/create-company", company);
    return response.data;
  } catch (error) {
    console.error("Create company error:", error);
    throw error;
  }
};

export const getAvailableEppPlatforms = async (payload) => {
  try {
    const response = await apiClient.post(
      "/company/get-available-epp-platforms",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Get available EPP platforms error:", error);
    throw error;
  }
};

export const getEppPlatforms = async () => {
  try {
    const response = await apiClient.get("/epp/get-epp-platforms");
    return response.data;
  } catch (error) {
    console.error("Get EPP platforms error:", error);
    throw error;
  }
};

export const updateCompanyEppValues = async (company) => {
  try {
    const response = await apiClient.post(
      "/company/update-company-epp-values",
      company
    );
    return response.data;
  } catch (error) {
    console.error("Update company EPP values error:", error);
    throw error;
  }
};

export const getCompanyUsers = async ({ companyId }) => {
  try {
    const response = await apiClient.get(
      `/company-users/get-company-users/${companyId}`
    );
    return response.data;
  } catch (error) {
    console.error("Get company users error:", error);
    throw error;
  }
};

export const addEppToCompany = async (epp) => {
  try {
    const response = await apiClient.post("/company/add-company-epp", epp);
    return response.data;
  } catch (error) {
    console.error("Add EPP to company error:", error);
    throw error;
  }
};

export const createCompanyUser = async (companyUser) => {
  try {
    const response = await apiClient.post(
      "/company-users/create-user",
      companyUser
    );
    return response.data;
  } catch (error) {
    console.error("Create company user error:", error);
    throw error;
  }
};

export const updateCompanyUser = async (companyUser) => {
  try {
    const response = await apiClient.post(
      `/company-users/update-user`,
      companyUser
    );
    return response.data;
  } catch (error) {
    console.error("Update company user error:", error);
    throw error;
  }
};

export const deleteSuser = async (suser) => {
  try {
    const response = await apiClient.post("/susers/delete-user", {
      public_id: suser,
    });
    return response.data;
  } catch (error) {
    console.error("Delete suser error:", error);
    throw error;
  }
};

export const getSusers = async () => {
  try {
    const response = await apiClient.post("/susers/get-users");
    return response.data;
  } catch (error) {
    console.error("Get susers error:", error);
    throw error;
  }
};
export const switchCompany = async (companyId) => {
  try {
    const response = await apiClient.post("/susers/switch-company", {
      company_public_id: companyId,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to switch company:", error);
    throw error;
  }
};

export const resetCompany = async () => {
  try {
    const response = await apiClient.post("/susers/reset-company", {});
    return response.data;
  } catch (error) {
    console.error("Failed to switch company:", error);
    throw error;
  }
};

export const getSuser = async ({ data }) => {
  try {
    const response = await apiClient.post(`/susers/get-user`, data);
    return response.data;
  } catch (error) {
    console.error("Get suser error:", error);
    throw error;
  }
};

export const createSuser = async (suser) => {
  try {
    const response = await apiClient.post("/susers/create-user", suser);
    return response.data;
  } catch (error) {
    console.error("Create suser error:", error);
    throw error;
  }
};

export const updateSuser = async (suser) => {
  try {
    const response = await apiClient.post("/susers/update-user", suser);
    return response.data;
  } catch (error) {
    console.error("Update suser error:", error);
    throw error;
  }
};

export const uploadFile = async (fileData, reportType) => {
  try {
    const formData = new FormData();
    formData.append("file", fileData);
    formData.append("report_type", reportType);

    const response = await apiClient.post(
      "/upload-report/upload-risk-report",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Upload file error:", error);
    throw error;
  }
};

export const getRiskReports = async () => {
  try {
    const response = await apiClient.get("/risk-reports/get-reports");
    return response.data;
  } catch (error) {
    console.error("Get risk reports error:", error);
    throw error;
  }
};

export const getRiskReport = async (public_id) => {
  try {
    const response = await apiClient.post("/risk-reports/get-report", {
      public_id: public_id,
    });
    return response.data;
  } catch (error) {
    console.error("Get risk reports error:", error);
    throw error;
  }
};

export const uploadCynomiReports = async (files) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    const response = await apiClient.post(
      "/risk-reports/upload-cynomi-reports",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Upload Cynomi reports error:", error);
    throw error;
  }
};

export const getCynomiReport = async (id) => {
  try {
    const response = await apiClient.get(
      `/risk-reports/get-report-cynomi/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Get Cynomi report error:", error);
    throw error;
  }
};

export const getCynomiReportById = async (id) => {
  try {
    const response = await apiClient.get(
      `/risk-reports/get-cynomi-report/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Get Cynomi report by ID error:", error);
    throw error;
  }
};

export const nameReportCynomi = async (report) => {
  try {
    const response = await apiClient.post(
      "/risk-reports/name-report-cynomi",
      report
    );
    return response.data;
  } catch (error) {
    console.error("Name report Cynomi error:", error);
    throw error;
  }
};

export const getCynomiReports = async () => {
  try {
    const response = await apiClient.get("/risk-reports/get-cynomi-reports");
    return response.data;
  } catch (error) {
    console.error("Get Cynomi reports error:", error);
    throw error;
  }
};

export const assignCynomiReportCompany = async (report) => {
  try {
    const response = await apiClient.post(
      "/risk-reports/assign-cynomi-report-company",
      report
    );
    return response.data;
  } catch (error) {
    console.error("Assign report to company error:", error);
    throw error;
  }
};

export const removeAssignedCompany = async (report) => {
  try {
    const response = await apiClient.post(
      "/risk-reports/remove-assigned-company",
      { project_id: report }
    );
    return response.data;
  } catch (error) {
    console.error("Remove assigned company error:", error);
    throw error;
  }
};

export const uploadPingCastleReports = async (files) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    const response = await apiClient.post(
      "/risk-reports/upload-pingcastle-reports",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Upload PingCastle reports error:", error);
    throw error;
  }
};

export const uploadActfileReports = async (files) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });
    const response = await apiClient.post(
      "/risk-reports/upload-actfiles",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Upload Actfile reports error:", error);
    throw error;
  }
};

export const getActfileReport = async (id) => {
  try {
    const response = await apiClient.post(`/risk-reports/get-actfile-reports`, {
      id,
    });
    return response.data;
  } catch (error) {
    console.error("Get Actfile report error:", error);
    throw error;
  }
};

export const unactiveReport = async (report) => {
  try {
    const response = await apiClient.post(
      "/risk-reports/unactive-report",
      report
    );
    return response.data;
  } catch (error) {
    console.error("Unactive report error:", error);
    throw error;
  }
};

export const getActfileReportById = async (id) => {
  try {
    const response = await apiClient.post(`/risk-reports/get-actfile-report`, {
      id,
    });
    return response.data;
  } catch (error) {
    console.error("Get Actfile report by ID error:", error);
    throw error;
  }
};

export const getActfileReportsAdmin = async () => {
  try {
    const response = await apiClient.post(
      `/risk-reports/get-actfile-reports-admin`,
      {}
    );
    return response.data;
  } catch (error) {
    console.error("Get Actfile reports admin error:", error);
    throw error;
  }
};

export const getLastReports = async (body) => {
  try {
    const response = await apiClient.post(
      `/risk-reports/get-last-reports`,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Get last reports error:", error);
    throw error;
  }
};

export const renameReport = async (report) => {
  try {
    const response = await apiClient.post(
      "/risk-reports/rename-report",
      report
    );
    return response.data;
  } catch (error) {
    console.error("Rename report error:", error);
    throw error;
  }
};

export const nameReportActfile = async (report) => {
  try {
    const response = await apiClient.post("/risk-reports/name-report-actfile", {
      project_id: report.project_id,
      name: report.name,
    });
    return response.data;
  } catch (error) {
    console.error("Name report Actfile error:", error);
    throw error;
  }
};

export const assignActfileReportCompany = async (report) => {
  try {
    const response = await apiClient.post(
      "/risk-reports/assign-actfile-report-company",
      {
        project_id: report.project_id,
        company_id: report.company_id,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Assign report to company error:", error);
    throw error;
  }
};

export const removeActfileAssignedCompany = async (report) => {
  try {
    const response = await apiClient.post(
      "/risk-reports/remove-actfile-assigned-company",
      { project_id: report }
    );
    return response.data;
  } catch (error) {
    console.error("Remove Actfile assigned company error:", error);
    throw error;
  }
};

export const assignReportCompany = async (report) => {
  try {
    const response = await apiClient.post(
      "/company/assign-report-company",
      report
    );
    return response.data;
  } catch (error) {
    console.error("Assign report to company error:", error);
    throw error;
  }
};

//risk rports//get-pingcastle-report/:id"

export const getPingCastleReport = async (id) => {
  try {
    const response = await apiClient.get(
      `/risk-reports/get-report-pingcastle/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Get PingCastle report error:", error);
    throw error;
  }
};

export const getPingCastleReports = async () => {
  try {
    const response = await apiClient.get(
      "/risk-reports/get-pingcastle-reports"
    );
    return response.data;
  } catch (error) {
    console.error("Get PingCastle reports error:", error);
    throw error;
  }
};

export const getPingCastleReportById = async (public_id) => {
  try {
    const response = await apiClient.post(
      "/risk-reports/get-pingcastle-report",
      { public_id }
    );

    return response.data;
  } catch (error) {
    console.error("Get PingCastle report by ID error:", error);
    throw error;
  }
};

export const changeCompanyName = async (company) => {
  try {
    const response = await apiClient.post("/company/change-company-name", {
      company_id: company.company_id,
      new_name: company.new_name,
    });
    return response.data;
  } catch (error) {
    console.error("Change company name error:", error);
    throw error;
  }
};

export const checkCompanyName = async (companyName) => {
  try {
    const response = await apiClient.post("/company/check-company-name", {
      company_name: companyName,
    });
    return response.data;
  } catch (error) {
    console.error("Check company name error:", error);
    throw error;
  }
};

export const nameReportPingCastle = async (report) => {
  try {
    const response = await apiClient.post(
      "/risk-reports/name-report-pingcastle",
      report
    );
    return response.data;
  } catch (error) {
    console.error("Name report PingCastle error:", error);
    throw error;
  }
};

export const assignPingCastleReportCompany = async (report) => {
  try {
    const response = await apiClient.post(
      "/risk-reports/assign-pingcastle-report-company",
      report
    );
    return response.data;
  } catch (error) {
    console.error("Assign PingCastle report to company error:", error);
    throw error;
  }
};

export const removePingCastleAssignedCompany = async (report) => {
  try {
    const response = await apiClient.post(
      "/risk-reports/remove-pingcastle-assigned-company",
      { project_id: report }
    );
    return response.data;
  } catch (error) {
    console.error("Remove PingCastle assigned company error:", error);
    throw error;
  }
};

export const getMyTickets = async () => {
  try {
    const response = await apiClient.post("/support/get-myTickets", {});
    return response.data;
  } catch (error) {
    console.error("Get my tickets error:", error);
    throw error;
  }
};

export const createTicket = async (ticket) => {
  try {
    const response = await apiClient.post("/support/createTicket", ticket);
    return response.data;
  } catch (error) {
    console.error("Create ticket error:", error);
    throw error;
  }
};

export const getTicketById = async (ticketId) => {
  try {
    const response = await apiClient.post("/support/getTicketById", {
      ticketId,
    });
    return response.data;
  } catch (error) {
    console.error("Get ticket by ID error:", error);
    throw error;
  }
};

export const getAllTickets = async () => {
  try {
    const response = await apiClient.post("/support/getAllTickets", {});
    return response.data;
  } catch (error) {
    console.error("Get all tickets error:", error);
    throw error;
  }
};

export const getTicketByUserId = async (userId) => {
  try {
    const response = await apiClient.post("/support/getTicketByUserId", {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Get ticket by user ID error:", error);
    throw error;
  }
};

export const getStatistics = async () => {
  try {
    const response = await apiClient.get("/risk-reports/get-dashboard-stats");
    return response.data;
  } catch (error) {
    console.error("Get statistics error:", error);
    throw error;
  }
};

export const getAudit = async () => {
  try {
    const response = await apiClient.get("/audit");
    return response.data;
  } catch (error) {
    console.error("Get audit error:", error);
    throw error;
  }
};
export const getAuditById = async (id) => {
  try {
    const response = await apiClient.get(`/audit/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get audit by ID error:", error);
    throw error;
  }
};

export const validateThreatLocker = async (data) => {
  try {
    const response = await apiClient.post("/company/auth-threatlocker", {
      data,
    });
    return response.data;
  } catch (error) {
    console.error("Validate ThreatLocker token error:", error);
    throw error;
  }
};

export const validateMorphisecToken = async (data) => {
  try {
    const response = await apiClient.post("/company/validate-morphisec-token", {
      data,
    });
    return response.data;
  } catch (error) {
    console.error("Validate Morphisec token error:", error);
    throw error;
  }
};

export const getReportsByCompany = async (companyId) => {
  try {
    const response = await apiClient.post(
      "/risk-reports/get-reports-by-company",
      { public_id: companyId }
    );
    return response.data;
  } catch (error) {
    console.error("Get reports by company error:", error);
    throw error;
  }
};

export const deleteCompany = async (companyId) => {
  try {
    const response = await apiClient.post("/company/delete-company", {
      company_public_id: companyId,
    });
    return response.data;
  } catch (error) {
    console.error("Delete company error:", error);
    throw error;
  }
};

export const deleteCompanyEpp = async (payload) => {
  try {
    const response = await apiClient.post(
      "/company/delete-company-epp",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Delete company EPP error:", error);
    throw error;
  }
};

export const getReports = async () => {
  try {
    const response = await apiClient.get("/portal/get-files-count-by-company");
    return response.data;
  } catch (error) {
    console.error("Get reports error:", error);
    throw error;
  }
};

export const getReportById = async (project_id) => {
  try {
    const response = await apiClient.post(`/portal/get-reports-by-project`, {
      project_id,
    });
    return response.data;
  } catch (error) {
    console.error("Get report by ID error:", error);
    throw error;
  }
};

export const searchPackets = async (query) => {
  try {
    const response = await apiClient.post("/collector/packets/search", query);

    return response.data;
  } catch (error) {
    console.error("Search packets error:", error);
    throw error;
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.authorization = `${token}`;
  }
  return config;
});

export default apiClient;
