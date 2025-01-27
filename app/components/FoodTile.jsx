import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';
import NetworkImage from '../components/NetworkImage';
import { RatingInput } from 'react-native-stock-star-rating';

const FoodTile = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <View style={styles.innerWrapper}>
        {/* Image and Plus Button */}
        <View style={styles.imageWrapper}>
          <NetworkImage
            source={item.imageUrl[0]}
            width={SIZES.width / 2.3} // Dynamically adjust width to fit 2 items per row
            height={SIZES.width / 2.3} // Keep aspect ratio square
            radius={16}
          />
          {/* Plus Button */}
          <TouchableOpacity style={styles.plusButton}>
            <Text style={styles.plusText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Food Details (Title, Rating, Price) */}
        <View style={styles.detailsWrapper}>
          <Text style={styles.title}>{item.title}</Text>
          <RatingInput rating={Number(item.rating)} size={20} color={COLORS.primary} />
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodTile;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    margin: 10,
    padding: 10,
    ...SHADOWS.medium, // Apply shadow for elevation
    width: '45%',  // Ensure each tile takes up roughly half the screen width (plus some space for margins)
    height:310
  },
  innerWrapper: {
    backgroundColor: COLORS.lightWhite,
    borderRadius: 16,
    overflow: 'hidden', // To ensure the image and plus sign are not outside the container
    height:300
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 10, // Space between image and details
  },
  plusButton: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium, // Apply shadow to make the plus button stand out
  },
  plusText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsWrapper: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'medium',
    fontSize: 16,
    color: COLORS.black,

  },
  price: {
    fontFamily: 'regular',
    fontSize: 15,
    color: COLORS.primary,
    marginTop: 5,
  },
});
