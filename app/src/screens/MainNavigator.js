import React from 'react'
import { CardStyleInterpolators } from '@react-navigation/stack'
import { AuthContext } from '../contexts/AuthContext'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useLogin } from '../hooks/useLogin'
import { HomeScreen } from './HomeScreen'
import { LoginScreen } from './LoginScreen'
import { RegistrationScreen } from './RegistrationScreen'

/**
 * Provides a "push/pop" animation when switching between screens.
 */
const Stack = createNativeStackNavigator()

/**
 * Handles routing between authenticated and public routes automagically.
 * @componen
 * @return {JSX.Element}
 */
export const MainNavigator = () => {
  const { state, authContext } = useLogin()
  const { userToken } = state

  const renderScreens = () => {
    if (userToken) {
      // only authenticated users can visit the home screen
      return (<Stack.Screen name='Home' component={HomeScreen} />)
    }

    // non authenticated users need to sign in or register
    // and can only switch between the two screens below:
    return (
      <>
        <Stack.Screen
          name='SignIn'
          component={LoginScreen}
          options={{ title: 'Sign in to awesome-app' }}
        />
        <Stack.Screen
          name='SignUp'
          component={RegistrationScreen}
          options={{ title: 'Register to awesome-app' }}
        />
      </>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}>
          {renderScreens()}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
