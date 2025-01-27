import { Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { RestaurantContext } from '../../context/RestaurantContext';
import GoogleMapView from '../../components/GoogleMapView';
import { COLORS, SIZES } from '../../constants/theme';

const Directions = () => {
  const {restaurant,setRestaurant}=useContext(RestaurantContext);
  const coords=restaurant.coords;

  const onDirectionClick=()=>{
    const url=Platform.select({
      ios:"maps"+coords.latitude+","+coords.longitude,
      android:"geo"+coords.latitude+","+coords.longitude+"?z=16",
    })
    Linking.openURL(url);
  }

  return (
    <View>
      <GoogleMapView placeLsit={[coords]}/>

      <View stylele={styles.row}>
        <Text style={styles.small}>{coords.address}</Text>
      </View>
      <TouchableOpacity style={styles.ratingBtn} onPress={()=>onDirectionClick()}>
        <Text style={styles.ratingTxt}>Rate this Place</Text>
    </TouchableOpacity>

    </View>
  )
}

export default Directions

const styles = StyleSheet.create({
  row:{
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    margin:12
  },
  small:{
    width:SIZES.width/1.6,
    fontFamily:'regular',
    fontSize:14,
    color:COLORS.black,
    marginLeft:10,
  },
  ratingBtn: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 9,
    padding: 6,
    marginHorizontal:10,
    marginBottom:20
},
ratingTxt:{
  textAlign:'center',
  fontFamily:'regular',
  fontSize:16
}
})