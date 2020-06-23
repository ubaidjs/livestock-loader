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
import colors from '../../constants/Colors'

const BarBottom = styled(View)`
  padding-horizontal: 20;
  padding-vertical: 5;
  align-self: flex-end;
`

const BarTop = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10;
  border-bottom-width: 0.5;
  padding: 15px 20px;
  border-bottom-color: ${colors.darkGrey};
`

const Bar = styled.View`
  background-color: #f7f7f7;
  padding-bottom: 5;
  margin: 20px;
  border-radius: 10;
  elevation: 1;
`

const Name = styled.Text`
  font-size: 18;
`

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
      fetchAlerts()
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
          let groupId = item.group_id != 'accept' && item.group_id != 'reject'
          return (
            <Bar key={item.id}>
              <TouchableOpacity
                onPress={() =>
                  isGroup && groupId ? sendAlert(item.group_id, item.id) : null
                }
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
