import { useState } from "preact/hooks";
import "./app.scss";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import LandingPage from "./components/landingPage/LandingPage";
import Home from "./components/home/Home";
import { useSelector } from 'react-redux'


export function App() {
  const user = useSelector((state)=> state.user.isAuthenticated)

  
  return (
    <>
     {user && <Navigation />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </>
  );
}
