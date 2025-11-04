import { Text, View, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export class Comentar extends Component {
    render() {
        return (
            <View>
                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='Comentar'
                    onChangeText={text => this.setState({ mensaje: text })}
                    value={this.state.mensaje} />
            </View>
        )
    }
}

export default Comentar