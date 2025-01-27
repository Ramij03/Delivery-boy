import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import BackBtn from '../../components/BackBtn';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import { RatingInput } from 'react-native-stock-star-rating';
import { UserLocationContext } from '../../context/UserLocationContext';
import GoogleApiServices from '../../hook/GoogleApiServices';
import RestaurantNav from '../../navigation/RestaurantNav'


const Restaurant = ({ navigation }) => {
    const [distanceTime, setDistanceTime] = useState({});
    const route = useRoute();
    const item = route.params;
    const { location, setLocation } = useContext(UserLocationContext);

    useEffect(() => {
        if (!location) {
            // If location is not yet available, return early
            return;
        }

        // Using the updated GoMaps API functions to calculate distance and time
        GoogleApiServices.calculateDistanceAndTime(
            item.coords.latitude,
            item.coords.longitude,
            location.coords.latitude,
            location.coords.longitude
        ).then((results) => {
            if (results) {
                setDistanceTime(results);
            }
        });
    }, [location, item.coords.latitude, item.coords.longitude]);

    const totalTime =
        GoogleApiServices.extractNumbers(distanceTime.duration)[0] + GoogleApiServices.extractNumbers(item.time)[0];

    return (
        <View>
            <View>
                <BackBtn onPress={() => navigation.goBack()} />
                
                <TouchableOpacity onPress={() => {}} style={styles.rest}>
                    <View style={styles.restbtn}>
                        <Ionicons name="options" size={35} color={COLORS.white} />
                    </View>
                </TouchableOpacity>
                <Image style={styles.image} source={{ uri: item.imageUrl }} />
               
            </View>
            <View style={styles.distance}>
                <View style={styles.row}>
                <Text style={styles.title}>{item.title}</Text>
                <RatingInput rating={Number(item.rating)} size={20} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.small}>Distance</Text>
                    <Text style={styles.small}>{distanceTime.distance}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.small}>Time</Text>
                    <Text style={styles.small}>{totalTime} min</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.small}>Cost</Text>
                    <Text style={styles.small}>{distanceTime.finalPrice}</Text>
                </View>
            </View>
            <View style={styles.height}>
                <RestaurantNav />
            </View>
        </View>
    );
};

export default Restaurant;

const styles = StyleSheet.create({
    height: {
        height: 500,
    },
    title: {
        fontSize: 22,
        fontFamily: 'medium',
        color: COLORS.black,
    },
    image: {
        width: SIZES.width,
        height: SIZES.height / 3.5,
        borderBottomRightRadius: 14,
        borderBottomLeftRadius:14
      },
    ratingTxt: {
        color: COLORS.white,
        fontSize: 14,
        fontFamily: 'medium',
    },
    distance: {
        marginTop: 8,
        marginHorizontal: 8,
        marginBottom: 10,
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    small: {
        fontSize: 16,
        fontFamily: 'regular',
        color: COLORS.gray,
    },
});
