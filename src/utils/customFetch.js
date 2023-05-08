import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default customFetch;
