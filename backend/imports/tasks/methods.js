import { Meteor } from 'meteor/meteor'
import { TasksCollection } from './TasksCollection'

/**
 * Checks if a user exists by id and throws otherwise
 * @private
 * @param userId {string}
 */
const checkUser = userId => {
  if (!userId) {
    throw new Meteor.Error('permissionDenied', 'notSignedIn', { userId })
  }
}

/**
 * Returns a current user's tasks
 * @return {Mongo.Cursor}
 */
export const getMyTasks = function () {
  const userId = this.userId
  checkUser(userId)
  return TasksCollection.find({ userId })
}

/**
 * Creates a new task document
 * @param text {string}
 * @return {string} inserted document _id
 */
export const insertTask = function ({ text }) {
  const userId = this.userId
  checkUser(userId)
  const checked = false
  const createdAt = new Date()
  return TasksCollection.insert({ text, userId, checked, createdAt })
}

/**
 * Sets checked status for a task
 * @param _id {string}
 * @param checked {boolean}
 * @return {number} 1 if successfull, otherwise 0
 */
export const checkTask = function ({ _id, checked }) {
  const userId = this.userId
  checkUser(userId)
  return TasksCollection.update({ _id, userId }, { $set: { checked } })
}

/**
 * Removes a task
 * @param _id {string}
 * @return {number} 1 if successfull, otherwise 0
 */
export const removeTask = function ({ _id }) {
  const userId = this.userId
  checkUser(userId)
  return TasksCollection.remove({ _id, userId })
}
