import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'
import { Accounts } from 'meteor/accounts-base'

Meteor.methods({
  /**
   * Registers a new user.
   * @param {object} options
   * @param {string} options.email  the user's email
   * @param {string} options.password the user's password
   * @return {Promise<string>} the new userId
   */
  register: async function (options) {
    try {
      check(options, Match.ObjectIncluding({
        email: String,
        password: String
      }))
    } catch (e) {
      throw new Meteor.Error('register.failed', e.message)
    }

    const { email, password } = options

    if (await Accounts.findUserByEmail(email)) {
      throw new Meteor.Error('400', 'user.emailExists', { email })
    }

    return await Accounts.createUser({ email, password })
  }
})
