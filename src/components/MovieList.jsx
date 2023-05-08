import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMovies } from "../feature/movieSlice";
import { Link } from "react-router-dom";

// import SearchForm from "./SearchForm";
const MovieList = () => {
  const { movies, isLoading } = useSelector((store) => store.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, []);

  if (isLoading) {
    return <div className="loading"></div>;
  }

  return (
    <>
      <section className="movies">
        {movies.map((movie) => {
          const {
            id,
            backdrop_path,
            poster_path,
            title,
            original_title,
            name,
            release_date,
            first_air_date,
          } = movie;
          return (
            <Link to={`/${id}`} key={id}>
              <article className="movie">
                <img
                  src={`https://image.tmdb.org/t/p/original/${
                    backdrop_path || poster_path
                  } `}
                  alt={title || name || original_title}
                />
                <div className="movie-info">
                  <h4>{title || original_title || name}</h4>
                  <p>{release_date || first_air_date}</p>
                </div>
              </article>
            </Link>
          );
        })}
      </section>
    </>
  );
};

export default MovieList;
