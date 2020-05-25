import React, { Component, Children } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native'
import colors from '../constants/Colors'

const TrailerList = props => {
  const { options, value, setValue } = props

  return (
    <View>
      {options.map(item => {
        return (
          <View key={item.t_id} style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                setValue(item.t_id)
              }}
              style={{ flexDirection: 'row' }}
            >
              <View style={styles.circle}>
                {value === item.t_id && <View style={styles.checkedCircle} />}
              </View>
              <Text>{item.t_name}</Text>
            </TouchableOpacity>
            <View style={{ width: '100%', height: 180 }}>
              <Image
                source={{ uri: item.t_image }}
                style={{
                  flex: 1,
                  width: undefined,
                  height: undefined,
                  resizeMode: 'contain',
                  top: 0
                }}
                // style={{ flex: 1, width: '100%', height: 100 }}
                // resizeMode="center"
              />
            </View>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 30
  },

  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },

  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.greyishBrown
  }
})

export default TrailerList
