import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'
import firebase from 'firebase'
import styled from 'styled-components/native'
import { NavigationEvents } from 'react-navigation'
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import colors from '../../constants/Colors'

const Container = styled.View`
  padding: 20px;
`

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

const Middle = styled.View`
  flex: 1;
  margin-left: 15px;
`

const Name = styled.Text`
  flex: 1;
  font-size: 18;
`

const Rating = styled.View`
  flex-direction: row;
`

const NoMsg = styled.Text`
  text-align: center;
  color: grey;
`

const MyMessages = (props) => {
  const [loading, setLoading] = useState(false)
  const [chats, setChats] = useState([])
  const id = props.navigation.getParam('id')
  const name = props.navigation.getParam('name')
  const image = props.navigation.getParam('image')

  // useEffect(() => {
  //   fetchChats()
  // }, [])

  const fetchChats = async () => {
    setLoading(true)
    try {
      let arr = []
      let snap = await firebase.database().ref(`chat/${id}`).once('value')

      snap.forEach(function (val) {
        if (val.child('messages').exists()) {
          arr.push(val.child('info').val())
        }
      })
      setLoading(false)
      setChats(arr.reverse())
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <Container>
      <NavigationEvents onWillFocus={() => fetchChats()} />
      {loading && <ActivityIndicator color="#000" />}
      {!chats.length && !loading ? <NoMsg>No Messages</NoMsg> : null}
      <FlatList
        // style={{ marginBottom: 10 }}
        data={chats}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Chat', {
                  friendId: item.id,
                  friendName: item.name,
                  friendImage: item.image,
                  userId: id,
                  userName: name,
                  userImage: image,
                })
              }}
            >
              <Bar>
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                  }}
                  source={{ uri: item.image }}
                />
                <Middle>
                  <Name>{item.name}</Name>
                  <Rating>
                    <Text
                      style={{ marginRight: 5, color: colors.greyishBrown }}
                    >
                      4.5
                    </Text>
                    <MaterialCommunityIcons
                      name="star"
                      size={15}
                      color={colors.themeYellow}
                    />
                  </Rating>
                </Middle>
                <Ionicons
                  name="ios-arrow-round-forward"
                  size={30}
                  color={colors.linkBlue}
                />
              </Bar>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item) => item.image}
      />
    </Container>
  )
}

MyMessages.navigationOptions = ({ navigation }) => ({
  title: 'My Messages',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack(null)} style={{marginLeft: 15}}>
        <Ionicons name="ios-arrow-round-back" color="#fff" size={30} />
    </TouchableOpacity>
  ),
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('MyFriends')}>
      <Feather style={{ marginRight: 15 }} name="plus" color="#fff" size={22} />
    </TouchableWithoutFeedback>
  ),
})

export default MyMessages
