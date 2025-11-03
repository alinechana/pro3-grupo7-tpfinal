import { Text, View, Pressable, TextInput, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native';
import { auth } from '../../firebase/config';
import { db, auth } from '../../firebase/config';

export class Login extends Component {
    constructor(props){
        super(props)
        this.setState ={
            email: "",
            password: "",
            loggedIn: false
        }
    }

    componentDidMount(props){
      auth.onAuthStateChanged( user => {
        if (user && loggedIn === "true") {
          this.props.navigation.navigate("Home")
        } else {
          console.log("No hay usuario logueado");
          
        }

      })
      
    }

     login(email, password){
        console.log(`Email: ${this.state.email}, 
            Password: ${this.state.password} `);
        
            if (email.includes("@") && password.length >= 6) {
        
              auth.signInWithEmailAndPassword(email, password)
              .then((response) => {
                this.setState({loggedIn: true});
                this.props.navigation.navigate("HomeMenu")
              })
              .catch(error => {
              this.setState({error: 'Credenciales inválidas.'})
            })
              
            } else{
              console.log("El email o contraseña son incorrectos");
              
            }
        
          

    }

    render() {
        return (
      
          <View style={styles.container}>
            <Text>Login</Text>
    
            <TextInput style={styles.field}
              keyboardType='email-address'
              placeholder='email'
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email} />
    
            <TextInput style={styles.field}
              keyboardType='default'
              placeholder='password'
              secureTextEntry={true}
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password} />
    
            <Pressable style={styles.button} onPress={() => this.login(this.state.email, this.state.password)}>
              <Text> Login </Text>
            </Pressable> 
    
            <Pressable onPress ={() => this.props.navigation.navigate("Register")}>
                <Text> Ir al Register </Text>
            </Pressable>
            <Pressable onPress ={() => this.props.navigation.navigate("HomeMenu", {screen:"Login"} )}>
                <Text>  Entrar en la app </Text>
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
    
    export default Login