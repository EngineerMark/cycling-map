import './App.css';
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from 'react';
import GpxParser from 'gpxparser';
import Rand, { PRNG } from 'rand-seed';

function App() {
  const mapRef = useRef(null);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    (async () => {
      //load all gpx files from the public folder

      //get all gpx files from the current url + /gpx
      const files = require.context('./gpx', true);
      const fileList = files.keys().map(image => files(image));
      console.log(fileList);

      let _routes = [];
      if (fileList.length > 0) {
        for (let i = 0; i < fileList.length; i++) {
          const fileContent = await fetch(fileList[i]).then(res => res.text());
          var gpx = new GpxParser();
          gpx.parse(fileContent);
          const positions = gpx.tracks[0].points.map(p => [p.lat, p.lon]);

          //random color using position count as seed
          const rand = new Rand(`${positions.length + 255}`, PRNG.xoshiro128ss);
          const randomColor = (Math.round((16777215 * 0.5) + (rand.next() * (16777215 * 0.5)))).toString(16);
          

          const data = {
            positions: positions,
            color: "#" + randomColor,
            name: gpx.tracks[0].name,
            distance: gpx.tracks[0].distance
          }

          console.log(data);
          _routes.push(data);
        }
      }

      setRoutes(_routes);
    })();
  }, []);
  return (
    <>
      <div className="leaflet-container">
        <MapContainer center={[53.10667, 6.87917]} zoom={12} ref={mapRef} style={{ height: "100vh", width: "100vw" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {routes.map((route, index) => {
            return (
              <Polyline key={index}
                pathOptions={{
                  color: route.color,
                }}
                positions={route.positions}
              />
            );
          })}
        </MapContainer>
      </div>
    </>
  );
}

export default App;
