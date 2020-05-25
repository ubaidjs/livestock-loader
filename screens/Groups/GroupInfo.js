import React, { useEffect } from 'react'
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
  ActivityIndicator
} from 'react-native'
import styled from 'styled-components/native'
import { CustomInput } from '../../constants/CommonStyles'

const Container = styled.View`
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

const GroupInfo = props => {
  const group = props.navigation.getParam('group')

  const { participants } = group

  useEffect(() => {
    props.navigation.setParams({ title: group.title })
  }, [])

  return (
    <Container>
      <CustomInput placeholder="Search Group" keyboardType="web-search" />
      <FlatList
        style={{ marginBottom: 50 }}
        data={participants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity>
              <Bar>
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50
                  }}
                  source={{ uri: item.u_image }}
                />

                <Name>{item.u_fullname}</Name>
              </Bar>
            </TouchableOpacity>
          )
        }}
        keyExtractor={item => item.u_id}
      />
    </Container>
  )
}

GroupInfo.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title')
})

export default GroupInfo
