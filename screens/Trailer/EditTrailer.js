import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import alphabets from '../../constants/AlphabetsArray'
import { CustomButton, ButtonText } from '../../constants/CommonStyles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { api_url } from '../../constants/Api'
import { Ionicons } from '@expo/vector-icons'
const CardWrapper = styled.View`
  padding: 20px;
`
const Card = styled.View`
  background-color: ${colors.lightGrey};
  margin: 20px 0;
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

const Float = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-horizontal: 25px;
`

const EditTrailer = (props) => {
  const [trailer, setTrailer] = useState(props.navigation.getParam('tr'))
  const [trailerMeasurement, setTrailerMeasurement] = useState({})
  const [loading, setLoading] = useState(false)
  //seperate state instead of using from trailer bcoz the might be edited
  //by user
  const [trailerName, setTrailerName] = useState(
    props.navigation.getParam('tr').t_name
  )
  const [carries, setCarries] = useState(
    props.navigation.getParam('tr').t_lstype
  )
  const [vin, setVin] = useState(props.navigation.getParam('tr').t_vin)

  const updateTrailer = async () => {
    let arr = []
    for (item in trailerMeasurement) {
      arr.push({
        [item]: trailerMeasurement[item],
      })
    }

    try {
      setLoading(true)
      const token = await AsyncStorage.getItem('USER_TOKEN')
      const res = await fetch(`${api_url}?action=updatetrailer`, {
        method: 'POST',
        body: JSON.stringify({
          token,
          id: trailer.id,
          name: trailerName,
          livestockType: carries,
          trailerType: 3,
          trailerMeasurement: arr,
          vin: vin,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await res.json()
      if (json.status === '200') {
        setLoading(false)
        Alert.alert(
          '',
          'Trailer updated',
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
      <KeyboardAvoidingView
        style={{ flex: 1, marginBottom: 40 }}
        behavior="padding"
        enabled
      >
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
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <CardTitle>Trailer Measurement</CardTitle>
                    <MaterialCommunityIcons
                      name="pencil"
                      color={colors.greyishBrown}
                      size={15}
                    />
                  </View>
                  {trailer.t_cmeasurement.map((item) => {
                    return (
                      <Compartment
                        trailerMeasurement={trailerMeasurement}
                        setTrailerMeasurement={setTrailerMeasurement}
                        key={Object.keys(item)[0]}
                        value={Object.keys(item)[0]}
                        L={Object.values(item)[0].L}
                        W={Object.values(item)[0].W}
                        H={Object.values(item)[0].H}
                      />
                    )
                  })}
                </Card>

                <Card>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <CardTitle>About Trailer</CardTitle>
                    <MaterialCommunityIcons
                      name="pencil"
                      color={colors.greyishBrown}
                      size={15}
                    />
                  </View>
                  <AboutWrapper>
                    <Text>Trailer Name</Text>
                    <CustomInput
                      value={trailerName}
                      onChangeText={(val) => setTrailerName(val)}
                      style={{
                        width: 150,
                      }}
                    />
                  </AboutWrapper>
                  <AboutWrapper>
                    <Text>Trailer Type</Text>
                    <Text>{trailer.t_trailertype}</Text>
                  </AboutWrapper>
                  <AboutWrapper>
                    <Text>Carries</Text>
                    <CustomInput
                      value={carries}
                      onChangeText={(val) => setCarries(val)}
                      style={{
                        width: 150,
                      }}
                    />
                  </AboutWrapper>
                  <AboutWrapper>
                    <Text>Vin Number</Text>
                    <CustomInput
                      value={vin}
                      onChangeText={(val) => setVin(val)}
                      style={{
                        width: 150,
                      }}
                    />
                  </AboutWrapper>
                </Card>
              </CardWrapper>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Float>
        <TouchableOpacity onPress={() => updateTrailer()}>
          <CustomButton>
            {loading ? (
              <ActivityIndicator color={colors.greyishBrown} />
            ) : (
              <ButtonText>UPDATE</ButtonText>
            )}
          </CustomButton>
        </TouchableOpacity>
      </Float>
    </>
  )
}

const Compartment = (props) => {
  const [measurement, setMeasurement] = useState({
    L: props.L,
    W: props.W,
    H: props.H,
  })
  const l_input = useRef(null)
  const w_input = useRef(null)
  const h_input = useRef(null)

  return (
    <CompartmentWrapper>
      <Text>Compartment {props.value}</Text>
      <InputWrapper>
        <CustomInput
          value={measurement.L}
          ref={l_input}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => w_input.current.focus()}
          onEndEditing={() => {
            props.setTrailerMeasurement({
              ...props.trailerMeasurement,
              [props.value]: measurement,
            })
          }}
          placeholder="L"
          maxLength={5}
          keyboardType="numeric"
          onChangeText={(val) => {
            setMeasurement({
              ...measurement,
              L: val,
            })
          }}
        />
        <Text>x</Text>
        <CustomInput
          value={measurement.W}
          ref={w_input}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => h_input.current.focus()}
          onEndEditing={() => {
            props.setTrailerMeasurement({
              ...props.trailerMeasurement,
              [props.value]: measurement,
            })
          }}
          placeholder="W"
          maxLength={5}
          keyboardType="numeric"
          onChangeText={(val) => {
            setMeasurement({
              ...measurement,
              W: val,
            })
          }}
        />
        <Text>x</Text>
        <CustomInput
          value={measurement.H}
          ref={h_input}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => l_input.current.focus()}
          placeholder="H"
          maxLength={5}
          keyboardType="numeric"
          onChangeText={(val) => {
            setMeasurement({
              ...measurement,
              H: val,
            })
          }}
          onEndEditing={() => {
            props.setTrailerMeasurement({
              ...props.trailerMeasurement,
              [props.value]: measurement,
            })
          }}
        />
      </InputWrapper>
    </CompartmentWrapper>
  )
}

EditTrailer.navigationOptions = (navigation) =>({
  title: 'Edit Trailer',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack(null)} style={{marginLeft: 15}}>
        <Ionicons name="ios-arrow-round-back" color="#fff" size={30} />
    </TouchableOpacity>
  ),
})

export default EditTrailer
