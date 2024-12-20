import { useContext, useEffect, useState } from "preact/hooks";
import "./app.scss";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import LandingPage from "./components/landingPage/LandingPage";
import Home from "./components/home/Home";
import { useDispatch, useSelector } from "react-redux";
import SingleMovie from "./components/singleMovie/SingleMovie";
import Profile from "./components/profile/Profile";
import NewMovie from "./components/newMovie/NewMovie";
import { MoviesContext } from "./context/moviesContext";
import BubbleChart from "./components/bubbleChart/BubbleChart";
import RentalList from "./components/rentalList/RentalList";

export function App() {
  const { user } = useContext(MoviesContext);

  return (
    <>
      {user.isAuthenticated && <Navigation />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies/:uuid" element={<SingleMovie />} />
        <Route path="/profile" element={<Profile />} />
        {user.isAdmin &&
      <> <Route path="/addMovie" element={<NewMovie />} />
        <Route path="/chart" element={<BubbleChart />} />
        <Route path="/rentals" element={<RentalList/>}/>
        </>}
      </Routes>
    </>
  );
}
