import React, { useContext, useState } from 'react'
import { View, Text, Button } from 'react-native'
import { AuthContext } from '../contexts/AuthContext'

export const HomeScreen = () => {
  const [error, setError] = useState(null)
  const { signOut } = useContext(AuthContext)
  const onError = err => setError(err)
  const handleSignOut = () => signOut({ onError })

  const renderError = () => {
    if (!error) { return null }
    return (
      <View style={{alignItems: 'center'}}>
        <Text>{error.message}</Text>
      </View>
    )
  }

  return (
    <View>
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  )
}