import { useReducer, useEffect, useMemo } from 'react'
import Meteor from '@meteorrn/core'

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false
      }
    case 'SIGN_IN':
      return {
        ...state,
        isSignOut: false,
        userToken: action.token
      }
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null
      }
  }
}

const Data = Meteor.getData()

/**
 * Provides a state and authentication context for components to decide, whether
 * the user is authenticated and also to run several authentication actions.
 *
 * @returns {{
 *   state:object,
 *   authContext: object
 * }}
 */
export const useAuth = () => {
  const [state, dispatch] = useReducer(reducer, initialState, undefined)

  // Case 1: restore token already exists
  // MeteorRN loads the token on connection automatically,
  // in case it exists, but we need to "know" that for our auth workflow
  useEffect(() => {
    const handleOnLogin = () => dispatch({ type: 'RESTORE_TOKEN', token: Meteor.getAuthToken() })
    Data.on('onLogin', handleOnLogin)
    return () => Data.off('onLogin', handleOnLogin)
  }, [])

  /**
   * Bridge between the backend endpoints and client.
   * Get them via `const { signIn } = useContext(AuthContext)`
   *
   * @type {{
   *   signIn: function({email: *, password: *, onError: *}): void,
   *   signOut: function({onError: *}): void,
   *   signUp: function({email: *, password: *, onError: *}): void,
   *   deleteAccount: function({ onError: * });void
   * }}
   */
  const authContext = useMemo(() => ({
    signIn: ({ email, password, onError }) => {
      Meteor.loginWithPassword(email, password, async (err) => {
        if (err) {
          if (err.message === 'Match failed [400]') {
            err.message = 'Login failed, please check your credentials and retry.'
          }
          return onError(err)
        }
        const token = Meteor.getAuthToken()
        const type = 'SIGN_IN'
        dispatch({ type, token })
      })
    },
    signOut: ({ onError }) => {
      Meteor.logout(err => {
        if (err) {
          return onError(err)
        }
        dispatch({ type: 'SIGN_OUT' })
      })
    },
    signUp: ({ email, password, firstName, lastName, onError }) => {
      const signupArgs = { email, password, firstName, lastName, loginImmediately: true }

      Meteor.call('registerNewUser', signupArgs, (err, credentials) => {
        if (err) {
          return onError(err)
        }

        // this sets the { id, token } values internally to make sure
        // our calls to Meteor endpoints will be authenticated
        Meteor._handleLoginCallback(err, credentials)

        // from here this is the same routine as in signIn
        const token = Meteor.getAuthToken()
        const type = 'SIGN_IN'
        dispatch({ type, token })
      })
    },
    deleteAccount: ({ onError }) => {
      Meteor.call('deleteAccount', (err) => {
        if (err) {
          return onError(err)
        }

        // removes all auth-based data from client
        // as if we would call signOut
        Meteor.handleLogout()
        dispatch({ type: 'SIGN_OUT' })
      })
    }
  }), [])

  return { state, authContext }
}
