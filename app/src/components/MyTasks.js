import React, { useState } from 'react'
import Meteor, { Mongo } from '@meteorrn/core'
import { Button, Text, TextInput, View, StyleSheet } from 'react-native'
import { inputStyles } from '../styles/inputStyles'

const Tasks = new Mongo.Collection('tasks')

export const MyTasks = (props) => {
  const [newTask, setNewTask] = useState('')
  const { tasks, isLoading } = Meteor.useTracker(() => {
    const sub = Meteor.subscribe('myTasks')

    if (props.signedOut) {
      sub.stop()
      return { tasks: []}
    }

    if (!sub.ready()) {
      return { tasks: [], isLoading: true }
    }

    const tasks = Tasks.find({}, { sort: { createdAt: -1 } }).fetch();
    return { tasks, isLoading: false }
  });

  // add loading message
  if (isLoading) {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text>Loading tasks...</Text>
      </View>
    )
  }
  // add task
  const addTask = () => {
    Meteor.call('saveTask', { title: newTask, checked: false }, (err, res) => {
      if (err) {
        return console.error(err)
      }
      setNewTask('')
    })
  }
  const checkTask = ({ _id }) => {
    Meteor.call('saveTask', { _id, checked: true }, (err, res) => {
      if (err) {
        return console.error(err)
      }
    })
  }

  // add task
  const renderTaskForm = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ ...inputStyles.text, flex: 1, flewGrow: 1 }}
          placeholderTextColor="#8a8a8a"
          value={newTask}
          onChangeText={setNewTask}
          placeholder="What do you need to remember?"/>
        <Button disabled={newTask.length === 0} title="add" onPress={addTask}/>
      </View>
    )
  }

  // no tasks yet
  if (tasks.length === 0) {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text>No tasks yet</Text>
        {renderTaskForm()}
      </View>
    )
  }

  const renderTasks = () => tasks.map((doc) => {
    return (
      <View key={doc._id} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={doc.checked ? styles.checked : styles.unchecked}>{doc.title}</Text>
        <Button disabled={doc.checked} title="check" onPress={() => checkTask(doc)}/>
      </View>
    )
  })

  return (
    <View style={{ alignItems: 'center', padding: 25 }}>
      {renderTasks()}
      {renderTaskForm()}
    </View>
  )
}

const styles = StyleSheet.create({
  checked: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    flex: 1,
    flexGrow: 1
  },
  unchecked: {
    fontWeight: 'bold',
    flex: 1,
    flexGrow: 1
  }
})