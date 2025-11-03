import { Text, View } from 'react-native'
import React, { Component } from 'react'

export default function Post(props) {
    return (
      <View >
        <Text >Usuario: {props.user}</Text>
        <Text>Email: {props.email}</Text>
        <Text>Mensaje: {props.mensaje}</Text>
      </View>
    )
  }