import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Auth/Login'
import Join from '../screens/Auth/Join'
import Mobile from '../screens/Auth/Mobile'
import Otp from '../screens/Auth/Otp'
import Permission from '../screens/Auth/Permission'
import Invite from '../screens/Auth/Invite'
import ForgotPass from '../screens/Auth/ForgotPass'

const navigator = createSwitchNavigator(
  {
    Login: Login,
    Forgot: ForgotPass,
    Join: Join,
    Mobile: Mobile,
    Otp: Otp,
    Permission: Permission,
    Invite,
  },
  {
    initialRouteName: 'Login',
  }
)

export default createAppContainer(navigator)
