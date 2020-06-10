import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Ionicons } from '@expo/vector-icons'
import AddLoad from '../screens/Load/AddLoad'
import AddLoadDetails from '../screens/Load/AddLoadDetails'
import MyLoads from '../screens/Load/MyLoads'
import AddLoadThree from '../screens/Load/AddLoadThree'
import AddLoadPreview from '../screens/Load/AddLoadPreview'
import colors from '../constants/Colors'

const navigator = createStackNavigator(
  {
    AddLoad,
    AddLoadDetails,
    // MyLoads,
    AddLoadThree,
    AddLoadPreview,
  },
  {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: () => ({
      headerBackImage: () => {
        return <Ionicons name="ios-arrow-round-back" color="#fff" size={30} />
      },
      headerTitleStyle: {
        fontFamily: 'pt-mono-bold',
      },
      headerStyle: {
        backgroundColor: colors.greyishBrown,
        height: 80, 
        elevation: 0, // for android
        shadowOpacity: 0, //for ios
        borderBottomWidth: 0, //for ios
        // borderBottomLeftRadius: 18,
        // borderBottomRightRadius: 18
      },
      headerTintColor: '#fff',
      // headerTitleStyle: {
      //   flex: 1,
      //   justifyContent: 'center',
      //   alignItems: 'center'
      // }
    }),
  }
)

export default createAppContainer(navigator)
