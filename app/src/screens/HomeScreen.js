import React from 'react'
import { View } from 'react-native'
import { defaultStyles } from '../styles/defaultStyles'
import { TaskList } from '../tasks/TaskList'

export const HomeScreen = () => {
  return (
    <View style={defaultStyles.container}>
      <TaskList />
    </View>
  )
}
