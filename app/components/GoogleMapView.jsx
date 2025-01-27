import { StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { UserLocationContext } from '../context/UserLocationContext';
import { COLORS, SIZES } from '../constants/theme';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import GoogleApiServices from '../hook/GoogleApiServices'; // Assuming this is a utility to decode polyline.
import PlaceMarker from './PlaceMarker';

const GoogleMapView = ({ placeList = [] }) => {  // Default to an empty array to avoid undefined errors
  const [directions, setDirections] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const { location, setLocation } = useContext(UserLocationContext);
  const [mapRegion, setMapRegion] = useState({
    latitude: 35.6855,
    longitude: 139.68884,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (location && placeList && placeList.length > 0) {
      // Only fetch directions if placeList is valid and contains at least one item
      const destination = placeList[0]; // Assuming the first place is the destination

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.01,
      });

      fetchDirections(destination.latitude, destination.longitude, location.coords.latitude, location.coords.longitude);
    }
  }, [location, placeList]); // Re-run effect when location or placeList changes

  // Fetch directions using the Google Maps API
  const fetchDirections = async (startLat, startLng, destinationLat, destinationLng) => {
    const apiKey = "AlzaSywsTdIIHqCXJoNV3RHOyNi-VwNtGe0q2oc"; // API Key
    const baseUrl = "https://maps.googleapis.com/maps/api/directions/json"; // Correct endpoint for directions

    try {
      const url = `${baseUrl}?origin=${startLat},${startLng}&destination=${destinationLat},${destinationLng}&key=${apiKey}`;

      // Make the request using axios
      const response = await axios.get(url);
      const data = response.data;

      if (data.status === "OK" && data.routes && data.routes.length > 0) {
        const encodedPolyline = data.routes[0].overview_polyline.points;
        const decodedCoordinates = GoogleApiServices.decodePolyline(encodedPolyline); // Assuming this decodes the polyline

        setCoordinates(decodedCoordinates); // Set the decoded coordinates to display the polyline
      } else {
        console.error("Error fetching directions:", data.status);
      }
    } catch (error) {
      console.error("Failed to fetch directions:", error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={mapRegion}
      >
        <Marker title="My Location" coordinate={mapRegion} />

        {/* Ensure placeList is valid and has at least one item */}
        {Array.isArray(placeList) && placeList.length > 0 && placeList.map((item, index) => (
          index <= 1 && <PlaceMarker key={index} coordinates={item} />
        ))}

        {/* Ensure coordinates are available before rendering the Polyline */}
        {coordinates.length > 0 && (
          <Polyline
            coordinates={coordinates} // Coordinates for the polyline
            strokeColor={COLORS.primary}
            strokeWidth={5}
          />
        )}
      </MapView>
    </View>
  );
};

export default GoogleMapView;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: SIZES.width,
    height: SIZES.height / 3.1,
    borderRadius: 35,
    borderColor: COLORS.gray2,
    borderWidth: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});
