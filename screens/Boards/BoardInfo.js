import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Image,
  Modal,
} from 'react-native'
import styled from 'styled-components/native'
import MapView from 'react-native-maps'
import {
  Entypo,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import moment from 'moment'
import { api_url } from '../../constants/Api'
import colors from '../../constants/Colors'
import { Ionicons, Octicons } from '@expo/vector-icons'
import timeSince from '../../constants/TimeSince'

const ParentView = styled.View`
  position: relative;
`

const ButtonWrapper = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-horizontal: 25px;
  overflow: hidden;
  align-items: center;
`

const Container = styled.View`
  flex: 1;
  padding: 20px;
  margin-bottom: 40px;
`

const Bar = styled.View`
  border-radius: 8;
  background-color: #f7f7f7;
  elevation: 1;
  margin: 10px 0px 10px;
  padding: 20px 15px;
  justify-content: space-around;
`

const BarLineOne = styled.View`
  flex-direction: row;
  align-items: center;
`

const BarLineOneText = styled.Text`
  color: grey;
  margin-left: 10px;
  font-weight: bold;
`

const BarLineTwo = styled.View`
  background-color: #f0f0f0;
  margin-top: 15px;
  padding: 10px;
  border-radius: 8;
`

const BarLineThree = styled.View``

const Address = styled.View`
  margin: 10px;
`

const DetailWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  margin-bottom: 0px;
`

const DetailValue = styled.Text`
  color: ${colors.linkBlue};
  font-size: 15px;
`

const UserWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 0.5;
  padding-bottom: 10;
  border-bottom-color: ${colors.darkGrey};
`

export const CustomButton = styled.View`
  background-color: ${colors.themeYellow};
  padding: 10px 20px;
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: center;
`

const ButtonText = styled.Text`
  font-family: 'pt-mono-bold';
  color: ${colors.greyishBrown};
  margin-left: 10;
`

const Comment = styled.View`
  border-color: #f7f7f7;
  border-bottom-color: #e2e2e2;
  border-width: 1px;
  margin-bottom: 10px;
  padding-bottom: 10px;
`

const ImgPlaceholder = styled.View`
  height: 50;
  width: 50;
  border-radius: 50;
  background-color: grey;
`

const Map = styled.View`
  height: 130px;
  width: 100%;
`
const CallButton = styled.View`
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
const ChatButton = styled.TouchableOpacity`
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
const LoadInfo = (props) => {
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [currentUserIdName, setCurrentUserIdName] = useState({})
  const load = props.navigation.getParam('board')

  useEffect(() => {
    props.navigation.setParams({
      title: load.u_fullname,
    })
    getCurrentUserIdName()
  }, [])

  const getCurrentUserIdName = async () => {
    const id = await AsyncStorage.getItem('USER_ID')
    const name = await AsyncStorage.getItem('USER_NAME')
    const image = await AsyncStorage.getItem('USER_IMAGE')

    setCurrentUserIdName({
      id,
      name,
      image,
    })
  }

  return (
    <ParentView>
      <ScrollView>
        <Modal
          onRequestClose={() => setModalVisible(!modalVisible)}
          animationType="fade"
          transparent={false}
          visible={modalVisible}
        >
          <View>
            <MapView
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 15,
                overflow: 'hidden',
              }}
              showsMyLocationButton={true}
              showsUserLocation={true}
              region={{
                latitude: 37.88825,
                longitude: -121.453,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0831,
              }}
            />
            <Text
              style={{
                position: 'absolute',
                right: 30,
                bottom: 30,
                backgroundColor: 'white',
                padding: 10,
                color: 'red',
              }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              CLOSE
            </Text>
          </View>
        </Modal>
        <Map>
          <MapView
            style={{
              height: 130,
              width: '100%',
              borderRadius: 15,
              overflow: 'hidden',
            }}
            showsMyLocationButton={true}
            showsUserLocation={true}
            region={{
              latitude: 37.88825,
              longitude: -121.453,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0831,
            }}
          />
          <View
            style={{
              position: 'absolute',
              right: 10,
              bottom: 10,
              backgroundColor: 'white',
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <MaterialIcons
                name="zoom-out-map"
                size={30}
                color={colors.greyishBrown}
              />
            </TouchableOpacity>
          </View>
        </Map>
        <Container>
          <UserWrap>
            <Image
              style={{ height: 50, width: 50, borderRadius: 50 }}
              source={{ uri: load.u_image }}
            />
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: colors.greyishBrown,
                }}
              >
                {load.u_fullname}
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
            <View style={{ alignItems: 'flex-end' }}>
              <Entypo name="dots-three-horizontal" size={20} />
              <Text style={{ marginTop: 10, color: colors.linkBlue }}>
                Available
              </Text>
              <Text style={{ fontSize: 18, fontFamily: 'pt-mono' }}>
                {load.rate}
              </Text>
            </View>
          </UserWrap>
          <View
            style={{
              marginBottom: 15,
              alignSelf: 'flex-end',
            }}
          >
            <Text style={{ color: colors.littleDarkGrey }}>
              Posted {moment(load.created_at).fromNow()}
            </Text>
          </View>
          <Bar>
            <BarLineOne>
              <Feather name="arrow-up-circle" color="grey" size={18} />
              <BarLineOneText>Pick Up</BarLineOneText>
            </BarLineOne>

            <BarLineTwo>
              <Text style={{ fontWeight: 'bold', color: colors.greyishBrown }}>
                {moment(load.pickup_date).format('MMM DD')} {load.pickup_time}
              </Text>
            </BarLineTwo>

            <BarLineThree>
              <Address>
                <Text>{load.pickup_address}</Text>
              </Address>
            </BarLineThree>
          </Bar>
          <Bar>
            <BarLineOne>
              <Feather name="arrow-down-circle" color="grey" size={18} />
              <BarLineOneText>Drop off</BarLineOneText>
            </BarLineOne>

            <BarLineTwo>
              <Text style={{ fontWeight: 'bold', color: colors.greyishBrown }}>
                {moment(load.drop_date).format('MMM DD')} {load.drop_time}
              </Text>
            </BarLineTwo>

            <BarLineThree>
              <Address>
                <Text>{load.drop_address}</Text>
              </Address>
            </BarLineThree>
          </Bar>
          <Bar>
            <BarLineOne>
              <BarLineOneText>Load Details</BarLineOneText>
            </BarLineOne>
            <DetailWrap>
              <Text>Weight</Text>
              <DetailValue>{load.total_weight}</DetailValue>
            </DetailWrap>
            <DetailWrap>
              <Text>Loads</Text>
              <DetailValue>1</DetailValue>
            </DetailWrap>
            <DetailWrap>
              <Text>Livestock</Text>
              <DetailValue>{load.no_of_loads}</DetailValue>
            </DetailWrap>
            <DetailWrap>
              <Text>Rate</Text>
              <DetailValue>{load.rate}</DetailValue>
            </DetailWrap>
          </Bar>
          <Bar>
            <Text>{load.u_fullname}</Text>
            <Text>512-789456</Text>
          </Bar>
          <Bar>
            <BarLineOne>
              <BarLineOneText>Company</BarLineOneText>
            </BarLineOne>
            <Text style={{ marginTop: 10 }}>Route Abc, LLC</Text>
            <Text>101, My Street</Text>
            <Text>Dallas, TX 425123</Text>
          </Bar>
          <Bar>
            <BarLineOne>
              <BarLineOneText>Ratings</BarLineOneText>
            </BarLineOne>
            <View style={{ marginTop: 10 }}>
              <Comment>
                <UserWrap>
                  <ImgPlaceholder></ImgPlaceholder>
                  <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: colors.greyishBrown,
                      }}
                    >
                      Jane Doe
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
                </UserWrap>
                <Text>He deliver livestock loads on time.</Text>
              </Comment>
              <Comment>
                <UserWrap>
                  <View></View>
                  <ImgPlaceholder></ImgPlaceholder>
                  <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: colors.greyishBrown,
                      }}
                    >
                      John Doe
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
                </UserWrap>
                <Text>My livestock was safely delivered.</Text>
              </Comment>
            </View>
          </Bar>
        </Container>
      </ScrollView>
      {/* <ButtonWrapper>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <CustomButton>
            <MaterialIcons name="phone" size={15} />
            <ButtonText>Call</ButtonText>
          </CustomButton>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              props.navigation.navigate('Chat', {
                friendId: load.u_id,
                friendName: load.u_fullname,
                friendImage: load.u_image,
                userId: currentUserIdName.id,
                userName: currentUserIdName.name,
                userImage: currentUserIdName.image,
              })
            }
          >
            <CustomButton>
              <MaterialCommunityIcons name="chat" size={15} />
              <ButtonText>Chat</ButtonText>
            </CustomButton>
          </TouchableOpacity>
        </View>
      </ButtonWrapper> */}
      <ButtonWrapper>
        <BottomButton>
          <CallButton>
            <MaterialIcons name="phone" size={15} />
            <ButtonTextLocal>Call</ButtonTextLocal>
          </CallButton>
          {/* <LineCreate /> */}
          <ChatButton
            onPress={() =>
              props.navigation.navigate('Chat', {
                friendId: load.u_id,
                friendName: load.u_fullname,
                friendImage: load.u_image,
                userId: currentUserIdName.id,
                userName: currentUserIdName.name,
                userImage: currentUserIdName.image,
              })
            }
          >
            <MaterialCommunityIcons name="chat" size={15} />
            <ButtonTextLocal>Chat</ButtonTextLocal>
          </ChatButton>
        </BottomButton>
      </ButtonWrapper>
    </ParentView>
  )
}

LoadInfo.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title'),
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => navigation.goBack(null)}
      style={{ marginLeft: 15 }}
    >
      <Ionicons name="ios-arrow-round-back" color="#fff" size={30} />
    </TouchableOpacity>
  ),
})

export default LoadInfo
