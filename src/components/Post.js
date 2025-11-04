import { Text, View, Pressable, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'

export class Post extends Component {
  constructor(props){
    super(props)
    this.state = {
      like: false
    }
  }

  like(id){
    db.collection("posts")
    .doc(id)
    .update({
      likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then( () => {this.setState({like: true})})
      
  }
  
  quitar(id){
    db.collection("posts")
    .doc(id)
    .update({
      likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    }) 
    .then( () => {this.setState({like: false})})
    
  }

  componentDidMount(){
    if (this.props.likes.includes(auth.currentUser.email)) {
      this.setState({like: true})
      
    }


  }


  render() {

    return (
      <View style={styles.card} >
         <View style={styles.headerCard}>
         <Text style={styles.user} >Usuario: {this.props.user}</Text>
         <Text style={styles.email}> Email: {this.props.email}</Text>
         </View>
        
        <Text style={styles.message}> Mensaje: {this.props.mensaje}</Text>

        <View style={styles.footerCard}>
        {this.state.like ? (
          <Pressable style={styles.buttonLike} onPress={() => this.quitar(this.props.id)}>
            <Text style={styles.buttonText}> Quitar like</Text>
          </Pressable>
        ) : (
          <Pressable  style={styles.buttonLike} onPress={() => this.like(this.props.id)}>
            <Text style={styles.buttonText}> Dar like</Text>
          </Pressable>
        )}
      
      <Text style={styles.likesCount}> {this.props.likes.length} </Text>
      </View>
      </View>
    )
  } }

  const styles = StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginVertical: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    headerCard: {
      marginBottom: 8,
    },
    user: {
      fontSize: 16,
      fontWeight: '700',
      color: '#1e293b',
    },
    email: {
      fontSize: 13,
      color: '#64748b',
    },
    message: {
      fontSize: 15,
      color: '#334155',
      marginVertical: 8,
    },
    footerCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    
    buttonLike: {
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: '#EF5B9C',
    },
   
    buttonText: {
      color: '#fff',
      fontWeight: '600',
    },

    likesCount: {
      fontSize: 13,
      color: '#475569',
    },
  });
  export default Post