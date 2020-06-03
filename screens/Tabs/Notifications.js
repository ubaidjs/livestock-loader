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

  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator />}

      {alerts.map((item) => {
        return (
          <Bar key={item.id}>
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
          </Bar>
        )
      })}
    </View>
  )
}

Notifications.navigationOptions = {
  title: 'Alerts',
}

export default Notifications
