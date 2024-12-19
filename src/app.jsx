import { useEffect, useState } from "preact/hooks";
import "./app.scss";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import LandingPage from "./components/landingPage/LandingPage";
import Home from "./components/home/Home";
import { useDispatch, useSelector } from "react-redux";
import SingleMovie from "./components/singleMovie/SingleMovie";
import Profile from "./components/profile/Profile";
import { getCategories, getProfile } from "./helpers/apiCalls";
import { login } from "./redux/userSlice";
import NewMovie from "./components/newMovie/NewMovie";
import { setCategories } from "./redux/categoriesSlice";

export function App() {
  const user = useSelector((state) => state.user.isAuthenticated);
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      console.log("run on every refresh")
      getUser();
      const categories = await getCategories(access);
      console.log("Did I get somethign")

      const optionCategories = categories.map((item) => {
        return { value: item.name, label: item.name };
      });
      dispatch(setCategories(optionCategories));
    })();
  }, []);

  const getUser = async () => {
    const user = await getProfile(access);

    if (!user.code) {
      console.log("gotthe user", user);
      dispatch(login(user));
    }
  };

  return (
    <>
      {user && <Navigation />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies/:uuid" element={<SingleMovie />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addMovie" element={<NewMovie />} />
      </Routes>
    </>
  );
}
