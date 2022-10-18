import './App.css';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.searchField.value);
    setSearchQuery(e.target.searchField.value);
  };

  const SetViewOnResult = ({ coords }) => {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
  };

  SetViewOnResult.defaultProps = {
    coords: [51.505, -0.09],
  };

  return (
    <div>
      <form onSubmit={handleClick}>
        <input type="text" name="searchField" />
        <button type="submit">Search</button>
      </form>

      {searchResults.map((result) => (
        <div key={result.place_id}>
          <p>{result.display_name}</p>
        </div>
      ))}

      <MapContainer center={[50.0, 1.0]} zoom={6} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {searchResults.length > 0 ? (
          <SetViewOnResult
            coords={[searchResults[0].lat, searchResults[0].lon]}
          />
        ) : (
          <SetViewOnResult />
        )}
        {searchResults.map((result) => {
          return (
            <>
              <Marker key={result.place_id} position={[result.lat, result.lon]}>
                <Popup>{result.display_name}</Popup>
              </Marker>
            </>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default App;
