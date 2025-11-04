import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { db } from "../../firebase/config";
import Post from "../../components/Post";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    db.collection('posts').onSnapshot(docs => {
      let posts = [];
      docs.forEach(doc => {
        posts.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      this.setState({
        posts,
        loading: false,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Todos los posteos</Text>
        <FlatList
          data={this.state.posts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Post
              email={item.data.email}
              user={item.data.user}
              mensaje={item.data.mensaje}
              id = {item.id}
              likes = {item.data.likes}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f5',
    padding: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginVertical: 12,
    textAlign: 'center',
  },
});

