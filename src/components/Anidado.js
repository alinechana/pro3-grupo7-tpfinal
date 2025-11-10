import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Home from '../screens/Home/Home'
import Comentar from '../screens/Comentar/Comentar'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

export class Anidado extends Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Comentar" component={Comentar} options={{ headerShown: false }} />
                

            </Stack.Navigator>
        )
    }
}

export default Anidado