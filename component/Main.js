import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import firebase from 'firebase'

export default class MainScreen extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
}
  render() {

    
    const { currentUser } = this.state
return (
      <View style={styles.container}>
        <Text style={{fontSize:20, fontWeight:"bold"}} >
          Hi {currentUser && currentUser.email}!
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

