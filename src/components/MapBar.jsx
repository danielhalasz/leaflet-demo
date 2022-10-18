import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

export const MapBar = ({ searchResults, selectedResult }) => {
  const SetViewOnResult = ({ coords }) => {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
  };

  SetViewOnResult.defaultProps = {
    coords: [50.0, 1.0],
  };

  // const mapLayerProvider0 =
  //   'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const mapLayerProvider =
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';

  return (
    <div>
      <MapContainer center={[50.0, 1.0]} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
          url={mapLayerProvider}
          maxZoom={16}
        />
        {searchResults.length > 0 ? (
          <SetViewOnResult coords={[selectedResult.lat, selectedResult.lon]} />
        ) : (
          <SetViewOnResult />
        )}
        {searchResults.map((result) => {
          return (
            <div key={result.place_id}>
              <Marker position={[result.lat, result.lon]}>
                <Popup>{result.display_name}</Popup>
              </Marker>
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
};
