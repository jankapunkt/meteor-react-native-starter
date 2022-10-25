import { Meteor } from 'meteor/meteor'
import { checkTask, insertTask, getMyTasks, removeTask } from '../../tasks/methods'

Meteor.methods({
  'tasks.insert': insertTask,
  'tasks.setIsChecked': checkTask,
  'tasks.remove': removeTask
})

Meteor.publish('tasks.my', getMyTasks)
