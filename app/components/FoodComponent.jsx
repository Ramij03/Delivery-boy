import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import NetworkImage from './NetworkImage'
import { COLORS,SIZES } from '../constants/theme'

const FoodComponent = ({item,onPress}) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
        <NetworkImage source={item.imageUrl[0]} 
        width={SIZES.width-60} 
        height={SIZES.height/4.5} 
        radius={16}
       />
       <Text style={styles.heading}>{item.title}</Text>
       <Text style={styles.small}>{item.time} - delivery</Text>
    </TouchableOpacity>
  )
}

export default FoodComponent

const styles = StyleSheet.create({
    wrapper:{
        marginRight:15,
        backgroundColor:COLORS.lightWhite,
        padding:8,
        borderRadius:16,
    },
    heading:{
        fontSize:14,
        fontFamily:"regular",
        color:COLORS.gray,
    },
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    small:{
        fontSize:12,
        fontFamily:"regular",
        color:COLORS.gray,
    }
})