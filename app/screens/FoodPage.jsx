import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES } from '../constants/theme';
import BackBtn from '../components/BackBtn';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Counter from '../components/Counter';

const FoodPage = ({ route, navigation }) => {
  const { item } = route.params ; // Safely extract `item` from route.params

  // Ensure item is defined before accessing its properties
  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: Item not found!</Text>
      </View>
    );
  }

  const [isChecked, setIsChecked] = useState(false);
  const [additives, setAdditives] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [restaurant, setRestaurant] = useState(1);
  const [count, setCount] = useState(1);
  const [preference, setPreference] = useState('');
  let sendToOrderPage;
  const id = item.restaurant; // Fallback to empty string if `restaurant` is undefined

  const handleAdd = (newAdditives) => {
    setAdditives((prevAdditives) => {
      const exists = prevAdditives.some((additive) => additive.id === newAdditives.id);
      if (exists) {
        return prevAdditives.filter((additive) => additive.id !== newAdditives.id);
      } else {
        return [...prevAdditives, newAdditives];
      }
    });
  };

  const hanldePress = (item) => {
    const cartItem = {
      productId: item._id,
      additives: additives,
      quantity: count,
      totalPrice: (item.price + totalPrice) * count,
    };
    addToCart(cartItem);
  };

  sendToOrderPage = {
    orderItem: {
      foodId: item._id,
      additives: additives,
      quantity: count,
      instructions: preference,
      price: (item.price + totalPrice) * count,
    },
    title: item.title,
    description: item.description,
    imageUrl: item.imageUrl[0],
    restaurant: id,
  };

  const addToCart = async (cartItem) => {};

  useEffect(() => {
    handleAddPrice();
  }, [additives]);

  const handleAddPrice = () => {
    const total = additives.reduce((sum, additive) => {
      return sum + parseFloat(additive.price);
    }, 0); // Initialize with 0 to avoid undefined values

    setTotalPrice(total); // Update the state with the calculated total price
  };

  return (
    <View style={styles.heading}>
      {/* Main content */}
      <View style={styles.mainContent}>
        <View>
          <Image style={styles.image} source={{ uri: item.imageUrl?.[0] }} />
          <BackBtn onPress={() => navigation.goBack()} />
          <TouchableOpacity style={styles.share}>
            <MaterialCommunityIcons name="share-circle" size={35} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.rest}>
            <View style={styles.restbtn}>
              <Ionicons name="ellipsis-horizontal" size={35} color={COLORS.white} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={[styles.text, { color: COLORS.primary }]}>${(item.price + totalPrice) * count}</Text>
          </View>

          <Text style={styles.desc}>{item.description}</Text>

          <FlatList
            data={item.foodTags}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 5 }}
            horizontal
            scrollEnabled
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View style={styles.list}>
                <Text style={styles.listTxt}>{item}</Text>
              </View>
            )}
          />

          <Text style={[styles.text, { marginTop: 20 }]}>Add Toppings:</Text>
          <FlatList
            data={item.additives}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 5 }}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.list1}>
                <BouncyCheckbox
                  size={20}
                  unfillColor="#FFFFFF"
                  fillColor={COLORS.primary}
                  innerIconStyle={{ borderWidth: 1 }}
                  textStyle={styles.desc}
                  text={item.title}
                  onPress={() => {
                    handleAdd(item);
                  }}
                />
                <Text style={styles.desc}>$ {item.price}</Text>
              </View>
            )}
          />

          <Text style={[styles.text, { marginTop: 20 }]}>Preferences:</Text>
          <View style={styles.input}>
            <TextInput
              placeholder="Add specifics"
              value={preference}
              onChangeText={(value) => setPreference(value)}
              autoCapitalize={'none'}
              autoCorrect={false}
              style={{ flex: 1 }}
            />
          </View>
          <View style={[styles.row, { marginTop: 10 }]}>
            <Text style={[styles.text, { marginBottom: 15 }]}>Quantity</Text>
            <Counter count={count} setCount={setCount} />
          </View>
        </View>
      </View>

      {/* Fixed order section */}
      <View style={styles.fixedBottom}>
        <View style={styles.suspend}>
          <View style={styles.cart}>
            <View style={[styles.row, { marginHorizontal: 12 }]}>
              <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
                <AntDesign name="pluscircleo" size={24} color={COLORS.lightWhite} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('order-page',{item})}
                style={{ backgroundColor: COLORS.primary, paddingHorizontal: 80, borderRadius: 30 }}
              >
                <Text style={[styles.text, { color: COLORS.lightWhite, marginTop: 3, alignItems: 'center' }]}>Order</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
                <Text style={[styles.text, { color: COLORS.lightWhite, marginTop: 3, alignItems: 'center' }]}>{0}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FoodPage;

const styles = StyleSheet.create({
  heading: {
    backgroundColor: COLORS.lightWhite,
    height: SIZES.height,
    flexDirection: 'column',
    justifyContent: 'space-between', // Ensures content and order section are spaced correctly
  },
  mainContent: {
    flex: 1, // Takes up available space
    marginBottom: 80, // Ensure the fixed order section doesn't overlap
  },
  image: {
    width: SIZES.width,
    height: SIZES.height / 3.5,
    borderBottomRightRadius: 35,
  },
  share: {
    marginRight: 12,
    alignItems: 'center',
    zIndex: 999,
    right: 0,
    position: 'absolute',
    top: SIZES.xxLarge - 5,
  },
  rest: {
    position: 'absolute',
    bottom: 10,
    right: 0,
  },
  restbtn: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    opacity: 0.9,
    borderWidth: 1,
    padding: 5,
    marginRight: 10,
    borderRadius: 30,
  },
  container: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 22,
    fontFamily: 'medium',
    color: COLORS.black,
  },
  desc: {
    fontSize: 14,
    fontFamily: 'regular',
    marginTop: 5,
    color: COLORS.black,
    textAlign: 'justify',
  },
  list: {
    right: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  listTxt: {
    color: COLORS.lightWhite,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  list1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    backgroundColor: COLORS.offwhite,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  suspend: {
    position: 'absolute',
    zIndex: 999,
    bottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  cart: {
    width: SIZES.width - 24,
    height: 60,
    justifyContent: 'center',
    backgroundColor: COLORS.primary1,
    borderRadius: 80,
  },
  cartBtn: {
    width: 40,
    height: 40,
    borderRadius: 99,
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
