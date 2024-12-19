import axios from "axios";
import apiClient from "./tokenHandle";
const access = localStorage.getItem("access");


export const loginUser = async (data) => {
  try {
    const res = await apiClient.post("/auth/login/", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const refreshToken = async (data) => {
  try {
    const res = await apiClient.post("/auth/refresh", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getProfile = async (access) => {
  try {
    const res = await apiClient.get("/rent-store/profile/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getMovies = async (access, pageCount) => {
  try {
    const res = await apiClient.get(`/rent-store/movies/`, {
      params: {
        page: pageCount,
        page_size: 20,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const getSingleMovie = async (access, uuid) => {
  try {
    const res = await apiClient.get(`/rent-store/movies/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const getCategories = async (access) => {
  try {
    const res = await apiClient.get(`/rent-store/categories`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const getSearchedMovies = async (access, filter) => {
  try {
    const res = await apiClient.get(`/rent-store/movies/`, {
      params: {
        ...filter,
        page_size: 20,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const getCurrentMovies = async (access, fetchUrl) => {
  try {
    const res = await apiClient.get(fetchUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const rentMovie = async (access, uuid) => {
  try {
    const res = await apiClient.post("/rent-store/rentals/", uuid, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getRentals = async (access) => {
  try {
    const res = await apiClient.get("/rent-store/rentals/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const returnRental = async (rental_uuid, access) => {
  try {
    const res = await apiClient.patch(`/rent-store/rentals/${rental_uuid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};


export const updateProfile = async (access, data) => {
  console.log(JSON.stringify(data))
  try {
    const res = await apiClient.patch(`/rent-store/profile/`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Status code:", error.response.status);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Request setup error:", error.message);
    }
    return error;
  }
};


export const addNewMovie = async (data) => {
  console.log("The Data", data)
  try {
    const res = await apiClient.post("/rent-store/movies/", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};