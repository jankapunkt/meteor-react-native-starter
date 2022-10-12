import { useEffect, useState } from 'react'
import Meteor from '@meteorrn/core'
import * as SecureStore from 'expo-secure-store'
import config from '../../config.json'

Meteor.connect(config.backend.url, {
  // store login token in SecureStore!
  AsyncStorage: {
    getItem: SecureStore.getItemAsync,
    setItem: SecureStore.setItemAsync,
    removeItem: SecureStore.deleteItemAsync
  }
})

Meteor.isVerbose = true

export const useConnectMeteor = () => {
  const [connected, setConnected] = useState(null)
  const [connectionError, setConnectionError] = useState(null)

  // TODO try useMemo and useTracker and see if this is functional

  useEffect(() => {
    const onError = (e) => setConnectionError(e)
    const onConnected = () =>  {
      if (connected !== true) {
        setConnected(true)
      }
    }
    const onDisconnected = () => {
      Meteor.ddp.autoConnect = true
      if (connected !== false) {
        setConnected(false)
      }
      Meteor.reconnect()
    }
    Meteor.ddp.on('error', onError)
    Meteor.ddp.on('connected', onConnected)
    Meteor.ddp.on('disconnected',onDisconnected)

    return () => {
      Meteor.ddp.off('error', onError)
      Meteor.ddp.off('connected', onConnected)
      Meteor.ddp.off('disconnected',onDisconnected)
    }
  }, [])

  return { connected, connectionError }
}