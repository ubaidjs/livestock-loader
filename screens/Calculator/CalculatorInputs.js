import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  Keyboard,
  Dimensions,
  StyleSheet,
  Image,
  Alert,
} from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import styled from 'styled-components/native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Ionicons } from '@expo/vector-icons'
import { TabView } from 'react-native-tab-view'
import { CustomButton, ButtonText } from '../../constants/CommonStyles'
import { api_url } from '../../constants/Api'
import colors from '../../constants/Colors'

const Container = styled.View`
  flex: 1;
  padding: 20px;
  margin-bottom: 40px;
`

const Heading = styled.Text`
  text-align: center;
  padding-horizontal: 20px;
  font-size: 20;
	font-family: 'pt-mono-bold';
	color: ${colors.greyishBrown}
  margin-bottom: 30px;
`

const Bar = styled.View`
  padding: 15px;
  margin-horizontal: 10px;
  margin-vertical: 20px;
  background-color: #f7f7f7;
  elevation: 1;
  border-radius: 10px;
`

const BarHeader = styled.View`
  flex-direction: row;
  align-items: center;
`

const HeaderTitle = styled.Text`
  font-family: space-mono;
  margin-left: 10px;
  font-size: 15;
  color: grey;
`

const HeaderImage = styled.Image`
  height: 34;
  width: 34;
`

const BarItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 7px;
`

const CheckBox = styled.View`
  height: 20;
  width: 20;
  background-color: #d7d7d7;
  border-radius: 2px;
`

const ItemNameWrap = styled.View`
	flex-direction: row;
	align-items: center
  margin-left: 15px;
  flex: 1;
`

const Name = styled.Text`
  font-size: 16;
  color: ${colors.greyishBrown};
  margin-right: 10;
`

const SampleWeight = styled.Text`
  color: #868686;
`

const InputWrap = styled.View`
  flex-direction: row;
`

const CustomInput = styled.TextInput`
  background-color: rgb(240, 240, 240);
  padding-horizontal: 5px;
  padding-vertical: 5px;
  margin-left: 10px;
  border-radius: 5px;
  width: 55px;
  text-align: center;
`

const Float = styled.View`
  position: absolute;
  bottom: 0;
  z-index: 10;
  width: 100%;
  padding-horizontal: 25;
`

const ActionSheetWrapper = styled.View`
  padding-top: 20px;
  align-items: center;
`

const ActionSheetTitle = styled.Text`
	font-size: 20;
	margin-bottom: 10;
	font-family: 'pt-mono-bold'
	color: #618056;
`

const ActionSheetText = styled.Text`
  font-family: 'pt-mono-bold';
  color: #618056;
