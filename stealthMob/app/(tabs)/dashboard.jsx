import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import icons from "../../constants/icons";
import PlatformFolder from "../../components/dashboard/platformfolder";
import PlatformTab from "../../components/dashboard/platformtab";
import { getAuth } from 'firebase/auth';
import DraggableColumn from '../../components/dashboard/tools/DraggableColumn';
import { getUserData } from "../../utils/UserDataService";
import { app, auth } from '../../contexts/firebaseconfig';
import DraggableToolbar from '../../components/dashboard/tools/draggableTools';
import UserProfile from '../../components/dashboard/user/userprofile';
import { TailwindProvider } from 'nativewind';

export default function Dashboard() {
  const auth = getAuth();
  const [timestate, setTimeState] = useState(false);
  const [typestate, setTypeState] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const firstNameInitial = typeof userData?.firstName === 'string' && userData?.firstName?.[0]?.toUpperCase() || '';
  const lastNameInitial = typeof userData?.lastName === 'string' && userData?.lastName?.[0]?.toUpperCase() || '';
  const navigation = useNavigation();
  const [view, setView] = useState('full');
  const [timeView, setTimeView] = useState('Today');
  const [typeView, setTypeView] = useState('Demographics');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log('Current User:', currentUser);
        const data = await getUserData(currentUser.uid);
        console.log('Fetched User Data:', data);
        setUserData(data);
      } else {
        navigation.navigate('Splash');
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const timeSwitch = (e) => {
    const newTimeView = e.target.textContent; // Store the new time view from the clicked element
    e.target.textContent = timeView; // Set the clicked element's text content to the current time view
    setTimeView(newTimeView); // Update the state with the new time view
    setTimeState(false); // Hide the dropdown after selection
  }

  const handleClick = (event) => {
    if (event.target === event.currentTarget) {
      setView('full');
    }
  };

  if (!user) return null; 

  return (
    <TailwindProvider>
      <View className="flex flex-col">
        <View className="w-full h-[5vh] flex justify-center bg-[#080808]">
          <View className="flex justify-center flex-row items-center">
            <Image className="w-[20px] h-[20px] mr-[14px]" source={require('../../assets/images/dashboardlogo.png')} />
            <Text className="text-[14px] text-[#C3C3C3]">Stealth</Text>
            <Image className="w-[12px] h-[12px] filter transition-transform duration-300 hover:brightness-150 hover:hue-rotate-30" source={require('../../assets/images/arrow.png')} />
            <Text className="text-[14px] text-[#C3C3C3]">Dashboard</Text>
          </View>
        </View>
        <ScrollView>
          <View className="flex flex-row h-[95vh]">
            <View className="h-full w-[256px] bg-black flex flex-col mr-[31px] ml-[12px] mt-[26px]">
              <View className="flex flex-row">
                <UserProfile userData={userData} firstNameInitial={firstNameInitial} lastNameInitial={lastNameInitial} />
                <View className="flex flex-row"></View>
                <View className="w-[71px]" />
                {icons.search}
                <Image source={require('../../assets/images/note.png')} className="self-center filter transition-transform duration-300 hover:brightness-150 hover:hue-rotate-30" />
              </View>
              <TouchableOpacity className="flex items-center mt-[38px] mb-[20px] h-[30px] rounded-[5px] hover:bg-[#3f3f46]">
                <View className="flex flex-row  ml-[8px]">
                  {icons.downarrow}
                  <Text className="text-[#747474] text-[12px] ml-[8px] mr-[8px]">Platforms</Text>
                </View>
              </TouchableOpacity>
              <View className="flex flex-col">
                <PlatformFolder
                  label="Lexi 2 Legit"
                  color="#FFFFFF"
                  tabs={[
                    { icon: icons.instagram, label: 'Instagram' },
                    { icon: icons.youtube, label: 'Youtube' },
                    { icon: icons.onlyfans, label: 'Onlyfans' }
                  ]}
                />
                <PlatformTab icon={icons.instagram} label="Instagram" />
                <PlatformFolder
                  label="James Charles"
                  color="#1CFF33"
                  tabs={[
                    { icon: icons.instagram, label: 'Instagram' },
                    { icon: icons.youtube, label: 'Youtube' },
                    { icon: icons.onlyfans, label: 'Onlyfans' }
                  ]}
                />
              </View>
            </View>
            <View className="h-[100%] px-[32px] pt-[17px] pb-[28px] w-full flex flex-col bg-[#0F1011]" onClick={handleClick}>
              <DraggableToolbar />
              <View className="mb-[22px] flex flex-row w-full">
                <TouchableOpacity 
                  onPress={() => setTimeState(!timestate)} 
                  className="relative w-[233px] border-[1px] border-[#323135] h-[40px] bg-[#0E0E0F] hover:border-white flex justify-center rounded-[10px]"
                >
                  <Text className="text-[#C3C3C3] hover:text-white self-center">{timeView}</Text>
                  {timestate && (
                    <View className="flex flex-col absolute top-[50px]">
                      <TouchableOpacity 
                        onPress={timeSwitch}
                        className="relative w-[233px] border-[1px] border-[#323135] h-[40px] bg-[#0E0E0F] hover:border-white flex justify-center rounded-[10px]"
                      >
                        <Text className="text-[#C3C3C3] hover:text-white self-center">Week</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={timeSwitch}
                        className="relative w-[233px] mt-3 border-[1px] border-[#323135] h-[40px] bg-[#0E0E0F] hover:border-white flex justify-center rounded-[10px]"
                      >
                        <Text className="text-[#C3C3C3] hover:text-white self-center">Month</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={timeSwitch}
                        className="relative w-[233px] mt-3 border-[1px] border-[#323135] h-[40px] bg-[#0E0E0F] hover:border-white flex justify-center rounded-[10px]"
                      >
                        <Text className="text-[#C3C3C3] hover:text-white self-center">Year</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
                <View className="grow" />
                <View className="w-[233px] border-[1px] border-[#323135] h-[40px] hover:border-white bg-[#0E0E0F] flex justify-center rounded-[10px]">
                  <Text className="text-[#C3C3C3] hover:text-white self-center">Demographics</Text>
                </View>
              </View>
              {view === "chart" ? (
                <>
                  <View className="bg-[#0E0E0F] border-[1px] hover:border-white border-[#323135] h-[82%] mt-[55px] w-[95%] self-center rounded-[10px] flex justify-center">
                    {icons.plus}
                  </View>
                </>
              ) : null}
              {view === "full" ? (
                <>
                  <View className="mb-[27px] w-full h-[15%] hover:border-white bg-[#0E0E0F] rounded-[10px] border-[1px] border-[#323135] flex justify-center">
                    {icons.plus}
                  </View>
                  <View className="w-full h-[43%] flex flex-row mb-[23px]">
                    <TouchableOpacity onPress={() => setView('chart')} className="bg-[#0E0E0F] border-[1px] hover:border-white border-[#323135] h-full w-[33%] mr-[5px] rounded-[10px] flex justify-center">
                      {icons.plus}
                    </TouchableOpacity>
                    <View className="grow" />
                    <TouchableOpacity onPress={() => setView('chart')} className="bg-[#0E0E0F] border-[1px] hover:border-white border-[#323135] h-full w-[33%] mr-[5px] rounded-[10px] flex justify-center">
                      {icons.plus}
                    </TouchableOpacity>
                    <View className="grow" />
                    <TouchableOpacity onPress={() => setView('chart')} className="bg-[#0E0E0F] border-[1px] hover:border-white border-[#323135] h-full w-[33%] rounded-[10px] flex justify-center">
                      {icons.plus}
                    </TouchableOpacity>
                  </View>
                  <View className="flex flex-row w-full h-[26%]">
                    <TouchableOpacity className="bg-[#0E0E0F] border-[1px] hover:border-white border-[#323135] h-full w-[49%] rounded-[10px] flex justify-center">
                      {icons.plus}
                    </TouchableOpacity>
                    <View className="grow" />
                    <TouchableOpacity className="bg-[#0E0E0F] border-[1px] border-[#323135] hover:border-white h-full w-[49%] rounded-[10px] flex justify-center">
                      {icons.plus}
                    </TouchableOpacity>
                  </View>
                </>
              ) : null}
            </View>
          </View>
        </ScrollView>
      </View>
    </TailwindProvider>
  );
}
