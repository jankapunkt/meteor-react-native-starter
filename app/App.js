import React from 'react';
import { ScreenNavigator } from './src/screens/ScreenNavigator'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { useConnectMeteor } from './src/hooks/useConnectMeteor'

export default function App () {
  const { connected, connectionError } = useConnectMeteor()

  // use splashscreen here, if you like
  if (!connected) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text>Connecting to our server...</Text>
      </View>
    )
  }

  // use alert or other things here, if you like
  if (connectionError) {
    return (
      <View style={styles.container}>
        <Text>Error, while connecting to our servers!</Text>
        <Text>{connectionError.message}</Text>
      </View>
    )
  }

  return (<ScreenNavigator/>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
