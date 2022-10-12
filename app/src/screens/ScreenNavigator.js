import React, { createContext } from 'react'
import { useLogin } from '../hooks/useLogin'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from './HomeScreen'
import { LoginScreen } from './LoginScreen'
import { CardStyleInterpolators } from '@react-navigation/stack'
import { AuthContext } from '../contexts/AuthContext'
import { RegistrationScreen } from './RegistrationScreen'

// allows screen to back-ref to our auth methods via useContext hook
const Stack = createNativeStackNavigator()

export const ScreenNavigator = () => {
  const { state, authContext } = useLogin()
  const { isSignout, userToken } = state

  const renderScreens = () => {
    if (userToken) {
      return (<Stack.Screen name="Home" component={HomeScreen} />)
    }

    return (
      <>
        <Stack.Screen
          name="SignIn"
          component={LoginScreen}
          options={{ title: 'Sign in to awesome-app' }}
        />
        <Stack.Screen
          name="SignUp"
          component={RegistrationScreen}
          options={{ title: 'Register to awesome-app' }} />
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
  );
}