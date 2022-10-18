export const SearchBar = ({ search, setSearch, results, setResults }) => {
  const handleClick = (e) => {
    e.preventDefault(); // prevent page refresh
    setSearch(e.target.search.value);
  };

  return (
    <form onSubmit={handleClick}>
      <input type="text" name="search" placeholder="Search" />
      <button type="submit">SEARCH</button>
      {`${results[0]} ${results[1]}`}
    </form>
  );
};
