import React, { useState, useContext } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { AuthContext } from '../contexts/AuthContext'
import { defaultStyles } from '../styles/defaultStyles'
import { ErrorMessage } from '../components/ErrorMessage'

/**
 * Provides a login form and links to RegisterScreen
 * @param navigation {object} automatically passed from our Navigator, use to move to RegisterScreen
 * @component
 * @returns {JSX.Element}
 */
export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { signIn } = useContext(AuthContext)

  // handlers
  const onError = err => setError(err)
  const onSignIn = () => signIn({ email, password, onError })

  // render login form
  return (
    <View style={defaultStyles.container}>
      <TextInput
        placeholder='Your Email'
        placeholderTextColor='#8a8a8a'
        style={defaultStyles.text}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder='Password'
        placeholderTextColor='#8a8a8a'
        style={defaultStyles.text}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <ErrorMessage error={error} />
      <Button title='Sign in' onPress={onSignIn} />
      <View style={{ alignItems: 'center', padding: 15 }}>
        <Text>or</Text>
      </View>
      <Button title='Sign up' onPress={() => navigation.navigate('SignUp')} color='#a4a4a4' />
    </View>
  )
}
