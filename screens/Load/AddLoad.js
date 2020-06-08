import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker'
import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StackActions, NavigationActions } from 'react-navigation'
import colors from '../../constants/Colors'
import { CustomButton, ButtonText } from '../../constants/CommonStyles'
import { Ionicons } from '@expo/vector-icons'
import TimeZone from '../../validation/TimeZone'
import GetCurrentTimeZone from '../../validation/GetCurrentTimeZone';
const Float = styled(View)`
  position: absolute;
  bottom: 0;
  z-index: 10;
  width: 100%;
  padding-horizontal: 25;
`

const StepText = styled(Text)`
  text-align: center;
  margin-top: 10;
  color: ${colors.greyishBrown};
`

const Container = styled.View`
  flex: 1;
  padding: 20px;
  padding-bottom: 60px;
`

const CalendarWrap = styled.View`
  margin-bottom: 30px;
  align-self: stretch;
`
const TitleText = styled.Text`
  text-align: center;
  /* font-weight: bold; */
  font-size: 22;
  color: ${colors.greyishBrown};
  font-family: pt-mono-bold;
`

const Bar = styled.View`
  border-radius: 8;
  background-color: #f7f7f7;
  elevation: 1;
  margin: 10px 0px 20px;
  padding: 20px 8px;
`

const BarLineOne = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 8px;
`

const BarLineOneText = styled.Text`
  color: grey;
  margin-left: 10px;
`

const BarLineTwo = styled.View`
  background-color: #f0f0f0;
  margin-top: 15px;
  padding: 10px;
  border-radius: 8;
  flex-direction: row;
  justify-content: space-between;
`

const DateButtonWrap = styled.View`
  padding: 0 20px;
  margin-top: 10px;
  margin-bottom: 30px;
  flex-direction: row;
  justify-content: space-between;
