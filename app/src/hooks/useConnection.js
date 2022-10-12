import { useEffect, useState } from 'react'
import Meteor from '@meteorrn/core'
import * as SecureStore from 'expo-secure-store'
import config from '../../config.json'

// get detailed debug about internals
Meteor.isVerbose = true

// connect with Meteor and use a secure store
// to persist our received login token
Meteor.connect(config.backend.url, {
  AsyncStorage: {
    getItem: SecureStore.getItemAsync,
    setItem: SecureStore.setItemAsync,
    removeItem: SecureStore.deleteItemAsync
  }
})

/**
 * Hook that handle auto-reconnect and updates state accordingly.
 * @return {{connected: boolean|null, connectionError: Error|null}}
 */
export const useConnection = () => {
  const [connected, setConnected] = useState(null)
  const [connectionError, setConnectionError] = useState(null)

  useEffect(() => {
    // on any connection error
    const onError = (e) => setConnectionError(e)
    Meteor.ddp.on('error', onError)

    // if a connection has been established
    const onConnected = () =>  {
      if (connected !== true) {
        setConnected(true)
      }
    }
    Meteor.ddp.on('connected', onConnected)

    // if the connection is lost
    const onDisconnected = () => {
      Meteor.ddp.autoConnect = true
      if (connected !== false) {
        setConnected(false)
      }
      Meteor.reconnect()
    }
    Meteor.ddp.on('disconnected',onDisconnected)

    // remove on unmount
    return () => {
      Meteor.ddp.off('error', onError)
      Meteor.ddp.off('connected', onConnected)
      Meteor.ddp.off('disconnected',onDisconnected)
    }
  }, [])

  return { connected, connectionError }
}