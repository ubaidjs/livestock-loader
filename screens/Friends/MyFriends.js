import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import styled from 'styled-components/native'
import { api_url } from '../../constants/Api'
import { CustomInput } from '../../constants/CommonStyles'

const Container = styled.View`
  padding: 20px;
`

const FriendContainer = styled.View``

const Bar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #f7f7f7;
  margin-vertical: 12px;
  border-radius: 10;
  elevation: 1;
`

const Name = styled.Text`
  flex: 1;
  margin-left: 15px;
  font-size: 16;
`

const MyFriends = props => {
  const [friends, setFriends] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchFriends()
  }, [])

  const fetchFriends = async () => {
    setLoading(true)
    try {
      const token = await AsyncStorage.getItem('USER_TOKEN')
      const response = await fetch(`${api_url}?action=getUsers`, {
        method: 'POST',
        body: JSON.stringify({ token, page: 1 }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
      if (json.status === '200') {
        setFriends(json.data)
      }
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setLoading(false)
    }
  }

  const searchFriends = async () => {
    setLoading(true)
    try {
      const token = await AsyncStorage.getItem('USER_TOKEN')
      const response = await fetch(`${api_url}?action=getUsersonSearch`, {
        method: 'POST',
        body: JSON.stringify({ word: searchTerm }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
      if (json.status === '200') {
        setFriends(json.data)
      }
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <CustomInput
          placeholder="Search friends"
          onChangeText={val => setSearchTerm(val)}
          onSubmitEditing={() => searchFriends()}
        />

        <FriendContainer>
          <FlatList
            data={friends}
            extraData={friends}
            renderItem={({ item }) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() =>
                    props.navigation.navigate('FriendProfile', {
                      profile: item
                    })
                  }
                >
                  <Bar>
                    <Image
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 50
                      }}
                      source={{ uri: item.u_image }}
                    />

                    <Name>{item.u_fullname}</Name>
                  </Bar>
                </TouchableWithoutFeedback>
              )
            }}
            keyExtractor={item => item.u_id}
          />

          {loading && <ActivityIndicator color="#000" />}
        </FriendContainer>
      </Container>
    </TouchableWithoutFeedback>
  )
}

MyFriends.navigationOptions = {
  title: 'My Friends'
}

export default MyFriends
