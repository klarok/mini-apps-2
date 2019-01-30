import React from 'react';

const Search = ({ clickHandler }) => {
  return (
    <div>
      <h2>Search</h2>
      Search: <input id="searchTerm" type="text"></input>
      <button onClick={clickHandler}>Search</button>
    </div>
  );
}

export default Search;