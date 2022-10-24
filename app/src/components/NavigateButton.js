import { Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { defaultColors } from '../styles/defaultStyles'

/**
 * Renders a button wih a route binding.
 * On press triggers the given route by name.
 *
 * @param title {string}
 * @param route {string}
 * @return {JSX.Element}
 * @component
 */
export const NavigateButton = ({ title, route }) => {
  const navigation = useNavigation()

  return (
    <Button
      title={title}
      color={defaultColors.primary}
      onPress={() => navigation.navigate(route)}
    />
  )
}
