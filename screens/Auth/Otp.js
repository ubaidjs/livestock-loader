import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import { CustomButton, ButtonText } from '../../constants/CommonStyles'

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

const CodeText = styled.Text`
  text-align: center;

  color: ${colors.warmGrey};
`
const Invalid = styled.Text`
  color: red;
  text-align: center;
  margin-bottom: 10px;
`

const Otp = (props) => {
  const [code, setCode] = useState('initialState')
  const [msgshow, setMsgshow] = useState('')
  const [counter, setCounter] = useState(60)

  const otp = props.navigation.getParam('otp')
  const phone = props.navigation.getParam('phone')
  console.log(otp)

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
  }, [counter])

  const resendOtp = async () => {
    try {
      await fetch(
        `https://conveyenceadmin.livestockloader.com/smsservice/index.php?phone=${phone}&otp=${otp}&code=+1`
      )
    } catch (error) {
      console.log(error)
    }
  }

  const onVerifyotp = async () => {
    if (code.length == 4) {
      setMsgshow('')
      if (parseInt(code) === parseInt(otp)) {
        props.navigation.navigate('LoadBoards', {
          fromSignup: true,
        })
      } else {
        setMsgshow('OTP did not matched. Please check again.')
      }
    } else {
      setMsgshow('Please enter the code sent for verification')
    }
  }
  return (
    <ScrollView>
      <Container>
        <View>
          <ScreenTitle>Mobile Verification</ScreenTitle>
          <CodeText>
            Please enter SMS verification code {'\n'} we text you
          </CodeText>
          <OTPInputView
            style={{ width: '80%', height: 150, alignSelf: 'center' }}
            pinCount={4}
            autoFocusOnLoad={false}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeChanged={(code) => setCode(code)}
            // onCodeFilled={(code) => {
            //   setCode(code)
            // }}
          />
        </View>
        <Invalid>{msgshow}</Invalid>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text>Resend OTP in: </Text>
          {counter != 0 && (
            <Text style={{ color: colors.linkBlue }}>{counter}</Text>
          )}
          {counter === 0 && (
            <TouchableOpacity
              onPress={() => {
                resendOtp()
                if (counter === 0) setCounter(60)
              }}
            >
              <Text style={{ color: colors.linkBlue }}>Resend Now</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={onVerifyotp}
          style={{ marginTop: Dimensions.get('screen').height - 480 }}
        >
          {/* {msgshow != '' && <Invalid>{msgshow}</Invalid>} */}
          <CustomButton>
            <ButtonText>ENTER</ButtonText>
          </CustomButton>
        </TouchableOpacity>
      </Container>
    </ScrollView>
  )
}

Otp.navigationOptions = {
  header: null,
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 45,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 1,
    backgroundColor: 'rgb(247, 247, 247)',
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
})

export default Otp
