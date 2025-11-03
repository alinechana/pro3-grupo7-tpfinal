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
        <Text style={styles.title}>Lista de posteos</Text>
        <FlatList
          data={this.state.posts}
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginVertical: 10,
    textAlign: 'center',
  },
});

