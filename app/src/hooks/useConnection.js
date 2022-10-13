import { useEffect, useState } from 'react'
import Meteor from '@meteorrn/core'
import * as SecureStore from 'expo-secure-store'
import config from '../../config.json'

// get detailed info about internals
Meteor.isVerbose = true

// connect with Meteor and use a secure store
// to persist our received login token, so it's encrypted
// and only readable for this very app
// read more at: https://docs.expo.dev/versions/latest/sdk/securestore/
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

  // we use separate functions as the handlers, so they get removed
  // on unmount, which happens on auto-reload and would cause errors
  // if not handled
  useEffect(() => {
    const onError = (e) => setConnectionError(e)
    Meteor.ddp.on('error', onError)

    const onConnected = () => connected !== true && setConnected(true)
    Meteor.ddp.on('connected', onConnected)

    // if the connection is lost, we not only switch the state
    // but also force to reconnect to the server
    const onDisconnected = () => {
      Meteor.ddp.autoConnect = true
      if (connected !== false) {
        setConnected(false)
      }
      Meteor.reconnect()
    }
    Meteor.ddp.on('disconnected', onDisconnected)

    // remove all of these listeners on unmount
    return () => {
      Meteor.ddp.off('error', onError)
      Meteor.ddp.off('connected', onConnected)
      Meteor.ddp.off('disconnected', onDisconnected)
    }
  }, [])

  return { connected, connectionError }
}
