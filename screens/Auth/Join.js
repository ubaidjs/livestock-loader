import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  AsyncStorage,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import styled from 'styled-components/native'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Entypo } from '@expo/vector-icons'
import { api_url } from '../../constants/Api'
import colors from '../../constants/Colors'
import {
  CustomInput,
  CustomButton,
  ButtonText,
  InvalidText,
  ValidText,
  CustomButtonDisable,
  ButtonTextDisable,
} from '../../constants/CommonStyles'

const JoinWrapper = styled.View`
  padding-top: 50px;
  justify-content: space-between;
  align-items: stretch;
  margin: 0 20px;
  flex: 1;
`

const ScreenTitle = styled.Text`
  font-size: 20px;
  color: ${colors.greyishBrown};
  text-align: center;
  font-family: 'pt-mono-bold';
`

const PhotoContainer = styled.View`
  margin: 40px 0;
  align-self: center;
`

const AvatarImg = styled.Image`
  margin-bottom: 10px;
  height: 100;
  width: 100;
  border-radius: 50;
`

const UploadText = styled.Text`
  text-align: center;
  color: ${colors.warmGrey};
`

const FormWrapper = styled.View`
  align-self: stretch;
`

const NotMember = styled.Text`
  margin-right: 10px;
  color: ${colors.warmGrey};
`

const Link = styled.Text`
  color: ${colors.linkBlue};
`

const Join = (props) => {
  const [uri, setUri] = useState()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(false)
  const [emailExist, setEmailExist] = useState(false)
  const [invalidEmail, setInalidEmail] = useState(false)
  function emailValidation(email) {
    var testReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return testReg.test(String(email).toLowerCase())
  }

  const _pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    )

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
      })

      if (!pickerResult.cancelled) {
        setUri(pickerResult.uri)
      }
    }
  }

  async function handleSignup() {
    setError(false)
    setEmailExist(false)

    if (!name.length) {
      return
    }
    if (!email.length) {
      return
    }
    if (!password.length) {
      return
    }

    let correctemail = emailValidation(email)

    if (!correctemail) {
      setInalidEmail(true)
      return
    }

    let formData = new FormData()

    if (uri) {
      let uriParts = uri.split('.')
      let fileType = uriParts[uriParts.length - 1]

      formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      })
    }

    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)

    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }

    try {
      setUploading(true)
      const response = await fetch(`${api_url}?action=signup`, options)
      const json = await response.json()
      if (json.status === '200') {
        await AsyncStorage.setItem('USER_TOKEN', json.token)
        await AsyncStorage.setItem('USER_ID', json.data.u_id)
        await AsyncStorage.setItem('USER_NAME', json.data.u_fullname)
        await AsyncStorage.setItem('USER_IMAGE', json.data.u_image)
        await AsyncStorage.setItem('USER', JSON.stringify(json.data))
        setName('')
        setEmail('')
        setPassword('')
        props.navigation.navigate('Mobile')
      } else if (json.status === '500') {
        setEmailExist(true)
      }
    } catch (error) {
      console.log('ERROR', error)
      setError(true)
    } finally {
      setUploading(false)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <JoinWrapper>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <ScreenTitle>Create Account</ScreenTitle>
          <TouchableWithoutFeedback onPress={_pickImage}>
            <PhotoContainer>
              {uri ? (
                <AvatarImg source={{ uri: uri }} />
              ) : (
                <View>
                  <AvatarImg
                    source={require('../../assets/images/avatarholder.png')}
                  />
                  <Entypo
                    style={{ position: 'absolute', right: -10 }}
                    name="camera"
                    size={15}
                    color={colors.darkGrey}
                  />
                </View>
              )}
            </PhotoContainer>
          </TouchableWithoutFeedback>
          <FormWrapper>
            <CustomInput
              placeholder="Full Name"
              autoCapitalize="words"
              value={name}
              onChangeText={(val) => setName(val)}
              autoCorrect={false}
              onFocus={() => setError(false)}
            />
            <CustomInput
              // ref={join_email}
              placeholder="Email Address"
              value={email}
              onChangeText={(val) => setEmail(val)}
              autoCapitalize="none"
              keyboardType="email-address"
              onFocus={() => {
                setEmailExist(false)
                setInalidEmail(false)
                setError(false)
              }}
            />
            <CustomInput
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(val) => setPassword(val)}
              autoCapitalize="none"
              onFocus={() => setError(false)}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 30,
              }}
            >
              <NotMember>Already a member?</NotMember>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Login')}
              >
                <Link>LOGIN</Link>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 25,
              }}
            >
              <Text style={{ color: colors.warmGrey }}>
                By joining you agree with our{' '}
              </Text>
              <TouchableOpacity>
                <Link>Privacy </Link>
              </TouchableOpacity>
              <Text style={{ color: colors.warmGrey }}>& </Text>
              <TouchableOpacity>
                <Link>Conditions</Link>
              </TouchableOpacity>
            </View>
          </FormWrapper>
          {error && (
            <InvalidText>Couldn't signup. Please check details</InvalidText>
          )}
          {emailExist && <InvalidText>This email already exist</InvalidText>}
          {invalidEmail && <InvalidText>Incorrect emailid</InvalidText>}
          <View style={{ marginTop: 30 }}>
            {!name.length || !email.length || !password.length ? (
              <View>
                <CustomButtonDisable>
                  <ButtonTextDisable>JOIN</ButtonTextDisable>
                </CustomButtonDisable>
              </View>
            ) : (
              <View>
                <TouchableOpacity onPress={handleSignup}>
                  <CustomButton>
                    {uploading ? (
                      <ActivityIndicator color="#000" />
                    ) : (
                      <ButtonText>JOIN</ButtonText>
                    )}
                  </CustomButton>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
        <KeyboardSpacer />
      </JoinWrapper>
    </TouchableWithoutFeedback>
  )
}

Join.navigationOptions = {
  header: null,
}

export default Join
