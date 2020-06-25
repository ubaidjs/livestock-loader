import React, { useState } from 'react'
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import {
  CustomButton,
  CustomInput,
  ButtonText,
  CustomButtonWithoutShadow,
} from '../../constants/CommonStyles'
import EmailValidation from '../../validation/Emailvalidation'
import { Ionicons, Octicons } from '@expo/vector-icons'
// import BackArrowHeader from '../../components/BackArrowHeader'
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
  margin-top: ${Dimensions.get('screen').height - 450};
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
const ImageContainer = styled.View`
  align-items: center;
  margin-top: 40px;
`

const TagLine = styled.Text`
  margin: 20px 0 0 0;
  text-align: center;
  font-size: 20px;
  font-family: 'din-alternate-bold';
  color: ${colors.greyishBrown};
`
const BorderButton = styled.TouchableOpacity`
  border-width: 1;
  border-color: ${colors.themeYellow};
  border-radius: 10;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  padding: 10px;
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
      `https://conveyenceoffice.livestockloader.com/emailservice/index.php?email=${email}&otp=${otp}`
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
      {/* <Container> */}
      <ScrollView style={{ padding: 30 }}>
        {/* <BackArrowHeader onBack={()=>{
        alert(JSON.stringify(props))
        props.navigation.goBack(null)}} /> */}
        <ImageContainer>
          <Image
            style={{ height: 100, width: 180, resizeMode: 'contain' }}
            source={require('../../assets/images/logo.png')}
          />
          <TagLine>Calculate. Load. Transport</TagLine>
        </ImageContainer>
        {/* <ScreenTitle>Forgot Password</ScreenTitle> */}
        <FormWrap>
          <Text
            style={{
              textAlign: 'left',
              marginLeft: 5,
              marginBottom: 30,
              color: '#747269',
              marginTop: 40,
            }}
          >
            Retrive your password
            {/* Please enter your registered email where we can send you password
            reset link */}
          </Text>
          <CustomInput
            placeholder="Email your Email ID"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={(val) => setEmail(val)}
          />
          <Text
            style={{
              textAlign: 'left',
              marginLeft: 5,
              marginBottom: 30,
              color: '#b7b6b0',
              fontSize: 12,
            }}
          >
            Enter your email id to get verification code
            {/* Please enter your registered email where we can send you password
            reset link */}
          </Text>
          {msgshow != '' && <Invalid>{msgshow}</Invalid>}
          <TouchableOpacity onPress={handleSave} style={{ marginTop: 80 }}>
            <CustomButton>
              <ButtonText>SEND</ButtonText>
            </CustomButton>
          </TouchableOpacity>
          <BorderButton onPress={() => props.navigation.navigate('Login')}>
            <ButtonText>CANCEL</ButtonText>
          </BorderButton>
          {/* <ButtonsWrap>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={{ color: colors.linkBlue }}>Cancel</Text>
          </TouchableOpacity>
          <CustomButton onStartShouldSetResponder={handleSave} style={{ marginBottom: 0, paddingHorizontal: 30 }}>
            <Text>Reset</Text>
          </CustomButton>
        </ButtonsWrap> */}
        </FormWrap>
      </ScrollView>
      {/* </Container> */}
    </TouchableWithoutFeedback>
  )
}

// ForgotPass.navigationOptions = ({ navigation }) => ({
//   title: 'test',
//   headerLeft: () => (
//     <TouchableOpacity onPress={() => navigation.goBack(null)} style={{marginLeft: 15}}>
//         <Ionicons name="ios-arrow-round-back" color="#fff" size={30} />
//     </TouchableOpacity>
//   ),
// })

export default ForgotPass
