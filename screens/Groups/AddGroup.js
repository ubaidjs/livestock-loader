import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput
} from 'react-native'
import styled from 'styled-components/native'
import { api_url } from '../../constants/Api'
import {
  CustomInput,
  ButtonText,
  ButtonTextDisable
} from '../../constants/CommonStyles'
import colors from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
const AddGroup = props => {
  const [groupName, setGroupName] = useState('')
  const [searchTerm, setSearchTerm] = useState(null)
  const [friends, setFriends] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [selectedFriends, setSelectedFriends] = useState([])
  const [checked, setChecked] = useState({})

  useEffect(() => {
    fetchFriends()
  }, [])

  const fetchFriends = async () => {
    setLoading(true)
    try {
      const token = await AsyncStorage.getItem('USER_TOKEN')
      const response = await fetch(`${api_url}?action=getUsers`, {
        method: 'POST',
        body: JSON.stringify({ token, page: 1 }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
      if (json.status === '200') {
        setFriends(json.data)
      }
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChecked = (id, boolean) => {
    setChecked({ ...checked, [id]: boolean })
  }

  const saveGroup = async () => {
    setSaveLoading(true)
    try {
      // const creator_id = await AsyncStorage.getItem('USER_ID')
      const token = await AsyncStorage.getItem('USER_TOKEN')
      const response = await fetch(`${api_url}?action=addgroup`, {
        method: 'POST',
        body: JSON.stringify({
          title: groupName,
          creator_id: token,
          participants: selectedFriends
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
      if (json.status === '200') {
        Alert.alert(
          '',
          'Group saved',
          [
            {
              text: 'OK',
              onPress: () => props.navigation.navigate('MyGroups')
            }
          ],
          { cancelable: false }
        )
      }
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setSaveLoading(false)
    }
  }

  const searchFriends = async () => {
    if (!searchTerm) {
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`${api_url}?action=getUsersonSearch`, {
        method: 'POST',
        body: JSON.stringify({ word: searchTerm }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
      if (json.status === '200') {
        setFriends(json.data)
      }
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <CustomInput
        placeholder="Enter Groupe name"
        onChangeText={val => setGroupName(val)}
      />

      <ScrollView>
        <View
          style={{
            paddingHorizontal: 10,
            backgroundColor: colors.lightGrey,
            borderRadius: 10
          }}
        >
          <View style={{ padding: 10 }}>
            <SearchInput
              placeholder="Search to invite"
              onChangeText={val => setSearchTerm(val)}
              onSubmitEditing={() => searchFriends()}
            />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={friends}
            extraData={checked}
            keyExtractor={item => item.u_id}
            renderItem={({ item }) => {
              return (
                <FriendView>
                  <Image
                    style={{ height: 50, width: 50, borderRadius: 50 }}
                    source={{ uri: item.u_image }}
                  />
                  <Name>{item.u_fullname}</Name>
                  {checked[item.u_id] ? (
                    <TouchableWithoutFeedback
                      onPress={() => {
                        const filterarr = selectedFriends.filter(
                          selected => selected.u_id != item.u_id
                        )
                        setSelectedFriends(filterarr)
                        handleChecked(item.u_id, false)
                      }}
                    >
                      <UndoAddBtn>Invite</UndoAddBtn>
                    </TouchableWithoutFeedback>
                  ) : (
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setSelectedFriends([...selectedFriends, item])
                        handleChecked(item.u_id, true)
                      }}
                    >
                      <AddBtn>Invite</AddBtn>
                    </TouchableWithoutFeedback>
                  )}
                </FriendView>
              )
            }}
          />
          {loading && <ActivityIndicator />}
        </View>
      </ScrollView>
      {selectedFriends.length && groupName ? (
        <TouchableOpacity onPress={() => saveGroup()}>
          <CustomButton>
            {saveLoading ? (
              <ActivityIndicator />
            ) : (
              <ButtonText>SAVE</ButtonText>
            )}
          </CustomButton>
        </TouchableOpacity>
      ) : (
        <CustomButtonDisable>
          <ButtonTextDisable>SAVE</ButtonTextDisable>
        </CustomButtonDisable>
      )}
    </Container>
  )
}

const Container = styled.View`
  padding: 20px;
  flex: 1;
`

const SearchInput = styled.TextInput`
  background-color: white;
  padding: 10px;
  border-radius: 5px;
`

const FriendWrapper = styled.View`
  padding: 15px;
  background-color: #f7f7f7;
  border-radius: 10;
  elevation: 1;
  margin-bottom: 40px;
`

const FriendView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 15px;
`

const Name = styled.Text`
  flex: 1;
  margin-left: 15px;
  font-size: 16;
  font-family: 'pt-mono-bold';
`

const AddBtn = styled.Text`
  padding: 5px 10px;
  background-color: ${colors.darkGrey};
  border-radius: 10px;
  color: grey;
  font-weight: bold;
`

const UndoAddBtn = styled.Text`
  padding: 5px 10px;
  background-color: ${colors.greyishBrown};
  border-radius: 10px;
  color: white;
  font-weight: bold;
`

const CustomButton = styled.View`
  background-color: ${colors.themeYellow};
  align-self: stretch;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
  color: ${colors.greyishBrown};
  flex-direction: row;
  justify-content: center;
`

export const CustomButtonDisable = styled.View`
  background-color: 'rgba(234, 197, 71, 0.5)';
  align-self: stretch;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
  color: ${colors.greyishBrown};
  flex-direction: row;
  justify-content: center;
`

AddGroup.navigationOptions = ({ navigation }) => {
  return {
    title: 'Add Group',
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack(null)} style={{marginLeft: 15}}>
          <Ionicons name="ios-arrow-round-back" color="#fff" size={30} />
      </TouchableOpacity>
    ),
  }
}

export default AddGroup
