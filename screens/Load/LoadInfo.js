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
} from 'react-native'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import { CustomButton, ButtonText } from '../../constants/CommonStyles'
import { Feather, MaterialCommunityIcons , Ionicons} from '@expo/vector-icons'
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

const LoadInfo = (props) => {
  const [loading, setLoading] = useState(false)
  const load = props.navigation.getParam('load')

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
              <DetailValue>{load.no_of_loads}</DetailValue>
            </DetailWrap>
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
    <TouchableOpacity onPress={() => navigation.goBack(null)} style={{marginLeft: 15}}>
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

export default LoadInfo
