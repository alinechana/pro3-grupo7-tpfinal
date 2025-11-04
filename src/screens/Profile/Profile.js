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
      <View style={styles.container}>
      <Text style={styles.title}> Mi perfil </Text>

      {this.state.usuario ? (
          <>
            <Text style={styles.text}>Usuario: {this.state.usuario.data.user}</Text>
            <Text style={styles.text}>Email: {this.state.usuario.data.email}</Text>
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

        <Pressable onPress={()=> this.props.navigation.navigate("Login")}> 
        <Text> Desloguearse</Text>

        </Pressable>

    </React.Fragment>

      
    )
  }
}
const styles = StyleSheet.create({
  container: {
    color: "black"
  },

  title:{
    color: "black"
  },

  text:{
    color: "black"
  }
});

export default Profile