import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'; // Import SplashScreen
import * as Location from 'expo-location';
import { UserLocationContext } from './app/context/UserLocationContext';
import { UserReversedGeoCode } from './app/context/UserReversedGeoCode';
import BottomTab from './app/navigation/BottomTab';
import FoodNavigation from './app/navigation/FoodNavigation';
import RestaurantNav from './app/navigation/RestaurantNav';
import Restaurant from './app/screens/restaurant/Restaurant';
import AddRating from './app/screens/AddRating';
import { RestaurantContext } from './app/context/RestaurantContext';
import { LoginContext } from './app/context/LoginContext';
import { CartCountContext } from './app/context/CartCountContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUp from "./app/screens/SignUp"
import Cart from './app/screens/Cart';

const Stack = createNativeStackNavigator();

export default function App() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);
  const [login,setLogin]=useState(false);
  const [cartCount,setCartCount]=useState(0);

  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/Poppins-Regular.ttf'),
    light: require('./assets/fonts/Poppins-Light.ttf'),
    bold: require('./assets/fonts/Poppins-Bold.ttf'),
    medium: require('./assets/fonts/Poppins-Medium.ttf'),
    extrabold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
    semibold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  // Default address data
  const defaultAddress = {
    city: 'Shanghai',
    country: 'China',
    district: 'Pudong',
    isoCountryCode: 'CN',
    name: '33 East Nanjing Rd',
    postalCode: '94108',
    region: 'SH',
    street: 'Stockton St',
    streetNumber: '1',
    subregion: 'San Francisco County',
    timezone: 'America/Los_Angeles',
  };

  const loginStatus = async()=>{
    const userToken=await AsyncStorage.getItem('token');

    if(userToken!==null){
      setLogin(true);
    }
    else{
      setLogin(false);
    }
  };
  
  useEffect(() => {
    // Prevent the splash screen from auto-hiding until fonts are loaded
    SplashScreen.preventAutoHideAsync();

    // Requesting location permissions and fetching location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission denied');
        return;
      }
  
      try {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
        loginStatus();
        // Use a simplified address to avoid sending large objects
        setAddress({
          city: 'Shanghai',
          country: 'China',
        });
      } catch (error) {
        console.error("Error fetching location:", error);
        setError('Failed to fetch location');
      }
    })();
  }, []);

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    //return loading indicator
    return null; // Prevent rendering of the app before fonts are ready
  }


  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <UserReversedGeoCode.Provider value={{ address, setAddress }}>
        <RestaurantContext.Provider value={{ restaurant, setRestaurant }}>
          <LoginContext.Provider value={{ login, setLogin }}>
            <CartCountContext.Provider value={{ cartCount, setCartCount }}>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    name="bottom-navigation"
                    component={BottomTab}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="food-nav"
                    component={FoodNavigation}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="restaurant-page"
                    component={RestaurantNav}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="restaurant"
                    component={Restaurant}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="rating"
                    component={AddRating}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="register"
                    component={SignUp}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Cart"
                    component={Cart}
                    options={{ headerShown: false }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </CartCountContext.Provider>
          </LoginContext.Provider>
        </RestaurantContext.Provider>
      </UserReversedGeoCode.Provider>
    </UserLocationContext.Provider>
  );
}
