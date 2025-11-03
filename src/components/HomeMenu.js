import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import NuevoPost from '../screens/NuevoPost/NuevoPost';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { Component } from 'react';

const Tab = createBottomTabNavigator();

export default class HomeMenu extends Component {
  render() {
    return (
      <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: () => <AntDesign name="home" size={24} color="black" />
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: () => <AntDesign name="profile" size={24} color="black" />
          }}
        />
        <Tab.Screen
          name="NuevoPost"
          component={NuevoPost}
          options={{
            tabBarIcon: () => <AntDesign name="pluscircleo" size={24} color="black" />
          }}
        />
      </Tab.Navigator>
    );
  }
}