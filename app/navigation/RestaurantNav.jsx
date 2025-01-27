import * as React from 'react';
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { COLORS } from '../constants/theme'; // Adjust the import based on your project structure
import Menu from '../screens/restaurant/Menu'
import Directions from '../screens/restaurant/Directions'
import New from '../screens/restaurant/New'

// SceneMap to map routes to components
const renderScene = SceneMap({
  first: Menu,
  second: Directions,
  third: New,
});

const routes = [
  { key: 'first', title: 'Menu' },
  { key: 'second', title: 'Directions' },
  { key: 'third', title: 'New' },
];

const RestaurantNav = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={styles.tabBar}
          indicatorStyle={styles.indicator}
          labelStyle={styles.label}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white, // Set the background color of the TabBar
  },
  label: {
    color: COLORS.primary, // Set color of the tab label when inactive
    fontSize: 16,
    fontFamily: 'medium',
  },
  indicator: {
    backgroundColor: COLORS.primary, // Set the underline color of the active tab
    height: 3, // Adjust the height of the underline
    
  },
});

export default RestaurantNav;
