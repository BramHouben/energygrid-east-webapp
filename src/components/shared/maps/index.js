import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import data from "../../../data/solarparks-east.json";
import "./index.css";

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 52.18889722321286,
    longitude: 6.124005761032457,
    width: "75vw",
    height: "75vh",
    zoom: 8,
  });
  const [selectedSolarPark, setSelectedSolarPark] = useState(null);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {data.solarParks.map((solarPark) => (
          <Marker
            key={solarPark.id}
            latitude={solarPark.coordinates.x}
            longitude={solarPark.coordinates.y}
          >
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedSolarPark(solarPark);
              }}
            >
              <img
                src="/assets/solarpark/solar-panel.png"
                alt="solarpanel-icon"
              />
            </button>
          </Marker>
        ))}

        {selectedSolarPark ? (
          <Popup
            className="popup"
            latitude={selectedSolarPark.coordinates.x}
            longitude={selectedSolarPark.coordinates.y}
            onClose={() => {
              setSelectedSolarPark(null);
            }}
          >
            <div id="popup-items">
              <h4>{selectedSolarPark.applicant}</h4>
              <p>
                {selectedSolarPark.adress} {selectedSolarPark.zipcode}{" "}
                {selectedSolarPark.location}
              </p>
              <p>
                <b>Province: </b>
                {selectedSolarPark.province}
              </p>
              <p>
                <b>Gerealiseerd op: </b>
                {selectedSolarPark.realised_at}
              </p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}
