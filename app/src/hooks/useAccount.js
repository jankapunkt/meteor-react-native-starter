import Meteor from '@meteorrn/core'
import { useMemo, useState } from 'react'

const { useTracker } = Meteor

export const useAccount = () => {
  const [user, setUser] = useState(Meteor.user())

  useTracker(() => {
    const reactiveUser = Meteor.user()
    if (reactiveUser !== user) {
      setUser(reactiveUser)
    }
  })

  const api = useMemo(() => ({
    updateProfile: ({ options, onError, onSuccess }) => {
      Meteor.call('updateUserProfile', options, (err) => {
        return err
          ? onError(err)
          : onSuccess()
      })
    }
  }), [])

  return { user, ...api }
}
