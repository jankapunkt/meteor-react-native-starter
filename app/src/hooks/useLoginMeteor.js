import Meteor from '@meteorrn/core'
import { useEffect, useState } from 'react'
import { Credentials } from '../storage/Credentials'

export const useLoginMeteor = () => {
  const [registered, setRegistered] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)
  const [loginError, setLoginError] = useState(null)

  useEffect(() => {
    const onConnected = async () => {
      const user = Meteor.user()
      if (user) {
        setRegistered(true)
        setLoggedIn(true)
        setLoggingIn(false)
        return
      }

      const { email, password, exist } = Credentials.get()
      if (!exist) {
        setRegistered(false)
        setLoggedIn(false)
        setLoggingIn(false)
        return
      }

      setLoggingIn(true)
      Meteor.loginWithPassword(email, password, err => {
        setLoginError(err ?? null)
        setRegistered(true)
        setLoggedIn(!err)
        setLoggingIn(false)
      })
    }
    Meteor.ddp.on('connected', onConnected)
    return () => Meteor.ddp.off('connected', onConnected)
  }, [])

  return {
    registered,
    loggedIn,
    loggingIn,
    loginError
  }
}
