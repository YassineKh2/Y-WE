import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import React, { useState } from "react";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet/dist/leaflet.css";

export function Map() {
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([
    36.5727, 9.8473,
  ]);

  function LocationMarker() {
    // useMapEvents({
    //   click(e) {
    //     setMarkerPosition([e.latlng.lat, e.latlng.lng]);
    //   },
    // });

    return <Marker position={markerPosition}></Marker>;
  }

  return (
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
      <LocationMarker />
    </MapContainer>
  );
}
