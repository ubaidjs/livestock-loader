import React, { useState } from 'react'
import {
  View,
  Text,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import colors from '../../constants/Colors'
import {
  CustomInput,
  CustomButton,
  ButtonText,
} from '../../constants/CommonStyles'
import styled from 'styled-components/native'
import { api_url } from '../../constants/Api'

const Section = styled(View)`
  border-bottom-width: 1;
  border-bottom-color: #e0e0e0;
  margin-top: 30;
  padding-bottom: 30;
`

const Container = styled.View`
  padding-horizontal: 20px;
  flex: 1;
`
const Label = styled.Text`
  color: grey;
  margin-bottom: 10px;
  font-weight: bold;
`
const PhotoContainer = styled.View`
  margin-vertical: 10px;
  margin-bottom: 20px;
  align-self: center;
`
const AvatarImg = styled.Image`
  margin-bottom: 10px;
  height: 100;
  width: 100;
  border-radius: 50;
`

const InputWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const NotVerified = styled.Text`
  color: red;
`

const EditProfile = (props) => {
  const profile = props.navigation.getParam('profile')

  const [uri, setUri] = useState(null)
  const [about, setAbout] = useState(profile.u_about)
  const [company, setCompany] = useState(profile.u_company)
  const [phone, setPhone] = useState(profile.u_mobileno)
  const [email, setEmail] = useState(profile.u_email)
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [usDot, setUsDot] = useState('')
  const [loading, setLoading] = useState(false)

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

  const updateProfile = async () => {
    setLoading(true)
    const token = await AsyncStorage.getItem('USER_TOKEN')

    let formData = new FormData()
    if (uri) {
      let uriParts = uri.split('.')
      let fileType = uriParts[uriParts.length - 1]

      formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      })
    } else {
      formData.append('photo', profile.u_image)
    }
    formData.append('about', about)
    formData.append('company', company)
    formData.append('phone', phone)
    formData.append('token', token)

    try {
      const res = await fetch(`${api_url}?action=updateprofile`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      const json = await res.json()

      if (json.status === '200') {
        Alert.alert('', 'Profile Updated', [
          { text: 'OK', onPress: () => props.navigation.goBack() },
        ])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 20 }}>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Label>Profile picture</Label>
            </View>
            <TouchableWithoutFeedback onPress={_pickImage}>
              <PhotoContainer>
                {uri ? (
                  <AvatarImg source={{ uri: uri }} />
                ) : (
                  <AvatarImg source={{ uri: profile.u_image }} />
                )}
              </PhotoContainer>
            </TouchableWithoutFeedback>
          </View>

          <Section>
            <Label>About</Label>
            <CustomInput
              placeholder="Describe what you do..."
              value={about}
              multiline={true}
              numberOfLines={5}
              maxLength={200}
              textAlignVertical="top"
              onChangeText={(val) => setAbout(val)}
            />
          </Section>

          <View
            style={{
              marginTop: 30,
              borderBottomWidth: 1,
              borderBottomColor: '#e0e0e0',
              paddingBottom: 30,
            }}
          >
            <Label>Company</Label>
            <CustomInput
              placeholder="Name"
              value={company}
              maxLength={150}
              onChangeText={(val) => setCompany(val)}
            />
            <CustomInput
              placeholder="Address"
              maxLength={150}
              onChangeText={(val) => {
                setAddress(val)
              }}
            />
            <CustomInput
              placeholder="City"
              maxLength={150}
              onChangeText={(val) => {
                setCity(val)
              }}
            />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <CustomInput
                style={{ flexGrow: 1, marginRight: 5 }}
                placeholder="State"
                maxLength={150}
                onChangeText={(val) => {
                  setCity(val)
                }}
              />
              <CustomInput
                style={{ flexGrow: 1, marginLeft: 5 }}
                placeholder="Zip"
                keyboardType="number-pad"
                maxLength={150}
                onChangeText={(val) => {
                  setCity(val)
                }}
              />
            </View>
          </View>

          <View style={{ marginTop: 30 }}>
            <Label>Verify Information</Label>
            <InputWrap>
              <CustomInput
                style={{ flexGrow: 1, marginRight: 15 }}
                placeholder="US DOT #"
                keyboardType="phone-pad"
                onChangeText={(val) => setUsDot(val)}
              />
              <NotVerified>not verified</NotVerified>
            </InputWrap>
            <InputWrap>
              <CustomInput
                style={{ flexGrow: 1, marginRight: 15 }}
                placeholder="email"
                keyboardType="email-address"
                value={email}
                onChangeText={(val) => setEmail(val)}
              />
              <NotVerified>not verified</NotVerified>
            </InputWrap>
            <InputWrap>
              <CustomInput
                style={{ flexGrow: 1, marginRight: 15 }}
                placeholder="phone number"
                value={phone}
                keyboardType="phone-pad"
                onChangeText={(val) => setPhone(val)}
              />
              <NotVerified>not verified</NotVerified>
            </InputWrap>
          </View>
        </View>
        <KeyboardSpacer></KeyboardSpacer>
      </ScrollView>
      <View>
        <TouchableOpacity onPress={updateProfile}>
          <CustomButton>
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <ButtonText>SAVE</ButtonText>
            )}
          </CustomButton>
        </TouchableOpacity>
      </View>
    </Container>
  )
}

EditProfile.navigationOptions = {
  title: 'Edit Profile',
  headerStyle: {
    backgroundColor: colors.greyishBrown,
    elevation: 0, // for android
    shadowOpacity: 0, //for ios
    borderBottomWidth: 0, //for ios
  },
  headerTintColor: '#fff',
}

export default EditProfile
