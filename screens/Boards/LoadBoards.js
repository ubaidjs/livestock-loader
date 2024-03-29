import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions,
  StyleSheet,
  RefreshControl,
  Alert,
  ImageBackground,
  Linking,
} from 'react-native'
import MapView from 'react-native-maps'
import {
  Feather,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  Ionicons,
} from '@expo/vector-icons'
import { Location } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import * as Permissions from 'expo-permissions'
import styled from 'styled-components/native'
import moment from 'moment'
import RBSheet from 'react-native-raw-bottom-sheet'
import genRandom from '../../constants/RandomNumber'
import {
  CustomButtonWithoutShadow,
  ButtonText,
  CustomInput,
} from '../../constants/CommonStyles'
import { TabView, SceneMap } from 'react-native-tab-view'
import { api_url } from '../../constants/Api'
import colors from '../../constants/Colors'

const BottomSheetOption = styled(View)`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 20;
  padding-vertical: 10;
  border-bottom-width: 0.5;
  border-bottom-color: #e9e9e9;
`

const BottomSheetImage = styled(Image)`
  height: 50;
  width: 50;
  border-radius: 50;
  align-self: center;
  margin-top: 20;
`

const Container = styled.View`
  flex: 1;
  padding-horizontal: 20px;
  background-color: ${colors.lightGrey};
`

const BoardWrap = styled.View`
  background-color: #fff;
  border-radius: 15px;
  elevation: 1;
  padding: 10px;
  margin-bottom: 15px;
`

const Map = styled.View`
  margin-bottom: 15px;
  border-radius: 10;
  overflow: hidden;
`

const PickWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`

const TrailerTypeWrap = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`

const DropWrap = styled.View`
	flex-direction: row
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15px
`

const DetailWrap = styled.View`
	padding-top: 5;
	flex-direction: row
	justify-content: space-between;
	border-top-color: ${colors.lightGrey};
	border-top-width: 1;
`

const AddressText = styled.Text`
  font-size: 18px;
  color: ${colors.greyishBrown};
  font-weight: 600;
`

const TextGrey = styled.Text`
  color: grey;
`

const UserWrap = styled.View`
	flex-direction: row
	justify-content: space-between;
	align-items: center;
  margin-bottom: 15px;
  margin: 10px;
`

const ActionSheetWrapper = styled.View`
  padding-vertical: 30px;
  display: flex;
  align-items: center;
`

const ActionSheetText = styled.Text`
  color: ${colors.greyishBrown};
  font-family: 'pt-mono-bold';
  font-size: 20;
  text-align: center;
  margin-top: 20;
  margin-horizontal: 20;
`

const ButtonWrapper = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-horizontal: 25px;
  overflow: hidden;
  align-items: center;
`
const BottomButton = styled.View`
flexDirection: row; 
border-radius: 7px;
margin-bottom: 20px;
shadowRadius:  ${Platform.OS == 'android' ? 18 : 10};
shadowOpacity: ${Platform.OS == 'android' ? 30 : 0.16}; 
shadow-color: #000;
shadowOffset:{ width: ${Platform.OS == 'android' ? -1 : 0}, height: ${
  Platform.OS == 'android' ? 9 : 10
} };
elevation: ${Platform.OS == 'android' ? 12 : 15};
`
const FilterButton = styled.View`
  background-color: #ddba45;
  padding: 15px 10px;
  font-weight: bold;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100px;
  border-left-width: 1px;
  border-color: rgb(211, 176, 58);
`
const MapButton = styled.View`
  background-color: ${colors.themeYellow};
  padding: 15px 10px;
  font-weight: bold;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100px;
  border-right-width: 1px;
  border-color: rgb(211, 176, 58);
`

const ButtonTextLocal = styled.Text`
  font-family: 'pt-mono-bold';
  color: ${colors.greyishBrown};
  margin-left: 10;
`
const LineCreate = styled.View`
  height: 47px;
  width: 2px;
  flex-direction: column;
  background: rgb(211, 176, 58);
