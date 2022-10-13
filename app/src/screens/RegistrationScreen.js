import React, { useContext, useState } from 'react'
import { Text, TextInput, Button, View } from 'react-native'
import { inputStyles } from '../styles/inputStyles'
import { AuthContext } from '../contexts/AuthContext'

export const RegistrationScreen = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  const { signUp } = useContext(AuthContext)

  const onError = err => setError(err)
  const onSignUp = () => signUp({ email, password, onError })
  const renderError = () => {
    if (!error) {
      return null
    }
    return (
      <View style={{ alignItems: 'center', padding: 15 }}>
        <Text style={{ color: 'red' }}>{error.message}</Text>
      </View>
    )
  }

  return (
    <View>
      <TextInput
        placeholder='Your Email'
        placeholderTextColor='#8a8a8a'
        style={inputStyles.text}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder='Your password'
        placeholderTextColor='#8a8a8a'
        style={inputStyles.text}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {renderError()}
      <Button title='Sign in' onPress={onSignUp} />
    </View>
  )
}
