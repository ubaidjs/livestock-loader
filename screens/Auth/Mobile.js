import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import styled from 'styled-components/native'
import RNPickerSelect from 'react-native-picker-select'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../../constants/Colors'
import {
  CustomButton,
  CustomInput,
  CustomButtonDisable,
  ButtonText,
  ButtonTextDisable,
} from '../../constants/CommonStyles'
import { api_url } from '../../constants/Api'

const Container = styled.View`
  padding: 30px 20px;
  padding-bottom: 10px;
  justify-content: space-between;
  flex: 1;
`

const ScreenTitle = styled.Text`
  font-size: 20px;
  padding: 20px;
  font-family: 'pt-mono-bold';
  text-align: center;
  color: ${colors.greyishBrown};
`

const TagLine = styled.Text`
  padding: 10px 50px 50px;
  text-align: center;
`

const CodeText = styled.Text`
  text-align: center;
  color: ${colors.warmGrey};
`
const MobileWrapper = styled.View``
const ButtonWrapper = styled.View``

const Mobile = (props) => {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('+1')
  const [country, setCountry] = useState('us')
  const [loading, setLoading] = useState(false)

  const countryList = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'canada' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Australia', value: 'australia' },
  ]

  const addPhoneNumber = async () => {
    setLoading(true)
    const token = await AsyncStorage.getItem('USER_TOKEN')
    try {
      const res = await fetch(`${api_url}?action=savenumber`, {
        method: 'POST',
        body: JSON.stringify({ token: token, mobileno: phone }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const json = await res.json()
      setLoading(false)
      if (json.status === '200') {
        props.navigation.navigate('Otp')
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <MobileWrapper>
          <ScreenTitle>Mobile Verification</ScreenTitle>
          <TagLine>
            Please verify your phone number so we know you are a real person.
          </TagLine>
          <View>
            <View style={{ marginBottom: 15 }}>
              <RNPickerSelect
                Icon={() => (
                  <MaterialCommunityIcons name="chevron-down" size={15} />
                )}
                placeholder={{}}
                items={countryList}
                onValueChange={(value) => {
                  setCountry(value)
                }}
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
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  backgroundColor: 'rgb(247, 247, 247)',
                  height: 49,
                  width: 49,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text>{code}</Text>
              </View>
              <CustomInput
                placeholder="Phone Number"
                keyboardType="phone-pad"
                maxLength={10}
                onChangeText={(val) => setPhone(val)}
                style={{ flex: 1 }}
              />
            </View>
          </View>
          <CodeText>We'll send you an SMS verification code.</CodeText>
        </MobileWrapper>
        <ButtonWrapper>
          {phone ? (
            <TouchableOpacity onPress={() => addPhoneNumber()}>
              <CustomButton>
                {loading ? (
                  <ActivityIndicator color={colors.greyishBrown} />
                ) : (
                  <ButtonText>SEND CODE</ButtonText>
                )}
              </CustomButton>
            </TouchableOpacity>
          ) : (
            <CustomButtonDisable>
              <ButtonTextDisable>SEND CODE</ButtonTextDisable>
            </CustomButtonDisable>
          )}
        </ButtonWrapper>
      </Container>
    </TouchableWithoutFeedback>
  )
}

Mobile.navigationOptions = {
  header: null,
}
const styles = StyleSheet.create({
  picker: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: 'rgb(247, 247, 247)',
  },
})
export default Mobile
