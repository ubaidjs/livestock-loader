import React, { useState, useEffect, useRef } from 'react'
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
  TextInput,
  Dimensions,
} from 'react-native'
import styled from 'styled-components/native'
import RBSheet from 'react-native-raw-bottom-sheet'
import * as Contacts from 'expo-contacts'
import * as Permissions from 'expo-permissions'
import { api_url } from '../../constants/Api'
import {
  CustomInput,
  ButtonText,
  ButtonTextDisable,
} from '../../constants/CommonStyles'
import { TabView } from 'react-native-tab-view'
import colors from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import ContactInvite from '../../components/ContactInvite'

const FirstRoute = ({
  friends,
  checked,
  selectedFriends,
  setSelectedFriends,
  handleChecked,
}) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={friends}
      extraData={checked}
      keyExtractor={(item) => item.u_id}
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
                    (selected) => selected.u_id != item.u_id
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
  )
}

const SecondRoute = () => {
  const [contacts, setContacts] = useState([])
  const [filteredContact, setFilteredContact] = useState({})

  useEffect(() => {
    getContacts()
  }, [])

  const getContacts = async () => {
    // const { status } = await Permissions.getAsync(Permissions.CONTACTS)
    const { status } = await Contacts.requestPermissionsAsync()

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      })
      if (data.length > 0) {
        setContacts(data)
      }
    }
  }
  return (
    <View style={{ flex: 1 }}>
      {filteredContact.length ? (
        <FlatList
          data={filteredContact}
          renderItem={({ item }) => <ContactInvite name={item.name} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={contacts}
          renderItem={({ item }) => <ContactInvite name={item.name} />}
          keyExtractor={(item) => item.id}
        />
      )}

      {!contacts.length && <ActivityIndicator color="#000" />}
    </View>
  )
}

const AddGroup = (props) => {
  const [groupName, setGroupName] = useState('')
  const [searchTerm, setSearchTerm] = useState(null)
  const [friends, setFriends] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [selectedFriends, setSelectedFriends] = useState([])
  const [checked, setChecked] = useState({})
  const [user, setUser] = useState({})
  const [index, setIndex] = useState(0)

  const refRBSheet = useRef()

  useEffect(() => {
    fetchUser()
    fetchFriends()
  }, [])

  const fetchUser = async () => {
    let res = await AsyncStorage.getItem('USER')
    let temp = JSON.parse(res)
    setUser(temp)
    temp.group_role = 'admin'
    setSelectedFriends([...selectedFriends, temp])
  }

  const fetchFriends = async () => {
    setLoading(true)
    try {
      const token = await AsyncStorage.getItem('USER_TOKEN')
      const response = await fetch(`${api_url}?action=getUsers`, {
        method: 'POST',
        body: JSON.stringify({ token, page: 1 }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      if (json.status === '200') {
        let temp = []
        json.data.forEach((item) => {
          item.group_role = 'participant'
          temp.push(item)
        })
        setFriends(temp)
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
          creator_id: user.u_token,
          participants: selectedFriends,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()

      if (json.status === '200') {
        let temp = selectedFriends.filter(
          (item) => item.group_role === 'participant'
        )

        temp.forEach(async (item) => {
          await fetch(
            `https://conveyenceoffice.livestockloader.com/notification/index.php?token=${item.push_token}&msg=${user.u_fullname}%20added%20you%20to%20a%20group&sender_id=${user.u_id}&receiver_id=${item.u_id}&sender_name=${user.u_fullname}&message_type=groupnotification&group_id=${json.group_id}`
          )
        })

        refRBSheet.current.open()
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
          'Content-Type': 'application/json',
        },
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

  const renderTabBar = (props) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => setIndex(i)}
            >
              <Text
                style={
                  route.key === props.navigationState.routes[index].key
                    ? styles.tabTextActive
                    : styles.tabText
                }
              >
                {route.title}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return (
          <FirstRoute
            friends={friends}
            checked={checked}
            selectedFriends={selectedFriends}
            setSelectedFriends={setSelectedFriends}
            handleChecked={handleChecked}
          />
        )
      case 'second':
        return <SecondRoute />
      default:
        return null
    }
  }

  return (
    <Container>
      <CustomInput
        placeholder="Enter Groupe name"
        onChangeText={(val) => setGroupName(val)}
      />

      <RBSheet
        onClose={() => {
          props.navigation.navigate('MyGroups')
        }}
        height={300}
        ref={refRBSheet}
        closeOnPressBack={true}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'gray',
          },
          container: {
            elevation: 1,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
          draggableIcon: {
            backgroundColor: colors.themeYellow,
          },
        }}
      >
        <ActionSheetWrapper>
          <ActionSheetText>Group "{groupName}" added!</ActionSheetText>
          <Text style={{ marginTop: 40, color: colors.linkBlue }}>
            Complete later
          </Text>
        </ActionSheetWrapper>
      </RBSheet>

      <ScrollView>
        <View
          style={{
            paddingHorizontal: 10,
            backgroundColor: colors.lightGrey,
            borderRadius: 10,
          }}
        >
          <View style={{ padding: 10 }}>
            <SearchInput
              placeholder="Search to invite"
              onChangeText={(val) => setSearchTerm(val)}
              onSubmitEditing={() => searchFriends()}
            />
          </View>
          <TabView
            navigationState={{
              index,
              routes: [
                { key: 'first', title: 'Members' },
                { key: 'second', title: 'Contacts' },
              ],
            }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get('window').width }}
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

const ActionSheetWrapper = styled.View`
  padding-top: 50px;
  display: flex;
  align-items: center;
`

const ActionSheetText = styled.Text`
  color: ${colors.greyishBrown};
  font-family: 'pt-mono';
  font-size: 22;
  text-align: center;
  margin-top: 20;
`

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
      <TouchableOpacity
        onPress={() => navigation.goBack(null)}
        style={{ marginLeft: 15 }}
      >
        <Ionicons name="ios-arrow-round-back" color="#fff" size={30} />
      </TouchableOpacity>
    ),
  }
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  tabItem: {
    // flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  tabText: {
    color: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: colors.darkGrey,
  },
  tabTextActive: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.themeYellow,
    borderColor: colors.themeYellow,
    padding: 10,
  },
})

export default AddGroup
