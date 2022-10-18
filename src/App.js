import './App.css';
import { results } from './data/results';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function App() {
  const [searchQuery, setSearchQuery] = useState('berlin');
  const [searchResult, setSearchResult] = useState({
    lat: 52.520008,
    lon: 13.404954,
  });

  useEffect(() => {
    fetch(
      `https://nominatim.openstreetmap.org/?q=${searchQuery}&format=json&limit=3`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchResult(data[0]);
        console.log(data);
      });
  }, [searchQuery]);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.searchField.value);
    setSearchQuery(e.target.searchField.value);
  };

  return (
    <div>
      <form onSubmit={handleClick}>
        <input type="text" name="searchField" />
        <button type="submit">Search</button>
      </form>

      {results.map((result) => {
        return (
          <ul key={result.place_id}>
            <li>{result.display_name}</li>
          </ul>
        );
      })}

      <MapContainer center={[50.0, 1.0]} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {results.map((result) => {
          return (
            <Marker key={result.place_id} position={[result.lat, result.lon]}>
              <Popup>{result.display_name}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default App;
