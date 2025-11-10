import { Text, View, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { Pressable } from 'react-native'
import Post from '../../components/Post'
import { auth, db } from "../../firebase/config"

export class Profile extends Component {
    constructor(props){
        super(props)

        this.state ={
          usuario: null,
          posteos: [],
        }
          
        
    }

    componentDidMount() {
      db.collection('users')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(docs => {
        let usuario = null;
        docs.forEach(doc => {
          usuario = {
            id: doc.id,
            data: doc.data(),
          };
        });
        this.setState({ usuario, loading: false });
      });


      db.collection('posts')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(docs => {
        let posteos = [];
        docs.forEach(doc => {
          posteos.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({ posteos });
      });
  
    }
  render() {
    return (

      <React.Fragment>
      <View style={styles.card}>
      <Text style={styles.title}> Mi perfil </Text>

      {this.state.usuario ? (
          <>
            <Text style={styles.text}>Usuario: </Text> <Text style={styles.contenido} > {this.state.usuario.data.user} </Text>
            <Text style={styles.text}>Email: </Text>   <Text style={styles.contenido}> {this.state.usuario.data.email}</Text>
          </>
        ) : (
          <Text>Cargando perfil...</Text>
        )}

      <Text style={styles.title}> Ultimos posteos </Text>
      <FlatList
        data={this.state.posteos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Post
            email={item.data.email}
            user={item.data.user}
            mensaje={item.data.mensaje}
            id={item.id}
            likes = {item.data.likes}
          />
        )}
      />
    </View>

        <Pressable style = {styles.button}onPress={()=> this.props.navigation.navigate("Login")}> 
        <Text style = {styles.buttonText}> Cerrar sesión </Text>

        </Pressable>

    </React.Fragment>

      
    )
  }
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fefefe',
    padding: 20,
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    paddingBottom: 6,
  },

  text: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
    marginTop: 8,
  },

  contenido: {
    fontSize: 16,
    color: '#111',
    marginLeft: 4,
    marginBottom: 8,
  },

  button: {
    backgroundColor: '#468FEA',
    paddingVertical: 12,
    marginHorizontal: 50,
    borderRadius: 30,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor:'#468FEA',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default Profile