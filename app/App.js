import React from 'react'
import { MainNavigator } from './src/screens/MainNavigator'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { useConnection } from './src/hooks/useConnection'
import { ErrorMessage } from './src/components/ErrorMessage'

export default function App () {
  const { connected, connectionError } = useConnection()

  // use splashscreen here, if you like
  if (!connected) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text>Connecting to our servers...</Text>
      </View>
    )
  }

  // use alert or other things here, if you like
  if (connectionError) {
    return (<ErrorMessage error={connectionError} />)
  }

  return (<MainNavigator />)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
