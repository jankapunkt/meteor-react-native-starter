import { AuthContext } from '../contexts/AuthContext'
import { defaultColors, defaultStyles } from '../styles/defaultStyles'
import { Button, Text, TextInput, View } from 'react-native'
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
          <Text style={defaultStyles.bold}>{title}</Text>
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
          </View>
        </>
      )
    }

    return (
      <>
        <Text style={defaultStyles.bold}>{title}</Text>
        <View style={defaultStyles.row}>
          <Text style={defaultStyles.flex1}>{user[fieldName] || 'Not yet defined'}</Text>
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
      {renderField({ title: 'First Name', fieldName: 'firstName' })}
      {renderField({ title: 'Last Name', fieldName: 'lastName' })}

      <Text style={defaultStyles.bold}>Email</Text>
      <Text>{user.emails[0].address}</Text>

      <View style={{ ...defaultStyles.dangerBorder, padding: 10, marginTop: 10 }}>
        <Text style={defaultStyles.bold}>Danger Zone</Text>
        <Button title='Sign out' color={defaultColors.danger} onPress={() => signOut({ onError })} />
        <Button title='Delete account' color={defaultColors.danger} onPress={() => deleteAccount({ onError })} />
        <ErrorMessage error={error} />
      </View>
    </View>
  )
}
