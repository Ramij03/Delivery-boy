import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { RestaurantContext } from '../../context/RestaurantContext';
import uidata from '../../constants/uidata'
import FoodTile from '../../components/FoodTile'

const New = () => {
  const navigation = useNavigation();
  const { restaurant, setRestaurant } = useContext(RestaurantContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={uidata.foods}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        keyExtractor={(item) => item._id}
        numColumns={2}  // This ensures two items per row
        renderItem={({ item }) => (
          <FoodTile item={item} onPress={() => navigation.navigate('food-nav', { item })} />
        )}
      />
    </View>
  );
}

export default New

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
    marginBottom:50
  },
  flatList: {
    marginTop: 5,
  },
});
