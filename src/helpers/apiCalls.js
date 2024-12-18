export const loginUser = async (data) => {
  try {
    const res = await (
      await fetch("/auth/login/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    return res;
  } catch (error) {
    return error;
  }
};

export const refreshToken = async (refresh) => {
  try {
    const res = await (
      await fetch("/auth/refresh", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    return res;
  } catch (error) {
    return error;
  }
};

export const getProfile = async (access) => {
  try {
    const res = await (
      await fetch(`rent-store/profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      })
    ).json();
    return res;
  } catch (error) {
    return error;
  }
};

export const getMovies = async (access, pageCount) => {
  try {
    const res = await (
      await fetch(`/rent-store/movies/?page=${pageCount}&page_size=20`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      })
    ).json();
    return res;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const getSingleMovie = async (access, uuid) => {
  try {
    const res = await (
      await fetch(`/rent-store/movies/${uuid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      })
    ).json();
    return res;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const getCategories = async (access) => {
  try {
    const res = await (
      await fetch(`/rent-store/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      })
    ).json();
    return res;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const getSearchedMovies = async (access, filter) => {
  try {
    const res = await (
      await fetch(`/rent-store/movies/?${filter}&page_size=20`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      })
    ).json();
    return res;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const getCurrentMovies = async (access, fetchUrl) => {
  console.log("fetchUrl", fetchUrl);
  try {
    const res = await (
      await fetch(fetchUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      })
    ).json();
    return res;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const rentMovie = async (access, uuid) => {
  const res = await (
    await fetch("/rent-store/rentals/", {
      method: "POST",
      body: JSON.stringify(uuid),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    })
  ).json();

  return res;
};


export const getRentals = async (access) => {
    const res = await (
      await fetch("rent-store/rentals/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      })
    ).json();
    return res;
};

export const returnRental = async (rental_uuid, access) => {
  const res = await (
    await fetch(`rent-store/rentals/${rental_uuid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    })
  ).json();
  return res;
};

