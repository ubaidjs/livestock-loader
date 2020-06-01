import React, { useState } from 'react'
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import { CustomButton, CustomInput } from '../../constants/CommonStyles'
import EmailValidation from '../../validation/Emailvalidation'

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

const ButtonsWrap = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 20;
`

const FormWrap = styled.View`
  flex: 1;
  margin-top: 20;
`
const Invalid = styled.Text`
  color: red;
  text-align: center;
  margin-bottom: 10px;
`
const ForgotPass = (props) => {
  const [msgshow, setMsgshow] = useState('')
  const [email, setEmail] = useState('')

  const generateOtp = () => {
    var val = Math.floor(1000 + Math.random() * 9000)
    return val
  }

  const navigateForward = async () => {
    const otp = generateOtp()
    await fetch(
      `https://conveyenceadmin.livestockloader.com/emailservice/index.php?email=${email}&otp=${otp}`
    )

    props.navigation.navigate('EmailOtp', {
      otp: otp,
      email: email,
    })
  }

  const handleSave = async () => {
    if (email == '') {
      setMsgshow('please enter emailid')
    } else {
      const isemail = EmailValidation(email)
      if (!isemail) {
        setMsgshow('Incorrect emailid')
      } else {
        setMsgshow('')
        navigateForward()
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <ScreenTitle>Forgot Password</ScreenTitle>
        <FormWrap>
          <Text style={{ textAlign: 'center', marginBottom: 40 }}>
            Please enter your registered email where we can send you password
            reset link
          </Text>
          <CustomInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={(val) => setEmail(val)}
          />
          {msgshow != '' && <Invalid>{msgshow}</Invalid>}
        </FormWrap>
        <ButtonsWrap>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={{ color: colors.linkBlue }}>Cancel</Text>
          </TouchableOpacity>
          <CustomButton
            onStartShouldSetResponder={handleSave}
            style={{ marginBottom: 0, paddingHorizontal: 30 }}
          >
            <Text>Reset</Text>
          </CustomButton>
        </ButtonsWrap>
      </Container>
    </TouchableWithoutFeedback>
  )
}

ForgotPass.navigationOptions = {
  header: null,
}

export default ForgotPass
