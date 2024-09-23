'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, provider, signInWithPopup, firestore } from '../contexts/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import icons from '../constants/icons';
import Image from 'next/image';
import EmailPasswordLogin from '../components/auth/emailpasswordlogin';
import PhonePasswordLogin from '../components/auth/phonepasswordlogin';

export default function Splash() {
  const [loginMethod, setLoginMethod] = useState(null);
  const [userin, setUserin] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Extract additional user information from Google profile
      const firstName = user.displayName.split(' ')[0];
      const lastName = user.displayName.split(' ')[1];
      const userData = {
        firstName: firstName,
        lastName: lastName,
        username: user.email.split('@')[0], 
      };

      // Save additional user data in Firestore
      await setDoc(doc(firestore, 'users', user.uid), userData);

      // Redirect to dashboard or show a success message
      router.push("/dashboard");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        setUserin(currentUser);
        router.push("/dashboard");
      } else {
        console.log(currentUser);
        setUserin(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  const renderSplashComponent = () => {
    switch (loginMethod) {
      case 'email':
        return <EmailPasswordLogin setLoginMethod={setLoginMethod} />;
      case 'phone':
        return <PhonePasswordLogin setLoginMethod={setLoginMethod} />;
      default:
        return (
          <div className="flex justify-center bg-[#0F1011] h-[100vh]">
            <div className="flex flex-col mt-[30vh]">
              {icons.logo}
              <Image className="mt-[32px] self-center" width="170" height="27" src="/Stealth.png" alt="Stealth Logo" />
              <div onClick={handleGoogleSignIn} className="bg-[#3C3C3C] w-[311px] h-[55px] rounded-[8px] flex justify-center mt-[66px] border-2 border-transparent hover:border-white hover:self-center hover:animate-[pulse_1s] cursor-pointer">
                <div className="flex flex-row justify-center self-center">
                  {icons.google}
                  <h1 className="pl-[16px] text-[12px] text-[#C3C3C3] hover:text-white">Continue With Google</h1>
                </div>
              </div>
              <div onClick={() => setLoginMethod('email')} className="bg-black w-[311px] h-[55px] rounded-[8px] flex justify-center mt-[26px] border-2 border-transparent hover:border-white hover:self-center hover:animate-[pulse_1s] cursor-pointer">
                <div className="flex flex-row justify-center self-center">
                  <h1 className="pl-[16px] text-[12px] text-[#C3C3C3] hover:text-white">Continue With Email</h1>
                </div>
              </div>
              <div onClick={() => setLoginMethod('phone')} className="bg-black w-[311px] h-[55px] rounded-[8px] flex justify-center mt-[26px] border-2 border-transparent hover:border-white hover:self-center hover:animate-[pulse_1s] cursor-pointer">
                <div className="flex flex-row justify-center self-center">
                  <h1 className="pl-[16px] text-[12px] text-[#C3C3C3] hover:text-white">Continue With Phone</h1>
                </div>
              </div>
              {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      {renderSplashComponent()}
    </div>
  );
}
