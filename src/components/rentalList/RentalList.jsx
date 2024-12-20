import React, { useEffect, useState } from "react";
import { getRentals } from "../../helpers/apiCalls";
import "./rentalList.scss"

const RentalList = () => {
  const access = localStorage.getItem("access");

  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    (async function () {
      const res = await getRentals(access, "/rent-store/rentals/");
      console.log(res);

      const allRentals = await getRentals(
        access,
        `/rent-store/rentals/?page_size=${res.count}`
      );

      console.log(allRentals);
      setRentals(allRentals.results)
    })();
  }, []);

  return <div className="movies">
            <table className="rentalsTable">
              <thead>
                <tr>
                  <th>Movie</th>
                  <th>Rental Date</th>
                  <th>Return Date</th>
                  <th>Charge</th>
                  <th>Status</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {rentals.length && rentals.map((rental, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "even-row" : "odd-row"}
                  >
                    <td>{rental.movie}</td>
                    <td>{rental.rental_date}</td>
                    <td>{rental.return_date || "Not Returned"}</td>
                    <td>${rental.charge.toFixed(2)}</td>
                    <td>
                      {!rental.return_date && "Active"}
                    </td>
                    <td>
                      {rental.user}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
};

export default RentalList;
