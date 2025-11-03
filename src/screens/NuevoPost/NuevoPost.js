import {Text, View, Pressable, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from "../../firebase/config"

export class NuevoPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            user: "",
            mensaje: "",

        }
    }

    postear(email, user, mensaje) {
        console.log(`Email: ${this.state.email}, User: ${this.state.user}, 
          Password: ${this.state.mensaje} `);


        db.collection("posts").add({
            email: this.state.email,
            user: this.state.user,
            mensaje: this.state.mensaje,
            createdAt: Date.now(),
            likes: []
        })

    }



    render() {
        return (
            <View>
                <Text>NuevoPost</Text>

                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='mensaje'
                    onChangeText={text => this.setState({ mensaje: text })}
                    value={this.state.mensaje} />

                <Pressable style={styles.button} onPress={() => this.postear(this.state.email, this.state.user, this.state.mensaje)}>
                    <Text> Postear </Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      marginTop: 20
    },
  
    field:{
      height: 20,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor:"#ccc",
      borderStyle: "solid",
      borderRadius: 6,
      marginVertical: 10
    },
  
    button:{
      backgroundColor: "#28a745",
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: "center",
      borderRadius: 4, 
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#28a745"
  
    }
  
   
  });


export default NuevoPost