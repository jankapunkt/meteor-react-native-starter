import { Random } from 'meteor/random'
import { restoreAll, stub } from '../../tests/stub'
import {
  deleteAccount,
  registerNewUser,
  updateUserProfile
} from './methods'
import { expect } from 'chai'
import { NotSignedInError } from '../errors/NotSignedInError'
import { PermissionDeniedError } from '../errors/PermissionDeniedError'
import { Accounts } from 'meteor/accounts-base'

describe('accounts.methods', function () {
  let userId
  let env

  beforeEach(() => {
    userId = Random.id()
    env = { userId }
  })

  afterEach(() => restoreAll())

  const throwsWithoutUser = (fn, ...args) => it('throws if user is not in this-scope', () => {
    const thrown = expect(() => fn(...args)).to.throw(NotSignedInError.NAME)
    thrown.with.property('reason', NotSignedInError.REASON)
    thrown.with.deep.property('details', { userId: undefined })
  })

  describe(registerNewUser.name, function () {
    let email
    let password
    let firstName
    let lastName

    beforeEach(() => {
      firstName = Random.id(8)
      lastName = Random.id(8)
      password = Random.id(8)
      email = `${firstName}@myorg.tld`
    })

    const stubRegister = () => {
      stub(Accounts, 'createUser', query => {
        expect(query).to.deep.equal({ email, password })
        return userId
      })

      stub(Meteor.users, 'update', (query, updateDoc) => {
        expect(query).to.equal(userId)
        expect(updateDoc).to.deep.equal({
          $set: { firstName, lastName }
        })
      })

      stub(Accounts, 'sendVerificationEmail', (usr, mail) => {
        expect(usr).to.equal(userId)
        expect(mail).to.equal(email)
      })
    }

    it('throws on insufficient args', () => {
      [
        [{}, 'email'],
        [{ email, password, firstName }, 'lastName'],
        [{ email, password, lastName }, 'firstName'],
        [{ password, lastName, firstName }, 'email'],
        [{ email, lastName, firstName }, 'password']
      ].forEach(([args, key]) => {
        expect(() => registerNewUser.call(env, args))
          .to.throw(`Match error: Missing key '${key}'`)
      })
    })
    it('throws if user already exists by email', () => {
      stub(Accounts, 'findUserByEmail', (mail) => {
        expect(mail).to.equal(email)
        return true
      })

      const args = { email, firstName, lastName, password }
      const thrown = expect(() => registerNewUser.call(env, args))
        .to.throw(PermissionDeniedError.NAME)
      thrown.with.property('reason', 'accounts.userExists')
      thrown.with.deep.property('details', { email })
    })
    it('creates a new account', () => {
      stubRegister()
      const args = { email, firstName, lastName, password }
      const result = registerNewUser.call(env, args)
      expect(result).to.deep.equal({ id: userId, token: undefined, tokenExpires: undefined })
    })
    it('optionally logs in immediately', () => {
      stubRegister()

      stub(Accounts, '_loginUser', (self, usr) => {
        expect(self).to.deep.equal(env)
        expect(usr).to.equal(userId)
      })

      const args = { email, firstName, lastName, password, loginImmediately: true }
      registerNewUser.call(env, args)
    })
  })
  describe(updateUserProfile.name, function () {
    throwsWithoutUser(updateUserProfile, { firstName: Random.id(), lastName: Random.id() })
    it('throws on insufficient args', () => {
      [
        { firstName: 213 },
        { lastName: 123 }
      ].forEach(args => {
        expect(() => updateUserProfile.call(env, args))
          .to.throw('Match error')
      })
    })
    it('updates a given user', () => {
      const firstName = Random.id()
      const lastName = Random.id()

      stub(Meteor.users, 'update', (query, updateDoc) => {
        expect(query).to.equal(userId)
        expect(updateDoc).to.deep.equal({
          $set: { firstName, lastName }
        })
      })
      updateUserProfile.call(env, { firstName, lastName })
    })
  })
  describe(deleteAccount.name, function () {
    throwsWithoutUser(deleteAccount)
    it('removes the current signed-in user\'s account', () => {
      stub(Meteor.users, 'remove', (query) => {
        expect(query).to.equal(userId)
      })
      deleteAccount.call(env)
    })
  })
})
