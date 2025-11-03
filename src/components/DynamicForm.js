import { Text, View, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export class  DynamicForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
          comment: ""
        }
      }
    
      onSubmit() {
        console.log(`Comentario: ${this.state.comment}`);
      }
      
  render() {
    return (
        <View style={styles.container}>
        <Text> DynamicForm</Text>

        <TextInput style={styles.field}
          keyboardType='email-address'
          placeholder='comment'
          onChangeText={text => this.setState({ comment: text })}
          value={this.state.email} />

        <Pressable style={styles.button} onPress={() => this.onSubmit()}>
          <Text> Register </Text>
        </Pressable> 


      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      marginTop: 20
    },
  
    field:{
      height: 20,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor:"#ccc",
      borderStyle: "solid",
      borderRadius: 6,
      marginVertical: 10
    },
  
    button:{
      backgroundColor: "#28a745",
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: "center",
      borderRadius: 4, 
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#28a745"
  
    }
  
   
  });
export default  DynamicForm