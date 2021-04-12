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

  function _onClick(feature) {
    setSelectedCoordinates(feature.lngLat);
    console.log(selectedCoordinates);
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
    }
  });

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
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
            <button className="marker-btn">
              <img
                src="/assets/windturbines/marker-turbine.png"
                alt="turbine-icon"
              />
            </button>
          </Marker>
        ) : (
          <div></div>
        )}
      </ReactMapGL>
    </div>
  );
}
