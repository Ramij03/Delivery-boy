import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import uidata from '../constants/uidata'
import FoodComponent from './FoodComponent'

const FastestNearYou = () => {

    const renderItem=({item}) =>(
        <FoodComponent item={item} onPress={()=>{}}/>
    )

  return (
    <View style={{marginLeft:12,marginBottom:15}}>
      <FlatList 
      data={uidata.foods}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{marginTop:5,rowGap:10}}
      scrollEnabled
      renderItem={renderItem}
      />
    </View>
  )
}

export default FastestNearYou

const styles = StyleSheet.create({})