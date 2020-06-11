import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { Image, Text, View } from 'react-native'
import CalcStack from './CalcStack'
import MoreStack from './MoreStack'
import LoadStack from './LoadStack'
import BoardStack from './BoardStack'
import colors from '../constants/Colors'
import NotificationStack from './NotificationStack'
import * as Icon from '../components/TabIcons'
import { EvilIcons } from '@expo/vector-icons'

const navigator = createMaterialBottomTabNavigator(
  {
    Boards: {
      screen: BoardStack,
      navigationOptions: () => ({
        tabBarLabel: 'Boards',
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <Icon.boardsActive />
          } else {
            return <Icon.boards />
          }
        },
      }),
    },
    Calculator: {
      screen: CalcStack,
      navigationOptions: () => ({
        tabBarLabel: 'Calculator',
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <Icon.calculatorActive />
          } else {
            return <Icon.calculator />
          }
        },
      }),
    },
    Load: {
      screen: LoadStack,
      navigationOptions: () => ({
        tabBarLabel: 'Add Load',
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <Icon.addActive />
          } else {
            return <Icon.add />
          }
        },
      }),
    },
    Notifications: {
      screen: NotificationStack,
      navigationOptions: () => ({
        tabBarLabel: 'Alerts',
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <Icon.alertActive />
          } else {
            return <Icon.alert />
          }
        },
      }),
    },
    More: {
      screen: MoreStack,
      navigationOptions: {
        tabBarLabel: 'More',
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <Icon.moreActive />
          } else {
            return <Icon.more />
          }
        },
      },
    },
  },
  {
    shifting: false,
    defaultNavigationOptions: ({ navigation }) => {
      let tabBarVisible = true
      let routeName = navigation.state.routes[navigation.state.index].routeName
      if (routeName == 'Chat' || routeName == 'GroupChat') {
        tabBarVisible = false
      }

      return {
        tabBarVisible,
        barStyle: {
          backgroundColor: '#fff',
        },
      }
    },
  }
)

export default createAppContainer(navigator)
