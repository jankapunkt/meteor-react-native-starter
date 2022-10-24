import { StyleSheet } from 'react-native'

export const defaultColors = {
  placeholder: '#8a8a8a',
  danger: '#981111',
  white: '#eee',
  black: '#1a1a1a',
  primary: '#0B52AF'
}

export const defaultStyles = StyleSheet.create({
  text: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: defaultColors.black,
    backgroundColor: defaultColors.white
  },
  container: {
    margin: 20
  },
  danger: {
    color: defaultColors.danger
  },
  dangerBorder: {
    borderWidth: 1,
    borderColor: defaultColors.danger
  },
  bold: {
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  flex1: {
    flex: 1
  }
})
