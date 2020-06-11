import React, { useEffect, useState } from 'react'
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
} from 'react-native'
import styled from 'styled-components/native'
import { CustomInput } from '../../constants/CommonStyles'
import { CustomButton, ButtonText } from '../../constants/CommonStyles'

const Container = styled.View`
  flex: 1;
  padding: 20px;
`

const Bar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #f7f7f7;
  margin-vertical: 12px;
  border-radius: 10;
  elevation: 1;
`

const Name = styled.Text`
  flex: 1;
  margin-left: 15px;
  font-size: 16;
`

const Float = styled(View)`
  position: absolute;
  bottom: 0;
  z-index: 10;
  width: 100%;
  align-self: center;
`

const GroupInfo = (props) => {
  const group = props.navigation.getParam('group')
  const [user, setUser] = useState('')
  // const { participants } = group

  useEffect(() => {
    props.navigation.setParams({ title: group.title })
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    try {
      let res = await AsyncStorage.getItem('USER')
      res = JSON.parse(res)
      setUser(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <CustomInput placeholder="Search Group" keyboardType="web-search" />
      <FlatList
        style={{ marginBottom: 50 }}
        data={group}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity>
              <Bar>
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                  }}
                  source={{ uri: item.image }}
                />

                <Name>{item.name}</Name>
              </Bar>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item) => item.id}
      />
      <Float>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('GroupChat', {
              userId: user.u_id,
              userName: user.u_fullname,
              userImage: user.u_image,
              groupId: group.id,
            })
          }}
        >
          <CustomButton>
            <ButtonText>Group Chat</ButtonText>
          </CustomButton>
        </TouchableOpacity>
      </Float>
    </Container>
  )
}

GroupInfo.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title'),
})

export default GroupInfo
