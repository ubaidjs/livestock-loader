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
  Dimensions,
} from 'react-native'
import styled from 'styled-components/native'
import {
  CustomInput,
  CustomButton,
  ButtonText,
} from '../../constants/CommonStyles'
import { Ionicons } from '@expo/vector-icons'
import { TabView } from 'react-native-tab-view'
import colors from '../../constants/Colors'

const UserImage = styled(Image)`
  height: 50;
  width: 50;
  border-radius: 50;
`

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

const NoLoadText = styled(Text)`
  text-align: center;
  margin-top: 40;
  font-size: 18;
  color: gray;
`

const FirstRoute = ({ group }) => {
  return (
    <FlatList
      style={{ marginBottom: 50 }}
      data={group}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity>
            <Bar>
              {item.image ? (
                <UserImage source={{ uri: item.image }} />
              ) : (
                <UserImage
                  source={require('../../assets/images/avatarholder.png')}
                />
              )}

              <Name>{item.name}</Name>
            </Bar>
          </TouchableOpacity>
        )
      }}
      keyExtractor={(item) => item.id}
    />
  )
}

const SecondRoute = () => {
  return <NoLoadText>No Active Loads</NoLoadText>
}

const ThirdRoute = () => {
  return <NoLoadText>No Completed Loads</NoLoadText>
}

const GroupInfo = (props) => {
  const group = props.navigation.getParam('group')
  const groupId = props.navigation.getParam('groupId')
  const groupName = props.navigation.getParam('groupName')
  const [user, setUser] = useState('')
  const [index, setIndex] = useState(0)
  // const { participants } = group

  useEffect(() => {
    props.navigation.setParams({ title: groupName })
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
        return <FirstRoute group={group} />
      case 'second':
        return <SecondRoute />
      case 'third':
        return <ThirdRoute />
      default:
        return null
    }
  }

  return (
    <Container>
      {/* <CustomInput placeholder="Search Group" keyboardType="web-search" /> */}
      <TabView
        navigationState={{
          index,
          routes: [
            { key: 'first', title: 'Members' },
            { key: 'second', title: 'Active Loads' },
            { key: 'third', title: 'Completed Loads' },
          ],
        }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
      <Float>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('GroupChat', {
              userId: user.u_id,
              userName: user.u_fullname,
              userImage: user.u_image,
              groupId: groupId,
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
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => navigation.goBack(null)}
      style={{ marginLeft: 15 }}
    >
      <Ionicons name="ios-arrow-round-back" color="#fff" size={30} />
    </TouchableOpacity>
  ),
})

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
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

export default GroupInfo
