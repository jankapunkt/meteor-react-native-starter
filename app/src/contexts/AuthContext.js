import { createContext } from 'react'

/**
 * Our authentication context provides an API for our components
 * that allows them to communicate with the servers in a decoupled way.
 * @method signIn
 * @method signUp
 * @method signOut
 * @type {React.Context<object>}
 */
export const AuthContext = createContext()
