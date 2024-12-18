import { useEffect } from "preact/hooks";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleMovie, rentMovie } from "../../helpers/apiCalls";
import "./singlemovie.scss";
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import Swal from 'sweetalert2/dist/sweetalert2.js';


import "@smastrom/react-rating/style.css";

const SingleMovie = () => {



  const myStyles = {
    itemShapes: ThinRoundedStar,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fff",
  };
  const access = localStorage.getItem("access");
  const [singleMovie, setSingleMovie] = useState({});

  const params = useParams();
  console.log(params.uuid);

  useEffect(() => {
    (async function () {
      const movie = await getSingleMovie(access, params.uuid);
      setSingleMovie(movie);
    })();
  }, []);

  console.log(singleMovie);

  const rentThisMovie = async () => {
    try {
      console.log(singleMovie.uuid)
      const res = await rentMovie( access, {movie :singleMovie.uuid})
      console.log(res)
      console.log("no error")
      Swal.fire({
        title: "Success",
        text: "You Rented the movie",
        icon: "success"
      });
    } catch (error) {
      console.log(error)
      console.log("error")
    }
   
  }

  return (
    <div className="singlePageContainer">
      {singleMovie.title && (
        <>
          <img src={singleMovie.poster_url} alt="" />
          <div className="movieInfo">
            <h1>{singleMovie.title}</h1>
            <h2>Year of release : {singleMovie.pub_date}</h2>
            <div className="ratingContainer">
            <Rating
              style={{ maxWidth: 250 }}
              value={singleMovie.rating}
              items={10}
              itemStyles={myStyles}
              readOnly
            />
            <p>{singleMovie.rating}</p>
            </div>
            {singleMovie.categories.map((item) => {
              return (
                <ul>
                  <li>{item}</li>
                </ul>
              );
            })}
            <p>{singleMovie.description}</p>
            <p>duration : {singleMovie.duration}</p>

            <button onClick={rentThisMovie}>Rent this movie</button>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleMovie;
