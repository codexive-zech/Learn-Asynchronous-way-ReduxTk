import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchedMovies, updateSearchTerm } from "../feature/movieSlice";

const SearchForm = () => {
  const { searchTerm } = useSelector((store) => store.movie);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(updateSearchTerm(e.target.value));
  };

  useEffect(() => {
    dispatch(getSearchedMovies());
  }, [dispatch, searchTerm]);

  return (
    <section className="section">
      <form className="search-form">
        <h2>Search For Movies</h2>
        <input
          type="text"
          className="form-input"
          minLength={1}
          value={searchTerm}
          onChange={handleSearch}
        />
        {/* checking if the error object show prop is true */}
      </form>
    </section>
  );
};

export default SearchForm;
