import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  AsyncStorage,
  ActivityIndicator,
  Alert,
  Image,
  FlatList,
} from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import styled from 'styled-components/native'
import moment from 'moment'
import RNPickerSelect from 'react-native-picker-select'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../../constants/Colors'
import { api_url } from '../../constants/Api'
import { CustomButton, ButtonText } from '../../constants/CommonStyles'
import { Ionicons } from '@expo/vector-icons'
const AddLivestockText = styled(Text)`
  margin-left: 5;
  color: ${colors.greyishBrown};
`

const AddLivestock = styled(View)`
  margin-vertical: 15;
  flex-direction: row;
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
  font-weight: bold;
`

const BarLineTwo = styled.View`
  background-color: #f0f0f0;
  margin-top: 15px;
  padding: 10px;
  border-radius: 8;
  flex-direction: row;
  justify-content: space-between;
`

const BarLineThree = styled.View``

const CustomInputLocal = styled.TextInput`
  background-color: #fff;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
`

const DetailsInput = styled.TextInput`
  background-color: #fff;
  padding: 5px 10px;
  margin-horizontal: 5px;
  border-radius: 5px;
  width: 100px;
`

const DInputWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 10px;
`

const CheckboxWrap = styled.View`
  flex-direction: row;
  padding-horizontal: 10px;
  margin-vertical: 10px;
`

const TitleText = styled.Text`
  text-align: center;
  /* font-weight: bold; */
  font-family: 'pt-mono-bold';
  font-size: 20;
  color: ${colors.greyishBrown};
`

const Label = styled.Text`
  color: ${colors.greyishBrown};
`

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

const StepText = styled(Text)`
  text-align: center;
  margin-top: 10;
  margin-bottom: 20;
  color: ${colors.greyishBrown};
`

const CheckboxText = styled(Text)`
  line-height: 24;
  padding-right: 20px;
  color: ${colors.greyishBrown};
