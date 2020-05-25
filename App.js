import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
import { YellowBox } from 'react-native'
import firebase from 'firebase'
import {
  Text,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Image,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import AppNavigator from './navigation/AppNavigator'
import Colors from './constants/Colors'

const firebaseConfig = {
  apiKey: 'AIzaSyCZRxj1KOacO1CZIfBl0QonO2DpEj7-gr4',
  authDomain: 'livestock-8cc18.firebaseapp.com',
  databaseURL: 'https://livestock-8cc18.firebaseio.com',
  projectId: 'livestock-8cc18',
  storageBucket: 'livestock-8cc18.appspot.com',
  messagingSenderId: '1092591601532',
  appId: '1:1092591601532:web:04d0f39d7fc121ee4246f9',
  measurementId: 'G-1GCD7JH8NT',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

YellowBox.ignoreWarnings(['Setting a timer'])

slide = [
  {
    key: 'feature1',
    image: require('./assets/images/slide1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'feature2',
    image: require('./assets/images/slide3.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 'feature3',
    image: require('./assets/images/slide2.png'),
    backgroundColor: '#22bcb5',
  },
]

export default function App(props) {
  const [showRealApp, setShowRealApp] = useState(false)
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    showOnboardingHandler()
  }, [])

  const showOnboardingHandler = async () => {
    try {
      const getValue = JSON.parse(await AsyncStorage.getItem('showRealApp'))
      if (getValue === null) {
        setShowRealApp(false)
      } else {
        setShowRealApp(getValue)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const _renderItem = ({ item }) => {
    return (
      <View>
        <Image style={{ height: '100%', width: '100%' }} source={item.image} />
      </View>
    )
  }

  const _onDone = async () => {
    try {
      await AsyncStorage.setItem('showRealApp', JSON.stringify(true))
    } catch (error) {
      console.log(error)
    } finally {
      setShowRealApp(true)
    }
  }

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={console.warn}
        onFinish={() => setLoadingComplete(true)}
      />
    )
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {showRealApp ? (
          <AppNavigator />
        ) : (
          <AppIntroSlider
            renderItem={_renderItem}
            slides={slide}
            onDone={_onDone}
            // onSkip={_onDone}
            activeDotStyle={{ backgroundColor: '#000' }}
            renderNextButton={() => {
              return <Text style={styles.nextButton}>NEXT</Text>
            }}
            renderDoneButton={() => {
              return <Text style={styles.nextButton}>JOIN</Text>
            }}
            // renderSkipButton={() => (
            //   <Text style={styles.nextButton}>Login</Text>
            // )}
            // showSkipButton={true}
          />
        )}
      </View>
    )
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'space-mono-bold': require('./assets/fonts/SpaceMono-Bold.ttf'),
      'pt-mono': require('./assets/fonts/PTMono-Regular.ttf'),
      'pt-mono-bold': require('./assets/fonts/PTMono-Bold.ttf'),
      'din-alternate-bold': require('./assets/fonts/DIN-Alternate-Bold.otf'),
    }),
  ])
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  nextButton: {
    backgroundColor: Colors.themeYellow,
    padding: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
    borderRadius: 5,
    fontFamily: 'pt-mono-bold',
  },
})
