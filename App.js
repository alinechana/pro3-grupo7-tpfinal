import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Navigationcontainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from './src/screens/Login/Login';
import Register from './src/screens/Register/Register';
import Profile from './src/screens/Profile/Profile';
import NuevoPost from './src/screens/NuevoPost/NuevoPost';



export default function App() {
  return (
    <Navigationcontainer> 
      <StackActions.Navigator>

        <Stack.Screen name ="Login" component = {Login} options = { {headerShown: false}}> </Stack.Screen>
        <Stack.Screen name= "Register" component = {Register} options = { {headerShown: false}}> </Stack.Screen>
        <Stack.Screen name= "Profile" component = {Profile} options = { {headerShown: false}}> </Stack.Screen>
        <Stack.Screen name= "NuevoPost" component = {NuevoPost} options = { {headerShown: false}}> </Stack.Screen>
    

      </StackActions.Navigator>

    </Navigationcontainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
