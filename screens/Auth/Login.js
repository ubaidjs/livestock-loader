import React, { useState, useRef } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Button,
  Modal,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  AsyncStorage,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import styled from 'styled-components/native'

import colors from '../../constants/Colors'
import {
  CustomInput,
  CustomButton,
  ButtonText,
  CustomButtonDisable,
  ButtonTextDisable,
} from '../../constants/CommonStyles'
import { api_url } from '../../constants/Api'

const Container = styled.View`
  padding-top: 50px;
  align-items: stretch;
  margin: 0 20px;
  flex: 1;
`

const ImageContainer = styled.View`
  align-items: center;
`

const TagLine = styled.Text`
  margin: 20px 0 0 0;
  text-align: center;
  font-size: 20px;
  font-family: 'din-alternate-bold';
  color: ${colors.greyishBrown};
`

const FormView = styled.View`
  align-self: stretch;
  justify-content: center;
  margin-top: -50px;
  flex: 1;
`

const LoginLine = styled.Text`
  color: ${colors.greyishBrown};
  margin-bottom: 20px;
  font-size: 20px;
  font-family: 'pt-mono';
`

const ForgotPWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const JoinWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-top: 50;
`

const Link = styled.Text`
  color: ${colors.linkBlue};
`

const NotMember = styled.Text`
  margin-right: 10px;
  text-align: right;
  color: ${colors.warmGrey};
`

const Join = styled.Text`
  color: ${colors.linkBlue};
  align-self: flex-end;
`

const Invalid = styled.Text`
  color: red;
  text-align: center;
  margin-bottom: 10px;
`

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userNotFound, setUserNotFound] = useState(false)
  const [loading, setLoading] = useState(false)

  const login_pass = useRef(null)

  const handleFormSubmit = async () => {
    setUserNotFound(false)
    if (!email) {
      return
    }
    if (!password) {
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`${api_url}?action=login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()

      if (json.status === '200') {
        await AsyncStorage.setItem('USER_TOKEN', json.data.u_token)
        await AsyncStorage.setItem('USER_ID', json.data.u_id)
        await AsyncStorage.setItem('USER_NAME', json.data.u_fullname)
        await AsyncStorage.setItem('USER_IMAGE', json.data.u_image)
        await AsyncStorage.setItem('USER', JSON.stringify(json.data))
        setEmail('')
        setPassword('')
        setLoading(false)
        props.navigation.navigate('App')
      } else {
        setUserNotFound(true)
        setLoading(false)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <ImageContainer>
          <Image
            style={{ height: 100, width: 180, resizeMode: 'contain' }}
            source={require('../../assets/images/logo.png')}
          />
          <TagLine>Calculate. Load. Transport</TagLine>
        </ImageContainer>
        <FormView>
          <View>
            <LoginLine>Please log in.</LoginLine>
            <CustomInput
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="off"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => login_pass.current.focus()}
              blurOnSubmit={false}
              value={email}
              onChangeText={(val) => setEmail(val)}
              onFocus={() => setUserNotFound(false)}
            />
            <CustomInput
              ref={login_pass}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(val) => setPassword(val)}
              onFocus={() => setUserNotFound(false)}
            />

            <ForgotPWrapper>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Forgot')}
              >
                <Link>Forgot password?</Link>
              </TouchableOpacity>
            </ForgotPWrapper>
          </View>
          <JoinWrapper>
            <NotMember>Not a member?</NotMember>
            <TouchableOpacity onPress={() => props.navigation.navigate('Join')}>
              <Join>JOIN</Join>
            </TouchableOpacity>
          </JoinWrapper>
        </FormView>
        {userNotFound && (
          <Invalid>Error logging in. Check email and password</Invalid>
        )}
        {!email.length || !password.length ? (
          <CustomButtonDisable>
            <ButtonTextDisable>LOGIN</ButtonTextDisable>
          </CustomButtonDisable>
        ) : (
          <TouchableOpacity onPress={handleFormSubmit}>
            <CustomButton>
              {loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <ButtonText>LOGIN</ButtonText>
              )}
            </CustomButton>
          </TouchableOpacity>
        )}
        <View
          style={{
            marginBottom: 20,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity>
            <Link>Privacy </Link>
          </TouchableOpacity>
          <Text>& </Text>
          <TouchableOpacity>
            <Link>Conditions</Link>
          </TouchableOpacity>
        </View>
      </Container>
    </TouchableWithoutFeedback>
  )
}

Login.navigationOptions = {
  header: null,
}

export default Login
