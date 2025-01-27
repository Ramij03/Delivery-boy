import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import AssetImage from './AssetImage';
import { COLORS, SIZES } from '../constants/theme';
import { UserReversedGeoCode } from '../context/UserReversedGeoCode';
import { UserLocationContext } from "../context/UserLocationContext";
import * as Location from 'expo-location';

const HomeHeader = () => {
  const { address, setAddress } = useContext(UserReversedGeoCode);
  const { location, setLocation } = useContext(UserLocationContext);
  const [time, setTime] = useState(null);
  const [image, setImage] = useState(require('../../assets/images/morning.png')); // Set default image

  useEffect(() => {
    if (location) {
      reverseGeoCode(location.coords.latitude, location.coords.longitude);
    }
  }, [location]);

  const reverseGeoCode = async (latitude, longitude) => {
    const reversedGeoCode = await Location.reverseGeocodeAsync({
      longitude: longitude,
      latitude: latitude
    });
    setAddress(reversedGeoCode[0]);
  }

  const getTimeOfDay = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 4 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  useEffect(() => {
    const greeting = getTimeOfDay();
    setTime(greeting);

    // Set image based on the time of day
    if (greeting === "Good Morning") {
      setImage(require('../../assets/images/morning.png'));
    } else if (greeting === "Good Afternoon") {
      setImage(require('../../assets/images/afternoon.webp'));
    } else {
      setImage(require('../../assets/images/evening.png'));
    }
  }, []);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={Styles.outerStyle}>
        <AssetImage
          data={require('../../assets/images/profilepic.jpg')}
          width={55}
          height={55}
          mode={'cover'}
          radius={99}
        />

        <View style={Styles.headerStyle}>
          <Text style={Styles.heading}>Delivering To</Text>
          <Text style={{ fontSize: 14, fontWeight: 600, color:COLORS.gray }}>
            {address ? `${address.city}, ${address.name}` : 'Loading...'}
          </Text>
        </View>
      </View>

      <View style={{ marginRight: 10 }}>
      
        {image && (
          <AssetImage
            data={image}
            width={50}
            height={50}
            mode={'cover'}
            radius={15}
          />
        )}
      </View>

    </View>
  );
};

export default HomeHeader;

const Styles = StyleSheet.create({
  outerStyle: {
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  headerStyle: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  heading: {
    fontFamily:'medium',
    fontSize: SIZES.medium,
    color: COLORS.secondary,
  },
});
