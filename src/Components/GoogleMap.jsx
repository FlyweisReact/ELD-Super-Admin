import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "600px",
};

export function GoogleMapPage() {
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  console.log(showingInfoWindow);

  const onMarkerClick = () => {
    console.log(showingInfoWindow);
    // setSelectedPlace(props);
    // setActiveMarker(marker);
    setShowingInfoWindow(!showingInfoWindow);
  };

  const onClose = () => {
    setActiveMarker(null);
    setShowingInfoWindow(false);
  };
  const locations = [
    { name: "Location 1", position: { lat: 28.5355, lng: 77.391 } },
    { name: "Location 2", position: { lat: 28.7041, lng: 77.1025 } },
  ];
  const center = {
    lat: 28.5355,
    lng: 77.391,
  };
  console.log(process.env.REACT_APP_API_KEY);
  const [map, setMap] = React.useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: 'AIzaSyAxvv_NnQpCjr0n4J1zSomdYInOmvoKOjc',
  });

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={4}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        onClick={onMarkerClick}
        icon={{
          url: "./Component 62.png",
        }}
        position={center}
      >
        {showingInfoWindow && (
          <InfoWindow
            marker={activeMarker}
            visible={showingInfoWindow}
            onClose={onClose}
          >
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(GoogleMapPage);