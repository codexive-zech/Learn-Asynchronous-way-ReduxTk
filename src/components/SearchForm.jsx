import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSearchedMovies } from "../feature/movieSlice";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchedMovies(searchTerm));
  }, [searchTerm]);

  return (
    <section className="section">
      <form className="search-form">
        <h2>Search For Movies</h2>
        <input
          type="text"
          className="form-input"
          minLength={1}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* checking if the error object show prop is true */}
      </form>
    </section>
  );
};

export default SearchForm;
