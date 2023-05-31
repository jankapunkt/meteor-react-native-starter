import { Meteor } from 'meteor/meteor'
import settingsValidator from '../../../.settingsschema'

settingsValidator(Meteor.settings)
