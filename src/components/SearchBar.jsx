export const SearchBar = ({ setSearchQuery }) => {
  const handleSearchClick = (e) => {
    e.preventDefault();
    console.log(e.target.searchField.value);
    setSearchQuery(e.target.searchField.value);
  };

  return (
    <form onSubmit={handleSearchClick} className="search-bar">
      <input type="text" name="searchField" />
      <button type="submit">Search</button>
    </form>
  );
};
