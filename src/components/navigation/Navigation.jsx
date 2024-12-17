import React from "react";
import "./navigation.scss";
import { useDispatch, useSelector } from "react-redux";

const Navigation = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  //Filter params: [category, from-rating, to-rating, from-year, to-year], Order params: orderBy

  return (
    <>
      <div className="navigation-bar">
        <h4>MovieNest</h4>
        <nav>
          <ul>
            <li>welcome {userInfo.first_name}</li>
            <li>
              {" "}
              <button>logout </button>{" "}
            </li>
          </ul>
        </nav>
      </div>
      <div className="search">

      </div>
    </>
  );
};

export default Navigation;
