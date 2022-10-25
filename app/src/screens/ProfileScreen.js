import { AuthContext } from '../contexts/AuthContext'
import { defaultColors, defaultStyles } from '../styles/defaultStyles'
import { Button, Text, TextInput, View, StyleSheet } from 'react-native'
import { useContext, useState } from 'react'
import { ErrorMessage } from '../components/ErrorMessage'
import { useAccount } from '../hooks/useAccount'

export const ProfileScreen = () => {
  const [editMode, setEditMode] = useState('')
  const [editValue, setEditValue] = useState('')
  const [error, setError] = useState(null)
  const { signOut, deleteAccount } = useContext(AuthContext)
  const { user, updateProfile } = useAccount()
  const onError = err => setError(err)

  if (!user) {
    return null // if sign our or delete
  }

  /**
   * Updates a profile field from given text input state
   * by sending update data to the server and let hooks
   * reactively sync with the updated user document. *magic*
   * @param fieldName {string} name of the field to update
   */
  const updateField = ({ fieldName }) => {
    const options = {}
    options[fieldName] = editValue
    const onSuccess = () => {
      setError(null)
      setEditValue('')
      setEditMode('')
    }
    updateProfile({ options, onError, onSuccess })
  }

  const renderField = ({ title, fieldName }) => {
    const value = user[fieldName] || ''

    if (editMode === fieldName) {
      return (
        <>
          <Text style={styles.headline}>{title}</Text>
          <View style={defaultStyles.row}>
            <TextInput
              placeholder={title}
              autoFocus
              placeholderTextColor={defaultColors.placeholder}
              style={{ ...defaultStyles.text, ...defaultStyles.flex1 }}
              value={editValue}
              onChangeText={setEditValue}
            />
            <ErrorMessage error={error} />
            <Button title='Update' onPress={() => updateField({ fieldName })} />
            <Button title='Cancel' onPress={() => setEditMode('')} />
          </View>
        </>
      )
    }

    return (
      <>
        <Text style={styles.headline}>{title}</Text>
        <View style={{ ...defaultStyles.row, alignSelf: 'stretch' }}>
          <Text style={{ ...defaultStyles.text, flexGrow: 1 }}>{user[fieldName] || 'Not yet defined'}</Text>
          <Button
            title='Edit' onPress={() => {
              setEditValue(value)
              setEditMode(fieldName)
            }}
          />
        </View>
      </>
    )
  }

  return (
    <View style={defaultStyles.container}>
      <Text style={styles.headline}>Email</Text>
      <Text style={{ ...defaultStyles.text, alignSelf: 'stretch' }}>{user.emails[0].address}</Text>

      {renderField({ title: 'First Name', fieldName: 'firstName' })}
      {renderField({ title: 'Last Name', fieldName: 'lastName' })}

      <Text style={styles.headline}>Danger Zone</Text>
      <View style={{ ...defaultStyles.dangerBorder, padding: 10, marginTop: 10, alignSelf: 'stretch' }}>
        <Button title='Sign out' color={defaultColors.danger} onPress={() => signOut({ onError })} />
        <Button title='Delete account' color={defaultColors.danger} onPress={() => deleteAccount({ onError })} />
        <ErrorMessage error={error} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headline: {
    ...defaultStyles.bold,
    alignSelf: 'flex-start'
  }

})
