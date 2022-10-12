import React, { useReducer, useEffect, useMemo } from 'react';
import Meteor from '@meteorrn/core'

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null
}

/**
 * Manages our authentication state, that can consist of
 *
 * {{
 *   userToken: string|null,
 *   isLoading: boolean,
 *   isSignOut: boolean|undefined
 * }}
 */
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

export const useLoginMeteor = () => {
  const [state, dispatch] = useReducer(reducer, initialState, undefined)

  // Case 1: restore token already exists
  // MeteorRN loads the token on connection automatically,
  // in case it exists, but we need to "know" that for our auth workflow
  useEffect(() => {
    const handleOnLogin = () => dispatch({ type: 'RESTORE_TOKEN', token: Meteor.getAuthToken() })
    Data.on('onLogin', handleOnLogin)
    return () => Data.off('onLogin', handleOnLogin)
  }, [])

  // the auth can be referenced via useContext in the several
  // screens later on
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
    signOut: () => {
      Meteor.logout(err => {
        if (err) {
          // TODO display error, merge into the above workflow
          return console.error(err)
        }
        dispatch({ type: 'SIGN_OUT' })
      })
    },
    signUp: ({ email, password, onError }) => {
      Meteor.call('register', { email, password }, (err, res) => {
        console.debug('on register', err, res)
        if (err) {
          return onError(err)
        }
        // TODO make dry
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
      })
    }
  }), [])

  return { state, authContext }
}