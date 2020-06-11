import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native'
import styled from 'styled-components/native'
import moment from 'moment'
import { NavigationEvents } from 'react-navigation'
import { api_url } from '../../constants/Api'
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import React from 'react'
import { View, Text, Image } from 'react-native'
import colors from '../../constants/Colors'

const Notifications = () => {
  const [loading, setLoading] = useState(false)
  const [alerts, setAlerts] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchAlerts()
  }, [])

  const fetchAlerts = async () => {
    setLoading(true)
    try {
      const id = await AsyncStorage.getItem('USER_ID')
      const response = await fetch(`${api_url}?action=getnotification`, {
        method: 'POST',
        body: JSON.stringify({ user_id: id }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      if (json.status === '200') {
        json.data && setAlerts(json.data.reverse())
      }
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setLoading(false)
    }
  }

  const onAcceptReject = async (group_id, status, n_id) => {
    try {
      const id = await AsyncStorage.getItem('USER_ID')
      const response = await fetch(`${api_url}?action=invitationaccrej`, {
        method: 'POST',
        body: JSON.stringify({ u_id: id, g_id: group_id, status, n_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      console.log(json)
      // if (json.status === '200') {
      //   json.data && setAlerts(json.data.reverse())
      // }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const sendAlert = (group_id, n_id) => {
    Alert.alert(
      '',
      'Do you want to join this group?',
      [
        {
          text: 'Reject',
          onPress: () => onAcceptReject(group_id, 'reject', n_id),
        },
        {
          text: 'Accept',
          onPress: () => onAcceptReject(group_id, 'accept', n_id),
        },
      ],
      { cancelable: true }
    )
  }

  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchAlerts} />
        }
      >
        {alerts.map((item) => {
          let isGroup = item.message_type === 'groupnotification'
          return (
            <Bar key={item.id}>
              <TouchableOpacity
                onPress={() => isGroup && sendAlert(item.group_id, item.id)}
              >
                <BarTop>
                  <Name>{item.msg}</Name>
                  <Ionicons
                    name="ios-arrow-round-forward"
                    size={30}
                    color={colors.linkBlue}
                  />
                </BarTop>
                <BarBottom>
                  <Text style={{ color: colors.littleDarkGrey }}>
                    {moment(item.created_at).fromNow(true)}
                  </Text>
                </BarBottom>
              </TouchableOpacity>
            </Bar>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default Notifications
