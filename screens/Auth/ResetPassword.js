import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import {
  CustomButton,
  CustomInput,
  ButtonText,
} from '../../constants/CommonStyles'
import { api_url } from '../../constants/Api'

const Container = styled.View`
  padding: 30px 20px;
  padding-bottom: 20px;
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

const FormWrap = styled.View`
  flex: 1;
  margin-top: 20;
`

const Invalid = styled.Text`
  color: red;
  text-align: center;
  margin-bottom: 20px;
`

const ResetPassword = (props) => {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const email = props.navigation.getParam('email')

  const changePassword = async () => {
    if (!password) {
      setErrMsg('Please enter password')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${api_url}?action=updatepassword`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const json = await res.json()
      setLoading(false)

      if (json.status === '200') {
        setLoading(false)
        Alert.alert(
          '',
          'Password changed successfully',
          [
            {
              text: 'Go to Login',
              onPress: () => props.navigation.navigate('Login'),
            },
          ],
          { cancelable: false }
        )
      }
    } catch (error) {
      setLoading(false)
      console.log('error: ', error)
    }
  }

  return (
    <Container>
      <ScreenTitle>Reset Password</ScreenTitle>
      <FormWrap>
        <CustomInput
          placeholder="New Password"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(val) => setPassword(val)}
        />
        <Invalid>{errMsg}</Invalid>
      </FormWrap>
      <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
        <Text
          style={{
            color: colors.linkBlue,
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          Cancel
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={changePassword}>
        <CustomButton style={{ marginBottom: 0, paddingHorizontal: 30 }}>
          {loading ? <ActivityIndicator /> : <ButtonText>Reset</ButtonText>}
        </CustomButton>
      </TouchableOpacity>
    </Container>
  )
}

export default ResetPassword

const styles = StyleSheet.create({})
