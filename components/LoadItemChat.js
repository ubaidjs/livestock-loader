import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'
import moment from 'moment'
import { Feather, Ionicons } from '@expo/vector-icons'
import colors from '../constants/Colors'

const LoadWrapper = styled.View`
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

const LoadItemChat = props => {
  const {
    pickDate,
    pickAddress,
    dropAddress,
    dropDate,
    rate,
    weight
  } = props.data
  return (
    <LoadWrapper>
      <View style={{ padding: 10 }}>
        <LoadPickup>
          <Feather name="arrow-up-circle" color="black" size={18} />
          <Address>
            <Text style={{ color: colors.warmGrey }}>
              Pick up {moment(pickDate).format('MMM DD')}
            </Text>
            <Text style={{ fontSize: 20, color: colors.greyishBrown }}>
              {pickAddress}
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
              Drop off {moment(dropDate).format('MMM DD')}
            </Text>
            <Text style={{ fontSize: 20, color: colors.greyishBrown }}>
              {dropAddress}
            </Text>
          </Address>
          <View>
            <Text style={{ color: colors.warmGrey, alignSelf: 'flex-end' }}>
              Rate
            </Text>
            <Text style={{ fontSize: 20, color: colors.greyishBrown }}>
              $ {rate}
            </Text>
          </View>
        </LoadDropoff>
        <LoadWeight>
          <Text style={{ color: colors.warmGrey, marginRight: 10 }}>
            Livestock: 20 cattles
          </Text>
          <Text style={{ color: colors.warmGrey, marginRight: 10 }}>
            Weight: {weight} lbs
          </Text>
          <Text style={{ color: colors.warmGrey }}>4 Days</Text>
        </LoadWeight>
      </View>
    </LoadWrapper>
  )
}

export default LoadItemChat
