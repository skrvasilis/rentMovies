import apiClient from "./apiClient"; // Your Axios instance

// Function to refresh the access token
let isRefreshing = false;
let refreshSubscribers = [];

const refreshAccessToken = async () => {
    console.log("Runnnid")
  try {
    const response = await apiClient.post("/auth/refresh/", {
      refresh: localStorage.getItem("refresh"),
     
    });
    const { access } = response.data;
    console.log(access)

    // Update tokens in storage
    localStorage.setItem("access", access);
    return access;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw error;
  }
};

// Helper to queue API requests during refresh
const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onTokenRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the token is expired, attempt to refresh it
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshAccessToken();
          isRefreshing = false;
          onTokenRefreshed(newToken);
        } catch (refreshError) {
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }

      // Wait until the token is refreshed
      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          originalRequest._retry = true;
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          resolve(apiClient(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;
