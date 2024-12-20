import React, { useEffect, useState } from "react";
import { getCategories, getProfile } from "../helpers/apiCalls";

const MoviesContext = React.createContext();

function MoviesProvider({ children }) {
  const access = localStorage.getItem("access");
  const [loggedIn, setLoggedIn] = useState(false)
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({
    userInfo: {},
    isAdmin: false,
    isAuthenticated: false,
  });

  useEffect(() => {
    (async function () {
      const categories = await getCategories(access);

      const optionCategories = categories.map((item) => {
        return { value: item.name, label: item.name };
      });
      setCategories(optionCategories);

      const user = await getProfile(access);
      const userData = {
        userInfo: user,
        isAuthenticated: true,
        isAdmin: user.last_name.includes("admin") ? true : false,
      };
      setUser(userData);
      console.log(user);
    })();
  }, [loggedIn]);

  console.log(user);
  console.log(categories);

  return (
    <MoviesContext.Provider value={{ categories, user, setUser, setLoggedIn }}>
      {children}
    </MoviesContext.Provider>
  );
}

export { MoviesContext, MoviesProvider };
