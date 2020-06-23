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
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native'
import MapView from 'react-native-maps'
import RNPickerSelect from 'react-native-picker-select'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import { CustomButton, ButtonText } from '../../constants/CommonStyles'
import {
  Feather,
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons'
import moment from 'moment'
import { api_url } from '../../constants/Api'

const Container = styled.View`
  flex: 1;
  padding: 20px;
  margin-bottom: 40;
`

const Bar = styled.View`
  border-radius: 8;
  background-color: #f7f7f7;
  elevation: 1;
  margin: 10px 0px 20px;
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
  margin-bottom: 1px;
`

const DetailValue = styled.Text`
  color: ${colors.linkBlue};
  font-size: 15px;
`

const Float = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-horizontal: 25px;
`

const Map = styled.View`
  height: 130px;
  width: 100%;
`

const lsType = [
  { label: 'Bull', value: 'bull' },
  { label: 'Cow', value: 'cow' },
  { label: 'Heifer', value: 'heifer' },
  { label: 'Fats', value: 'fats' },
  { label: 'Calf', value: 'calf' },
]
const qty = [
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '30', value: '30' },
  { label: '40', value: '40' },
  { label: '50', value: '50' },
]

const LoadInfo = (props) => {
  const load = props.navigation.getParam('load')
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    props.navigation.setParams({
      ld: load,
    })
  }, [])

  const deleteLoad = async () => {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem('USER_TOKEN')
      const res = await fetch(`${api_url}?action=deleteload`, {
        method: 'POST',
        body: JSON.stringify({
          token,
          id: load.id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await res.json()
      setLoading(false)
      if (json.status === '200') {
        Alert.alert(
          '',
          'Load deleted',
          [
            {
              text: 'OK',
              onPress: () => props.navigation.goBack(),
            },
          ],
          { cancelable: false }
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
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
              {/* <DetailValue>{load.no_of_loads}</DetailValue> */}
            </DetailWrap>
            <FlatList
              data={load.live_stock_type}
              renderItem={({ item }) => {
                return (
                  <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <View style={{ flex: 1, marginRight: 5 }}>
                      <RNPickerSelect
                        // Icon={() => (
                        //   <MaterialCommunityIcons
                        //     name="chevron-down"
                        //     size={15}
                        //   />
                        // )}
                        disabled={true}
                        items={lsType}
                        onValueChange={() => {}}
                        value={item.name}
                        style={{
                          inputAndroid: styles.picker,
                          inputIOS: styles.picker,
                          iconContainer: {
                            paddingTop: 18,
                            paddingRight: 5,
                          },
                        }}
                      />
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 5 }}>
                      <RNPickerSelect
                        // Icon={() => (
                        //   <MaterialCommunityIcons
                        //     name="chevron-down"
                        //     size={15}
                        //   />
                        // )}
                        disabled={true}
                        onValueChange={() => {}}
                        value={item.qty}
                        items={qty}
                        style={{
                          inputAndroid: styles.picker,
                          inputIOS: styles.picker,
                          iconContainer: {
                            paddingTop: 18,
                            paddingRight: 5,
                          },
                        }}
                      />
                    </View>
                  </View>
                )
              }}
            />
            <DetailWrap>
              <Text>Rate</Text>
              <DetailValue>{load.rate}</DetailValue>
            </DetailWrap>
          </Bar>
        </Container>
      </ScrollView>
      <Float>
        <TouchableOpacity onPress={() => deleteLoad()}>
          {loading ? (
            <ActivityIndicator color="red" />
          ) : (
            <CustomButton>
              <ButtonText>DELETE</ButtonText>
            </CustomButton>
          )}
        </TouchableOpacity>
      </Float>
    </>
  )
}

LoadInfo.navigationOptions = ({ navigation }) => ({
  title: 'Load Info',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => navigation.goBack(null)}
      style={{ marginLeft: 15 }}
    >
      <Ionicons name="ios-arrow-round-back" color="#fff" size={30} />
    </TouchableOpacity>
  ),
  headerRight: () => (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('EditLoad', {
          load: navigation.getParam('ld'),
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
})

const styles = StyleSheet.create({
  picker: {
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#fff',
  },
})

export default LoadInfo
