import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import data from "../../../data/solarparks-east.json";
import turbines from "data/windturbines-east.json";
import "./index.css";

export default function Maps() {
  const [viewport, setViewport] = useState({
    latitude: 52.18889722321286,
    longitude: 6.124005761032457,
    width: "90vw",
    height: "90vh",
    zoom: 8,
  });
  const [selectedSolarPark, setSelectedSolarPark] = useState(null);
  const [selectedWindTurbinePark, setSelectedWindTurbinePark] = useState(null);

  return (
    <div style={{width: '100%'}}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
        //mapStyle="mapbox://styles/fritsjhuuu/ckmunrfw755q417p0db5st0ff"
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
                setSelectedWindTurbinePark(null);
                setSelectedSolarPark(solarPark);
              }}
            >
              <img
                src="/assets/solarpark/marker-sun.png"
                alt="solarpanel-icon"
              />
            </button>
          </Marker>
        ))}

        {turbines.parks.map((park) => (
          <Marker
            key={park.id}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedSolarPark(null);
                setSelectedWindTurbinePark(park);
              }}
            >
              <img
                src="/assets/windturbines/marker-turbines.png"
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

        {selectedWindTurbinePark ? (
          <Popup
            className="popup"
            latitude={selectedWindTurbinePark.geometry.coordinates[1]}
            longitude={selectedWindTurbinePark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedWindTurbinePark(null);
            }}
          >
            <div id="popup-items">
              <h4>{selectedWindTurbinePark.properties.title}</h4>
              <p>{selectedWindTurbinePark.properties.description}</p>
              <p>
                <b>Total KwH: </b>
                {selectedWindTurbinePark.properties.kwhTotal}
              </p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}
