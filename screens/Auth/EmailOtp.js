import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
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
  margin-bottom: 20px;
`

const Otp = (props) => {
  const [wrongOtp, setWrongOtp] = useState(false)
  const [localCode, setLocalCode] = useState('')
  const [counter, setCounter] = useState(60)

  const code = props.navigation.getParam('otp')
  const email = props.navigation.getParam('email')

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
  }, [counter])

  const resendOtp = async () => {
    try {
      await fetch(
        `https://conveyenceadmin.livestockloader.com/emailservice/index.php?email=${email}&otp=${otp}`
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleButtonPress = () => {
    if (parseInt(code) === parseInt(localCode)) {
      props.navigation.navigate('ResetPassword', {
        email: email,
      })
    } else {
      setWrongOtp(true)
    }
  }

  return (
    <Container>
      <View>
        <ScreenTitle>Email Verification</ScreenTitle>
        <CodeText>Please enter verification code {'\n'} we email you</CodeText>
        <OTPInputView
          style={{ width: '80%', height: 200, alignSelf: 'center' }}
          pinCount={4}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeChanged={(val) => setLocalCode(val)}
          // onCodeFilled={(val) => {
          //   handleButtonPress(val)
          // }}
        />
        {wrongOtp && <Invalid>Entered OTP did not match</Invalid>}
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
      </View>
      <TouchableOpacity onPress={handleButtonPress}>
        <CustomButton>
          <ButtonText>ENTER</ButtonText>
        </CustomButton>
      </TouchableOpacity>
    </Container>
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
