import React from "react";
import "./navigation.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";

const Navigation = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Filter params: [category, from-rating, to-rating, from-year, to-year], Order params: orderBy

  const logoutUser = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    dispatch(logout());
    return navigate("/");
  };


  return (
    <>
      <div className="navigation-bar">
        <h4>MovieNest</h4>
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
          </ul>
        </nav>
      </div>
      <div className="search"></div>
    </>
  );
};

export default Navigation;
