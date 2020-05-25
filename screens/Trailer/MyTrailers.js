import React, { useState, useEffect, useRef } from 'react'
import {
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  RefreshControl,
  FlatList,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'
import { NavigationEvents } from 'react-navigation'
import RBSheet from 'react-native-raw-bottom-sheet'
import { api_url } from '../../constants/Api'
import colors from '../../constants/Colors'

const Container = styled.View`
  flex: 1;
  padding: 20px;
`

const TrailerItem = styled.View`
  padding: 15px 20px;
  background-color: #f7f7f7;
  margin-vertical: 12px;
  border-radius: 10;
  elevation: 1;
`

const TrailerNameWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const TrailerInfoWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const TrailerInfoText = styled.Text`
  color: ${colors.littleDarkGrey};
`

const NoTrailerText = styled.Text`
  color: ${colors.greyishBrown};
  font-family: 'pt-mono-bold';
  font-size: 20;
  text-align: center;
  margin-top: 20;
`

const ButtonText = styled.Text`
  margin-top: 50px;
  border-width: 1;
  border-color: ${colors.themeYellow};
  padding: 15px;
  margin-horizontal: 70px;
  border-radius: 10;
  text-align: center;
`

const MyTrailers = (props) => {
  const [trailer, setTrailer] = useState([])
  const [noSavedTrailer, setNoSavedTrailer] = useState(false)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const refRBSheet = useRef()

  useEffect(() => {
    fetchSavedTrailer()
  }, [])

  const fetchSavedTrailer = async () => {
    setLoading(true)
    setNoSavedTrailer(false)
    setTrailer([])
    try {
      const token = await AsyncStorage.getItem('USER_TOKEN')
      const response = await fetch(`${api_url}?action=getCustomTrailer`, {
        method: 'POST',
        body: JSON.stringify({ token, limit: 'all' }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      if (json.status === '200') {
        setTrailer(json.data)
      }
      if (!json.data.length) {
        setNoSavedTrailer(true)
        refRBSheet.current.open()
      }
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = () => {
    fetchSavedTrailer()
    setRefreshing(false)
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <NavigationEvents onWillFocus={() => fetchSavedTrailer()} />
      <Container>
        {loading && <ActivityIndicator color="#000" />}
        {/* {noSavedTrailer && (
          <Text style={{ textAlign: 'center', color: 'grey' }}>
            No saved trailers
          </Text>
        )} */}
        <RBSheet
          ref={refRBSheet}
          // onClose={() => {
          //   props.navigation.goBack()
          // }}
          closeOnDragDown={true}
          closeOnPressMask={true}
          closeOnPressBack={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(242,242,242,0.5)',
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
          <View>
            <NoTrailerText>You have no saved trailer</NoTrailerText>
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.close()
                props.navigation.navigate('AddTrailer')
              }}
            >
              <ButtonText>Add a new Trailer</ButtonText>
            </TouchableOpacity>
          </View>
        </RBSheet>
        <View>
          {trailer.map((item) => (
            <TouchableWithoutFeedback
              key={item.id}
              onPress={() =>
                props.navigation.navigate('TrailerInfo', {
                  trailer: item,
                })
              }
            >
              <TrailerItem>
                <View>
                  <TrailerNameWrapper>
                    <Text style={{ fontSize: 18, color: colors.greyishBrown }}>
                      {item.t_name}
                    </Text>
                    <Ionicons
                      name="ios-arrow-round-forward"
                      size={20}
                      color={colors.linkBlue}
                    />
                  </TrailerNameWrapper>
                  <TrailerInfoWrap>
                    <TrailerInfoText>Carries: {item.t_lstype}</TrailerInfoText>
                    <TrailerInfoText>
                      Type: {item.t_trailertype}
                    </TrailerInfoText>
                    <TrailerInfoText>Load: 25</TrailerInfoText>
                  </TrailerInfoWrap>
                </View>
              </TrailerItem>
            </TouchableWithoutFeedback>
          ))}
        </View>
        {/* <SavedTrailerItem trailer={trailer} navigation={props.navigation} /> */}
      </Container>
    </ScrollView>
  )
}

MyTrailers.navigationOptions = ({ navigation }) => {
  return {
    title: 'My Trailers',
    headerRight: () => (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('AddTrailer')}
      >
        <Feather
          style={{ marginRight: 15 }}
          name="plus"
          color="#fff"
          size={22}
        />
      </TouchableWithoutFeedback>
    ),
  }
}

export default MyTrailers
