import { Text, View, Pressable, TextInput, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { auth } from "../../firebase/config";


export class Login extends Component {
    constructor(props){
        super(props)
        this.state ={
            email: "",
            password: "",
            loggedIn: false
        }
    }

    componentDidMount(){
      auth.onAuthStateChanged( user => {
        if (user) {
          this.props.navigation.navigate("HomeMenu");
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
              console.log(error);
              
            })
              
            } else{
              console.log("El email o contraseña son incorrectos");
              
            }
        
          

    }

    render() {
        return (
      
          <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
    
            <TextInput style={styles.input}
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
              <Text style={styles.buttonText}> Login </Text>
            </Pressable> 
    
            <Pressable onPress ={() => this.props.navigation.navigate("Register")}>
                <Text style={styles.buttonText}> No tengo cuenta </Text>
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
    
    export default Login