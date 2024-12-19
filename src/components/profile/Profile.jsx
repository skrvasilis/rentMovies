import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRentals,
  returnRental,
  updateProfile,
} from "../../helpers/apiCalls";
import "./profile.scss";
import Modal from "./Modal";
import { login } from "../../redux/userSlice";

const Profile = () => {
 const dispatch = useDispatch();
  const access = localStorage.getItem("access");
  const [rentedMovies, setRentedMovies] = useState(null);
  const [watchedMovies, setWatchedMovies] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState(null);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const userInfo = useSelector((state) => state.user.userInfo);

  const getRentedMovies = async () => {
    const res = await getRentals(access);
    console.log(res);
    const rented = res.results.filter((item) => !item.return_date);
    setRentedMovies(rented);
  }

  console.log(userInfo);
  useEffect(() => {
   getRentedMovies()
  }, []);

  const returnMovie = async (movie_uuid) => {
    console.log(movie_uuid);
    const res = await returnRental(movie_uuid, access);
    console.log(res);
    getRentedMovies()

  };

  const depositMoney = async (e) => {
    e.preventDefault()

    const res = await updateProfile(access, { deposit: Number(amount) });
    console.log(res);
    dispatch(login(res));
    closeModal();
  };

  return (
    <div className="profileContainer">
      {userInfo && (
        <div>
          <h1> Hello {userInfo.first_name} </h1>

          <h2>Wallet amount : ${userInfo.wallet}</h2>

          <button onClick={openModal}>Add Money</button>
          <Modal isVisible={isModalVisible} onClose={closeModal}>
            <h2>Amount you want to deposit</h2>
            <form onSubmit={depositMoney}>
            <input
              type="number"
              placeholder="amount"
              onChange={(e) => setAmount(e.target.value)}
            />
            <button type="submit">Deposit</button>
            </form>
          </Modal>
        </div>
      )}
      {rentedMovies && (
        <>
          <h3>your rented movies ({rentedMovies.length} movies) </h3>
          <div className="movies">
            {" "}
            {rentedMovies.map((item) => {
              return (
                <div className="movieContainer">
                  <h2>movie title : {item.movie}</h2>
                  <p>rental Date : {item.rental_date}</p>
                  <button onClick={() => returnMovie(item.uuid)}>
                    Return and pay this movie
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
const buttonStyles = {
  padding: "10px 20px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
export default Profile;
