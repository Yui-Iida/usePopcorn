import { useState, useEffect } from "react";
import { KEY } from "../config";

export default function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Something went wrong with fetching");

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setIsLoading(false);
        setError("");
      } catch (error) {
        if (error.name !== "AbortError") setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length <= 1) {
      setMovies([]);
      setError("");
      return;
    }

    callback?.();
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
