import data from "../../../data/solarparks-east.json";
import "./index.css";
import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

function Map() {
  const [selectedSolarPark, setSelectedSolarPark] = useState(null);
  const solarParks = data.solarParks;

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedSolarPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: 45.4211, lng: -75.6903 }}>
      {solarParks.map((solarPark) => (
        <Marker
          key={solarPark.id}
          position={{
            lat: solarPark.coordinates.x,
            lng: solarPark.coordinates.y,
          }}
          onClick={() => {
            setSelectedSolarPark(solarPark);
          }}
          icon={{
            url: "/assets/solarpark/solar-panel.png",
            scaledSize: new window.google.maps.Size(25, 25),
          }}
        />
      ))}

      {selectedSolarPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedSolarPark(null);
          }}
          position={{
            lat: selectedSolarPark.coordinates.x,
            lng: selectedSolarPark.coordinates.y,
          }}
        >
          <div>
            <h2>{selectedSolarPark.properties.applicant}</h2>
            <p>{selectedSolarPark.properties.location}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default class Maps extends React.Component {
  render() {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDyCFiFT0KCfl0YDiQVcTCJqJUkmPK7TIg`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
