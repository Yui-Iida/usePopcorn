import { useRef } from "react";
import useKey from "../hooks/useKey";

export default function Search({ query, setQuery }) {
  // useEffect(() => {
  //   const el = document.querySelector(".search");
  //   el.focus();
  // }, []);

  const inputElement = useRef(null);

  // useEffect(() => {
  //   const callback = (e) => {
  //     if (document.activeElement === inputElement.current) return;
  //     if (e.code === "Enter") {
  //       inputElement.current.focus();
  //       setQuery("");
  //     }
  //   };

  //   document.addEventListener("keydown", callback);

  //   return () => document.removeEventListener("keydown", callback);
  // }, [setQuery]);

  //　Rewrite the above useEffect into a custom hook
  useKey("Enter", function () {
    if (document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
  );
}
