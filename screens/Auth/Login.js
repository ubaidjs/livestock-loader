import React, { useState, useRef } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Button,
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
import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/Colors'
import {
  CustomInput,
  CustomButton,
  ButtonText,
  CustomButtonDisable,
  ButtonTextDisable,
} from '../../constants/CommonStyles'
import { api_url } from '../../constants/Api'
import EmailValidation from '../../validation/Emailvalidation'
import Modal from 'react-native-modal';
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
const PCText = styled.Text`
margin-bottom: 20px;
`;
const RowView = styled.View`
flex-direction: row;
width: 100%;
padding: 5px;
border-bottom-width: 0.5;
border-bottom-color: gray;
`;
const ColView = styled.View`
flex-direction: column;
width: ${props => props.width}
`;
const TitleText = styled.Text`
font-weight: bold;
font-size: 20px;
`;
const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userNotFound, setUserNotFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const login_pass = useRef(null)
  const [msgshow,setMsgshow] = useState('')
  const [modelis,setModel] = useState([{isopen: false, title: '', des: ''}])
  const handleFormSubmit = async () => {
    setUserNotFound(false)
    if (!email) {
      return
    }
    if (!password) {
      return
    }
   const isemail =  EmailValidation(email);
   if(!isemail)
   {
    setMsgshow('Incorrect emailid');
   }
   else
   {
    setMsgshow('');
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
        {msgshow != '' && (
          <Invalid>{msgshow}</Invalid>
        )}
        {userNotFound && (
          <Invalid>Enter correct emailid/Password</Invalid>
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
          <TouchableOpacity onPress={()=>setModel([{isopen:true,title:'Privacy',des:"What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}])}>
            <Link>Privacy </Link>
          </TouchableOpacity>
          <Text>& </Text>
          <TouchableOpacity onPress={()=>setModel([{isopen:true,title:'Conditions',des:"What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}])}>
            <Link>Conditions</Link>
          </TouchableOpacity>
        </View>
        <Modal isVisible={modelis[0].isopen} style={{backgroundColor: 'white'}}>
          <RowView>
          <ColView width="80%">
               <TitleText> {modelis[0].title} </TitleText>
             </ColView>
             <ColView width="20%">
               <Ionicons
                  name="md-close"
                  size={30}
                  color='black'
                  onPress={()=>setModel([{isopen:false,title:'',des:''}])}
                  style={{alignSelf:'flex-end',marginRight: 10}}
                />
             </ColView>
          </RowView>
                {/* style={{position: 'absolute',top:0,right:5}} */}
          <ScrollView style={{padding: 15}}>
            <PCText> {modelis[0].des} </PCText>
</ScrollView>
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}

Login.navigationOptions = {
  header: null,
}

export default Login