`
const FirstRoute = ({
  loading,
  boards,
  genRandom,
  fetchLoadAgain,
  props,
  refRBSheetProfile,
  setSheetUser,
}) => {
  return (
    <Container>
      {loading && <ActivityIndicator color="#000" />}
      <FlatList
        style={{ paddingTop: 20 }}
        data={boards}
        extraData={boards}
        keyExtractor={(item) => genRandom()}
        onEndReached={() => fetchLoadAgain()}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => {
          return (
            <BoardWrap key={item.id}>
              <View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    props.navigation.navigate('BoardInfo', {
                      board: item,
                    })
                  }}
                >
                  <Map>
                    <ImageBackground
                      style={{
                        height: 164,
                        resizeMode: 'cover',
                        width: '100%',
                      }}
                      source={require('../../assets/images/map.jpg')}
                    >
                      <LinearGradient
                        //  colors={['#fff', 'rgba(255,255,255,0)']}
                        colors={['#fff', 'rgba(255,255,255,0)']}
                        // start={[0,0]}
                        // end={[1,1]}
                      >
                        <UserWrap>
                          <View
                            style={{
                              borderWidth: 3,
                              borderRadius: 50,
                              borderColor: colors.themeYellow,
                            }}
                          >
                            <Image
                              style={{
                                height: 50,
                                width: 50,
                                borderRadius: 50,
                              }}
                              source={{ uri: item.u_image }}
                            />
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
                          <View style={{ flex: 1, marginLeft: 15 }}>
                            <View style={{ alignSelf: 'flex-start' }}>
                              <Text
                                style={{
                                  fontSize: 18,
                                  fontWeight: 'bold',
                                  color: colors.greyishBrown,
                                }}
                              >
                                {item.u_fullname}
                              </Text>
                              <Ionicons
                                style={{ position: 'absolute', right: -15 }}
                                name="ios-checkmark-circle"
                                color={colors.linkBlue}
                              />
                            </View>
                            <Text>
                              5
                              <MaterialCommunityIcons
                                name="star"
                                size={15}
                                color={colors.themeYellow}
                              />
                            </Text>
                          </View>
                        </UserWrap>
                      </LinearGradient>
                    </ImageBackground>
                    {/* <Image
                      style={{
                        height: 100,
                        resizeMode: 'cover',
                        width: '100%',
                      }}
                      source={require('../../assets/images/map.jpg')}
                    /> */}
                  </Map>
                </TouchableOpacity>
                <PickWrap>
                  <Feather name="arrow-up-circle" color="black" size={18} />
                  <View style={{ marginLeft: 10 }}>
                    <TextGrey>
                      Pick up {moment(item.pickup_date).format('MMM DD')}
                    </TextGrey>
                    <AddressText>{item.pickup_address}</AddressText>
                  </View>
                  <View style={{ position: 'absolute', right: 10 }}>
                    <TouchableOpacity
                      onPress={() => {
                        setSheetUser({
                          id: item.u_id,
                          name: item.u_fullname,
                          image: item.u_image,
                        })
                        refRBSheetProfile.current.open()
                      }}
                    >
                      <Entypo name="dots-three-horizontal" size={20} />
                    </TouchableOpacity>
                  </View>
                </PickWrap>
                <DropWrap>
                  <Feather
                    name="arrow-down-circle"
                    color={colors.themeYellow}
                    size={18}
                  />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <TextGrey>
                      Drop off {moment(item.drop_date).format('MMM DD')}
                    </TextGrey>
                    <AddressText>{item.drop_address}</AddressText>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ color: colors.linkBlue }}>Available</Text>
                    <AddressText>{item.rate}</AddressText>
                  </View>
                </DropWrap>
                <DetailWrap>
                  <TextGrey>Livestock: 10</TextGrey>
                  <TextGrey>Loads: 1</TextGrey>
                  <TextGrey>Weight: {item.total_weight} lbs</TextGrey>
                  {/* <TextGrey> 1hrs</TextGrey> */}
                </DetailWrap>
              </View>
            </BoardWrap>
          )
        }}
      />
    </Container>
  )
}

const SecondRoute = ({
  trailerBoards,
  genRandom,
  fetchTrailerAgain,
  props,
}) => (
  <Container>
    {/* {loading && <ActivityIndicator color="#000" />} */}
    <FlatList
      data={trailerBoards}
      extraData={trailerBoards}
      keyExtractor={(item) => genRandom()}
      onEndReached={fetchTrailerAgain}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <BoardWrap>
          <UserWrap>
            <Image
              style={{ height: 50, width: 50, borderRadius: 50 }}
              source={{
                uri: item.u_image || 'https://i.imgur.com/RYi5Qho.png',
              }}
            />
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: colors.greyishBrown,
                }}
              >
                {item.u_fullname || 'Name'}
              </Text>
              <Text>
                5
                <MaterialCommunityIcons
                  name="star"
                  size={15}
                  color={colors.themeYellow}
                />
              </Text>
            </View>
            <Entypo name="dots-three-horizontal" size={20} />
          </UserWrap>
          <TrailerTypeWrap>
            <View style={{ marginLeft: 10 }}>
              <TextGrey>Trailer Type - {item.t_name}</TextGrey>
              <Image
                style={{
                  height: 60,
                  width: '100%',
                  resizeMode: 'contain',
                  marginTop: 5,
                }}
                source={{
                  uri: item.t_image,
                }}
              />
            </View>
          </TrailerTypeWrap>
          <PickWrap>
            <View style={{ marginLeft: 10 }}>
              <TextGrey>Location</TextGrey>
              <AddressText>Birminghan, AL 12345</AddressText>
            </View>
          </PickWrap>
          <DetailWrap>
            <TextGrey>Carries: {item.t_lstype}</TextGrey>
            <TextGrey>30 min</TextGrey>
          </DetailWrap>
        </BoardWrap>
      )}
    />
  </Container>
)

const LoadBoards = (props) => {
  const [boards, setBoards] = useState([])
  const [trailerBoards, setTrailerBoards] = useState([])
  const [loading, setLoading] = useState(false)
  const [trailerLoading, setTrailerLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [trailerPage, setTrailerPage] = useState(0)
  const [index, setIndex] = React.useState(0)
  const [user, setUser] = useState(null)
  const [showSearch, setShowSearch] = useState(false)
  const [deviceToken, setDeviceToken] = useState('')
  const [sheetUser, setSheetUser] = useState({})

  const refRBSheet = useRef()
  const refRBSheetProfile = useRef()

  const toggleShowSearch = () => {
    setShowSearch(!showSearch)
  }

  useEffect(() => {
    registerForPushNotificationsAsync()
    getUser()
    fetchLoadBoards()
    fetchTrailerBoards()
    openRBSheet()
    firstVisitFunction()
    askPermission()
  }, [])

  useEffect(() => {
    props.navigation.setParams({ index, toggleShowSearch })
  }, [index, showSearch])

  const askPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)

    if (status !== 'granted') {
    }
  }

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    )
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }
    token = await Notifications.getExpoPushTokenAsync()
    await AsyncStorage.setItem('PUSH_TOKEN', token)
    try {
      let userId = await AsyncStorage.getItem('USER_ID')
      const response = await fetch(`${api_url}?action=updatepushtoken`, {
        method: 'POST',
        body: JSON.stringify({ id: userId, push_token: token }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.log(error)
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      })
    }
  }

  const firstVisitFunction = async () => {
    let userString = await AsyncStorage.getItem('USER')
    userString = JSON.parse(userString)
    const pushToken = await AsyncStorage.getItem('PUSH_TOKEN')
    // const id = await AsyncStorage.getItem('USER_ID')
    // const userName = await AsyncStorage.getItem('USER_NAME')
    const fromSignup = props.navigation.getParam('fromSignup')
    if (fromSignup) {
      refRBSheet.current.open()
      await fetch(
        `https://conveyenceoffice.livestockloader.com/notification/index.php?token=${pushToken}&msg=${userString.u_fullname}%20Complete%20your%20account&sender_id=${userString.u_id}&receiver_id=${userString.u_id}&sender_name=${userString.u_fullname}&message_type=completeaccount`
      )

      await fetch(
        `https://conveyenceoffice.livestockloader.com/emailservice/index.php?email=${userString.u_email}&token=${pushToken}&type=sendverifyemail`
      )
    }
  }

  const openRBSheet = () => {
    const fromSignup = props.navigation.getParam('fromSignup')
    if (fromSignup) {
      refRBSheet.current.open()
    }
  }

  const getUser = async () => {
    const userString = await AsyncStorage.getItem('USER')
    setUser(JSON.parse(userString))
  }

  const fetchLoadBoards = async () => {
    setLoading(true)
    try {
      const token = await AsyncStorage.getItem('USER_TOKEN')
      const response = await fetch(`${api_url}?action=getloadboards`, {
        method: 'POST',
        body: JSON.stringify({ token, page: page }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      if (json.status === '200') {
        setBoards(json.data)
      }
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTrailerBoards = async () => {
    try {
      const token = await AsyncStorage.getItem('USER_TOKEN')
      const response = await fetch(`${api_url}?action=gettrailersboards`, {
        method: 'POST',
        body: JSON.stringify({ token, page: trailerPage }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      if (json.status === '200') {
        setTrailerBoards(json.data)
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const fetchLoadAgain = async () => {
    let newPage = page + 1
    try {
      const token = await AsyncStorage.getItem('USER_TOKEN')
      const response = await fetch(`${api_url}?action=getloadboards`, {
        method: 'POST',
        body: JSON.stringify({ token, page: newPage }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      if (json.data !== null) {
        setBoards([...boards, ...json.data])
        setPage(newPage + 1)
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const fetchTrailerAgain = async () => {
    setLoading(true)
    let newPage = trailerPage + 1
    try {
      const token = await AsyncStorage.getItem('USER_TOKEN')
      const response = await fetch(`${api_url}?action=gettrailersboards`, {
        method: 'POST',
        body: JSON.stringify({ token, page: newPage }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      if (json.data !== null) {
        setTrailerBoards([...trailerBoards, ...json.data])
        setTrailerPage(newPage + 1)
      }
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setLoading(false)
    }
  }

  const initialLayout = { width: Dimensions.get('window').width }

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return (
          <FirstRoute
            loading={loading}
            boards={boards}
            genRandom={genRandom}
            fetchLoadAgain={fetchLoadAgain}
            props={props}
            setSheetUser={setSheetUser}
            refRBSheetProfile={refRBSheetProfile}
          />
        )
      case 'second':
        return (
          <SecondRoute
            loading={loading}
            trailerBoards={trailerBoards}
            genRandom={genRandom}
            fetchTrailerAgain={fetchTrailerAgain}
            props={props}
          />
        )
      default:
        return null
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <RBSheet
        height={300}
        ref={refRBSheet}
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
        <ActionSheetWrapper>
          <ActionSheetText>
            You are all set! Let's get you started!
          </ActionSheetText>
          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.close()
              props.navigation.navigate('EditProfile', {
                profile: user,
              })
            }}
            style={{ marginTop: 40 }}
          >
            <CustomButtonWithoutShadow>
              <ButtonText>COMPLETE PROFILE</ButtonText>
            </CustomButtonWithoutShadow>
          </TouchableOpacity>
        </ActionSheetWrapper>
      </RBSheet>

      <RBSheet
        height={300}
        ref={refRBSheetProfile}
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
          <BottomSheetImage source={{ uri: sheetUser.image }} />
          <ActionSheetText>{sheetUser.name}</ActionSheetText>
          <TouchableOpacity
            onPress={() => {
              refRBSheetProfile.current.close()
              props.navigation.navigate('Chat', {
                friendId: sheetUser.id,
                friendName: sheetUser.name,
                friendImage: sheetUser.image,
                userId: user.u_id,
                userName: user.u_fullname,
                userImage: user.u_image,
              })
            }}
          >
            <BottomSheetOption>
              <MaterialCommunityIcons name="chat" size={15} color="gray" />
              <Text
                style={{ color: colors.linkBlue, fontSize: 18, marginLeft: 10 }}
              >
                Message
              </Text>
            </BottomSheetOption>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:+1`)
            }}
          >
            <BottomSheetOption>
              <MaterialIcons name="phone" size={15} color="gray" />
              <Text
                style={{ color: colors.linkBlue, fontSize: 18, marginLeft: 10 }}
              >
                Call
              </Text>
            </BottomSheetOption>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <View
        style={{
          height: 20,
          width: '100%',
          backgroundColor: colors.greyishBrown,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={[styles.circle, !index && styles.circleActive]}></View>
        <View style={[styles.circle, index && styles.circleActive]}></View>
      </View>
      {showSearch && (
        <View style={{ padding: 20, backgroundColor: colors.greyishBrown }}>
          <CustomInput placeholder="Search" style={{ marginBottom: 0 }} />
        </View>
      )}

      <TabView
        renderTabBar={() => null}
        navigationState={{
          index,
          routes: [
            { key: 'first', title: 'Loads' },
            { key: 'second', title: 'Trailer' },
          ],
        }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
      <ButtonWrapper>
        <BottomButton>
          <MapButton>
            <Feather name="map" size={15} />
            <ButtonTextLocal>Map</ButtonTextLocal>
          </MapButton>
          {/* <LineCreate /> */}
          <FilterButton>
            <Octicons name="settings" size={15} />
            <ButtonTextLocal>Filter</ButtonTextLocal>
          </FilterButton>
        </BottomButton>
      </ButtonWrapper>
    </View>
  )
}

LoadBoards.navigationOptions = ({ navigation }) => {
  let title = ''
  let idx = navigation.getParam('index')
  let toggle = navigation.getParam('toggleShowSearch')
  // alert(JSON.stringify(navigation))
  if (idx === 0) {
    title = 'Load Board'
  } else {
    title = 'Trailer Board'
  }

  return {
    title: title,
    // headerLeft: () => (
    //   <TouchableOpacity onPress={() => navigation.goBack(null)} style={{marginLeft: 15}}>
    //       <Ionicons name="ios-arrow-round-back" color="#fff" size={30} />
    //   </TouchableOpacity>
    // ),
    headerRight: () => (
      <TouchableWithoutFeedback onPress={toggle}>
        <Feather
          name="search"
          style={{ marginRight: 15 }}
          color="#fff"
          size={20}
        />
      </TouchableWithoutFeedback>
    ),
  }
}

const styles = StyleSheet.create({
  circle: {
    height: 8,
    width: 8,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 4,
    marginBottom: 10,
  },
  circleActive: {
    backgroundColor: colors.themeYellow,
  },
})

export default LoadBoards
