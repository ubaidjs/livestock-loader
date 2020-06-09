import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import TrailerList from '../../components/TrailerList'
import colors from '../../constants/Colors'
import { api_url } from '../../constants/Api'
import { CustomButton, ButtonText } from '../../constants/CommonStyles'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: space-between;
  padding-bottom: 0;
  padding-top: 0;
`

const AddTrailer = props => {
  const [value, setValue] = useState(null)
  const [trailers, setTrailers] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedTrailer, setSelectedTrailer] = useState(null)

  useEffect(() => {
    fetchTrailers()
  }, [])

  useEffect(() => {
    if (value !== null) {
      const selected = trailers.filter(item => {
        return item.t_id === value
      })
      setSelectedTrailer(selected)
    }
  }, [value])

  const fetchTrailers = async () => {
    setLoading(true)
    try {
      const token = await AsyncStorage.getItem('USER_TOKEN')
      const response = await fetch(`${api_url}?action=gettrailer`, {
        method: 'POST',
        body: JSON.stringify({ token: token }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()

      setTrailers(json.data)
      setLoading(false)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            textAlign: 'center',
            paddingHorizontal: 20,
            marginBottom: 40,
            marginTop: 10
          }}
        >
          Choose a trailer that best describe your trailers and compartment
        </Text>
        <TrailerList options={trailers} value={value} setValue={setValue} />
        {loading && <ActivityIndicator color="#000" />}
      </ScrollView>
      {value && (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('AddTrailerTwo', {
              selectedTrailer
            })
          }
        >
          <CustomButton>
            <ButtonText>CONTINUE</ButtonText>
          </CustomButton>
        </TouchableOpacity>
      )}
    </Container>
  )
}

AddTrailer.navigationOptions = ({navigation}) => ({
  title: 'Add Trailer',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack(null)} style={{marginLeft: 15}}>
        <Ionicons name="ios-arrow-round-back" color="#fff" size={30} />
    </TouchableOpacity>
  ),
  headerStyle: {
    backgroundColor: colors.greyishBrown,
    elevation: 0, // for android
    shadowOpacity: 0, //for ios
    borderBottomWidth: 0 //for ios
  },
  headerTintColor: '#fff'
})

export default AddTrailer
