import React from 'react'
import { View, Text, Image } from 'react-native'
import styled from 'styled-components/native'
import colors from '../constants/Colors'

const ContactView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`

const ContactName = styled.Text`
  font-family: 'pt-mono-bold';
  flex: 1;
  text-align: left;
  margin-left: 15px;
`

const InviteButton = styled.Text`
  text-align: center;
  background-color: ${colors.darkGrey};
  padding: 5px;
  border-radius: 5px;
  margin-right: 15px;
`

const UserImage = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 50px;
`

const DummyImg = styled.View`
  height: 50px;
  width: 50px;
`

const ContactInvite = props => {
  return (
    <ContactView>
      <ContactName>{props.name}</ContactName>
      <InviteButton>INVITE</InviteButton>
    </ContactView>
  )
}

export default ContactInvite
