import React from 'react'
import { Text, ScrollView } from 'react-native'
import styled from 'styled-components/native'
import colors from '../constants/Colors'
import { Feather } from '@expo/vector-icons'
import moment from 'moment'

const Container = styled.View`
  flex: 1;
  padding: 20px;
`

const Bar = styled.View`
  border-radius: 8;
  background-color: #f7f7f7;
  elevation: 1;
  margin: 10px 0px 20px;
  padding: 20px 15px;
  justify-content: space-around;
`

const BarLineOne = styled.View`
  flex-direction: row;
  align-items: center;
`

const BarLineOneText = styled.Text`
  color: grey;
  margin-left: 10px;
  font-weight: bold;
`

const BarLineTwo = styled.View`
  background-color: #f0f0f0;
  margin-top: 15px;
  padding: 10px;
  border-radius: 8;
`

const BarLineThree = styled.View``

const Address = styled.View`
  margin: 10px;
`

const DetailWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  margin-bottom: 1px;
`

const DetailValue = styled.Text`
  color: ${colors.linkBlue};
  font-size: 15px;
`

const LoadInfoChat = ({ load }) => {
  return (
    <ScrollView>
      <Container>
        <Bar>
          <BarLineOne>
            <Feather name="arrow-up-circle" color="grey" size={18} />
            <BarLineOneText>Pick Up</BarLineOneText>
          </BarLineOne>

          <BarLineTwo>
            <Text style={{ fontWeight: 'bold', color: colors.greyishBrown }}>
              {moment(load.pickDate).format('MMM DD')} {load.pickTime}
            </Text>
          </BarLineTwo>

          <BarLineThree>
            <Address>
              <Text>{load.pickAddress}</Text>
            </Address>
          </BarLineThree>
        </Bar>

        <Bar>
          <BarLineOne>
            <Feather name="arrow-down-circle" color="grey" size={18} />
            <BarLineOneText>Drop off</BarLineOneText>
          </BarLineOne>

          <BarLineTwo>
            <Text style={{ fontWeight: 'bold', color: colors.greyishBrown }}>
              {moment(load.dropDate).format('MMM DD')} {load.dropTime}
            </Text>
          </BarLineTwo>

          <BarLineThree>
            <Address>
              <Text>{load.dropAddress}</Text>
            </Address>
          </BarLineThree>
        </Bar>
        <Bar>
          <BarLineOne>
            <BarLineOneText>Load Details</BarLineOneText>
          </BarLineOne>
          <DetailWrap>
            <Text>Weight</Text>
            <DetailValue>{load.weight}</DetailValue>
          </DetailWrap>
          <DetailWrap>
            <Text>Loads</Text>
            <DetailValue>1</DetailValue>
          </DetailWrap>
          <DetailWrap>
            <Text>Livestock</Text>
            <DetailValue>{load.noOfLoads}</DetailValue>
          </DetailWrap>
          <DetailWrap>
            <Text>Rate</Text>
            <DetailValue>{load.rate}</DetailValue>
          </DetailWrap>
        </Bar>
      </Container>
    </ScrollView>
  )
}

export default LoadInfoChat
