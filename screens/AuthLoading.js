import React from 'react'
import { ActivityIndicator, AsyncStorage, View } from 'react-native'

class AuthLoading extends React.Component {
  componentDidMount() {
    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('USER_TOKEN')

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth')
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#000" />
      </View>
    )
  }
}

export default AuthLoading
