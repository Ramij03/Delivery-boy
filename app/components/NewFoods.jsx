import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import uidata from '../constants/uidata';
import FoodComponent from './FoodComponent';
import { useNavigation } from '@react-navigation/native';

const NewFoods = () => {
  const navigation = useNavigation();
  
  const renderItem = ({ item }) => (
    <FoodComponent item={item} onPress={() => navigation.navigate('food-nav', { item })} />
  );

  return (
    <View style={{ marginLeft: 12, marginBottom: 5 }}>
      <FlatList 
        data={uidata.foods}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 5, rowGap: 10 }}
        scrollEnabled
        renderItem={renderItem}
      />
    </View>
  );
};

export default NewFoods;

const styles = StyleSheet.create({});
