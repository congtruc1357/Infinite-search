import React, { FC } from "react";
import "../styles/Search.scss";

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: FC<SearchProps> = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Tìm kiểm sản phẩm..."
      onChange={(e) => onSearch(e.target.value)}
      className="search-btn"
    />
  );
};

export default Search;
