import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'
import moment from 'moment'
import { Feather, Ionicons } from '@expo/vector-icons'
import colors from '../constants/Colors'

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

const LoadItem = props => {
  const {
    pickup_date,
    pickup_address,
    drop_address,
    drop_date,
    rate,
    total_weight
  } = props.data
  return (
    <LoadWrapper>
      <View style={{ padding: 10 }}>
        <LoadPickup>
          <Feather name="arrow-up-circle" color="black" size={18} />
          <Address>
            <Text style={{ color: colors.warmGrey }}>
              Pick up {moment(pickup_date).format('MMM DD')}
            </Text>
            <Text style={{ fontSize: 20, color: colors.greyishBrown }}>
              {pickup_address}
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
              Drop off {moment(drop_date).format('MMM DD')}
            </Text>
            <Text style={{ fontSize: 20, color: colors.greyishBrown }}>
              {drop_address}
            </Text>
          </Address>
          <View>
            <Text style={{ color: 'red', alignSelf: 'flex-end' }}>
              On Route
            </Text>
            <Text style={{ fontSize: 20, color: colors.greyishBrown }}>
              $ {rate}
            </Text>
          </View>
        </LoadDropoff>
        <LoadWeight>
          <Text style={{ color: colors.warmGrey }}>Livestock: 20 cattles</Text>
          <Text style={{ color: colors.warmGrey }}>
            Weight: {total_weight} lbs
          </Text>
          <Text style={{ color: colors.warmGrey }}>4 Days</Text>
        </LoadWeight>
      </View>
    </LoadWrapper>
  )
}

export default LoadItem
