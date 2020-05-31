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
  FlatList
} from 'react-native'
import styled from 'styled-components/native'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import RNPickerSelect from 'react-native-picker-select'
import { StackActions, NavigationActions } from 'react-navigation'
import colors from '../../constants/Colors'
import { api_url } from '../../constants/Api'
import { CustomButton, ButtonText } from '../../constants/CommonStyles'

const CheckboxText = styled(Text)`
  line-height: 24;
  padding-right: 20px;
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
  font-weight: bold;
`

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
  font-family: 'pt-mono-bold';
  font-size: 20;
  color: ${colors.greyishBrown};
`

const Label = styled.Text`
  color: ${colors.greyishBrown};
`

const AddLivestockText = styled(Text)`
  margin-left: 5;
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
  const [checked, setChecked] = useState(false)
  const [callChecked, setCallChecked] = useState(false)
  const [details, setDetails] = useState(false)
  const [weight, setWeight] = useState(false)
  // const [numOfLoad, setNumOfLoad] = useState(false)
  const [rate, setRate] = useState(false)
  const [livestockType, setLivestockType] = useState('')
  const [livestockQty, setLivestockQty] = useState('')
  const [focusState, setFocusState] = useState(null)
  const [allstock, setAllstock] = useState([0])
  const [emptyFeilds, setEmptyFeilds] = useState({
    details: false,
    weight: false,
    numOfLoad: false,
    rate: false,
  })

  const rate_input = useRef(null)
  const prevDetails = props.navigation.getParam('details')
 
  const onAddCurrency = (val) => {
     if(val.charAt(0) == '$')
     {
        setRate(val.replace(/[- #*+;,.<>\{\}\[\]\\\/]/gi, ''))
    if(val.length <= 1)
     {
      setRate('')
     }
     }
     else
     {
      setRate('$'+val.replace(/[- #*+;,.<>\{\}\[\]\\\/]/gi, ''))
     }
  }

  const handleSubmit = () => {
    setFocusState(null)
    let valid = false
    if (details && weight && rate) {
      valid = true
    }

    setEmptyFeilds({
      ...emptyFeilds,
      details: details ? false : true,
      weight: weight ? false : true,
      // numOfLoad: numOfLoad ? false : true,
      rate: rate ? false : true,
    })

    if (valid) {
      props.navigation.navigate('AddLoadPreview', {
        details: {
          ...prevDetails,
          details,
          weight,
          // numOfLoad,
          rate,
          private: checked,
          callChecked,
          livestockType,
          livestockQty,
        },
      })
    }
  }
const AddAnotherTypequantity = () => {
  setAllstock(allstock => [...allstock, allstock.length]);
  // setAllstock([...allstock,findlength])
}
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <ScrollView>
        <Container>
          <TitleText>Enter load details</TitleText>
          <StepText>Step 3 of 4</StepText>
          <Bar>
            <BarLineOne>
              <BarLineOneText>Livestock Type & Quantity</BarLineOneText>
            </BarLineOne>
            <FlatList
            data = {allstock}
            extraData = {allstock}
            renderItem={()=>{
              return(<View style={{ flexDirection: 'row', marginTop: 20 }}>
              <View style={{ flex: 1, marginRight: 5 }}>
                <RNPickerSelect
                  Icon={() => (
                    <MaterialCommunityIcons name="chevron-down" size={15} />
                  )}
                  placeholder={{ label: 'Livestock Type', value: null }}
                  items={lsType}
                  onValueChange={(value) => {
                    setLivestockType(value)
                  }}
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
                    <MaterialCommunityIcons name="chevron-down" size={15} />
                  )}
                  placeholder={{ label: 'Livestock Qty', value: null }}
                  items={qty}
                  onValueChange={(value) => {
                    setLivestockQty(value)
                  }}
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
            </View>)
            }}
            />
            <View style={{ marginVertical: 15, flexDirection: 'row' }}>
              <MaterialCommunityIcons name="plus-box" size={20} onPress={AddAnotherTypequantity} />
              <AddLivestockText>
                Add another livestock type and qty
              </AddLivestockText>
            </View>
          </Bar>
          <Bar>
            <BarLineOne>
              <BarLineOneText>Rate & Weight</BarLineOneText>
            </BarLineOne>
            <DInputWrap>
              <Label>Load Total Weight (lbs)</Label>
              <TextInput
                style={[
                  styles.detailsInput,
                  emptyFeilds.weight && styles.errorBorder,
                  focusState === 'weight' && styles.focus,
                ]}
                onFocus={() => {
                  setEmptyFeilds({ ...emptyFeilds, weight: false })
                  setFocusState('weight')
                }}
                placeholder="per load"
                value = {weight}
                onChangeText={(val) =>  {setWeight(val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))}}
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={() => rate_input.current.focus()}
                blurOnSubmit={false}
              />
            </DInputWrap>

            <DInputWrap>
              <Label>Rate</Label>
              <TextInput
              value={rate}
                ref={rate_input}
                style={[
                  styles.detailsInput,
                  emptyFeilds.rate && styles.errorBorder,
                  focusState === 'rate' && styles.focus,
                ]}
                onFocus={() => {
                  setEmptyFeilds({ ...emptyFeilds, rate: false })
                  setFocusState('rate')
                }}
                placeholder="$"
                onChangeText={(val) => onAddCurrency(val)}
                keyboardType="numeric"
              />
            </DInputWrap>
            <TextInput
              style={[
                styles.customInputLocal,
                emptyFeilds.details && styles.errorBorder,
                focusState === 'load-details' && styles.focus,
              ]}
              onFocus={() => {
                setEmptyFeilds({ ...emptyFeilds, details: false })
                setFocusState('load-details')
              }}
              placeholder="Extra notes"
              multiline={true}
              numberOfLines={5}
              textAlignVertical="top"
              maxLength={200}
              onChangeText={(val) => setDetails(val)}
            />
          </Bar>
          <Checkbox
            checked={checked}
            text="Make load private. If private, this load will not be posted in
                live boards. This load will only be visible to you unless
                shared."
            setChecked={setChecked}
          />
          <Checkbox
            checked={callChecked}
            text="Others can call you about your load post."
            setChecked={setCallChecked}
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
          <ButtonText>PREVIEW</ButtonText>
        </CustomButton>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const Checkbox = ({ checked, text, setChecked }) => {
  return (
    <TouchableWithoutFeedback onPress={() => setChecked(!checked)}>
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
    </TouchableWithoutFeedback>
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
    // fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.dispatch(resetAction)}>
        <Text style={{ color: '#fff', marginRight: 15 }}>Exit</Text>
      </TouchableOpacity>
    ),
  }
}

export default AddLoadDetails
