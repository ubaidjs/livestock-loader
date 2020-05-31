import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  AsyncStorage,
  ActivityIndicator,
  Alert,
} from 'react-native'
import styled from 'styled-components/native'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../../constants/Colors'
import { api_url } from '../../constants/Api'
import { CustomButton, ButtonText } from '../../constants/CommonStyles'

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

const CustomInputLocal = styled.TextInput`
  background-color: #fff;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
`
const DetailsInput = styled.TextInput`
  background-color: #fff;
  padding: 5px 10px;
  margin-horizontal: 5px;
  border-radius: 5px;
  width: 100px;
`

const DInputWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 10px;
`

const CheckboxWrap = styled.View`
  flex-direction: row;
  padding-horizontal: 10px;
  justify-content: center;
  margin-top: 10px;
`

const TitleText = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 20;
  color: ${colors.greyishBrown};
  margin-bottom: 20px;
`

const Label = styled.Text`
  color: ${colors.greyishBrown};
`

const Float = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-horizontal: 25px;
`

const EditLoad = (props) => {
  const loadParam = props.navigation.getParam('load')

  const [checked, setChecked] = useState(false)
  const [pickAddress, setPickAddress] = useState(loadParam.pickup_address)
  const [pickDate, setPickDate] = useState(loadParam.pickup_date)
  const [pickTime, setPickTime] = useState(loadParam.pickup_time)
  const [dropAddress, setDropAddress] = useState(loadParam.drop_address)
  const [dropDate, setDropDate] = useState(loadParam.drop_date)
  const [dropTime, setDropTime] = useState(loadParam.drop_time)
  const [details, setDetails] = useState(false)
  const [weight, setWeight] = useState(loadParam.total_weight)
  const [numOfLoad, setNumOfLoad] = useState(loadParam.no_of_loads)
  const [rate, setRate] = useState(loadParam.rate)

  const [loading, setLoading] = useState(false)
  const [fillErr, setFillErr] = useState(false)
  const [emptyFeilds, setEmptyFeilds] = useState({
    pickAddress: false,
    dropAddress: false,
    details: false,
    weight: false,
    numOfLoad: false,
    rate: false,
  })

  const load_input = useRef(null)
  const rate_input = useRef(null)

  const handleSubmit = async () => {
    setLoading(true)
    let valid = false
    if (pickAddress && dropAddress && details && weight && numOfLoad && rate) {
      valid = true
    }

    setEmptyFeilds({
      ...emptyFeilds,
      pickAddress: pickAddress ? false : true,
      dropAddress: dropAddress ? false : true,
      details: details ? false : true,
      weight: weight ? false : true,
      numOfLoad: numOfLoad ? false : true,
      rate: rate ? false : true,
    })

    if (valid) {
      try {
        const token = await AsyncStorage.getItem('USER_TOKEN')
        const response = await fetch(`${api_url}?action=updateload`, {
          method: 'POST',
          body: JSON.stringify({
            token,
            id: loadParam.id,
            pickUp: {
              date: pickDate,
              time: pickTime,
              address: pickAddress,
            },
            dropOff: {
              date: dropDate,
              time: dropTime,
              address: dropAddress,
            },
            loadDetails: {
              totalWeight: weight,
              numOfLoad: numOfLoad,
              rate: rate,
              livestockType: [{ name: 'name', qty: 'qty' }],
              private: checked,
            },
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const json = await response.json()
        if (json.status === '200') {
          Alert.alert('', 'Load saved', [
            {
              text: 'Go to Saved Loads',
              onPress: () => props.navigation.navigate('MyLoads'),
            },
          ])
        }
      } catch (error) {
        console.log('error: ', error)
      }
    } else {
      setFillErr(true)
    }
    setLoading(false)
  }

  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <ScrollView>
          <Container>
            <Bar>
              <BarLineOne>
                <Feather name="arrow-up-circle" color="grey" size={18} />
                <BarLineOneText>Pick Up</BarLineOneText>
              </BarLineOne>

              <BarLineTwo>
                <Text
                  style={{ fontWeight: 'bold', color: colors.greyishBrown }}
                >
                  {loadParam.pickup_date} | {loadParam.pickup_time}
                </Text>
              </BarLineTwo>

              <BarLineThree>
                <TextInput
                  value={pickAddress}
                  style={[
                    styles.customInputLocal,
                    emptyFeilds.pickAddress && styles.errorBorder,
                  ]}
                  onFocus={() =>
                    setEmptyFeilds({ ...emptyFeilds, pickAddress: false })
                  }
                  placeholder="Enter pick up address.."
                  multiline={true}
                  numberOfLines={5}
                  textAlignVertical="top"
                  maxLength={200}
                  onChangeText={(val) => setPickAddress(val)}
                />
              </BarLineThree>
            </Bar>
            <Bar>
              <BarLineOne>
                <Feather name="arrow-down-circle" color="grey" size={18} />
                <BarLineOneText>Drop Off</BarLineOneText>
              </BarLineOne>

              <BarLineTwo>
                <Text
                  style={{ fontWeight: 'bold', color: colors.greyishBrown }}
                >
                  {loadParam.drop_date} | {loadParam.drop_time}
                </Text>
              </BarLineTwo>

              <BarLineThree>
                <TextInput
                  value={dropAddress}
                  style={[
                    styles.customInputLocal,
                    emptyFeilds.dropAddress && styles.errorBorder,
                  ]}
                  onFocus={() =>
                    setEmptyFeilds({ ...emptyFeilds, dropAddress: false })
                  }
                  placeholder="Enter drop off address.."
                  multiline={true}
                  numberOfLines={5}
                  textAlignVertical="top"
                  maxLength={200}
                  onChangeText={(val) => setDropAddress(val)}
                />
              </BarLineThree>
            </Bar>
            <Bar>
              <BarLineOne>
                <BarLineOneText>Load Details</BarLineOneText>
              </BarLineOne>
              <TextInput
                value={details ? details : ''}
                style={[
                  styles.customInputLocal,
                  emptyFeilds.details && styles.errorBorder,
                ]}
                onFocus={() =>
                  setEmptyFeilds({ ...emptyFeilds, details: false })
                }
                placeholder="Load Details"
                multiline={true}
                numberOfLines={5}
                textAlignVertical="top"
                maxLength={200}
                onChangeText={(val) => setDetails(val)}
              />
              <DInputWrap>
                <Label>Load Total Weight (lbs)</Label>
                <TextInput
                  value={weight}
                  style={[
                    styles.detailsInput,
                    emptyFeilds.weight && styles.errorBorder,
                  ]}
                  onFocus={() =>
                    setEmptyFeilds({ ...emptyFeilds, weight: false })
                  }
                  placeholder="per load"
                  onChangeText={(val) => setWeight(val)}
                  keyboardType="numeric"
                  returnKeyType="next"
                  onSubmitEditing={() => load_input.current.focus()}
                  blurOnSubmit={false}
                />
              </DInputWrap>
              <DInputWrap>
                <Label>Number of Loads</Label>
                <TextInput
                  value={numOfLoad}
                  ref={load_input}
                  style={[
                    styles.detailsInput,
                    emptyFeilds.numOfLoad && styles.errorBorder,
                  ]}
                  onFocus={() =>
                    setEmptyFeilds({ ...emptyFeilds, numOfLoad: false })
                  }
                  placeholder="eg. 50"
                  onChangeText={(val) => setNumOfLoad(val)}
                  keyboardType="numeric"
                  returnKeyType="next"
                  onSubmitEditing={() => rate_input.current.focus()}
                  blurOnSubmit={false}
                />
              </DInputWrap>
              <DInputWrap>
                <Label>Rate</Label>
                <TextInput
                  value={rate}
                  ref={rate_input}
                  style={[
                    styles.detailsInput,
                    emptyFeilds.rate && styles.errorBorder,
                  ]}
                  onFocus={() =>
                    setEmptyFeilds({ ...emptyFeilds, rate: false })
                  }
                  placeholder="$"
                  onChangeText={(val) => setRate(val)}
                  keyboardType="numeric"
                />
              </DInputWrap>
              <TouchableWithoutFeedback onPress={() => setChecked(!checked)}>
                <CheckboxWrap>
                  {checked ? (
                    <MaterialCommunityIcons
                      name="checkbox-marked-outline"
                      color={colors.greyishBrown}
                      size={22}
                      style={{ marginRight: 5 }}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="checkbox-blank-outline"
                      color={colors.greyishBrown}
                      size={22}
                      style={{ marginRight: 5 }}
                    />
                  )}
                  <Text
                    style={{
                      paddingRight: 10,
                      lineHeight: 24,
                      color: colors.greyishBrown,
                    }}
                  >
                    Make load private. If private, this load will not be posted
                    in live boards. This load will only be visible to you unless
                    shared.
                  </Text>
                </CheckboxWrap>
              </TouchableWithoutFeedback>
            </Bar>
            {fillErr && (
              <Text
                style={{ color: 'red', textAlign: 'center', marginBottom: 5 }}
              >
                Please enter all details
              </Text>
            )}
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <Float>
        <TouchableOpacity
          onPress={() => {
            handleSubmit()
          }}
        >
          <CustomButton>
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <ButtonText>UPDATE</ButtonText>
            )}
          </CustomButton>
        </TouchableOpacity>
      </Float>
    </>
  )
}

const styles = StyleSheet.create({
  customInputLocal: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  errorBorder: {
    borderColor: '#d66b6b',
    borderWidth: 1,
  },
  detailsInput: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    width: 100,
  },
})

EditLoad.navigationOptions = {
  title: 'Edit Load',
}

export default EditLoad
