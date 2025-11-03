import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { Pressable } from 'react-native'

export class Profile extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
        <Pressable onPress={()=> this.props.navigation.navigate("Login")}> 
        <Text> Desloguearse</Text>

        </Pressable>
      
    )
  }
}

export default Profile