`

const Cattle = [
  { id: '1', name: 'Bulls', weight: '1200-2200' },
  { id: '2', name: 'Cow', weight: '800-1300' },
  { id: '3', name: 'Heifer', weight: '675-1000' },
  { id: '4', name: 'Fats', weight: '1300-1800' },
  { id: '5', name: 'Calf', weight: '275-600' },
]

const Goat = [
  { id: '6', name: 'Buck', weight: '170-340' },
  { id: '7', name: 'Doe', weight: '125-230' },
  { id: '8', name: 'Kid', weight: '45-95' },
]

const FirstRoute = ({ calculation, setCalculation }) => (
  <Bar>
    <BarHeader>
      <HeaderImage source={require('../../assets/images/cow.png')} />
      <HeaderTitle>Cattle</HeaderTitle>
    </BarHeader>
    {Cattle.map((current) => {
      return (
        <Animal
          cal={calculation}
          setCal={setCalculation}
          key={current.id}
          name={current.name}
          weight={current.weight}
        />
      )
    })}
  </Bar>
)

const SecondRoute = ({ calculation, setCalculation }) => (
  <Bar>
    <BarHeader>
      <HeaderImage source={require('../../assets/images/sheep.png')} />
      <HeaderTitle>Sheep</HeaderTitle>
    </BarHeader>
    <Animal
      name="Ram"
      weight="99-350"
      cal={calculation}
      setCal={setCalculation}
    />
  </Bar>
)

const ThirdRoute = ({ calculation, setCalculation }) => (
  <Bar>
    <BarHeader>
      <HeaderImage source={require('../../assets/images/goat.png')} />
      <HeaderTitle>Goat</HeaderTitle>
    </BarHeader>
    {Goat.map((current) => {
      return (
        <Animal
          cal={calculation}
          setCal={setCalculation}
          key={current.id}
          name={current.name}
          weight={current.weight}
        />
      )
    })}
  </Bar>
)

const FourthRoute = ({ calculation, setCalculation }) => (
  <Bar>
    <BarHeader>
      <HeaderImage source={require('../../assets/images/pig.png')} />
      <HeaderTitle>Pigs</HeaderTitle>
    </BarHeader>
    <Animal
      name="Market Pigs"
      weight="280-290"
      cal={calculation}
      setCal={setCalculation}
    />
  </Bar>
)

const CalculatorInputs = (props) => {
  const [loading, setLoading] = useState(false)
  const [calculation, setCalculation] = useState({})
  const [index, setIndex] = useState(0)
  const [maxWeight, setMaxWeight] = useState(0)
  const [estimatedQty, setEstimatedQty] = useState(0)

  let id = props.navigation.getParam('id')
  let total = props.navigation.getParam('total')

  useEffect(() => {
    calcMaxWeight()
  }, [])

  const calcMaxWeight = () => {
    if (total !== false) {
      let area = (total.w / 12) * total.l
      let maxWeight = area * 75.6
      setMaxWeight(Math.round(maxWeight))
    }
  }

  const calculateQty = () => {
    if (calculation.Bulls === undefined) {
      return
    }
    const avgWeight = calculation.Bulls.lbs / calculation.Bulls.qty
    const estimatedQty = maxWeight / avgWeight
    setEstimatedQty(Math.round(estimatedQty))
    refRBSheet.current.open()
  }

  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Calculator' })],
  })

  const saveCalculation = async () => {
    setLoading(true)
    try {
      const token = await AsyncStorage.getItem('USER_TOKEN')
      const response = await fetch(`${api_url}?action=addcalculation`, {
        method: 'POST',
        body: JSON.stringify({
          token,
          id,
          totalWeight: total,
          livestock: [
            {
              name: 'Bulls',
              estimatedQty: estimatedQty,
              estimatedLbs: maxWeight,
              submittedQty: calculation.Bulls.qty,
              submittedLbs: calculation.Bulls.lbs,
            },
          ],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      setLoading(false)
      if (json.status === '200') {
        refRBSheet.current.close()
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const refRBSheet = useRef()

  const renderTabBar = (props) => {
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
      </ScrollView>
    )
  }

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return (
          <FirstRoute
            calculation={calculation}
            setCalculation={setCalculation}
          />
        )
      case 'second':
        return (
          <SecondRoute
            calculation={calculation}
            setCalculation={setCalculation}
          />
        )
      case 'third':
        return (
          <ThirdRoute
            calculation={calculation}
            setCalculation={setCalculation}
          />
        )
      case 'fourth':
        return (
          <FourthRoute
            calculation={calculation}
            setCalculation={setCalculation}
          />
        )
      default:
        return null
    }
  }

  return (
    <View>
      <ScrollView>
        <RBSheet
          onClose={() => props.navigation.dispatch(resetAction)}
          height={350}
          ref={refRBSheet}
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
          <ActionSheetWrapper>
            <Image
              style={{ marginBottom: 20 }}
              source={require('../../assets/images/savecalc.png')}
            />
            <View style={{ marginBottom: 20, alignItems: 'center' }}>
              <ActionSheetTitle>Estimated Load</ActionSheetTitle>
              <ActionSheetText>Bulls: {estimatedQty} qty</ActionSheetText>
              <ActionSheetText>Max Weight: {maxWeight} lbs</ActionSheetText>
            </View>
            <View style={{ marginBottom: 20, alignItems: 'center' }}>
              <ActionSheetTitle style={{ color: colors.greyishBrown }}>
                Submitted Load
              </ActionSheetTitle>
              <ActionSheetText style={{ color: colors.greyishBrown }}>
                Bulls: {calculation.Bulls?.qty || '-'} qty
              </ActionSheetText>
              <ActionSheetText style={{ color: colors.greyishBrown }}>
                Max Weight: {calculation.Bulls?.lbs || '-'} lbs
              </ActionSheetText>
            </View>

            <TouchableOpacity
              onPress={() => {
                saveCalculation()
                // refRBSheet.current.close()
              }}
            >
              <CustomButton>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <ButtonText>SAVE CALCULATION</ButtonText>
                )}
              </CustomButton>
            </TouchableOpacity>
          </ActionSheetWrapper>
        </RBSheet>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <Container>
            <Heading>Input Livestock, Quantity and Weight</Heading>
            <TabView
              navigationState={{
                index,
                routes: [
                  { key: 'first', title: 'Cattle' },
                  { key: 'second', title: 'Sheep' },
                  { key: 'third', title: 'Goat' },
                  { key: 'fourth', title: 'Pigs' },
                ],
              }}
              renderScene={renderScene}
              renderTabBar={renderTabBar}
              onIndexChange={setIndex}
              initialLayout={{ width: Dimensions.get('window').width }}
            />
            <Text
              style={{
                textAlign: 'center',
                paddingHorizontal: 30,
                marginVertical: 30,
                color: colors.littleDarkGrey,
                fontSize: 16,
              }}
            >
              All calculations are an estimate, we are not liable for any
              complications regarding your Load or livestock. Terms and Policy
            </Text>
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
      <Float>
        <TouchableOpacity
          onPress={() => {
            calculateQty()
          }}
        >
          <CustomButton>
            <ButtonText>CALCULATE</ButtonText>
          </CustomButton>
        </TouchableOpacity>
      </Float>
    </View>
  )
}

const Animal = (props) => {
  const [checked, setChecked] = useState(false)
  const { name, weight, cal, setCal } = props
  const [measurement, setMeasurement] = useState({})

  return (
    <BarItem>
      <TouchableWithoutFeedback onPress={() => setChecked(!checked)}>
        {checked ? (
          <Ionicons name="ios-checkbox" size={26} color={colors.greyishBrown} />
        ) : (
          <CheckBox />
        )}
      </TouchableWithoutFeedback>
      <ItemNameWrap>
        <Name>{name}</Name>
        <SampleWeight>{weight} lbs</SampleWeight>
      </ItemNameWrap>
      <InputWrap>
        <CustomInput
          editable={name === 'Bulls' ? true : false}
          // editable={checked}
          placeholder="Qty"
          keyboardType="numeric"
          onEndEditing={() => {
            setCal({ ...cal, [props.name]: measurement })
          }}
          onChangeText={(val) => {
            setMeasurement({
              ...measurement,
              qty: val,
            })
          }}
        />
        <CustomInput
          editable={name === 'Bulls' ? true : false}
          // editable={checked}
          placeholder="Lbs"
          keyboardType="numeric"
          onEndEditing={() => {
            setCal({ ...cal, [props.name]: measurement })
          }}
          onChangeText={(val) => {
            setMeasurement({
              ...measurement,
              lbs: val,
            })
          }}
        />
      </InputWrap>
    </BarItem>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  tabText: {
    color: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderColor: colors.darkGrey,
  },
  tabTextActive: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.themeYellow,
    borderColor: colors.themeYellow,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
})

export default CalculatorInputs
