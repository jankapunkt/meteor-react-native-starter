import { Meteor } from 'meteor/meteor'

Meteor.onConnection(connection => {
  console.debug('connected', connection)
  connection.onClose(() => console.debug('disconnected', connection))
})
