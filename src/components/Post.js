import { Text, View, Pressable } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

export class Post extends Component {
  constructor(props){
    super(props)
    this.state = {
      like: false
    }
  }

  like(id){
    db.collection("posts")
    .doc(id)
    .update({
      likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then( () => {this.setState({like: true})})
      
  }
  
  quitar(id){
    db.collection("posts")
    .doc(id)
    .update({
      likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    }) 
    .then( () => {this.setState({like: false})})
    
  }

  componentDidMount(){
    if (this.props.likes.includes(auth.currentUser.email)) {
      this.setState({like: true})
      
    }


  }


  render() {

    return (
      <View >
        <Text >Usuario: {props.user}</Text>
        <Text>Email: {props.email}</Text>
        <Text>Mensaje: {props.mensaje}</Text>

        {this.state.like} ? <Pressable onPress= {() => this.like(props.id) }> <Text> Dar like  </Text></Pressable> : <Pressable onPress= {() => this.quitar(props.id)}> <Text> Quitar like  </Text></Pressable>
      
      <Text> {this.props.likes.length} </Text>
      </View>
    )
  } }