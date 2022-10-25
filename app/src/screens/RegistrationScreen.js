import React, { useContext, useState } from 'react'
import { TextInput, Button, View } from 'react-native'
import { defaultColors, defaultStyles } from '../styles/defaultStyles'
import { AuthContext } from '../contexts/AuthContext'
import { ErrorMessage } from '../components/ErrorMessage'

export const RegistrationScreen = () => {
  const [email, setEmail] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  const { signUp } = useContext(AuthContext)

  const onError = err => setError(err)
  const onSignUp = () => signUp({ email, password, firstName, lastName, onError })

  return (
    <View style={defaultStyles.container}>
      <TextInput
        placeholder='Your Email'
        placeholderTextColor={defaultColors.placeholder}
        style={defaultStyles.text}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder='Your password'
        placeholderTextColor={defaultColors.placeholder}
        style={defaultStyles.text}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder='Your first name (optional)'
        placeholderTextColor={defaultColors.placeholder}
        style={defaultStyles.text}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder='Your last name (optional)'
        placeholderTextColor={defaultColors.placeholder}
        style={defaultStyles.text}
        value={lastName}
        onChangeText={setLastName}
      />
      <ErrorMessage error={error} />
      <Button title='Create new account' onPress={onSignUp} />
    </View>
  )
}
