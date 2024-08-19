import './App.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <>
      <div className="leaflet-container">
      <MapContainer center={[53.10667, 6.87917]} zoom={12} style={{height: "100vh", width: "100vw"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Additional map layers or components can be added here */}
      </MapContainer>
      </div>
    </>
  );
}

export default App;
