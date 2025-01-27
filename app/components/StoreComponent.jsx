import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants/theme'
import NetworkImage from './NetworkImage'
import {RatingInput} from 'react-native-stock-star-rating'
const StoreComponent = ({item,onPress}) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
        <NetworkImage source={item.imageUrl} 
        width={SIZES.width-60} 
                height={SIZES.height/4.5} 
                radius={16}
       />
        <Text style={styles.heading}>{item.title}</Text>
        <View style={styles.row}>
            <Text style={styles.small}>Delivery in</Text>
            <Text style={styles.small}>{item.time}</Text>
        </View>

        <View style={styles.row}>
            <RatingInput 
                rating={item.rating}
                size={15}
                maxStars={5}
                setRating={item.rating}
                bordered={false}
                color={COLORS.primary}
            />
            <Text style={styles.small}>{item.ratingCount} rating</Text>
        </View>

    </TouchableOpacity>
  )
}

export default StoreComponent

const styles = StyleSheet.create({
    wrapper:{
        marginRight:15,
        backgroundColor:COLORS.lightWhite,
        padding:8,
        borderRadius:16,
        marginBottom:5
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