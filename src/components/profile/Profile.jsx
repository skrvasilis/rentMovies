import React, { useContext, useEffect, useState } from "react";
import {
  getRentals,
  returnRental,
  updateProfile,
} from "../../helpers/apiCalls";
import "./profile.scss";
import Modal from "./Modal";
import { MoviesContext } from "../../context/moviesContext";
const sortOptions = [
  { value: "Date", label: "Date" },
  { value: "Active", label: "Active" },
  { value: "Title", label: "Title" },
];
const Profile = () => {
  const access = localStorage.getItem("access");
  const [rentedMovies, setRentedMovies] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState(null);
  const { user, setUser } = useContext(MoviesContext);
  const [nextFetchUrl, setNextFetchUrl] = useState(null);
  const [prevFetchUrl, setPrevFetchUrl] = useState(null);
  const [rentalFetchUrl, setRentalFetchUrl] = useState(() => {
    const savedUrl = localStorage.getItem("rentalFetchUrl");
    return savedUrl
      ? JSON.parse(savedUrl)
      : "rent-store/rentals/?page=1";
  });

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const getRentedMovies = async () => {
    const res = await getRentals(access, rentalFetchUrl);
    console.log(res);
    setRentedMovies(res.results);
    res.next === null
      ? setNextFetchUrl(null)
      : setNextFetchUrl(res.next.slice(25));
    res.previous === null
      ? setPrevFetchUrl(null)
      : setPrevFetchUrl(res.previous.slice(25));
  };

  console.log(nextFetchUrl)

  console.log(user.userInfo);
  useEffect(() => {
    getRentedMovies();
  }, [rentalFetchUrl]);

  const returnMovie = async (movie_uuid) => {
    console.log(movie_uuid);
    const res = await returnRental(movie_uuid, access);
    console.log(res);
    getRentedMovies();
  };

  const depositMoney = async (e) => {
    e.preventDefault();

    const res = await updateProfile(access, { deposit: Number(amount) });
    console.log(res);
    setUser({ ...user, userInfo: { ...user.userInfo, wallet: res.wallet } });
    closeModal();
  };

  const changePage = (condition) => {
    if (condition === "next") {
      setRentalFetchUrl(nextFetchUrl);
    } else {
      setRentalFetchUrl(prevFetchUrl);
    }
  };

  const onlyActives = () => {
    console.log("first");
    setRentalFetchUrl(
      "rent-store/rentals/?page=1&page_size=20/&only-active=true/"
    );
  };

  const sortResults = (value) => {
    console.log(value);
    if (value === "date") {
      const sortedRentals = [...rentedMovies].sort(
        (a, b) => new Date(a.rental_date) - new Date(b.rental_date)
      );

      setRentedMovies(sortedRentals);
    } else if (value === "title") {
      const sortedRentals = [...rentedMovies].sort((a, b) =>
        a.movie.localeCompare(b.movie)
      );
      console.log("titlr", sortedRentals);
      setRentedMovies(sortedRentals);
    } else {
      const sortedRentals = [...rentedMovies].sort((a, b) => {
        if (a.return_date === null && b.return_date !== null) {
          return -1;
        } else if (a.return_date !== null && b.return_date === null) {
          return 1;
        } else {
          return 0;
        }
      });
      setRentedMovies(sortedRentals);
    }
  };

  return (
    <div className="profileContainer">
      {user.userInfo && (
        <div>
          <h1> Hello {user.userInfo.first_name} </h1>

          <h2>Wallet amount : ${user.userInfo.wallet}</h2>

          <button className="addBtn" onClick={openModal}>
            Add Money
          </button>
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
          <h3>your rented movies </h3>
          <button onClick={onlyActives}>only Active rentals</button>
          <select
            name="rentals"
            id="rentals"
            onChange={(e) => sortResults(e.target.value)}
          >
            <option disabled selected value="">
              sort by
            </option>
            <option value="date">Date</option>
            <option value="title">Title</option>
            <option value="active">Active</option>
          </select>

          <div>
            <table className="rentalsTable">
              <thead>
                <tr>
                  <th>Movie</th>
                  <th>Rental Date</th>
                  <th>Return Date</th>
                  <th>Charge</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rentedMovies.map((rental, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "even-row" : "odd-row"}
                  >
                    <td>{rental.movie}</td>
                    <td>{rental.rental_date}</td>
                    <td>{rental.return_date || "Not Returned"}</td>
                    <td>${rental.charge.toFixed(2)}</td>
                    <td>
                      {!rental.return_date && (
                        <button
                          onClick={() => returnMovie(rental.uuid)}
                          className="return-button"
                        >
                          Return
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <div className="pages">
        {prevFetchUrl && (
          <h2 onClick={() => changePage("previous")}>previous page</h2>
        )}
        {nextFetchUrl && <h2 onClick={() => changePage("next")}>next page</h2>}
      </div>
    </div>
  );
};

export default Profile;
