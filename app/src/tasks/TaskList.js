import Meteor from '@meteorrn/core'
import React, { useState } from 'react'
import { Text, View, SafeAreaView, FlatList, Button, ActivityIndicator } from 'react-native'
import { TasksCollection } from './TasksCollection'
import { Task } from './Task'
import { TaskForm } from './TaskForm'
import { useAccount } from '../hooks/useAccount'
import { defaultColors, defaultStyles } from '../styles/defaultStyles'

const { useTracker } = Meteor
const toggleChecked = ({ _id, checked }) => Meteor.call('tasks.setIsChecked', { _id, checked })
const deleteTask = ({ _id }) => Meteor.call('tasks.remove', { _id })

export const TaskList = () => {
  const { user } = useAccount()
  const [hideCompleted, setHideCompleted] = useState(false)

  // prevent errors when authentication is complete but user is not yet set
  if (!user) { return null }

  const hideCompletedFilter = { checked: { $ne: true } }
  const userFilter = { userId: user._id }
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter }

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const tasksData = { tasks: [], pendingTasksCount: 0 }

    if (!user) {
      return tasksData
    }

    const handler = Meteor.subscribe('tasks.my')

    if (!handler.ready()) {
      return { ...tasksData, isLoading: true }
    }

    const filter = hideCompleted
      ? pendingOnlyFilter
      : userFilter
    const tasks = TasksCollection.find(filter, { sort: { createdAt: -1 } }).fetch()
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count()

    return { tasks, pendingTasksCount }
  }, [hideCompleted])

  if (isLoading) {
    return (
      <View style={defaultStyles.container}>
        <ActivityIndicator />
        <Text>Loading tasks...</Text>
      </View>
    )
  }

  const pendingTasksTitle = `${pendingTasksCount ? ` (${pendingTasksCount})` : ''}`

  return (
    <SafeAreaView style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <View style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'scroll' }}>
        <View style={defaultStyles.row}>
          <Text>My Tasks {pendingTasksTitle}</Text>
          <TaskForm />
        </View>
        <Button
          title={hideCompleted ? 'Show All' : 'Hide Completed Tasks'}
          color={defaultColors.placeholder}
          onPress={() => setHideCompleted(!hideCompleted)}
        />
        <FlatList
          data={tasks}
          renderItem={({ item: task }) => (
            <Task
              task={task}
              onCheckboxClick={toggleChecked}
              onDeleteClick={deleteTask}
            />
          )}
          keyExtractor={task => task._id}
        />

      </View>
    </SafeAreaView>
  )
}
