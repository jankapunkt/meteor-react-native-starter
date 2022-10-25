import Meteor from '@meteorrn/core'
import React, { useState } from 'react'
import { View, Button, TextInput } from 'react-native'
import { defaultColors, defaultStyles } from '../styles/defaultStyles'
import { ErrorMessage } from '../components/ErrorMessage'

export const TaskForm = () => {
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const handleSubmit = e => {
    e.preventDefault()
    if (!text) return
    Meteor.call('tasks.insert', { text }, (err) => {
      if (err) {
        return setError(err)
      }
      setError(null)
    })
    setText('')
  }

  return (
    <View>
      <View style={defaultStyles.row}>
        <TextInput
          placeholder='Type to add new tasks'
          value={text}
          place
          onChangeText={setText}
          placeholderTextColor={defaultColors.placeholder}
          style={defaultStyles.text}
        />
        <Button title='Add Task' onPress={handleSubmit} />
      </View>
      <ErrorMessage error={error} />
    </View>
  )
}
