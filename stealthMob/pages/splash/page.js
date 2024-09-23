'use client'
import icons from '../constants/icons';
import Image from 'next/image';
import EmailPasswordLogin from '../components/auth/emailpasswordlogin';
import React, { useEffect, useState } from 'react';
import PhonePasswordLogin from '../components/auth/phonepasswordlogin';
import { auth, provider, signInWithPopup } from '../contexts/firebaseconfig'; 
import router from 'next/navigation';
export default function Splash() {
  const [loginMethod, setLoginMethod] = useState(null);
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      // Handle the result here, e.g., redirect the user or show a success message
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
   
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          console.log(currentUser)
          setUserin(currentUser);
          router.push("/dashboard");
        } else {
          console.log(currentUser)
            setUserin(null);
        }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
}, []);
  const renderSplashComponent = () => {
    switch (loginMethod) {
      case 'email':
        return <EmailPasswordLogin SetLoginMethod={setLoginMethod} />;
      case 'phone':
        return <PhonePasswordLogin SetLoginMethod={setLoginMethod}/>;
      default:
        return (
          <div className="flex justify-center bg-[#0F1011] h-[100vh]">
            <div className="flex flex-col mt-[30vh]">
              {icons.logo}
              <Image className="mt-[32px] self-center" width="170" height="27" src="/Stealth.png" />
              <div onClick={() => handleGoogleSignIn()} className="bg-[#3C3C3C] w-[311px] h-[55px] rounded-[8px] flex justify-center mt-[66px] border-2 border-transparent hover:border-white  hover:self-center hover:animate-[pulse_1s]">
                <div className="flex flex-row justify-center self-center">
                  {icons.google}
                  <h1 className="pl-[16px] text-[12px] text-[#C3C3C3] hover:text-white">Continue With Google</h1>
                </div>
              </div>
              <div onClick={() => setLoginMethod('email')} className="bg-black w-[311px] h-[55px] rounded-[8px] flex justify-center mt-[26px] border-2 border-transparent hover:border-white  hover:self-center hover:animate-[pulse_1s]">
                <div className="flex flex-row justify-center self-center">
                  <h1 className="pl-[16px] text-[12px] text-[#C3C3C3] hover:text-white">Continue With Email</h1>
                </div>
              </div>
              <div onClick = {() => setLoginMethod('phone')} className="bg-black w-[311px] h-[55px] rounded-[8px] flex justify-center mt-[26px] border-2 border-transparent hover:border-white  hover:self-center hover:animate-[pulse_1s]">
                <div className="flex flex-row justify-center self-center">
                  <h1 className="pl-[16px] text-[12px] text-[#C3C3C3] hover:text-white">Continue With Phone</h1>
                </div>
              </div>
            </div>
          </div>
        );
    }
  }

  return (
    <div>
      {renderSplashComponent()}
    </div>
  );
}
