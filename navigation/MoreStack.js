import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Ionicons } from '@expo/vector-icons'
import colors from '../constants/Colors'
import More from '../screens/Menu/More'
import Profile from '../screens/Menu/Profile'
import EditProfile from '../screens/Menu/EditProfile'
import AddTrailer from '../screens/Trailer/AddTrailer'
import AddTrailerTwo from '../screens/Trailer/AddTrailerTwo'
import MyTrailers from '../screens/Trailer/MyTrailers'
import TrailerInfo from '../screens/Trailer/TrailerInfo'
import EditTrailer from '../screens/Trailer/EditTrailer'
import MyLoads from '../screens/Load/MyLoads'
import LoadInfo from '../screens/Load/LoadInfo'
import EditLoad from '../screens/Load/EditLoad'
import MyFriends from '../screens/Friends/MyFriends'
import FriendProfile from '../screens/Friends/FriendProfile'
import Chat from '../screens/Friends/Chat'
import MyGroups from '../screens/Groups/MyGroups'
import AddGroup from '../screens/Groups/AddGroup'
import GroupInfo from '../screens/Groups/GroupInfo'
import MyMessages from '../screens/Friends/MyMessages'
import GroupChat from '../screens/Groups/GroupChat'

const navigator = createStackNavigator(
  {
    More,
    Profile,
    EditProfile,
    AddTrailer,
    AddTrailerTwo,
    MyTrailers,
    TrailerInfo,
    EditTrailer,
    MyLoads,
    LoadInfo,
    EditLoad,
    MyFriends,
    FriendProfile,
    MyGroups,
    AddGroup,
    GroupInfo,
    Chat,
    MyMessages,
    GroupChat,
  },
  {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerBackImage: () => {
          return <Ionicons name="ios-arrow-round-back" color="#fff" size={30} />
        },
        headerTitleStyle: {
          fontFamily: 'pt-mono-bold',
        },
        headerStyle: {
          backgroundColor: colors.greyishBrown,
          height: 80, 
          marginBottom: 10,
          elevation: 0, // for android
          shadowOpacity: 0, //for ios
          borderBottomWidth: 0, //for ios
          // borderBottomLeftRadius: 18,
          // borderBottomRightRadius: 18
        },
        headerTintColor: '#fff',
      }
    },
  }
)

export default createAppContainer(navigator)
