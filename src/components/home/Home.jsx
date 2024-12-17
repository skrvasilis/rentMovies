import React, { useEffect, useState } from "react";
import { getCategories, getMovies, getProfile } from "../../helpers/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userSlice";
import { setMovies } from "../../redux/moviesSlice";
import placeHolderImage from "../../assets/placeholder.png";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movies);
  const access = localStorage.getItem("access");
  const [pageCount, setPageCount] = useState(() => {
    const savedPageCount = localStorage.getItem("pageCount");
    return savedPageCount ? JSON.parse(savedPageCount) : 2;
  });

  const [options, setOptions] = useState(null);

  useEffect(() => {
    localStorage.setItem("pageCount", JSON.stringify(pageCount));
    moviesCall();
  }, [pageCount]);

  useEffect(() => {
    (async function () {
      const user = await getProfile(access);
      const categories = await getCategories(access);
     
      const optionCategories = categories.map((item) => {
        return { value: item.name, label: item.name };
      });
      console.log("categ", optionCategories)
      setOptions(optionCategories)
      console.log(user);
      dispatch(login(user));
    })();
  }, []);

  const changePage = (condition) => {
    if (condition === "next") {
      setPageCount(() => pageCount + 1);
    } else {
      setPageCount(() => pageCount - 1);
    }
  };

  const moviesCall = async () => {
    const movies = await getMovies(access, pageCount);
    dispatch(setMovies(movies.results));
  };

  const movieCLicked = (uuid) => {
    navigate(`/movies/${uuid}`);
  };

  console.log(movies.movies);
console.log(options)
  return (
    <div className="homeContainer">
      <div className="searchContainer">
      {options && <>
        <h2>Search by category: </h2>
      
       <Select options={options} />
      <button>Search</button> </>}
      </div>
      {movies.movies && (
        <section className="moviesContainer">
          {movies.movies.map((item) => {
            return (
              <div
                className="movieCard"
                onClick={() => movieCLicked(item.uuid)}
              >
                <img
                  src={item.poster_url}
                  alt="poster"
                  onError={(e) => (e.target.src = placeHolderImage)}
                />
                <h3>{item.title}</h3>
                <div className="movieCardFooter">
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
        {pageCount > 2 && (
          <h2 onClick={() => changePage("previous")}>previous page</h2>
        )}
        <h2 onClick={() => changePage("next")}>next page</h2>
      </div>
    </div>
  );
};

export default Home;
