import { Text, View } from 'react-native'
import React, { Component } from 'react'

export class NuevoPost extends Component {
    constructor(props){
        super(props)
        this.setState = {
            texto: ""
        }

    }

    onSubmit(){
        db.collection("posts").add({
            owner: auth.currentUser.email, 
            texto: auth.currentUser.text, 
            createdAt: Date.now(), 
        })
        .then()
        .catch((error) => console.log(error) )
    }
  render() {

    return (

      <View>
        <TextInput 
        keyboardType= "default"
        placeholder= "texto"
        onChangeText={text => this.setState({texto:text})}
        value={this.state.text}
         />
        <Pressable onPress= {() => this.onSubmit() }> </Pressable>
        
      </View>
    )
  }
}

export default NuevoPost;