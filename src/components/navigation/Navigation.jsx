import React from "react";
import "./navigation.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";

const Navigation = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    dispatch(logout());
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
            <li>welcome {userInfo.first_name}</li>
            <li>
              {" "}
              <button onClick={logoutUser}>logout </button>{" "}
            </li>
            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
            <li>
              <Link to={"/addMovie"}>Add movie</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="search"></div>
    </>
  );
};

export default Navigation;
