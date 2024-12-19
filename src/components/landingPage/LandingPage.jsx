import React, { useState } from "react";
import mainBackground from "../../assets/mainBackground.jpg";
import logo from "../../assets/logo.png";
import "./landingPage.scss";
import { loginUser } from "../../helpers/apiCalls";
import { useNavigate } from "react-router-dom";
import { useEffect } from "preact/hooks";

const LandingPage = () => {
  const [loginForm, setLoginForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log(loginForm);
  let navigate = useNavigate();

  useEffect(() => {
    const access = localStorage.getItem("access");

    if (access) {
      navigate("/home");
    }
  }, []);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    const res = await loginUser(data);
    console.log(res);
    if (!res.error) {
      localStorage.setItem("refresh", res.refresh);
      localStorage.setItem("access", res.access);
      return navigate("/home");
    } else {
      console.log(res.error);
    }
  };

  // deuscand1
  // nP9hfsVgPHg8EFZmho4VZr

  return (
    <div className="home-container">
      <div className="inner-container">
        <main>
          {loginForm === true ? (
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <button type="submit">Submit</button>
            </form>
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
