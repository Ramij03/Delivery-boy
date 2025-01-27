import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';
import FoodPage from '../screens/FoodPage';
import OrderPage from '../screens/OrderPage';

const Stack = createNativeStackNavigator();

const FoodNavigation = () => {
  // Use `useRoute` hook inside the component to access route params
  const route = useRoute();
  const item = route.params?.item; // Access the item safely (using optional chaining)

  return (
    <Stack.Navigator initialRouteName="food-page">
      <Stack.Screen
        name="food-page"
        component={FoodPage}
        options={{ headerShown: false }}
        initialParams={{ item: item }} // Pass `item` here
      />
      <Stack.Screen
        name="order-page"
        component={OrderPage}
        options={{ headerShown: false, presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
};

export default FoodNavigation;

const styles = StyleSheet.create({});
