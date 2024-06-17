import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapAddress = ({ address }) => {
    // Split the address into latitude and longitude values
    const [latitude, longitude] = address.split(',');
  
    // Check if latitude and longitude are valid numbers
    if (isNaN(latitude) || isNaN(longitude)) {
      // If latitude or longitude is not a valid number, return an error message
      return <div>Error: Invalid address format</div>;
    }
  
    // If latitude and longitude are valid, render the map
    return (
      <MapContainer center={[parseFloat(latitude), parseFloat(longitude)]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[parseFloat(latitude), parseFloat(longitude)]}>
          <Popup>
            <b>Address:</b> {address}
          </Popup>
        </Marker>
      </MapContainer>
    );
  };
  
export default MapAddress;
