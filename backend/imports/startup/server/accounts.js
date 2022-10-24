import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import { registerNewUser, deleteAccount, updateUserProfile } from '../../accounts/methods'

// documentation on Accounts.config:
// https://docs.meteor.com/api/accounts-multi.html#AccountsCommon-config

/**
 * Here we define the fields that are automatically available to clients
 * via Meteor.user().
 * This extends the defaults (_id, username, emails) by our profile fields.
 * If you want your custom fields to be immediately available then place them here.
 * @private
 */
const defaultFieldSelector = {
  _id: 1,
  username: 1,
  emails: 1,
  firstName: 1,
  lastName: 1
}

// merge our config from settings.json with fixed code
// and pass them to Accounts.config
Accounts.config({ ...Meteor.settings.accounts.config, defaultFieldSelector })

// Create accounts methods using builtin default Meteor.methods
// however, you may also use mdg:validated-method for creating
// methods, which enables better handling of validation and security
// by (re-) using mixins:
// https://guide.meteor.com/security.html#validated-method
Meteor.methods({
  registerNewUser,
  deleteAccount,
  updateUserProfile
})
