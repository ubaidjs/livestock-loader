import styled from 'styled-components/native'
import colors from '../constants/Colors'

export const CustomInput = styled.TextInput`
  background-color: rgb(247, 247, 247);
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
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
  justify-content: center;
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
`

export const ButtonText = styled.Text`
  color: ${colors.greyishBrown};
  letter-spacing: 1;
  font-family: 'pt-mono-bold';
`

export const ButtonTextDisable = styled.Text`
  color: grey;
  letter-spacing: 1;
  font-family: 'pt-mono-bold';
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
