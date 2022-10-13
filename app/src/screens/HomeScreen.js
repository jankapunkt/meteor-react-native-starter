import React, { useContext, useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { AuthContext } from '../contexts/AuthContext'
import { MyTasks } from '../components/MyTasks'

export const HomeScreen = () => {
  const [error, setError] = useState(null)
  const { signOut } = useContext(AuthContext)
  const onError = err => setError(err)
  const handleSignOut = () => signOut({ onError })

  const renderError = () => {
    if (!error) { return null }
    return (
      <View style={{ alignItems: 'center' }}>
        <Text>{error.message}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MyTasks />
      {renderError()}
      <Button title='Sign out' onPress={handleSignOut} />
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
})
