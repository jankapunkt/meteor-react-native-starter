import React, { createContext } from 'react'
import { CardStyleInterpolators } from '@react-navigation/stack'
import { AuthContext } from '../contexts/AuthContext'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useLoginMeteor } from '../hooks/useLoginMeteor'
import { HomeScreen } from './HomeScreen'
import { LoginScreen } from './LoginScreen'
import { RegistrationScreen } from './RegistrationScreen'

// allows screens to back-ref to our
// auth methods via useContext hook
const Stack = createNativeStackNavigator()

export const ScreenNavigator = () => {
  const { state, authContext } = useLoginMeteor()
  const { userToken } = state

  const renderScreens = () => {
    if (userToken) {
      return (<Stack.Screen name="Home" component={HomeScreen} />)
    }

    // not authenticated users
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