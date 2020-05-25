import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import AuthStack from './AuthStack'
import TabNavigator from './TabNavigator'
import AuthLoading from '../screens/AuthLoading'

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: TabNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
)
