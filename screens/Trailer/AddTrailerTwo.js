import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
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
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { MaterialCommunityIcons , Ionicons } from '@expo/vector-icons'
import colors from '../../constants/Colors'
import alphabets from '../../constants/AlphabetsArray'
import { CustomButton, ButtonText } from '../../constants/CommonStyles'
import { api_url } from '../../constants/Api'
const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  padding-bottom: 0;
`

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

const AddTrailerTwo = (props) => {
  const [trailerInfo, setTrailerInfo] = useState({})
  const [trailerMeasurement, setTrailerMeasurement] = useState({})
  const [loading, setLoading] = useState(false)
  const [fillErr, setFillErr] = useState({
    name: false,
    livestockType: false,
    vin: false,
  })

  // const name_input = useRef(null)
  const lstype_input = useRef(null)
  const vin_input = useRef(null)

  //getParam return an array of only selected trailer object
  //therfore [0] is there
  const trailer = props.navigation.getParam('selectedTrailer')[0]
  const compartments = trailer.t_noofcompart
  const compartToRender = alphabets.slice(0, parseInt(compartments))

  const addTrailer = async () => {
    setFillErr({
      ...fillErr,
      name: trailerInfo.name ? false : true,
      livestockType: trailerInfo.livestockType ? false : true,
      vin: trailerInfo.vin ? false : true,
    })
    // for loop convert trailerMeasurement object to array objects
    let arr = []
    for (item in trailerMeasurement) {
      arr.push({
        [item]: trailerMeasurement[item],
      })
    }
    let valid = false
    if (trailerInfo.name && trailerInfo.livestockType && trailerInfo.vin) {
      valid = true
    }

    let total = calcTotal()

    if (valid) {
      setLoading(true)
      try {
        const token = await AsyncStorage.getItem('USER_TOKEN')
        const res = await fetch(`${api_url}?action=addtrailer`, {
          method: 'POST',
          body: JSON.stringify({
            token,
            ...trailerInfo,
            trailerType: trailer.t_id,
            trailerMeasurement: arr,
            totalWeight: total,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const json = await res.json()
        if (json.status === '200') {
          console.log(json)
          setLoading(false)
          Alert.alert(
            '',
            'Trailer added successfully',
            [
              {
                text: 'OK',
                onPress: () =>
                  props.navigation.navigate('MyTrailers', { newTrailer: true }),
              },
            ],
            { cancelable: false }
          )
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
  }

  const calcTotal = () => {
    let l = 0
    let w = 0
    let h = 0

    for (const compartment in trailerMeasurement) {
      l += parseFloat(trailerMeasurement[compartment].L)
      w += parseFloat(trailerMeasurement[compartment].W)
      h += parseFloat(trailerMeasurement[compartment].H)
    }
    return { l, w, h }
  }

  return (
    <Container>
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            <Text style={{ textAlign: 'center', marginVertical: 20 }}>
              Complete your trailer information
            </Text>
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
            <Text style={{ textAlign: 'center' }}>Type: {trailer.t_name}</Text>
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

                {compartToRender.map((val) => {
                  return (
                    <Compartment
                      trailerMeasurement={trailerMeasurement}
                      setTrailerMeasurement={setTrailerMeasurement}
                      key={val}
                      value={val}
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
                  <TextInput
                    style={[
                      styles.customInput,
                      fillErr.name && styles.errorBorder,
                      {
                        width: 150,
                      },
                    ]}
                    maxLength={30}
                    returnKeyType="next"
                    onSubmitEditing={() => lstype_input.current.focus()}
                    blurOnSubmit={false}
                    onFocus={() => setFillErr({ ...fillErr, name: false })}
                    placeholder="Name"
                    onChangeText={(val) =>
                      setTrailerInfo({
                        ...trailerInfo,
                        name: val,
                      })
                    }
                  />
                </AboutWrapper>
                <AboutWrapper>
                  <Text>Trailer Type</Text>
                  <Text>{trailer.t_name}</Text>
                </AboutWrapper>
                <AboutWrapper>
                  <Text>Carries</Text>
                  <TextInput
                    ref={lstype_input}
                    returnKeyType="next"
                    onSubmitEditing={() => vin_input.current.focus()}
                    blurOnSubmit={false}
                    maxLength={20}
                    style={[
                      styles.customInput,
                      fillErr.livestockType && styles.errorBorder,
                      {
                        width: 150,
                      },
                    ]}
                    onFocus={() =>
                      setFillErr({ ...fillErr, livestockType: false })
                    }
                    placeholder="Livestock type"
                    onChangeText={(val) =>
                      setTrailerInfo({
                        ...trailerInfo,
                        livestockType: val,
                      })
                    }
                  />
                </AboutWrapper>
                <AboutWrapper>
                  <Text>Vin Number</Text>
                  <TextInput
                    maxLength={20}
                    ref={vin_input}
                    style={[
                      styles.customInput,
                      fillErr.vin && styles.errorBorder,
                      {
                        width: 150,
                      },
                    ]}
                    onFocus={() => setFillErr({ ...fillErr, vin: false })}
                    placeholder="VIN"
                    onChangeText={(val) =>
                      setTrailerInfo({
                        ...trailerInfo,
                        vin: val,
                      })
                    }
                  />
                </AboutWrapper>
              </Card>
              <KeyboardSpacer></KeyboardSpacer>
            </CardWrapper>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity
          onPress={() => {
            addTrailer()
          }}
        >
          <CustomButton>
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <ButtonText>ADD</ButtonText>
            )}
          </CustomButton>
        </TouchableOpacity>
      </View>
    </Container>
  )
}

const Compartment = (props) => {
  const [measurement, setMeasurement] = useState({})

  const l_input = useRef(null)
  const w_input = useRef(null)
  const h_input = useRef(null)

  return (
    <CompartmentWrapper>
      <Text>Compartment {props.value}</Text>
      <InputWrapper>
        <CustomInput
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

const styles = StyleSheet.create({
  customInput: {
    backgroundColor: 'rgb(240, 240, 240)',
    paddingVertical: 1,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  errorBorder: {
    borderColor: '#d66b6b',
    borderWidth: 1,
  },
})

AddTrailerTwo.navigationOptions = (navigation) => ({ 
  title: 'Add Trailer',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack(null)} style={{marginLeft: 15}}>
        <Ionicons name="ios-arrow-round-back" color="#fff" size={30} />
    </TouchableOpacity>
  ),
  headerStyle: {
    backgroundColor: colors.greyishBrown,
    elevation: 0, // for android
    shadowOpacity: 0, //for ios
    borderBottomWidth: 0, //for ios
  },
  headerTintColor: '#fff',
})

export default AddTrailerTwo
