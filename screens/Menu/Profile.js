import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  Button,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  AsyncStorage,
  TouchableWithoutFeedback,
} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import colors from '../../constants/Colors'
import styled from 'styled-components/native'
import { api_url } from '../../constants/Api'

const ProfileContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`

const AvatarNameWrapper = styled.View`
  background-color: ${colors.greyishBrown};
  align-items: center;
  padding-bottom: 10px;
`

const AvatarWrapper = styled.View`
  border-width: 3;
  border-color: ${colors.themeYellow};
  border-radius: 50;
  margin: 20px 0;
  position: relative;
`

const StatusCircle = styled.View`
  height: 15;
  width: 15;
  border-width: 2;
  border-color: ${colors.themeYellow};
  border-radius: 30;
  background-color: green;
  position: absolute;
  right: 0;
`

const AvatarImg = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50;
`

const UserName = styled.Text`
  font-weight: bold;
  color: #fff;
  font-size: 20px;
`

const RatingText = styled.Text`
  color: #fff;
  margin: 10px 0;
  justify-content: center;
`

const DetailsWrapper = styled.View`
  margin: 20px 20px;
`

const Card = styled.View`
  background-color: ${colors.lightGrey};
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  elevation: 1;
  shadow-color: #000;
  shadow-opacity: 0.8;
  shadow-radius: 2;
`

const CardTitle = styled.Text`
  color: ${colors.littleDarkGrey};
  margin-bottom: 10px;
`

const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export default function Profile(props) {
  const [profile, setProfile] = useState(props.navigation.getParam('profile'))
  const [refreshing, setRefreshing] = useState(false)

  const getprofile = async () => {
    const token = await AsyncStorage.getItem('USER_TOKEN')
    try {
      const profile = await fetch(`${api_url}?action=getprofile`, {
        method: 'POST',
        body: JSON.stringify({ token: token }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const profilejson = await profile.json()
      props.navigation.setParams({ profile: profilejson.data })
      setProfile(profilejson.data)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const onRefresh = () => {
    getprofile()
    setRefreshing(false)
  }

  return (
    <ProfileContainer>
      <NavigationEvents onWillFocus={() => getprofile()} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <AvatarNameWrapper>
          <AvatarWrapper>
            <AvatarImg source={{ uri: profile.u_image }} />
            <StatusCircle />
          </AvatarWrapper>
          <View>
            <UserName>{profile.u_fullname}</UserName>
            <Ionicons
              style={{ position: 'absolute', right: -15 }}
              name="ios-checkmark-circle"
              color={colors.linkBlue}
            />
          </View>
          <RatingText>
            4.5{' '}
            <MaterialCommunityIcons
              name="star"
              size={15}
              color={colors.themeYellow}
            />
          </RatingText>
        </AvatarNameWrapper>
        <DetailsWrapper>
          <Card>
            <CardTitle>About</CardTitle>
            <Text>{profile.u_about}</Text>
          </Card>
          <Card>
            <CardTitle>Company</CardTitle>
            <Text>{profile.u_company}</Text>
          </Card>
          <Card>
            <CardTitle>Verified Information</CardTitle>
            <UserInfo>
              <Text>US DOT#</Text>
              <Text style={{ color: `${colors.linkBlue}` }}>123456789</Text>
            </UserInfo>
            <UserInfo>
              <Text>Email</Text>
              <Text style={{ color: `${colors.linkBlue}` }}>
                {profile.u_email}
              </Text>
            </UserInfo>
            <UserInfo>
              <Text>Phone Number</Text>
              <Text style={{ color: `${colors.linkBlue}` }}>
                {profile.u_mobileno}
              </Text>
            </UserInfo>
          </Card>
        </DetailsWrapper>
      </ScrollView>
    </ProfileContainer>
  )
}

Profile.navigationOptions = ({ navigation }) => {
  let profile = navigation.getParam('profile')
  return {
    title: profile.u_fullname,
    // headerLeft: null,
    headerRight: () => (
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('EditProfile', {
            profile: profile,
          })
        }
      >
        <MaterialCommunityIcons
          style={{ marginRight: 15 }}
          name="pencil"
          color="#fff"
          size={20}
        />
      </TouchableWithoutFeedback>
    ),
    headerTitleStyle: {
      fontFamily: 'pt-mono-bold',
    },
    headerStyle: {
      backgroundColor: colors.greyishBrown,
      elevation: 0, // for android
      shadowOpacity: 0, //for ios
      borderBottomWidth: 0, //for ios
    },
    headerTintColor: '#fff',
  }
}
