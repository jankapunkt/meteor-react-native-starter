import * as SecureStore from 'expo-secure-store'

export const Credentials = {}

Credentials.set = async ({ email, password }) => {
  await SecureStore.setItemAsync('user-email', email)
  await SecureStore.setItemAsync('user-password', password)
}

Credentials.get = async () => {
  const email = await SecureStore.getItemAsync('user-email')
  const password = email && await SecureStore.getItemAsync('user-email')
  const exist = Boolean(email && password)
  return { email, password, exist }
}
