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
            email: auth.currentUser.email,
            user: auth.currentUser.user,
            mensaje: this.state.mensaje,
            createdAt: Date.now(),
            likes: []
        })
        this.props.navigation.navigate("Home");

    }



    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>NuevoPost</Text>

                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='mensaje'
                    onChangeText={text => this.setState({ mensaje: text })}
                    value={this.state.mensaje} />

                <Pressable style={styles.button} onPress={() => this.postear(this.state.email, this.state.user, this.state.mensaje)}>
                    <Text style={styles.buttonText}> Postear </Text>
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


export default NuevoPost