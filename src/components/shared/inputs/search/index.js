import React from "react";
import "./index.css";

const SearchBar = ({ keyword, setKeyword }) => {
  function setKeyword(value) {
    window.dispatchEvent(
      new CustomEvent("search-input", {
        bubbles: true,
        composed: true,
        detail: { input: value },
      })
    );
  }
  return (
    <input
      id="input-search"
      key="applicant"
      value={keyword}
      placeholder={"search"}
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
};

export default SearchBar;
