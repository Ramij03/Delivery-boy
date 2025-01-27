import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import uidata from '../constants/uidata'
import StoreComponent from './StoreComponent'
import { useNavigation } from '@react-navigation/native'
import { RestaurantContext } from '../context/RestaurantContext';

const NearbyRestaurants = () => {
  const navigation=useNavigation();
  const {restaurant,setRestaurant}=useContext(RestaurantContext)
  return (
    <View style={styles.top}>
      <FlatList 
      data={uidata.restaurants}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{marginTop:5,rowGap:10}}
      scrollEnabled
      renderItem={({item})=>(
          <StoreComponent item={item} onPress={()=>{navigation.navigate('restaurant',item),setRestaurant(item)}}/>
      )}
      />
    </View>
  )
}

export default NearbyRestaurants

const styles = StyleSheet.create({
  top:{
    marginLeft:12,
  
  },
})