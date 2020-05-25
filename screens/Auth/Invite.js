import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import * as Contacts from 'expo-contacts'
import * as Permissions from 'expo-permissions'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import {
  CustomButton,
  CustomInput,
  ButtonText
} from '../../constants/CommonStyles'
import ContactInvite from '../../components/ContactInvite'

const Container = styled.View`
  padding: 30px 20px;
  padding-bottom: 0px;
  flex: 1;
`

const ScreenTitle = styled.Text`
  font-size: 20px;
  padding: 20px;
  font-family: 'pt-mono-bold';
  text-align: center;
  color: ${colors.greyishBrown};
`

const TagLine = styled.Text`
  text-align: center;
  margin-bottom: 20px;
  color: ${colors.warmGrey};
`

const ContactWrapper = styled.View`
  background-color: rgb(247, 247, 247);
  flex: 1;
  margin-bottom: 20px;
  border-radius: 8px;
  padding: 20px;
`

const SkipBtn = styled.Text`
  color: ${colors.linkBlue};
  margin-vertical: 30px;
  text-align: center;
`

const Invite = props => {
  const [contacts, setContacts] = useState([])
  const [filteredContact, setFilteredContact] = useState([])

  useEffect(() => {
    getContacts()
  }, [])

  const getContacts = async () => {
    // const { status } = await Permissions.getAsync(Permissions.CONTACTS)
    const { status } = await Contacts.requestPermissionsAsync()

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })
      if (data.length > 0) {
        setContacts(data)
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <ScreenTitle>Invitees</ScreenTitle>
        <TagLine>Co-workers and Friends</TagLine>
        <CustomInput
          placeholder="Search contact list"
          onChangeText={val => {
            const filtered = contacts.filter(item => item.name.includes(val))
            setFilteredContact(filtered)
          }}
        />
        <View style={{ flex: 1 }}>
          {filteredContact.length ? (
            <FlatList
              data={filteredContact}
              renderItem={({ item }) => <ContactInvite name={item.name} />}
              keyExtractor={item => item.id}
            />
          ) : (
            <FlatList
              style={{ flex: 1 }}
              data={contacts}
              renderItem={({ item }) => <ContactInvite name={item.name} />}
              keyExtractor={item => item.id}
            />
          )}

          {!contacts.length && <ActivityIndicator color="#000" />}
        </View>
        <SkipBtn onPress={() => props.navigation.navigate('AuthLoading')}>
          Skip
        </SkipBtn>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('AuthLoading')}
        >
          <CustomButton>
            <ButtonText>INVITE</ButtonText>
          </CustomButton>
        </TouchableOpacity>
      </Container>
    </TouchableWithoutFeedback>
  )
}

Invite.navigationOptions = {
  header: null
}

export default Invite
