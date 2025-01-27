import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import uidata from '../constants/uidata'
import CategoryFoodComp from '../components/CategoryFoodComp'
import { useNavigation } from '@react-navigation/native'


const HomeCategories = () => {
    const navigation =useNavigation();

    const renderCategoryItem = ({item}) =>(
        <CategoryFoodComp item={item} onPress={()=>{}}/>
    )
  return (
    <View style={styles.container}>
      <FlatList 
        data={uidata.foods}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item)=>item._id}
        style={{marginTop:10}}
        scrollEnabled={false}
        renderItem={renderCategoryItem}
      />
    </View>
  )
}

export default HomeCategories

const styles = StyleSheet.create({
    container:{
        marginLeft:12,
        marginBottom:12,
    }
})