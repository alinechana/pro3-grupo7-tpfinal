import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { db } from "../firebase/config"

export default function Post(props) {
    return (
      <View >
        <Text >Usuario: {props.user}</Text>
        <Text>Email: {props.email}</Text>
        <Text>Mensaje: {props.mensaje}</Text>
      </View>
    )
  }