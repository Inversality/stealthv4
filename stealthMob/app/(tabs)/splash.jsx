import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, provider, signInWithPopup, firestore } from '../../contexts/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import icons from '../../constants/icons';
import EmailPasswordLogin from '../../components/auth/emailpasswordlogin';
import PhonePasswordLogin from '../../components/auth/phonepasswordlogin';

export default function Splash() {
  const [loginMethod, setLoginMethod] = useState(null);
  const [userin, setUserin] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigation();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Extract additional user information from Google profile
      const [firstName, lastName] = user.displayName.split(' ');
      const userData = {
        firstName: firstName,
        lastName: lastName,
        username: user.email.split('@')[0],
      };

      // Save additional user data in Firestore
      await setDoc(doc(firestore, 'users', user.uid), userData);

      // Redirect to dashboard or show a success message
      navigation.navigate('Dashboard');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        setUserin(currentUser);
        navigation.navigate('Dashboard');
      } else {
        console.log(currentUser);
        setUserin(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigation]);

  const renderSplashComponent = () => {
    switch (loginMethod) {
      case 'email':
        return <EmailPasswordLogin setLoginMethod={setLoginMethod} />;
      case 'phone':
        return <PhonePasswordLogin setLoginMethod={setLoginMethod} />;
      default:
        return (
          <View className="flex-1 justify-center bg-[#0F1011]">
            <View className="flex flex-col items-center mt-[30%]">
              {icons.logo}
              <Image className="mt-[32px]" source={require('../../assets/images/Stealth.png')} style={{ width: 170, height: 27 }} />
              <TouchableOpacity onPress={handleGoogleSignIn} className="bg-[#3C3C3C] w-[311px] h-[55px] rounded-[8px] flex justify-center mt-[66px] border-2 border-transparent hover:border-white hover:animate-pulse">
                <View className="flex flex-row items-center justify-center">
                  {icons.google}
                  <Text className="pl-[16px] text-[12px] text-[#C3C3C3] hover:text-white">Continue With Google</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLoginMethod('email')} className="bg-black w-[311px] h-[55px] rounded-[8px] flex justify-center mt-[26px] border-2 border-transparent hover:border-white hover:animate-pulse">
                <View className="flex flex-row items-center justify-center">
                  <Text className="pl-[16px] text-[12px] text-[#C3C3C3] hover:text-white">Continue With Email</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLoginMethod('phone')} className="bg-black w-[311px] h-[55px] rounded-[8px] flex justify-center mt-[26px] border-2 border-transparent hover:border-white hover:animate-pulse">
                <View className="flex flex-row items-center justify-center">
                  <Text className="pl-[16px] text-[12px] text-[#C3C3C3] hover:text-white">Continue With Phone</Text>
                </View>
              </TouchableOpacity>
              {errorMessage && <Text className="text-red-500 mt-4">{errorMessage}</Text>}
            </View>
          </View>
        );
    }
  };

  return (
    <View className="flex-1">
      {renderSplashComponent()}
    </View>
  );
}
