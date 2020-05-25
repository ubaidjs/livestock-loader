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
} from 'react-native'
import MapView from 'react-native-maps'
import {
  Feather,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons'
import * as Permissions from 'expo-permissions'
import styled from 'styled-components/native'
import moment from 'moment'
import RBSheet from 'react-native-raw-bottom-sheet'
import genRandom from '../../constants/RandomNumber'
import {
  CustomButton,
  ButtonText,
  CustomInput,
} from '../../constants/CommonStyles'
import { TabView, SceneMap } from 'react-native-tab-view'
import { api_url } from '../../constants/Api'
import colors from '../../constants/Colors'

const Container = styled.View`
  flex: 1;
  padding-horizontal: 20px;
  padding-top: 20px;
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
`

const FilterButton = styled.View`
  background-color: ${colors.themeYellow};
  padding: 15px 10px;
  font-weight: bold;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const MapButton = styled.View`
  background-color: ${colors.themeYellow};
  padding: 15px 10px;
  font-weight: bold;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ButtonTextLocal = styled.Text`
  font-family: 'pt-mono-bold';
  color: ${colors.greyishBrown};
  margin-left: 10;
`

const FirstRoute = ({ loading, boards, genRandom, fetchLoadAgain }) => {
  return (
    <Container>
      {loading && <ActivityIndicator color="#000" />}
      <FlatList
        data={boards}
        extraData={boards}
        keyExtractor={(item) => genRandom()}
        onEndReached={() => fetchLoadAgain()}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => {
          return (
            <BoardWrap key={item.id}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  props.navigation.navigate('BoardInfo', {
                    board: item,
                  })
                }}
              >
                <View>
                  <UserWrap>
                    <Image
                      style={{ height: 50, width: 50, borderRadius: 50 }}
                      source={{ uri: item.u_image }}
                    />
                    <View style={{ flex: 1, marginLeft: 15 }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: colors.greyishBrown,
                        }}
                      >
                        {item.u_fullname}
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
                  <Map>
                    <Image
                      style={{
                        height: 100,
                        resizeMode: 'cover',
                        width: '100%',
                      }}
                      source={require('../../assets/images/map.jpg')}
                    />
                  </Map>
                  <PickWrap>
                    <Feather name="arrow-up-circle" color="black" size={18} />
                    <View style={{ marginLeft: 10 }}>
                      <TextGrey>
                        Pick up {moment(item.pickup_date).format('MMM DD')}
                      </TextGrey>
                      <AddressText>{item.pickup_address}</AddressText>
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
                      <AddressText>${item.rate}</AddressText>
                    </View>
                  </DropWrap>
                  <DetailWrap>
                    <TextGrey>Livestock: 10</TextGrey>
                    <TextGrey>Loads: 1</TextGrey>
                    <TextGrey>Weight: {item.total_weight} lbs</TextGrey>
                  </DetailWrap>
                </View>
              </TouchableOpacity>
            </BoardWrap>
          )
        }}
      />
    </Container>
  )
}

const SecondRoute = ({ trailerBoards, genRandom, fetchTrailerAgain }) => (
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
                uri: item.u_image,
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
                {item.u_fullname}
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

  const refRBSheet = useRef()

  const toggleShowSearch = () => {
    setShowSearch(!showSearch)
  }

  useEffect(() => {
    getUser()
    fetchLoadBoards()
    fetchTrailerBoards()
    openRBSheet()
    askPermission()
  }, [])

  useEffect(() => {
    props.navigation.setParams({ index, toggleShowSearch })
  }, [index, showSearch])

  const askPermission = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
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
          />
        )
      case 'second':
        return (
          <SecondRoute
            loading={loading}
            trailerBoards={trailerBoards}
            genRandom={genRandom}
            fetchTrailerAgain={fetchTrailerAgain}
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
            <CustomButton>
              <ButtonText>COMPLETE PROFILE</ButtonText>
            </CustomButton>
          </TouchableOpacity>
        </ActionSheetWrapper>
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
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <MapButton>
            <Feather name="map" size={15} />
            <ButtonTextLocal>Map</ButtonTextLocal>
          </MapButton>
          <FilterButton>
            <Octicons name="settings" size={15} />
            <ButtonTextLocal>Filter</ButtonTextLocal>
          </FilterButton>
        </View>
      </ButtonWrapper>
    </View>
  )
}

LoadBoards.navigationOptions = ({ navigation }) => {
  let title = ''
  let idx = navigation.getParam('index')
  let toggle = navigation.getParam('toggleShowSearch')

  if (idx === 0) {
    title = 'Load Board'
  } else {
    title = 'Trailer Board'
  }

  return {
    title: title,
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
