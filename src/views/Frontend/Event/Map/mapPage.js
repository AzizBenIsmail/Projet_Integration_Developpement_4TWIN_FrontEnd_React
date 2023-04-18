
import { useState , useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';



const Map = (props) => {
    const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
      });
    }
  }, []);

  return (
    <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {/* add markers and other components as needed */}
    <Marker position={[51.505, -0.09]}>
        <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
        </Marker>

  </MapContainer>

  
  );
};

export default Map;
 