import { useEffect, useState } from "preact/hooks";
import "./app.scss";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import LandingPage from "./components/landingPage/LandingPage";
import Home from "./components/home/Home";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/userSlice";


import SingleMovie from "./components/singleMovie/SingleMovie";
import { getProfile } from "./helpers/apiCalls";
import Profile from "./components/profile/Profile";


export function App() {
  const dispatch = useDispatch()
  const access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");
  const user = useSelector((state) => state.user.isAuthenticated);
    const userInfo = useSelector((state) => state.user.userInfo);
  


  const getUser = async () => {
    const user = await getProfile(access);

    if (!user.code) {
      console.log("gotthe user", user)
      dispatch(login(user));

    }
  };

  useEffect(() => {
    (async function () {
      getUser();
    })();
  }, []);

  console.log("user from redux",user)
  console.log("user from redux",userInfo)

  return (
    <>
      {user && <Navigation />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="movies/:uuid" element={<SingleMovie />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </>
  );
}
