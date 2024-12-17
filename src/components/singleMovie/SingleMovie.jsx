import { useEffect } from "preact/hooks";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleMovie } from "../../helpers/apiCalls";
import "./singlemovie.scss";
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";

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

            <button>Rent this movie</button>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleMovie;
