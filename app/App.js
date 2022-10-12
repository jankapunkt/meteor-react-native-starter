import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function App () {
  return (
    <View style={styles.container}>
      <Text>Welcome to the workshop!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
