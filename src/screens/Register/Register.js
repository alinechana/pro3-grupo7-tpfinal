import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from "../firebase/config"

export class Register extends Component {
    constructor (props){
        super(props)
        this.state ={
          email: "",
          user: "",
          password: "",
          registered: false
        }
    }

    register(email, user, password){
      console.log(`Email: ${this.state.email}, User: ${this.state.user}, 
        Password: ${this.state.password} `);

        if (email.includes("@") && password.length >= 6) {

          auth.createUserWithEmailAndPassword(email, password)
          .then((response) => {
            this.setState({registered: true});
              
        })
        .catch(error => {
            this.setState({error: "Usuario invalido"})

            db.collection("users").add({
              email: this.state.email,
              user: this.state.user,
              createdAt: Date.now(),
            })

            this.props.navigation.navigate("Login")
          })
          .catch(error => {
          this.setState({error: 'Credenciales inválidas.'})
          console.log(error);
          
        }) 
    } else {
      console.log("Cambiar email o contraseña");
      
    }}



  render() {
    return (
      <View style={styles.container}>
        <Text>Register</Text>

        <TextInput style={styles.field}
          keyboardType='email-address'
          placeholder='email'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email} />

        <TextInput style={styles.field}
          keyboardType='default'
          placeholder='user name'
          onChangeText={text => this.setState({ user: text })}
          value={this.state.user} />

        <TextInput style={styles.field}
          keyboardType='default'
          placeholder='password'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password} />

        <Pressable style={styles.button} onPress={() => this.register(this.state.email, this.state.user, this.state.password)}>
          <Text> Register </Text>
        </Pressable> 

        <Pressable onPress ={() => this.props.navigation.navigate("Login")}>
            <Text> Ir a Login </Text>
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

export default Register