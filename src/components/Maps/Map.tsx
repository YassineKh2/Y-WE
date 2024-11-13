import { MapContainer, Marker, TileLayer } from "react-leaflet";
import React from "react";

export function Map() {
  return (
    <>
      <MapContainer
        center={[36.5727, 9.8473]}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: "40vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}></Marker>
      </MapContainer>
    </>
  );
}
