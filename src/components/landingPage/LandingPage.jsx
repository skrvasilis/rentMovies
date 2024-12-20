import React, { useContext, useState } from "react";
import mainBackground from "../../assets/mainBackground.jpg";
import logo from "../../assets/logo.png";
import "./landingPage.scss";
import { loginUser } from "../../helpers/apiCalls";
import { useNavigate } from "react-router-dom";
import { useEffect } from "preact/hooks";
import { MoviesContext } from "../../context/moviesContext";
import Swal from 'sweetalert2/dist/sweetalert2.js';

const LandingPage = () => {
  const [loginForm, setLoginForm] = useState(false);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn } = useContext(MoviesContext);
  let navigate = useNavigate();

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (access) {
      navigate("/home");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        username: username,
        password: password,
      };
      const res = await loginUser(data);
      console.log(res);
      localStorage.setItem("refresh", res.refresh);
      localStorage.setItem("access", res.access);
      setLoggedIn(true);
      return navigate("/home");
    } catch (error) {
      console.log(error);
      console.error("Error message:", error.message);
      Swal.fire({
        title: "Login Error",
        text: "Please try again",
        icon: "error"
      });
    }
  };

 

  return (
    <div className="home-container">
      <div className="inner-container">
        <main>
          {loginForm === true ? (
            <>
              <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                  <h1 className="form-title">Login</h1>
                  <div className="form-group">
                    <label for="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Enter your username"
                      required
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="submit-btn">
                    Login
                  </button>
                </form>
              </div>
            </>
          ) : (
            <>
              <h2>
                Welcome to <span> MovieNest</span>
              </h2>
              <h3>Discover rent and watch all your favorite movies</h3>
              <button onClick={() => setLoginForm(true)}>login</button>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
