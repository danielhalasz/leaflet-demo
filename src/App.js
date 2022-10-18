import './App.css';
import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { MapBar } from './components/MapBar';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState({ lat: 50, lon: 1 });

  useEffect(() => {
    fetch(
      `https://nominatim.openstreetmap.org/?q=${searchQuery}&format=json&limit=3`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearchResults(data);
      });
  }, [searchQuery]);

  const handleResultClick = (e) => {
    const selection = searchResults.find(
      (result) => result.display_name === e.target.innerText
    );
    setSelectedResult(selection);
  };

  return (
    <div>
      <SearchBar setSearchQuery={setSearchQuery} />

      <ul>
        {searchResults.map((result) => (
          <div key={result.place_id}>
            <li
              onClick={handleResultClick}
              style={{
                color: 'blue',
                cursor: 'pointer',
                fontSize: '0.8rem',
                paddingTop: '0.5rem',
              }}
            >
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
