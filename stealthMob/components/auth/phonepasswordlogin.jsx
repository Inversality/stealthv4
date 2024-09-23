import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import icons from '../../constants/icons';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const PhonePasswordLogin = ({ setLoginMethod }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const onSubmit = () => {
    if (!isSigningIn) {
      setIsSigningIn(true);
      // Add your custom sign-in logic here if needed
    }
  };

  return (
    <StyledView className="flex-1 justify-center bg-[#0F1011] px-4">
      <StyledView className="items-center mt-[30vh]">
        {icons.logo}
        <StyledImage
          source={require('../../assets/images/Stealth.png')}
          className="w-[170] h-[27] mt-8"
        />
        <StyledView className="w-[464px] h-[259px] bg-[#161616] rounded-lg mt-8 flex justify-center items-center">
          <StyledView className="w-full mt-6">
            <StyledText className="text-lg text-white">Phone</StyledText>
            <TextInput
              className="bg-[#0F1011] w-full h-12 mt-2 pl-3 rounded-md text-white"
              keyboardType="phone-pad"
              autoComplete="tel"
              placeholder="X-XXX-XXX-XXXX"
              placeholderTextColor="#737373"
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
          </StyledView>
          <StyledView className="w-full mt-6">
            <StyledText className="text-lg text-white">Password</StyledText>
            <TextInput
              className="bg-[#0F1011] w-full h-12 mt-2 pl-3 rounded-md text-white"
              secureTextEntry
              autoComplete="current-password"
              placeholder="Enter your password"
              placeholderTextColor="#737373"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </StyledView>
          <StyledView className="flex-row justify-center mt-5">
            <StyledTouchableOpacity
              onPress={() => setLoginMethod(null)}
              className="w-10 h-6 bg-[#0F1011] rounded-lg justify-center items-center mr-5"
            >
              <StyledImage
                source={require('../../assets/images/arrow.png')} // Use a back arrow icon or appropriate SVG
                className="w-[29] h-[21]"
                style={{ transform: [{ scaleX: -1 }] }}
              />
            </StyledTouchableOpacity>
            <StyledTouchableOpacity
              onPress={onSubmit}
              className="w-10 h-6 bg-[#0F1011] rounded-lg justify-center items-center"
            >
              <StyledImage
                source={require('../../assets/images/arrow.png')} // Use a forward arrow icon or appropriate SVG
                className="w-[29] h-[21]"
              />
            </StyledTouchableOpacity>
          </StyledView>
          {errorMessage ? (
            <StyledText className="text-red-500 mt-4 text-center">{errorMessage}</StyledText>
          ) : null}
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default PhonePasswordLogin;
