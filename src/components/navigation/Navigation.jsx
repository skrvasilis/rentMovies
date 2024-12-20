import React, { useContext, useEffect } from "react";
import "./navigation.scss";
import { useNavigate, Link } from "react-router-dom";
import { MoviesContext } from "../../context/moviesContext";
import { getProfile } from "../../helpers/apiCalls";

const Navigation = () => {
  const { user, setUser, setLoggedIn } = useContext(MoviesContext);

  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser({
      userInfo: {},
      isAuthenticated: false,
      isAdmin: false,
    });
    setLoggedIn(false);
    return navigate("/");
  };

  return (
    <>
      <div className="navigation-bar">
        <h4>
          <Link to={"./home"}> MovieNest</Link>
        </h4>
        <nav>
          <ul>
            <li>welcome {user?.userInfo?.first_name}</li>
            <li>
              {" "}
              <button onClick={logoutUser}>logout </button>{" "}
            </li>
            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
            {user.isAdmin && (
              <>
                <li>
                  <Link to={"/addMovie"}>Add movie</Link>
                </li>
                <li>
                  <Link to={"/chart"}>Chart</Link>
                </li>
                <li>
                  <Link to={"/rentals"}>Rentals</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <div className="search"></div>
    </>
  );
};

export default Navigation;
