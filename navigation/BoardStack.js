import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Ionicons } from '@expo/vector-icons'
import LoadBoards from '../screens/Boards/LoadBoards'
import BoardInfo from '../screens/Boards/BoardInfo'
import Chat from '../screens/Friends/Chat'
import colors from '../constants/Colors'

const navigator = createStackNavigator(
  {
    LoadBoards,
    BoardInfo,
    Chat,
  },
  {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: () => ({
      headerBackImage: () => {
        return <Ionicons name="ios-arrow-round-back" color="#fff" size={30} />
      },
      headerTitleStyle: {
        fontFamily: 'pt-mono-bold',
        fontSize: 24,
      },
      headerStyle: {
        backgroundColor: colors.greyishBrown,
        height: 80,  
        elevation: 0, // for android
        shadowOpacity: 0, //for ios
        borderBottomWidth: 0, //for ios
      },
      headerTintColor: '#fff',
    }),
  }
)

export default createAppContainer(navigator)
