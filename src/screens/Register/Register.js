import { Text, View, TextInput } from 'react-native'
import React, { Component } from 'react'
import { Pressable } from 'react-native'
import { StyleSheet } from 'react-native'
import { db, auth } from '../../firebase/config';

export class Register extends Component {
    constructor(props){
        super(props)
        this.setState = {
            email: "",
            userName: "",
            password: "", 
            registered: false
        }
    }

     onSubmit(email, password){
        console.log(`Email: ${this.state.email} User: ${this.state.userName}`);
        auth.createUserWithEmailAndPassword(email, password)
         .then(response => {
            this.setState({registered: true});
            
        })
        .catch(error => {
            this.setState({error: "Usuario invalido"})

        })
        
    }

  render() {
    return (
    <View style={styles.container}>
        <Pressable onPress={() => this.props.navigation.navigate("Login")}>
            <Text> Ir a pantalla Login</Text>
        </Pressable> 
             
    
        <TextInput style={styles.field}
        keyboardType='email-address'
        placeholder='email'
        onChangeText={text => this.setState({email:text})}
        value={this.state.email}> 
        </TextInput>

        <TextInput style={styles.field}
        keyboardType='default' 
        placeholder='userName' 
        onChangeText={text => this.setState({userName:text})}
        value={this.state.userName}> </TextInput>

        <TextInput style={styles.field}
        keyboardType='default' 
        placeholder='password'
        secureTextEntry={true}
        onChangeText={text => this.setState({password:text})}
        value={this.state.password}> </TextInput>

        <Pressable style={styles.boton}
        onPress={() => this.onSubmit()}> 
            <Text style={styles.text}> Registrarse</Text>
        </Pressable>

    </View>
        

        
     
    )
  }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:10, 
        marginTop: 20
    }, 

    field: {
        height: 20, 
        paddingVertical: 15, 
        paddingHorizontal:10, 
        borderWidth: 1, 
        borderColor:"#ccc", 
        borderRadius: 6, 
        marginVertical: 10
    }, 

    boton:{
        backgroundColor: "#28a745", 
        paddingHorizontal: 10, 
        paddingVertical: 6, 
        textAlign: center, 
        borderRadius: 4, 
        borderWidth: 1, 
        borderStyle: solid, 
        borderColor: "#28a745"


    }, 

    text: {
        color:"#fff"

    }

})

export default Register