import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native'
import styled from 'styled-components/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../../constants/Colors'
import { CustomButton, ButtonText } from '../../constants/CommonStyles'

const Container = styled.View`
  padding: 30px 20px;
  padding-bottom: 10px;
  justify-content: space-between;
  flex: 1;
`

const ScreenTitle = styled.Text`
  font-size: 20px;
  padding: 20px;
  font-family: 'pt-mono-bold';
  text-align: center;
  color: ${colors.greyishBrown};
`

const PermissionWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  background-color: rgb(247, 247, 247);
  padding: 10px 30px;
  border-radius: 8px;
  elevation: 1;
`

const PermissionText = styled.Text`
  padding: 10px;
  font-size: 15px;
`

const Tagline = styled.Text`
  padding: 20px;
  text-align: center;
  font-size: 15px;
  color: ${colors.warmGrey};
  margin-bottom: 20px;
`

const SkipText = styled.Text`
  text-align: center;
  margin-bottom: 20px;
  color: ${colors.linkBlue};
`

const Permission = props => {
  const [checked, setChecked] = useState(false)

  return (
    <Container>
      <View>
        <ScreenTitle>Permissions</ScreenTitle>
        <Tagline>
          We need you to allow a few things so we can make your work day easier.
        </Tagline>
        <TouchableWithoutFeedback onPress={() => setChecked(!checked)}>
          <PermissionWrapper>
            {checked ? (
              <MaterialCommunityIcons
                name="checkbox-marked-outline"
                color="#000"
                size={25}
                style={{ padding: 10 }}
              />
            ) : (
              <MaterialCommunityIcons
                name="checkbox-blank-outline"
                color="#000"
                size={25}
                style={{ padding: 10 }}
              />
            )}

            <PermissionText>
              I allow permission to my phone so I invite co-workers and
              carriers, upload and share pictures, stay updated, know where
              nearby feedlots are, easy navigation for loads, and more.
            </PermissionText>
          </PermissionWrapper>
        </TouchableWithoutFeedback>
      </View>
      <View>
        <SkipText>Skip</SkipText>
        <TouchableOpacity onPress={() => props.navigation.navigate('Invite')}>
          <CustomButton>
            <ButtonText>SAVE</ButtonText>
          </CustomButton>
        </TouchableOpacity>
      </View>
    </Container>
  )
}

Permission.navigationOptions = {
  header: null
}

export default Permission
