import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Ionicons } from '@expo/vector-icons'
import Calculator from '../screens/Calculator/Calculator'
import CalculatorInputs from '../screens/Calculator/CalculatorInputs'
import colors from '../constants/Colors'

const navigator = createStackNavigator(
  {
    Calculator: {
      screen: Calculator,
      navigationOptions: {
        title: 'Calculator'
      }
    },
    CalculatorInputs: {
      screen: CalculatorInputs,
      navigationOptions: {
        title: 'Calculate'
      }
    }
  },
  {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: () => ({
      headerBackImage: () => {
        return <Ionicons name="ios-arrow-round-back" color="#fff" size={30} />
      },
      headerTitleStyle: {
        fontFamily: 'pt-mono-bold'
      },
      headerStyle: {
        backgroundColor: colors.greyishBrown,
        height: 80, 
        elevation: 0, // for android
        shadowOpacity: 0, //for ios
        borderBottomWidth: 0 //for ios
        // borderBottomLeftRadius: 18,
        // borderBottomRightRadius: 18
      },
      headerTintColor: '#fff'
    })
  }
)

export default createAppContainer(navigator)
