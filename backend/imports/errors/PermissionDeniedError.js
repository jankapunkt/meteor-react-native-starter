import { Meteor } from 'meteor/meteor'

const NAME = 'errors.permissionDenied'

export class PermissionDeniedError extends Meteor.Error {
  static get NAME () {
    return NAME
  }

  constructor (reason, details) {
    super(NAME, reason, details)
  }
}
