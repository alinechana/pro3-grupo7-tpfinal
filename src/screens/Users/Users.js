
import { Text, View, FlatList } from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'

export class Users extends Component {

    constructor(props){
        super(props)
        this.state = {
            users: [],
        }
           
        }

    componentDidMount(){
      db.collection('users').onSnapshot(
        usuarios =>{
                let users = [];
           usuarios.forEach( usuario => {
                users.push({
                    id: usuario.id,
                    data: usuario.data()
        })
               this.setState({
                users: users,
                loading: false
           })
        })
      }
    )

    }


        

  render() {
    return (
      <View>
        
        <FlatList
        data = {this.state.users}
        keyExtractor = {item => item.id.toString()} 
        renderItem = {({item}) => 
          <Text> {item.data.email} </Text>
      
       } />
      
      </View>
    )
  }
}


export default Users