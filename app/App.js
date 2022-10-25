import React from 'react'
import { MainNavigator } from './src/screens/MainNavigator'
import { View, Text, ActivityIndicator } from 'react-native'
import { useConnection } from './src/hooks/useConnection'
import { ErrorMessage } from './src/components/ErrorMessage'
import { defaultStyles } from './src/styles/defaultStyles'

export default function App () {
  const { connected, connectionError } = useConnection()

  // use splashscreen here, if you like
  if (!connected) {
    return (
      <View style={defaultStyles.container}>
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
