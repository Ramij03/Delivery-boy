import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, {useContext, useState} from "react";
import { COLORS, SIZES } from "../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import pages from './page.style'
import HomeHeader from "../components/HomeHeader";
import CategoryList from "../components/CategoryList";
import ChoicesList from "../components/ChoicesList";
import Heading from "../components/Heading";
import NearbyRestaurants from "../components/NearbyRestaurants";
import Divider from '../components/Divider'
import NewFoods from "../components/NewFoods";
import FastestNearYou from "../components/FastestNearYou";
import HomeCategories from "../components/HomeCategories";

const Home = () => {
  
  const [selectedCategory, setSelectedCategory]= useState(null);
  const [selectedSection, setSelectedSection]= useState(null);
  const [selectedValue ,setSelectedValue]= useState(null);
  const [selectedChoice ,setSelectedChoice]= useState(null);

  return (
    <SafeAreaView>
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>
          <HomeHeader />

          <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{borderBottomEndRadius:30,borderBottomStartRadius:30}}>
          <CategoryList 
          setSelectedCategory={setSelectedCategory}
          setSelectedSection={setSelectedSection}
          setSelectedValue={setSelectedValue}
          />
          <ChoicesList setSelectedChoice={setSelectedChoice}
          setSelectedSection={setSelectedSection}
          />
          {selectedCategory!==null &&selectedSection!==null?(
            <View>
              <Heading heading={`Browsing ${selectedValue}`} onPress={()=>{}}/>
              <HomeCategories />
              
            </View>
          ):
          <View>
            <Heading heading={'Nearby Restaurants'} onPress={()=>{}}/>
            <NearbyRestaurants />

            <Divider/>
            <Heading heading={'Try Something New'} onPress={()=>{}}/>
            <NewFoods />

            <Divider/>
            <Heading heading={'Recommended'} onPress={()=>{}}/>
            <FastestNearYou />
          </View>}
    
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  
});
