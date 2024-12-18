import React, { useEffect, useState } from "react";
import {
  getCategories,
  getCurrentMovies,
  getMovies,
  getProfile,
  getSearchedMovies,
} from "../../helpers/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../../redux/moviesSlice";
import placeHolderImage from "../../assets/placeholder.png";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
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

const searchOptions = [
  {value : "Category" , label : "Category"},
  {value : "Rating" , label : "Rating"},
  {value : "Year of Release" , label : "Year of Release"},
]
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movies);
  const access = localStorage.getItem("access");
  const [categoryOptions, setCategoryOptions] = useState(null);
  const [category, setCategory] = useState(null);
  const [minRating, setMinRating] = useState(null);
  const [maxRating, setMaxRating] = useState(null);
  const [minYear, setMinYear] = useState(null);
  const [maxYear, setMaxYear] = useState(null);
  const [nextFetchUrl, setNextFetchUrl] = useState(null);
  const [prevFetchUrl, setPrevFetchUrl] = useState(null);
  const [currentFetchUrl, setCurrentFetchUrl] = useState(() => {
    const savedUrl = localStorage.getItem("currentFetchUrl");
    return savedUrl
      ? JSON.parse(savedUrl)
      : "rent-store/movies/?page=1&page_size=20";
  });
  const [searchBy, setSearchBy] = useState(null)

  useEffect(() => {
    localStorage.setItem("currentFetchUrl", JSON.stringify(currentFetchUrl));
    console.log("I changed category")
    moviesCall();
  }, [currentFetchUrl]);

  useEffect(() => {
    (async function () {
      const categories = await getCategories(access);

      const optionCategories = categories.map((item) => {
        return { value: item.name, label: item.name };
      });
      setCategoryOptions(optionCategories);
    })();
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
    console.log(movies)
    dispatch(setMovies(movies.results));

    movies.next === null ? setNextFetchUrl(null) : setNextFetchUrl(movies.next.slice(25));
    movies.previous === null ? setPrevFetchUrl(null) : setPrevFetchUrl(movies.previous.slice(25)) 
    
  };

  console.log(prevFetchUrl)

  const movieCLicked = (uuid) => {
    navigate(`/movies/${uuid}`);
  };

  const searchFilters = async () => {
    if (searchBy === "Category") {
      const filter = `category=${category}`;
      setCurrentFetchUrl(`rent-store/movies/?page=1&page_size=20&category=${category}`)
    } else if (searchBy === "Rating") {
      const filter = `from-rating=${minRating}&to-rating=${maxRating}`
      setCurrentFetchUrl(`rent-store/movies/?page=1&page_size=20&from-rating=${minRating}&to-rating=${maxRating}`)

    } else {
      setCurrentFetchUrl(`rent-store/movies/?page=1&page_size=20&from-year=${minYear}&to-year=${maxYear}`)
    }
  };

  const resetFilters = () => {
    setCurrentFetchUrl("rent-store/movies/?page=1&page_size=20")
  }

  return (
    <div className="homeContainer">
      <div className="searchContainer">
      <>
            <h2>Select Filter: </h2>
            <Select
              options={searchOptions}
              onChange={(e) => setSearchBy(e.value)}
            />
          </>
        {searchBy === "Category" && (
          <>
            <h2>Select category: </h2>
            <Select
              options={categoryOptions}
              onChange={(e) => setCategory(e.value)}
            />
          </>
        )}
        {searchBy === "Rating" && (
          <>
        <h2>Select min Rating: </h2>
        <Select
          options={ratingOptions}
          onChange={(e) => setMinRating(e.value)}
        />
        <h2>Select max Rating: </h2>
        <Select
          options={ratingOptions}
          onChange={(e) => setMaxRating(e.value)}
        />
        </>
        )}
        {searchBy === "Year of Release" && (
          <>
        <h2>Select min Year: </h2>
        <input type="number" min={1920} max={2024} required onChange={(e)=> setMinYear(e.target.value)}/>
        
        <h2>Select max Year: </h2>
        <input type="number" min={1920} max={2024} required onChange={(e)=> setMaxYear(e.target.value)}/>
        </>
        )}
        <button onClick={searchFilters}>Search</button>{" "}
        <button onClick={resetFilters}>Reset Filters</button>
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
                  {item.categories.map((el) => {
                    return <h3>{el}</h3>;
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
        {nextFetchUrl &&  <h2 onClick={() => changePage("next")}>next page</h2>
        }
       
      </div>
    </div>
  );
};

export default Home;
