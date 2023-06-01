import { PermissionDeniedError } from './PermissionDeniedError'

const REASON = 'accounts.notSignedIn'

export class NotSignedInError extends PermissionDeniedError {
  static get REASON () {
    return REASON
  }

  constructor (details) {
    super(REASON, details)
  }
}
