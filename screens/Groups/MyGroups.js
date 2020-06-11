import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  RefreshControl,
  FlatList,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'
import { NavigationEvents } from 'react-navigation'
import { api_url } from '../../constants/Api'
import colors from '../../constants/Colors'

const Container = styled.View`
  padding: 20px;
`

const Bar = styled.View`
  padding-vertical: 20px;
  padding-horizontal: 15px;
  margin-vertical: 12px;
  background-color: #f7f7f7;
  elevation: 1;
  border-radius: 10px;
`

const BarItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const GroupName = styled.Text`
  font-size: 18px;
`

const MyGroups = (props) => {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const fetchGroups = async () => {
    setLoading(true)
    try {
      const id = await AsyncStorage.getItem('USER_ID')
      const response = await fetch(`${api_url}?action=getmygroup`, {
        method: 'POST',
        body: JSON.stringify({ u_id: id }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      if (json.status === '200') {
        setGroups(json.data)
      }
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = () => {
    fetchGroups()
    setRefreshing(false)
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <NavigationEvents onWillFocus={() => fetchGroups()} />
      <Container>
        {loading && <ActivityIndicator color="#000" />}
        {groups.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              props.navigation.navigate('GroupInfo', {
                group: item.group_participant,
              })
            }
          >
            <Bar>
              <BarItem>
                <GroupName>{item.group_name}</GroupName>
                <Ionicons
                  name="ios-arrow-round-forward"
                  size={25}
                  color={colors.linkBlue}
                />
              </BarItem>
            </Bar>
          </TouchableOpacity>
        ))}
      </Container>
    </ScrollView>
  )
}

MyGroups.navigationOptions = ({ navigation }) => ({
  title: 'My Groups',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack(null)} style={{marginLeft: 15}}>
        <Ionicons name="ios-arrow-round-back" color="#fff" size={30} />
    </TouchableOpacity>
  ),
  headerRight: () => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate('AddGroup')}>
        <Feather
          style={{ marginRight: 15 }}
          name="plus"
          color="#fff"
          size={22}
        />
      </TouchableWithoutFeedback>
    )
  },
})

export default MyGroups