`

const lsType = [
  { label: 'Bull', value: 'bull' },
  { label: 'Cow', value: 'cow' },
  { label: 'Heifer', value: 'heifer' },
  { label: 'Fats', value: 'fats' },
  { label: 'Calf', value: 'calf' },
]
const qty = [
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '30', value: '30' },
  { label: '40', value: '40' },
  { label: '50', value: '50' },
]

const AddLoadDetails = (props) => {
  const finalDetails = props.navigation.getParam('details')
  const [loading, setLoading] = useState(false)

  const refRBSheet = useRef()

  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'AddLoad' })],
  })

  const handleSubmit = async () => {
    setLoading(true)

    const arr = []
    finalDetails.allstock.map((item) => {
      arr.push({
        name: finalDetails.livestockType[item],
        qty: finalDetails.livestockQty[item],
      })
    })
    console.log(arr)

    try {
      const token = await AsyncStorage.getItem('USER_TOKEN')
      const response = await fetch(`${api_url}?action=addload`, {
        method: 'POST',
        body: JSON.stringify({
          token,
          pickUp: {
            date: finalDetails.pickupDate,
            time: finalDetails.pickTime,
            address: finalDetails.pickAddress,
          },
          dropOff: {
            date: finalDetails.dropoffDate,
            time: finalDetails.dropTime,
            address: finalDetails.dropAddress,
          },
          loadDetails: {
            totalWeight: finalDetails.weight,
            numOfLoad: finalDetails.numOfLoad,
            rate: finalDetails.rate,
            livestockType: arr,
            private: finalDetails.checked,
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      if (json.status === '200') {
        refRBSheet.current.open()
      }
    } catch (error) {
      console.log('error: ', error)
    }
    setLoading(false)
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <ScrollView>
        <Container>
          <RBSheet
            onClose={() => {
              props.navigation.dispatch(resetAction)
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
              <Image source={require('../../assets/images/loadsaved.png')} />
              <ActionSheetText>
                Your load is now {'\n'} saved! Let's start {'\n'} networking!
              </ActionSheetText>
              {/* <Text style={{ marginTop: 40, color: colors.linkBlue }}>
                Complete later
              </Text> */}
            </ActionSheetWrapper>
          </RBSheet>

          {/* <TitleText>Preview & Save</TitleText> */}
          <TitleText>Preview & Save</TitleText>
          <StepText>Step 4 of 4</StepText>
          <Bar>
            <BarLineOne>
              <Feather
                name="arrow-up-circle"
                color="black"
                size={18}
                style={{ marginRight: 10 }}
              />
              <BarLineOneText>Pick Up</BarLineOneText>
            </BarLineOne>

            <BarLineTwo>
              <Text style={{ fontWeight: 'bold', color: colors.greyishBrown }}>
                {moment(finalDetails.pickupDate).format('MMM DD')}
              </Text>
              <Text style={{ color: colors.linkBlue }}>
                {finalDetails.pickTime}
              </Text>
            </BarLineTwo>

            <BarLineThree>
              <TextInput
                style={[styles.customInputLocal]}
                value={finalDetails.pickAddress}
                placeholder="Enter pick up address.."
                editable={false}
                multiline={true}
                numberOfLines={5}
                textAlignVertical="top"
                maxLength={200}
              />
            </BarLineThree>
          </Bar>

          <Bar>
            <BarLineOne>
              <Feather
                name="arrow-down-circle"
                color={colors.themeYellow}
                size={18}
                style={{ marginRight: 10 }}
              />
              <BarLineOneText>Drop Off</BarLineOneText>
            </BarLineOne>

            <BarLineTwo>
              <Text style={{ fontWeight: 'bold', color: colors.greyishBrown }}>
                {moment(finalDetails.dropoffDate).format('MMM DD')}
              </Text>
              <Text style={{ color: colors.linkBlue }}>
                {finalDetails.dropTime}
              </Text>
            </BarLineTwo>

            <BarLineThree>
              <TextInput
                style={[styles.customInputLocal]}
                value={finalDetails.dropAddress}
                placeholder="Enter drop off address.."
                editable={false}
                multiline={true}
                numberOfLines={5}
                textAlignVertical="top"
                maxLength={200}
              />
            </BarLineThree>
          </Bar>

          <Bar>
            <BarLineOne>
              <BarLineOneText>Livestock Type & Quantity</BarLineOneText>
            </BarLineOne>
            <FlatList
              data={finalDetails.allstock}
              renderItem={({ item }) => {
                return (
                  <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ flex: 1, marginRight: 5 }}>
                      <RNPickerSelect
                        Icon={() => (
                          <MaterialCommunityIcons
                            name="chevron-down"
                            size={15}
                          />
                        )}
                        disabled={true}
                        items={lsType}
                        onValueChange={() => {}}
                        value={finalDetails.livestockType[item]}
                        style={{
                          inputAndroid: styles.picker,
                          inputIOS: styles.picker,
                          iconContainer: {
                            paddingTop: 18,
                            paddingRight: 5,
                          },
                        }}
                      />
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 5 }}>
                      <RNPickerSelect
                        Icon={() => (
                          <MaterialCommunityIcons
                            name="chevron-down"
                            size={15}
                          />
                        )}
                        disabled={true}
                        onValueChange={() => {}}
                        value={finalDetails.livestockQty[item]}
                        items={qty}
                        style={{
                          inputAndroid: styles.picker,
                          inputIOS: styles.picker,
                          iconContainer: {
                            paddingTop: 18,
                            paddingRight: 5,
                          },
                        }}
                      />
                    </View>
                  </View>
                )
              }}
            />

            <AddLivestock>
              <MaterialCommunityIcons name="plus-box" size={20} />
              <AddLivestockText>
                Add another livestock type and qty
              </AddLivestockText>
            </AddLivestock>
          </Bar>

          <Bar>
            <BarLineOne>
              <BarLineOneText>Rate & Weight</BarLineOneText>
            </BarLineOne>

            <DInputWrap>
              <Label>Load Total Weight (lbs)</Label>
              <TextInput
                style={[styles.detailsInput]}
                value={finalDetails.weight}
                editable={false}
                placeholder="per load"
              />
            </DInputWrap>

            <DInputWrap>
              <Label>Rate</Label>
              <TextInput
                style={[styles.detailsInput]}
                placeholder="$"
                value={finalDetails.rate}
                editable={false}
                keyboardType="numeric"
              />
            </DInputWrap>

            <TextInput
              style={[styles.customInputLocal]}
              value={finalDetails.details}
              editable={false}
              placeholder="Extra Notes"
              multiline={true}
              numberOfLines={5}
              textAlignVertical="top"
            />
          </Bar>
          <Checkbox
            checked={finalDetails.private}
            text="Make load private. If private, this load will not be posted in
                live boards. This load will only be visible to you unless
                shared."
          />
          <Checkbox
            checked={finalDetails.callChecked}
            text="Others can call you about your load post."
          />
        </Container>
      </ScrollView>
      <TouchableOpacity
        style={{ paddingHorizontal: 20 }}
        onPress={() => {
          handleSubmit()
        }}
      >
        <CustomButton>
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <ButtonText>SAVE LOAD</ButtonText>
          )}
        </CustomButton>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const Checkbox = ({ checked, text }) => {
  return (
    <CheckboxWrap>
      {checked ? (
        <MaterialCommunityIcons
          name="checkbox-marked-outline"
          color={colors.greyishBrown}
          size={22}
          style={{ marginRight: 5 }}
        />
      ) : (
        <MaterialCommunityIcons
          name="checkbox-blank-outline"
          color={colors.greyishBrown}
          size={22}
          style={{ marginRight: 5 }}
        />
      )}
      <CheckboxText>{text}</CheckboxText>
    </CheckboxWrap>
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
  picker: {
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#fff',
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
      <TouchableOpacity
        onPress={() => navigation.goBack(null)}
        style={{ marginLeft: 15 }}
      >
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
