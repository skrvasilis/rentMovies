import React, { useContext, useEffect, useState } from "react";
import {
  getCategories,
  getCurrentMovies,
  getProfile,
  getRentals,
} from "../../helpers/apiCalls";
import placeHolderImage from "../../assets/placeholder.png";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";

import { MoviesContext } from "../../context/moviesContext";

const ratingOptions = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
  { value: 7, label: 7 },
  { value: 8, label: 8 },
  { value: 9, label: 9 },
  { value: 10, label: 10 },
];

const Home = () => {
  const navigate = useNavigate();
  const access = localStorage.getItem("access");
  const [movies, setMovies] = useState([]);
  const [rentedMovies, setRentedMovies] = useState([]);
  const [nextFetchUrl, setNextFetchUrl] = useState(null);
  const [prevFetchUrl, setPrevFetchUrl] = useState(null);
  const [currentFetchUrl, setCurrentFetchUrl] = useState(() => {
    const savedUrl = localStorage.getItem("currentFetchUrl");
    return savedUrl
      ? JSON.parse(savedUrl)
      : "rent-store/movies/?page=1&page_size=20/";
  });
  const { categories, user } = useContext(MoviesContext);
  useEffect(() => {
    localStorage.setItem("currentFetchUrl", JSON.stringify(currentFetchUrl));
    moviesCall();
  }, [currentFetchUrl]);

  useEffect(() => {
    (async function () {
      const res = await getRentals(access, "rent-store/rentals/?page_size=100");
       const rentedMoviesTitle = res.results.map((item)=> item.movie)
      setRentedMovies(rentedMoviesTitle);
    })();

    return () => {
      setCurrentFetchUrl("rent-store/movies/?page=1&page_size=20");
    };
  }, []);

  const changePage = (condition) => {
    if (condition === "next") {
      setCurrentFetchUrl(nextFetchUrl);
    } else {
      setCurrentFetchUrl(prevFetchUrl);
    }
  };

  const moviesCall = async () => {
    const movies = await getCurrentMovies(access, currentFetchUrl);
    console.log("inside moviesCall", rentedMovies);
    setMovies(movies.results);
    console.log(movies.results);

    console.log(categories)
    console.log(user)

    movies.next === null
      ? setNextFetchUrl(null)
      : setNextFetchUrl(movies.next.slice(25));
    movies.previous === null
      ? setPrevFetchUrl(null)
      : setPrevFetchUrl(movies.previous.slice(25));
  };

  const movieCLicked = (uuid) => {
    navigate(`/movies/${uuid}`);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    console.log(data.fromRating);
    console.log(data.category);

    const filteredData = {
      category: data.category?.value || undefined,
      "from-rating": data.fromRating?.value || undefined,
      "to-rating": data.toRating?.value || undefined,
      "from-year": data.fromYear || undefined,
      "to-year": data.toYear || undefined,
    };

    const params = new URLSearchParams();

    Object.entries(filteredData).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, value);
      }
    });

    console.log(params.toString());

    setCurrentFetchUrl(
      `rent-store/movies/?page=1&page_size=20&${params.toString()}`
    );
  };

  const resetFilters = () => {
    setCurrentFetchUrl("rent-store/movies/?page=1&page_size=20");
  };

  return (
    <div className="homeContainer">
      <div className="searchContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            {...register("category", {})}
            render={({ field: { onChange } }) => (
              <Select
                onChange={onChange}
                options={categories}
                name="category"
                placeholder="category"
              />
            )}
          />
          <Controller
            control={control}
            {...register("fromRating", {})}
            render={({ field: { onChange } }) => (
              <Select
                onChange={onChange}
                options={ratingOptions}
                name="fromRating"
                placeholder="Min Rate"
              />
            )}
          />
          <Controller
            control={control}
            {...register("toRating", {})}
            render={({ field: { onChange } }) => (
              <Select
                onChange={onChange}
                options={ratingOptions}
                name="toRating"
                placeholder="Max Rate"
              />
            )}
          />

          <input
            className="norInputs"
            type="number"
            placeholder="Min year"
            min={1920}
            max={2024}
            {...register("fromYear")}
          />
          <input
            className="norInputs"
            type="number"
            placeholder="Max year"
            min={1920}
            max={2024}
            {...register("toYear")}
          />

          <input type="submit" />
          <input type="reset" value={"reset filters"} onClick={resetFilters} />
        </form>
      </div>

      {movies.length && (
        <section className="moviesContainer">
          {movies.map((item) => {
            return (
              <div
                className="movieCard"
                onClick={() => movieCLicked(item.uuid)}
              >
                <img
                  src={item.poster_url || placeHolderImage}
                  alt="poster"
                  onError={(e) => (e.target.src = placeHolderImage)}
                />
                <h3>{item.title}</h3>
                <div className="movieCardFooter">
                  {item.categories.map((el,i) => {
                    if (i<2) {
                      return <h3>{el}</h3>;
                    } else {
                      return null
                    }
                  })}
                  <div>
                    <h3>{item.pub_date}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
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

export default Home;
