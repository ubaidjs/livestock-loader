import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import colors from '../../constants/Colors'
import styled from 'styled-components/native'
import { CustomButton, ButtonText } from '../../constants/CommonStyles'
import { Ionicons } from '@expo/vector-icons'
const ProfileContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  position: relative;
`

const AvatarNameWrapper = styled.View`
  background-color: ${colors.greyishBrown};
  align-items: center;
  padding-bottom: 10px;
`

const AvatarWrapper = styled.View``

const AvatarImg = styled.Image`
  margin: 20px 0;
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
  margin: 30px 20px;
  margin-bottom: 50px;
`
const Card = styled.View`
  background-color: ${colors.lightGrey};
  margin: 20px 0;
  padding: 10px;
  border-radius: 5px;
  height: ${props=>props.height == undefined ? 'auto' : props.height}
`
// const Card = styled.View`
//   background-color: ${colors.lightGrey};
//   margin: 20px 0;
//   padding: 10px;
//   border-radius: 5px;
//   elevation: 1;
//   shadow-color: #000;
//   shadow-opacity: 0.8;
//   shadow-radius: 2;
// `

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
  const [currentUserIdName, setCurrentUserIdName] = useState({})

  useEffect(() => {
    getCurrentUserIdName()
  }, [])

  const getCurrentUserIdName = async () => {
    const id = await AsyncStorage.getItem('USER_ID')
    const name = await AsyncStorage.getItem('USER_NAME')
    const image = await AsyncStorage.getItem('USER_IMAGE')

    setCurrentUserIdName({
      id,
      name,
      image
    })
  }

  return (
    <ProfileContainer>
      <ScrollView>
        <AvatarNameWrapper>
          <AvatarWrapper>
            <AvatarImg source={{ uri: profile.u_image }} />
          </AvatarWrapper>
          <UserName>{profile.u_fullname}</UserName>
          <RatingText>
            4.5 <MaterialCommunityIcons name="star" size={15} color="white" />
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
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          paddingHorizontal: 25
        }}
      >
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Chat', {
              friendId: profile.u_id,
              friendName: profile.u_fullname,
              friendImage: profile.u_image,
              userId: currentUserIdName.id,
              userName: currentUserIdName.name,
              userImage: currentUserIdName.image
            })
          }
        >
          <CustomButton>
            <ButtonText>MESSAGE</ButtonText>
          </CustomButton>
        </TouchableOpacity>
      </View>
    </ProfileContainer>
  )
}

Profile.navigationOptions = ({ navigation }) => {
  return {
    title: 'Profile',
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack(null)} style={{marginLeft: 15}}>
          <Ionicons name="ios-arrow-round-back" color="#fff" size={30} />
      </TouchableOpacity>
    ),
    headerStyle: {
      height: 80, 
      backgroundColor: colors.greyishBrown,
      elevation: 0, // for android
      shadowOpacity: 0, //for ios
      borderBottomWidth: 0 //for ios
    },
    headerTintColor: '#fff'
  }
}
