import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  RefreshControl,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import styled from 'styled-components/native'
import moment from 'moment'
import { Feather, Ionicons } from '@expo/vector-icons'
import colors from '../../constants/Colors'
import { api_url } from '../../constants/Api'

const MyLoads = (props) => {
  const [filter, setFilter] = useState('progress')
  const [loads, setLoads] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [noLoads, setNoLoads] = useState(null)

  useEffect(() => {
    fetchSavedLoads()
  }, [])

  const fetchSavedLoads = async () => {
    setLoading(true)
    try {
      const token = await AsyncStorage.getItem('USER_TOKEN')
      const response = await fetch(`${api_url}?action=getload`, {
        method: 'POST',
        body: JSON.stringify({ token, limit: 'all' }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      if (json.status === '200') {
        setLoads(json.data)
      }

      if (!json.data.length) {
        setNoLoads(true)
      }
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = () => {
    fetchSavedLoads()
    setRefreshing(false)
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationEvents onWillFocus={() => fetchSavedLoads()} />
      {loading && <ActivityIndicator color="#000" />}

      {!loading && !noLoads && (
        <FilterWrapper>
          {filter === 'progress' ? (
            <ButtonActive>In Progress</ButtonActive>
          ) : (
            <ButtonInactive onPress={() => setFilter('progress')}>
              In Progress
            </ButtonInactive>
          )}
          {filter === 'completed' ? (
            <ButtonActive>Completed</ButtonActive>
          ) : (
            <ButtonInactive onPress={() => setFilter('completed')}>
              Completed
            </ButtonInactive>
          )}
        </FilterWrapper>
      )}
      {noLoads && (
        <Text
          style={{
            textAlign: 'center',
            marginTop: 40,
            fontSize: 18,
            color: 'gray',
          }}
        >
          No Saved Load
        </Text> 
      )} 
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loads.map((item) => {
          return (
            <LoadWrapper key={item.id}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('LoadInfo', {
                    load: item,
                  })
                }
              >
                <View style={{ padding: 10 }}>
                  <LoadPickup>
                    <Feather name="arrow-up-circle" color="black" size={18} />
                    <Address>
                      <Text style={{ color: colors.warmGrey }}>
                        Pick up {moment(item.pickup_date).format('MMM DD')}
                      </Text>
                      <Text
                        style={{ fontSize: 20, color: colors.greyishBrown }}
                      >
                        {item.pickup_address}
                      </Text>
                    </Address>
                    <Ionicons
                      name="ios-arrow-round-forward"
                      color={colors.linkBlue}
                      size={32}
                    />
                  </LoadPickup>
                  <LoadDropoff>
                    <Feather
                      name="arrow-down-circle"
                      color={colors.themeYellow}
                      size={18}
                    />
                    <Address>
                      <Text style={{ color: colors.warmGrey }}>
                        Drop off {moment(item.drop_date).format('MMM DD')}
                      </Text>
                      <Text
                        style={{ fontSize: 20, color: colors.greyishBrown }}
                      >
                        {item.drop_address}
                      </Text>
                    </Address>
                    <View>
                      <Text style={{ color: 'red', alignSelf: 'flex-end' }}>
                        On Route
                      </Text>
                      <Text
                        style={{ fontSize: 20, color: colors.greyishBrown }}
                      >
                        $ {item.rate}
                      </Text>
                    </View>
                  </LoadDropoff>
                  <LoadWeight>
                    <Text style={{ color: colors.warmGrey }}>
                      Livestock: 20 cattles
                    </Text>
                    <Text style={{ color: colors.warmGrey }}>
                      Weight: {item.total_weight} lbs
                    </Text>
                    <Text style={{ color: colors.warmGrey }}>4 Days</Text>
                  </LoadWeight>
                </View>
              </TouchableOpacity>
            </LoadWrapper>
          )
        })}
      </ScrollView>
    </View>
  )
}

// MyLoads.navigationOptions = {
//   title: 'My Loads',
// }
MyLoads.navigationOptions = ({ navigation }) => {
  return {
    title: 'My Load',
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack(null)} style={{marginLeft: 15}}>
          <Ionicons name="ios-arrow-round-back" color="#fff" size={30} />
      </TouchableOpacity>
    ),
  }
}
const ButtonInactive = styled.Text`
  padding: 10px;
  margin-right: 10px;
  border-width: 1px;
  border-color: ${colors.darkGrey};
  border-radius: 10;
`

const ButtonActive = styled.Text`
  padding: 10px;
  margin-right: 10px;
  background-color: ${colors.themeYellow};
  border-radius: 10;
  overflow: hidden;
`

const FilterWrapper = styled.View`
  display: flex;
  flex-direction: row;
  padding-vertical: 10;
  padding-horizontal: 20;
`

const LoadWrapper = styled.View`
  margin-horizontal: 20px;
  margin-vertical: 12px;
  background-color: #f7f7f7;
  elevation: 1;
  border-radius: 10px;
`

const LoadPickup = styled.View`
  flex-direction: row;
  align-items: center;
`

const Address = styled.View`
  flex: 1;
  padding-left: 10px;
`

const LoadDropoff = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 15px;
`

const LoadWeight = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export default MyLoads
