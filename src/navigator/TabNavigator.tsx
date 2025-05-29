import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import OrderScreen from '../screens/OrderScreen';
import {COLORS} from '../theme/theme';
import {BlurView} from '@react-native-community/blur';
import CustomIcon from '../components/CustomIcon';
import { RootTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<RootTabParamList>();

const BlurViewComP = () => {
  return (
    <BlurView
      overlayColor=""
      blurAmount={15}
 
      style={styles.BlurViewStyles}
    />
  );
};

const renderIcon =
  (iconName: string) =>
  ({focused}: {focused: boolean; color: string; size: number}) =>
    (
      <CustomIcon
        name={iconName}
        size={25}
        color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
      />
    );

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIconStyle: { marginTop: 6 },
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: COLORS.primaryOrangeHex,
        tabBarInactiveTintColor: COLORS.primaryLightGreyHex,
        tabBarBackground: () => <BlurViewComP />,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarIcon: renderIcon('home')}}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{tabBarIcon: renderIcon('cart')}}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoritesScreen}
        options={{tabBarIcon: renderIcon('like')}}
      />
      <Tab.Screen
        name="Orders"
        component={OrderScreen}
        options={{tabBarIcon: renderIcon('bell')}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 70,
  
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
