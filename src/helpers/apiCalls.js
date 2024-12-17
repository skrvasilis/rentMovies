
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

export const getProfile = async (access) => {
  try {
    const res = await (
      await fetch(`rent-store/profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${access}`
        },
      })
    ).json();
    return res;
  } catch (error) {
    console.log(error.message)
    return error;
  }
};

export const getMovies = async (access) => {
  try {
    const res = await (
      await fetch(`/rent-store/movies/?page_size=20`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${access}`
        },
      })
    ).json();
    return res;
  } catch (error) {
    console.log(error.message)
    return error;
  }
};


