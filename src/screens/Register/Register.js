import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from "../../firebase/config"

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
             
              db.collection("users").add({
                email: this.state.email,
                user: this.state.user,
                createdAt: Date.now(),
              })
            
              this.props.navigation.navigate("Login");
            })
            .catch(error => {
              this.setState({ error: "No se pudo registrar el usuario" });
              console.log(error);
            });
        } else {
          console.log("Cambiar email o contraseña");
        }
      }



  render() {
    return (
      <View style={styles.container}>
         <Text style={styles.title}>Crear cuenta </Text>
        <Text style={styles.subtitle}>Registrate para continuar</Text>


        <TextInput style={styles.input}
          keyboardType='email-address'
          placeholder='Email'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email} />

        <TextInput style={styles.input}
          keyboardType='default'
          placeholder='User name'
          onChangeText={text => this.setState({ user: text })}
          value={this.state.user} />

        <TextInput style={styles.input}
          keyboardType='default'
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password} />

        <Pressable style={styles.button} onPress={() => this.register(this.state.email, this.state.user, this.state.password)}>
          <Text  style={styles.buttonText}> Register </Text>
        </Pressable> 

        <Pressable onPress ={() => this.props.navigation.navigate("Login")}>
            <Text style={styles.link}> Ya tengo cuenta </Text>
        </Pressable>
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#468FEA',
    borderRadius: 10,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
    shadowColor: '#22c55e',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  link: {
    color: '#2563eb',
    fontSize: 15,
    marginTop: 8,
  },

 
});

export default Register