`

const AddLoad = (props) => {
  // const initialtimezone = GetCurrentTimeZone(new Date())
  const [pickupSelected, setPickupSelected] = useState(false)
  const [pickupDate, setPickupDate] = useState(false)
  const [dropoffDate, setDropoffDate] = useState(false)
  const [pickTime, setPickTime] = useState(false)
  const [openPickTime, setOpenPickTime] = useState(false)
  const [dropTime, setDropTime] = useState(false)
  const [openDropTime, setOpenDropTime] = useState(false)

  const _onDateChange = (date, type) => {
    if (type === 'START_DATE') {
      setPickupDate(moment(date).format('YYYY-MM-DD'))
      setPickupSelected(true)
    } else if (type === 'END_DATE') {
      setDropoffDate(moment(date).format('YYYY-MM-DD'))
    }
  }
 const handleDateChange1 = date => {
  let settimezon = TimeZone(date)
  setPickTime(moment(date).format('h:mm A')+' '+settimezon)
  setOpenPickTime(false)
}
const hideDatePicker1 = () => {
    setOpenPickTime(false)
};
const handleDateChange2 = date => {
  let settimezon = TimeZone(date)
  setDropTime(moment(date).format('h:mm A')+' '+settimezon)
  setOpenDropTime(false)
}
const hideDatePicker2 = () => {
  setOpenDropTime(false)
};
  const _onPressContinue = () => {
    let validate = false
    if (
      pickupDate.length > 2 &&
      dropoffDate.length > 2 &&
      pickTime.length > 2 &&
      dropTime.length > 2 &&
      pickTime != 'NaN:NaN' &&
      dropTime != 'NaN:NaN'
    ) {
      validate = true
    }
    if (validate) {
      props.navigation.navigate('AddLoadDetails', {
        datetime: {
          pickupDate,
          dropoffDate,
          pickTime,
          dropTime,
        },
      })
    }
  }
  return (
    <View>
      <ScrollView>
        <Container>
          <TitleText>Enter date and time</TitleText>
          <StepText>Step 1 of 4</StepText>
          <CalendarWrap>
            <CalendarPicker
              onDateChange={_onDateChange} 
              allowRangeSelection={true}
              minDate={new Date()}
              selectedDayColor={colors.themeYellow}
              selectedDayTextColor="#fff"
              nextTitle="&#8250;"
              enableSwipe={false}
              nextTitleStyle={{ 
                fontSize: 25,
                fontWeight: 'bold',
              }}
              previousTitleStyle={{
                fontSize: 25,
                fontWeight: 'bold',
              }}
              previousTitle="&#8249;"
              // selectedRangeStartStyle={{
              //   backgroundColor: colors.greyishBrown,
              // }}
              // selectedRangeEndStyle={{
              //   backgroundColor: colors.greyishBrown,
              // }}
              selectedRangeStartStyle={{
                backgroundColor: colors.greyishBrown,
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
                borderRadius: 0,                
                width: 55,
                height: 32,
                borderColor: colors.themeYellow,
                borderWidth: 2,
              }}
              selectedRangeEndStyle={{
                backgroundColor: colors.greyishBrown,
                borderRadius: 0,
                borderTopRightRadius: 30,
                borderBottomRightRadius: 30,
                width: 55,
                height: 32,
                borderColor: colors.themeYellow,
                borderWidth: 2,                
              }}
              selectedRangeStyle={{
                backgroundColor: colors.themeYellow,
                height: 24,  
                color: colors.greyishBrown,
              }}
              dayLabelsWrapper={{
                borderBottomWidth: 0,
                borderTopWidth: 0,
                marginBottom: 15
              }}
            />
          </CalendarWrap>
          <View>
            {/* {dropoffDate && (
              <DateButtonWrap>
                <TouchableOpacity onPress={() => setOpenPickTime(true)}>
                  <Text style={{ color: colors.linkBlue }}>
                    Select Pick up Time
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOpenDropTime(true)}>
                  <Text style={{ color: colors.linkBlue }}>
                    Select Drop off Time
                  </Text>
                </TouchableOpacity>
              </DateButtonWrap>
            )} */}

            {openPickTime && (
              // <DateTimePicker
              //   value={new Date()}
              //   mode={'time'}
              //   is24Hour={false}
              //   display="default"
              //   onChange={(e, date) => {
              //     setOpenPickTime(false)
              //     if(e.type != 'dismissed'){
              //       let settimezon = TimeZone(date)
              //     setPickTime(moment(date).format('h:mm A')+' '+settimezon)
              //     } 
              //   }}
              // />
              <DateTimePickerModal
                                    isVisible={openPickTime}
                                    mode="time"
                                    display = 'default'
                                    minimumDate={new Date()}
                                    date={new Date()}
                                    onConfirm={handleDateChange1}
                                    onCancel={hideDatePicker1}
                                    headerTextIOS = 'Pick up time'
                                />
            )}
            {openDropTime && (
              // <DateTimePicker
              //   value={new Date()}
              //   mode={'time'}
              //   is24Hour={false}
              //   display="default"
              //   onChange={(e, date) => {
              //     setOpenDropTime(false)
              //     if(e.type != 'dismissed'){
              //       let settimezon = TimeZone(date)
              //     setDropTime(moment(date).format('h:mm A')+' '+settimezon)
              //     }
              //   }}
              //   timeZoneOffsetInMinutes={-330}
              // />
              <DateTimePickerModal
                                    isVisible={openDropTime}
                                    mode="time"
                                    display = 'default'
                                    minimumDate={new Date()}
                                    date={new Date()}
                                    onConfirm={handleDateChange2}
                                    onCancel={hideDatePicker2}
                                    headerTextIOS = 'Drop off time'
                                />
            )}
          </View>
          {pickupDate && (
            <Bar>
              <BarLineOne>
                <Feather name="arrow-up-circle" color="black" size={18} />
                <BarLineOneText>Pick up</BarLineOneText>
              </BarLineOne>

              <BarLineTwo>
                <Text style={{ fontWeight: 'bold' }}>
                  {moment(pickupDate).format('MMM DD')}
                </Text>
                <Text onPress={() => setOpenPickTime(true)} style={{ color: colors.linkBlue }}>{pickTime == false ? 'Pick up time' : pickTime}</Text>
              </BarLineTwo>
            </Bar>
          )}
          {dropoffDate && (
            <Bar>
              <BarLineOne>
                <Feather
                  name="arrow-down-circle"
                  color={colors.themeYellow}
                  size={18}
                />
                <BarLineOneText>Drop off</BarLineOneText>
              </BarLineOne>

              <BarLineTwo>
                <Text style={{ fontWeight: 'bold' }}>
                  {moment(dropoffDate).format('MMM DD')}
                </Text>
                <Text onPress={() => setOpenDropTime(true)} style={{ color: colors.linkBlue }}>{dropTime == false ? 'Drop off time' : dropTime}</Text>
              </BarLineTwo>
            </Bar>
          )}
        </Container>
      </ScrollView>
      <Float>
        {dropoffDate.length > 2 && pickupDate.length > 2 && (
          <TouchableOpacity onPress={_onPressContinue}>
            <CustomButton>
              <ButtonText>CONTINUE</ButtonText>
            </CustomButton>
          </TouchableOpacity>
        )}
      </Float>
    </View>
  )
}

AddLoad.navigationOptions = ({ navigation }) => {
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
  }
}

export default AddLoad
