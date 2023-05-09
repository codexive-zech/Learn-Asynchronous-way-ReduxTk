import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleMovie } from "../feature/movieSlice";
import { Link, useParams } from "react-router-dom";

const SingleMovie = () => {
  const { movie, isLoading } = useSelector((store) => store.movie);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleMovie(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <div className="loading"></div>;
  }
  return (
    <section className="single-movie">
      <img
        src={`https://image.tmdb.org/t/p/original/${
          movie.backdrop_path || movie.poster_path
        }`}
        alt={movie.backdrop_path || movie.poster_path}
      />
      <div className="single-movie-info">
        <h2>{movie.title || movie.original_title || movie.name}</h2>
        <p>{movie.overview}</p>
        <p style={{ fontWeight: "bold" }}>{movie.media_type}</p>
        <h4>{movie.release_date || movie.first_air_date}</h4>
        <Link to="/" className="btn">
          Back To Movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
