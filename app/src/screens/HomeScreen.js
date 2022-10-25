import React from 'react'
import { View } from 'react-native'
import { MyTasks } from '../components/MyTasks'
import { defaultStyles } from '../styles/defaultStyles'

export const HomeScreen = () => {
  return (
    <View style={defaultStyles.container}>
      <MyTasks />
    </View>
  )
}
