import { Text, View, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { Pressable } from 'react-native'
import Post from '../../components/Post'

export class Profile extends Component {
    constructor(props){
        super(props)

        this.state({
          datos: [],
          posteos: [],
        })
          
        
    }

    componentDidMount() {
      db.collection('users').onSnapshot(docs => {
        let perfil = [];
        docs.forEach(doc => {
          datos.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          datos: datos,
          loading: false,
        });
      });
    }
  render() {
    return (

      <React.Fragment>
      <View style={styles.container}>
      <Text style={styles.title}> Mi perfil </Text>
      <Text style={styles.text}> ${this.state.datos.user} </Text>
      <Text style={styles.text}> ${this.state.datos.email} </Text>

      <Text style={styles.title}> Ultimos posteos </Text>
      <FlatList
        data={this.state.datos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Post
            email={item.data.email}
            user={item.data.user}
            mensaje={item.data.mensaje}
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