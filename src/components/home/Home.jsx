import React, { useEffect } from "react";
import { getMovies, getProfile } from "../../helpers/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userSlice";
import { setMovies } from "../../redux/moviesSlice";
const Home = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const movies = useSelector((state) => state.movies);
  const access = localStorage.getItem("access");
  useEffect(() => {
    (async function () {
      moviesCall();
      const user = await getProfile(access);
      console.log(user);
      dispatch(login(user));
    })();
  }, []);

  const moviesCall = async () => {
    const movies = await getMovies(access);
    dispatch(setMovies(movies.results));
  };

  console.log(movies.movies);

  return (
    <div>
      {movies && (
        <section className="moviesContainer">
          {movies.movies.map((item) => {
            return (
              <div>
                <h3>{item.title}</h3>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
};

export default Home;
