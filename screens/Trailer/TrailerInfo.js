import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import { CustomButton, ButtonText } from '../../constants/CommonStyles'
import { api_url } from '../../constants/Api'
import { MaterialCommunityIcons , Ionicons } from '@expo/vector-icons'
const CardWrapper = styled.View`
  padding: 20px;
  margin-bottom: 40;
`
const Card = styled.View`
  background-color: ${colors.lightGrey};
  margin: 20px 0;
  padding: 10px;
  border-radius: 5px;
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
const CustomInput = styled.TextInput`
  background-color: rgb(240, 240, 240);
  padding: 1px 10px;
  margin-horizontal: 5px;
  border-radius: 5px;
`
const CompartmentWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 10px;
`
const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`
const AboutWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`

const MeasurementWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 10px;
`

const MValueWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const ValueText = styled.Text`
  color: ${colors.linkBlue};
`

const CrossText = styled.Text`
  color: ${colors.linkBlue};
  margin-horizontal: 10px;
`

const Float = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-horizontal: 25px;
`

const TrailerInfo = (props) => {
  const [loading, setLoading] = useState(false)

  const trailer = props.navigation.getParam('trailer')
  useEffect(() => {
    props.navigation.setParams({ trail: trailer, title: trailer.t_name })
  }, [])

  const deleteTrailer = async () => {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem('USER_TOKEN')
      const res = await fetch(`${api_url}?action=deletetrailer`, {
        method: 'POST',
        body: JSON.stringify({
          token,
          id: trailer.id,
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
          'Trailer deleted',
          [
            {
              text: 'OK',
              onPress: () => props.navigation.navigate('MyTrailers'),
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
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView>
          <View>
            <View style={{ width: '100%', height: 180, padding: 20 }}>
              <Image
                style={{
                  flex: 1,
                  width: undefined,
                  height: undefined,
                  resizeMode: 'contain',
                  top: 10,
                }}
                source={{ uri: trailer.t_image }}
              />
            </View>
            <Text style={{ textAlign: 'center' }}>
              Type: {trailer.t_trailertype}
            </Text>
            <CardWrapper>
              <Card>
                <CardTitle>Trailer Measurement</CardTitle>
                {trailer.t_cmeasurement.map((item) => {
                  return (
                    <MeasurementWrap key={Object.keys(item)[0]}>
                      <Text>{Object.keys(item)[0]}</Text>
                      <MValueWrap>
                        <ValueText>{Object.values(item)[0].L}"L</ValueText>
                        <CrossText>x</CrossText>
                        <ValueText>{Object.values(item)[0].W}"W</ValueText>
                        <CrossText>x</CrossText>
                        <ValueText>{Object.values(item)[0].H}"H</ValueText>
                      </MValueWrap>
                    </MeasurementWrap>
                  )
                })}
              </Card>

              <Card>
                <CardTitle>About Trailer</CardTitle>
                <AboutWrapper>
                  <Text>Trailer Name</Text>
                  <Text style={{ color: colors.linkBlue }}>
                    {trailer.t_name}
                  </Text>
                </AboutWrapper>
                <AboutWrapper>
                  <Text>Trailer Type</Text>
                  <Text style={{ color: colors.linkBlue }}>
                    {trailer.t_trailertype}
                  </Text>
                </AboutWrapper>
                <AboutWrapper>
                  <Text>Carries</Text>
                  <Text style={{ color: colors.linkBlue }}>
                    {trailer.t_lstype}
                  </Text>
                </AboutWrapper>
                <AboutWrapper>
                  <Text>Vin Number</Text>
                  <Text style={{ color: colors.linkBlue }}>
                    {trailer.t_vin}
                  </Text>
                </AboutWrapper>
              </Card>
            </CardWrapper>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Float>
        <TouchableOpacity onPress={() => deleteTrailer()}>
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

const Compartment = (props) => {
  const [measurement, setMeasurement] = useState({})
  return (
    <CompartmentWrapper>
      <Text>Compartment {props.value}</Text>
      <InputWrapper>
        <CustomInput placeholder="L" maxLength={5} keyboardType="numeric" />
        <Text>x</Text>
        <CustomInput placeholder="W" maxLength={5} keyboardType="numeric" />
        <Text>x</Text>
        <CustomInput placeholder="H" maxLength={5} keyboardType="numeric" />
      </InputWrapper>
    </CompartmentWrapper>
  )
}

TrailerInfo.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('title'),
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
      borderBottomWidth: 0, //for ios
    },
    headerTintColor: '#fff',
    headerRight: () => (
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('EditTrailer', {
            tr: navigation.getParam('trail'),
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
  }
}

export default TrailerInfo
