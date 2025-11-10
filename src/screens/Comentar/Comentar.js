import { Text, View, TextInput, StyleSheet, Pressable, FlatList } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from "../../firebase/config"
import Post from '../../components/Post'
import firebase from 'firebase'

export class Comentar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            user: "",
            comments: [],
            comentario: ""
        }
    }
    componentDidMount() {
        console.log(this.props.route.params.postId)

       const id = this.props.route.params.postId;
        db.collection('posts').doc(id).onSnapshot(docs => {
            console.log(docs.data())

            this.setState({
                comments: docs.data() 
              });
        });
    }

    comentar() {
        const idComment = this.props.route.params.postId;
        db.collection("posts")
            .doc(idComment)
            .update({
                comments: firebase.firestore.FieldValue.arrayUnion({
                createdAt: Date.now(),
                owner: auth.currentUser.email,
                comentario: this.state.comentario
                })
            })
            .then(() => { this.setState({ comentario: "" }) })

    }

    render() {
        return (

            <View style={styles.container}>

                <View style={styles.postCard}>
                    <Text style={styles.postEmail}>Email: {this.state.comments.email}</Text>
                    <Text style={styles.postMessage}>Mensaje: {this.state.comments.mensaje}</Text>
                </View>

                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='Comentar'
                    onChangeText={text => this.setState({ comentario: text })}
                    value={this.state.comentario} />

                <Pressable style={styles.button} onPress={() => this.comentar()}>
                    <Text style={styles.buttonText}> Publicar comentario </Text>

                </Pressable>

                <Text style={styles.commentsTitle}> Comentarios de esta publicacion: </Text>

                <FlatList style={styles.commentBox}
                    data={this.state.comments.comments}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (

                        
                       
                        <View style={styles.commentItem}>
                             <Text style={styles.commentUser} > {item.owner} </Text>
                             <Text style={styles.commentContent} > {item.comentario} </Text>
                             
                        </View>
    
                        
                    )}
                />



            </View>

        )
    }
}

const styles = StyleSheet.create({
    
        container: {
          flex: 1,
          backgroundColor: '#fefefe',
          padding: 20,
        },
        postCard: {
            backgroundColor: '#fafafa',
            borderRadius: 14,
            padding: 16,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: '#e6e6e6',
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 2,
          },
        
          postEmail: {
            fontSize: 15,
            color: '#555',
            marginBottom: 6,
          },

          commentItem: {
            backgroundColor: '#f8f8f8',
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderRadius: 12,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: '#e5e5e5',
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 3,
            elevation: 1,
          },
          
          commentUser: {
            fontSize: 14,
            fontWeight: '600',
            color: '#4a90e2',
            marginBottom: 4,
          },
          
          commentContent: {
            fontSize: 15,
            color: '#333',
            lineHeight: 20,
          },
        
          postMessage: {
            fontSize: 17,
            color: '#111',
            fontWeight: '600',
          },
        
        email: {
          fontSize: 16,
          fontWeight: '600',
          color: '#444',
          marginBottom: 6,
        },
      
        title: {
          fontSize: 18,
          fontWeight: '700',
          color: '#222',
          marginBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#e3e3e3',
          paddingBottom: 6,
        },
      
        input: {
          backgroundColor: '#f8f8f8',
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 12,
          paddingHorizontal: 14,
          paddingVertical: 10,
          fontSize: 15,
          marginBottom: 14,
          color: '#333',
        },
      
        button: {
          backgroundColor: '#4a90e2',
          paddingVertical: 12,
          borderRadius: 30,
          alignItems: 'center',
          marginBottom: 20,
          shadowColor: '#4a90e2',
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 6,
          elevation: 5,
        },
      
        buttonText: {
          color: '#fff',
          fontWeight: '700',
          fontSize: 16,
        },
      
        commentsTitle: {
          fontSize: 17,
          fontWeight: '600',
          color: '#333',
          marginTop: 8,
          marginBottom: 10,
        },
      
        commentBox: {
          backgroundColor: '#f9f9f9',
          padding: 10,
          borderRadius: 10,
          marginBottom: 8,
          borderWidth: 1,
          borderColor: '#eee',
        },
      
        commentText: {
          fontSize: 15,
          color: '#333',
        },
      

});

export default Comentar