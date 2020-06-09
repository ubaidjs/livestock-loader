import styled from 'styled-components/native'
import colors from '../constants/Colors'
import { Platform } from 'react-native';
export const CustomInput = styled.TextInput`
  background-color: rgb(247, 247, 247);
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  height: ${props => props.height== undefined ? '54px' : props.height}
  fontSize: 20px;
`

export const CustomButton = styled.View`
  background-color: ${colors.themeYellow};
  align-self: stretch;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
  color: ${colors.greyishBrown};
  margin-bottom: 20px;
  flex-direction: row;
  height: 54px;
  justify-content: center;
  align-items: center;
  shadowRadius:  ${Platform.OS == "android" ?  18 : 10};
  shadowOpacity: ${Platform.OS == "android" ?  30 : 0.16}; 
  shadow-color: #000;
  shadowOffset:{ width: ${Platform.OS == "android" ?  -1 : 0}, height: ${Platform.OS == "android" ?  9 : 10} };
  elevation: ${Platform.OS == "android" ?  12 : 15};
`
export const CustomButtonWithoutShadow = styled.View`
  background-color: ${colors.themeYellow};
  align-self: stretch;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
  color: ${colors.greyishBrown};
  margin-bottom: 20px;
  flex-direction: row;
  height: 54px;
  justify-content: center;
  align-items: center;
`

export const CustomButtonDisable = styled.View`
  background-color: 'rgba(234, 197, 71, 0.5)';
  align-self: stretch;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
  color: ${colors.greyishBrown};
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 54px;
`

export const ButtonText = styled.Text`
  color: ${colors.greyishBrown};
  letter-spacing: 1;
  font-family: pt-mono-bold;
  fontSize: 24px;
`

export const ButtonTextDisable = styled.Text`
  color: grey;
  letter-spacing: 1;
  font-family: pt-mono-bold;
  fontSize: 24px;
`

export const InvalidText = styled.Text`
  color: red;
  text-align: center;
  margin-bottom: 10px;
`

export const ValidText = styled.Text`
  color: green;
  text-align: center;
  margin-bottom: 10px;
`
