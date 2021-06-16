import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "./index.css";

export default function MapForm() {
  const [viewport, setViewport] = useState({
    latitude: 52.18889722321286,
    longitude: 6.124005761032457,
    width: "60vw",
    height: "50vh",
    zoom: 10,
  });

  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  function _onClick(feature) {
    setSelectedCoordinates(feature.lngLat);
    window.dispatchEvent(
      new CustomEvent("map-click-coordinates", {
        bubbles: true,
        composed: true,
        detail: { coordinates: feature.lngLat },
      })
    );
  }

  window.addEventListener("set-marker", (e) => {
    if (e.detail.coordinates !== null) {
      setSelectedCoordinates(e.detail.coordinates);
      setSelectedType(e.detail.type);
    }
  });

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={
          "pk.eyJ1IjoiZnJpdHNqaHV1dSIsImEiOiJja21uN2Z4dWgwdWNtMndyem15MXg3c3o0In0.CNS2hAKmJdjcjJRY1cNKXQ"
        }
        //mapStyle="mapbox://styles/fritsjhuuu/ckmunrfw755q417p0db5st0ff"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        onClick={_onClick}
      >
        {selectedCoordinates && selectedCoordinates.length > 1 ? (
          <Marker
            key={1}
            latitude={selectedCoordinates[1]}
            longitude={selectedCoordinates[0]}
            anchor={"bottom-left"}
            offsetTop={-50}
            offsetLeft={-25}
          >
            <button className='marker-btn'>
              {(selectedType && selectedType === "Wind") ||
              selectedType === "wind" ? (
                <img
                  src='/assets/windturbines/marker-turbine.png'
                  alt='turbine-icon'
                />
              ) : (
                <img src='/assets/solarpark/marker-sun.png' alt='solar-icon' />
              )}
            </button>
          </Marker>
        ) : (
          <div></div>
        )}
      </ReactMapGL>
    </div>
  );
}
