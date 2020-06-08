import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import styled from 'styled-components/native'
import moment from 'moment'
import { StackActions, NavigationActions } from 'react-navigation'
import { Feather } from '@expo/vector-icons'
import colors from '../../constants/Colors'
import { CustomButton, ButtonText } from '../../constants/CommonStyles'
import { Ionicons } from '@expo/vector-icons'
const DateText = styled(Text)`
  font-weight: bold;
  color: ${colors.greyishBrown};
`

const StepText = styled(Text)`
  text-align: center;
  margin-top: 10;
  margin-bottom: 20;
  color: ${colors.greyishBrown};
`

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
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  padding: 10px;
  border-radius: 8;
`

const BarLineThree = styled.View``

const TitleText = styled.Text`
  text-align: center;
  font-family: 'pt-mono-bold';
  font-size: 20;
  color: ${colors.greyishBrown};
  text-align: center;
`

const AddLoadDetails = (props) => {
  const [pickAddress, setPickAddress] = useState(false)
  const [dropAddress, setDropAddress] = useState(false)
  const [focusState, setFocusState] = useState(null)
  const [emptyFeilds, setEmptyFeilds] = useState({
    pickAddress: false,
    dropAddress: false,
  })

  const datetime = props.navigation.getParam('datetime')

  const handleSubmit = async () => {
    setFocusState(null)
    let valid = false
    if (pickAddress && dropAddress) {
      valid = true
    }

    setEmptyFeilds({
      ...emptyFeilds,
      pickAddress: pickAddress ? false : true,
      dropAddress: dropAddress ? false : true,
    })

    if (valid) {
      props.navigation.navigate('AddLoadThree', {
        details: {
          ...datetime,
          pickAddress,
          dropAddress,
        },
      })
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <ScrollView>
        <Container>
          <TitleText>Enter address</TitleText>
          <StepText>Step 2 of 4</StepText>
          <Bar>
            <BarLineOne>
              <Feather name="arrow-up-circle" color="black" size={18} />
              <BarLineOneText>Pick Up</BarLineOneText>
            </BarLineOne>

            <BarLineTwo>
              <DateText>
                {moment(datetime.pickupDate).format('MMM DD')}
              </DateText>
              <Text style={{ color: colors.linkBlue }}>
                {datetime.pickTime}
              </Text>
            </BarLineTwo>

            <BarLineThree>
              <TextInput
                style={[
                  styles.customInputLocal,
                  emptyFeilds.pickAddress && styles.errorBorder,
                  focusState === 'pick-address' && styles.focus,
                ]}
                onFocus={() => {
                  setEmptyFeilds({ ...emptyFeilds, pickAddress: false })
                  setFocusState('pick-address')
                }}
                placeholder="Enter pick up address.."
                multiline={true}
                numberOfLines={5}
                textAlignVertical="top"
                maxLength={200}
                onChangeText={(val) => setPickAddress(val)}
                autoFocus={true}
              />
            </BarLineThree>
          </Bar>
          <Bar>
            <BarLineOne>
              <Feather
                name="arrow-down-circle"
                color={colors.themeYellow}
                size={18}
              />
              <BarLineOneText>Drop Off</BarLineOneText>
            </BarLineOne>

            <BarLineTwo>
              <DateText>
                {moment(datetime.dropoffDate).format('MMM DD')}
              </DateText>
              <Text style={{ color: colors.linkBlue }}>
                {datetime.dropTime}
              </Text>
            </BarLineTwo>

            <BarLineThree>
              <TextInput
                style={[
                  styles.customInputLocal,
                  emptyFeilds.dropAddress && styles.errorBorder,
                  focusState === 'drop-address' && styles.focus,
                ]}
                onFocus={() => {
                  setEmptyFeilds({ ...emptyFeilds, dropAddress: false })
                  setFocusState('drop-address')
                }}
                placeholder="Enter drop off address.."
                multiline={true}
                numberOfLines={5}
                textAlignVertical="top"
                maxLength={200}
                onChangeText={(val) => setDropAddress(val)}
              />
            </BarLineThree>
          </Bar>
        </Container>
      </ScrollView>
      <TouchableOpacity
        style={{ paddingHorizontal: 20 }}
        onPress={handleSubmit}
      >
        <CustomButton>
          <ButtonText>CONTINUE</ButtonText>
        </CustomButton>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  customInputLocal: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  errorBorder: {
    borderColor: '#d66b6b',
    borderWidth: 1,
  },
  focus: {
    borderColor: colors.themeYellow,
    borderWidth: 1,
  },
  detailsInput: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    width: 100,
  },
})

AddLoadDetails.navigationOptions = ({ navigation }) => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'AddLoad' })],
  })

  return {
    title: 'Add Load',
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack(null)} style={{marginLeft: 15}}>
          <Ionicons name="ios-arrow-round-back" color="#fff" size={30} />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.dispatch(resetAction)}>
        <Text style={{ color: '#fff', marginRight: 15 }}>Exit</Text>
      </TouchableOpacity>
    ),
  }
}

export default AddLoadDetails
