import React, { useState, useEffect, useRef } from 'react'
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  RefreshControl,
  FlatList,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native'
import styled from 'styled-components/native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { NavigationEvents } from 'react-navigation'
import RBSheet from 'react-native-raw-bottom-sheet'
import { api_url } from '../../constants/Api'
import colors from '../../constants/Colors'

const Container = styled.View`
  flex: 1;
  padding: 20px;
`

const ButtonText = styled.Text`
  margin-top: 50px;
  border-width: 1;
  border-color: ${colors.themeYellow};
  padding: 15px;
  border-radius: 10;
  text-align: center;
`

const NoTrailerText = styled.Text`
  color: ${colors.greyishBrown};
  font-family: 'pt-mono-bold';
  font-size: 20;
  text-align: center;
  margin-top: 20;
  margin-horizontal: 20;
`

const ActionSheetWrapper = styled.View`
  padding-top: 50px;
  display: flex;
  align-items: center;
`

const Heading = styled.Text`
  text-align: center;
  padding-horizontal: 20px;
  font-size: 20;
  font-family: 'pt-mono-bold';
  color: ${colors.greyishBrown};
  margin-bottom: 40px;
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

const Calculator = (props) => {
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

  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => fetchSavedTrailer()}
        />
      }
    >
      <Container>
        <Heading>Select a trailer to calculate load</Heading>
        {loading && <ActivityIndicator color="#000" />}
        {noSavedTrailer && (
          <Text style={{ textAlign: 'center', color: 'grey' }}>
            You have no trailers to calculate.
          </Text>
        )}

        <RBSheet
          height={350}
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          closeOnPressBack={true}
          customStyles={{
            wrapper: {
              backgroundColor: '#f2f2f2',
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
            <Image source={require('../../assets/images/notrailer.png')} />
            <NoTrailerText>You have no trailers to calculate.</NoTrailerText>
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.close()
                props.navigation.navigate('AddTrailer')
              }}
            >
              <ButtonText>Add a new Trailer</ButtonText>
            </TouchableOpacity>
          </ActionSheetWrapper>
        </RBSheet>
        <View>
          {trailer.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                props.navigation.navigate('CalculatorInputs', {
                  total: item.t_total,
                  id: item.id,
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
            </TouchableOpacity>
          ))}
        </View>
      </Container>
    </ScrollView>
  )
}

export default Calculator
