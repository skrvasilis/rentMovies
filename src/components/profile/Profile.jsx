import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRentals, returnRental } from "../../helpers/apiCalls";
import "./profile.scss";
import Modal from "./Modal";

const Profile = () => {
  const access = localStorage.getItem("access");
  const [rentedMovies, setRentedMovies] = useState(null);
  const [watchedMovies, setWatchedMovies] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [amount , setAmount] = useState(null)

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const userInfo = useSelector((state) => state.user.userInfo);

  console.log(userInfo);
  useEffect(() => {
    (async () => {
      const res = await getRentals(access);
      console.log(res);
      const rented = res.results.filter((item) => !item.return_date);
      setRentedMovies(rented);
    })();
  }, []);

  const returnMovie = async (movie_uuid) => {
    console.log(movie_uuid);
    const res = await returnRental(movie_uuid, access);
    console.log(res);
  };

  const depositMoney = async () => {
    console.log(amount)
    
  }


  return (
    <div className="profileContainer">
        {userInfo && <div>
           <h3> Hello {userInfo.first_name} </h3>
           
           <h2>Wallet amount : ${userInfo.wallet}</h2>
           
           <button onClick={openModal}>Add Money</button>
      <Modal isVisible={isModalVisible} onClose={closeModal}>
        <h2>Amount you want to deposit</h2>
        <input type="number" placeholder="amount" onChange={(e)=> setAmount(e.target.value)}/>
        <button onClick={depositMoney}>Deposit</button>
      </Modal>
           
           </div>}
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
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };
export default Profile;
