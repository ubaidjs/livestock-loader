import React, { useState, useEffect , useRef } from 'react'
import {
  View,
  Text,
  Image,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import styled from 'styled-components/native'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { api_url } from '../../constants/Api'
import colors from '../../constants/Colors'
import RBSheet from 'react-native-raw-bottom-sheet'
const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`

const LinksContainer = styled.View`
  flex: 1;
`

const LinkWrapper = styled.View`
  flex-direction: row;
  padding: 15px 20px;
  align-items: center;
  border-color: #f0f0f0;
  border-bottom-width: 1px;
`

const LinkText = styled.Text`
  font-size: 16;
  flex: 1;
  color: ${colors.greyishBrown};
`

const SignoutContainer = styled.View`
  align-items: center;
  border-top-width: 1;
  border-top-color: #f0f0f0;
`

const ProfileContainer = styled.View`
  padding: 20px;
  padding-top: 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-color: #f0f0f0;
  border-bottom-width: 1px;
`

const Avatar = styled.View`
  height: 50;
  width: 50;
  border-radius: 50;
  background-color: ${colors.darkGrey};
`
const UserImage = styled.Image`
  height: 50;
  width: 50;
  border-radius: 50;
`

const UserName = styled.Text`
  color: ${colors.greyishBrown};
  font-size: 18;
  font-weight: bold;
  margin-left: 20px;
`
const NoTrailerText = styled.Text`
  color: ${colors.greyishBrown};
  font-family: 'pt-mono-bold';
  font-size: 20;
  text-align: center;
  margin-top: 20;
`
const ButtonText = styled.Text`
  margin-top: 50px;
  border-width: 1;
  border-color: ${colors.themeYellow};
  padding: 15px;
  margin-horizontal: 70px;
  border-radius: 10;
  text-align: center;
`
const More = (props) => {
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState(false)
  const refRBSheet = useRef()
  useEffect(() => {
    getprofile()
  }, [])

  const getprofile = async () => {
    setLoading(true)
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

      setProfile(profilejson.data)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setLoading(false)
    }
  }
 
  const MyTrailersCall = async () => {
    const token = await AsyncStorage.getItem('USER_TOKEN')
      const response = await fetch(`${api_url}?action=getCustomTrailer`, {
        method: 'POST',
        body: JSON.stringify({ token, limit: 'all' }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      if (json.status === '200') {
        props.navigation.navigate('MyTrailers')
      }
      if (!json.data.length) {
        refRBSheet.current.open()
      }
  }
  return (
    <Container>
      <NavigationEvents onDidFocus={() => getprofile()} />
      <TouchableWithoutFeedback
        onPress={() =>
          props.navigation.navigate('Profile', {
            profile,
            setProfile,
          })
        }
      >
        <ProfileContainer>
          {profile ? (
            <>
              <View
                style={{
                  borderWidth: 3,
                  borderRadius: 50,
                  borderColor: colors.themeYellow,
                }}
              >
                <UserImage source={{ uri: profile.u_image }} />
                <View
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 50,
                    position: 'absolute',
                    backgroundColor: 'green',
                    right: -5,
                    borderWidth: 2,
                    borderColor: colors.themeYellow,
                  }}
                ></View>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ alignSelf: 'flex-start' }}>
                  <UserName>{profile.u_fullname}</UserName>
                  <Ionicons
                    style={{ position: 'absolute', right: -15 }}
                    name="ios-checkmark-circle"
                    color={colors.linkBlue}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ marginLeft: 20, marginRight: 5 }}>4.5</Text>
                  <Ionicons
                    name="md-star"
                    color={colors.themeYellow}
                    size={18}
                  />
                </View>
              </View>
            </>
          ) : (
            <>
              <Avatar></Avatar>
              <ActivityIndicator style={{ flex: 1 }} color="#000" />
            </>
          )}

          <Ionicons name="ios-settings" color="#000" size={20} />
        </ProfileContainer>
      </TouchableWithoutFeedback>
      <LinksContainer>
        <TouchableWithoutFeedback
          onPress={MyTrailersCall}
        >
          <LinkWrapper>
            <Image
              style={{ marginRight: 30 }}
              source={require('../../assets/images/icon-trailer.png')}
            />
            <LinkText>My Trailers</LinkText>
            <Ionicons
              name="ios-arrow-round-forward"
              size={20}
              color={colors.linkBlue}
            />
          </LinkWrapper>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate('MyLoads')}
        >
          <LinkWrapper>
            <Image
              style={{ marginRight: 30 }}
              source={require('../../assets/images/icon-load.png')}
            />
            <LinkText>My Loads</LinkText>
            <Ionicons
              name="ios-arrow-round-forward"
              size={20}
              color={colors.linkBlue}
            />
          </LinkWrapper>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <LinkWrapper>
            <Image
              style={{ marginRight: 30 }}
              source={require('../../assets/images/icon-calculation.png')}
            />
            <LinkText>My Calculations</LinkText>
            <Ionicons
              name="ios-arrow-round-forward"
              size={20}
              color={colors.linkBlue}
            />
          </LinkWrapper>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate('MyGroups')}
        >
          <LinkWrapper>
            <Image
              style={{ marginRight: 30 }}
              source={require('../../assets/images/icon-group.png')}
            />
            <LinkText>My Groups</LinkText>
            <Ionicons
              name="ios-arrow-round-forward"
              size={20}
              color={colors.linkBlue}
            />
          </LinkWrapper>
        </TouchableWithoutFeedback>
        {/* <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate('MyFriends')}
        >
          <LinkWrapper>
            <Image
              style={{ marginRight: 30 }}
              source={require('../../assets/images/icon-friends.png')}
            />
            <LinkText>My Friends</LinkText>
            <Ionicons
              name="ios-arrow-round-forward"
              size={20}
              color={colors.linkBlue}
            />
          </LinkWrapper>
        </TouchableWithoutFeedback> */}
        <TouchableWithoutFeedback
          onPress={() =>
            props.navigation.navigate('MyMessages', {
              id: profile.u_id,
              name: profile.u_fullname,
              image: profile.u_image,
            })
          }
        >
          <LinkWrapper>
            <Ionicons
              name="ios-chatbubbles"
              size={35}
              color={'grey'}
              style={{ marginRight: 30 }}
            />
            <LinkText>My Messages</LinkText>
            <Ionicons
              name="ios-arrow-round-forward"
              size={20}
              color={colors.linkBlue}
            />
          </LinkWrapper>
        </TouchableWithoutFeedback>
      </LinksContainer>
      <SignoutContainer>
        <LinkWrapper>
          <TouchableOpacity style={{ flex: 1 }}>
            <LinkText>Terms & Conditions</LinkText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.removeItem('USER_TOKEN')
              await AsyncStorage.removeItem('USER_ID')
              await AsyncStorage.removeItem('USER_NAME')
              await AsyncStorage.removeItem('USER')
              props.navigation.navigate('AuthLoading')
            }}
          >
            <Text
              style={{
                fontSize: 16,
                marginRight: 10,
                color: colors.greyishBrown,
              }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
          <Entypo name="log-out" size={20} color={colors.littleDarkGrey} />
        </LinkWrapper>
      </SignoutContainer>
      <RBSheet
          ref={refRBSheet}
          // onClose={() => {
          //   props.navigation.goBack()
          // }}
          closeOnDragDown={true}
          closeOnPressMask={true}
          closeOnPressBack={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(242,242,242,0.5)',
            },
            container: {
              elevation: 1,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            },
            draggableIcon: {
              backgroundColor: colors.themeYellow,
            },
          }}
        >
          <View>
            <NoTrailerText>You have no saved trailer</NoTrailerText>
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.close()
                props.navigation.navigate('AddTrailer')
              }}
            >
              <ButtonText>Add a new Trailer</ButtonText>
            </TouchableOpacity>
          </View>
        </RBSheet>
    </Container>
  )
}

More.navigationOptions = {
  header: null,
}

export default More
