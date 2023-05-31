const SimpleSchema = require('simpl-schema').default
const schema = def => new SimpleSchema(def)

/* ----------------------------------------------------------------------------
Validate meteor.settings in your app AND before you deploy your app!

Validate in app:
================

In your server/main.js do:

import settingsValidator from '../../.settingsschema'
settingsValidator(Meteor.settings)


Validate before deployment:
===========================
Add hooks to your mup.js file and run this, like so:

const settingsValidator = require('../../.settingsschema')

function validateSettings (api) {
  const settings = api.getSettings()
  settingsValidator(settings)
}

module.exports = {
  hooks: {
   'pre.deploy': validateSettings,
   'pre.reconfig': validateSettings,
  },

  // ... your mup config
}
-----------------------------------------------------------------------------*/

const settingsSchema = schema({
  accounts: schema({
    config: schema({
      forbidClientAccountCreation: Boolean,
      ambiguousErrorMessages: Boolean,
      sendVerificationEmail: Boolean,
      loginExpirationInDays: {
        type: SimpleSchema.Integer,
        optional: true
      }
    })
  }),
  public: schema({
    mochaRuntimeArgs: {
      type: Object,
      optional: true,
      blackbox: true
    }
  })
})

module.exports = function (settings) {
  settingsSchema.validate(settings)
}
