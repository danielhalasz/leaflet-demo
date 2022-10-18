import './App.css';
import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { MapBar } from './components/MapBar';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState({ lat: 50, lon: 1 });

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/?q=${searchQuery}&format=json&limit=3`
        );
        const data = await response.json();
        console.log(data);
        setSearchResults(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSearchResults();
    return () => {
      // this gets called when the component unmounts
    };
  }, [searchQuery]);

  const handleResultClick = (e) => {
    const selection = searchResults.find(
      (result) => result.display_name === e.target.innerText
    );
    setSelectedResult(selection);
  };

  return (
    <div className="main-container">
      <SearchBar setSearchQuery={setSearchQuery} />

      <ul>
        {searchResults.map((result) => (
          <div key={result.place_id}>
            <li onClick={handleResultClick} className="search-result">
              {result.display_name}
            </li>
          </div>
        ))}
      </ul>

      <MapBar searchResults={searchResults} selectedResult={selectedResult} />
    </div>
  );
}

export default App;
