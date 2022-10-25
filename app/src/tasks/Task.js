import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import Checkbox from 'expo-checkbox'
import { defaultColors } from '../styles/defaultStyles'

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
  const handleCheck = (checked) => onCheckboxClick({ _id: task._id, checked })

  return (
    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: 5, justifyContent: 'space-between' }}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox
          value={task.checked}
          onValueChange={handleCheck}
          style={{ padding: 12 }}
          color={task.checked && defaultColors.placeholder}
          readOnly
        />
        <Text style={task.checked ? styles.checked : styles.unchecked}>{task.text}</Text>
      </View>
      <Button title='X' onPress={() => onDeleteClick(task)} style={{ justifySelf: 'flex-end' }} />
    </View>
  )
}

const styles = StyleSheet.create({
  checked: {
    color: defaultColors.placeholder,
    marginLeft: 10
  },
  unchecked: {
    marginLeft: 10
  }
})
