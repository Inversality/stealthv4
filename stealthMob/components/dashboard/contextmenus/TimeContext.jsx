import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const TimeContext = ({ userData, firstNameInitial, lastNameInitial }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const auth = getAuth();
  const navigation = useNavigation();

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }], // Replace 'Home' with your main route
    });
  };

  const handlePreferences = () => {
    navigation.navigate('Settings'); // Ensure 'Settings' is a valid route name
  };

  return (
    <StyledView className="relative">
      <StyledTouchableOpacity 
        className="flex flex-row rounded-[5px] hover:bg-[#3f3f46] shrink-0" 
        onPress={toggleMenu}
      >
        <StyledView className="w-[25px] h-[25px] bg-[#00C2FF] rounded-[5px] mr-[6px] shrink-0">
          <StyledText className="text-[12px] shrink-0 flex justify-center mt-[2px] ">
            {firstNameInitial + lastNameInitial}
          </StyledText>
        </StyledView>
        <StyledText className="text-[#C3C3C3] mr-[4px] hover:text-white">{userData?.username}</StyledText>
        <StyledImage 
          source={require('../../assets/images/arrowdown.png')} // Adjust the path to your image
          className="h-[4.5px] shrink-0 self-center filter transition-transform duration-300 hover:brightness-150 hover:hue-rotate-30" 
          style={{ width: 9, height: 4 }}
        />
      </StyledTouchableOpacity>
      {isMenuVisible && (
        <StyledView className="absolute w-[192px] h-[122px] bg-[#1B1C1F] shadow-lg rounded-[5px] mt-2 right-0 left-1 border-[#757575] border-[.25px]">
          <StyledView className="text-black">
            <StyledTouchableOpacity 
              className="p-2 rounded-[5px] hover:bg-[#3f3f46] text-white cursor-pointer"
              onPress={handlePreferences}
            >
              <StyledText>Preferences</StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity 
              className="p-2 rounded-[5px] hover:bg-[#3f3f46] text-white cursor-pointer border-t border-[#757575]" 
              onPress={handleLogout}
            >
              <StyledText>Logout</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      )}
    </StyledView>
  );
};

export default TimeContext;
