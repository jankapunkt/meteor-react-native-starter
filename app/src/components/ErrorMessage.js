import React from 'react'
import { Text, View } from 'react-native'
import { defaultStyles } from '../styles/defaultStyles'

export const ErrorMessage = ({ error, message }) => {
  if (!error && !message) { return null }

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.danger}>{message || error.message}</Text>
    </View>
  )
}
