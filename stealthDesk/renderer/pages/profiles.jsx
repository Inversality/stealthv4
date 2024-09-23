'use client'

import { useRouter } from 'next/navigation';
import { getUserData } from "../../utils/UserDataService";
import { signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {auth} from '../../firebase/firebase';
export default function Profiles() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const firstNameInitial = typeof userData?.firstName === 'string' && userData?.firstName?.[0]?.toUpperCase() || '';
  const lastNameInitial = typeof userData?.lastName === 'string' && userData?.lastName?.[0]?.toUpperCase() || '';
  const firstName = userData?.firstName;
  const lastName = userData?.lastName;
  const router = useRouter();
  const [view, setView] = useState('full');

  const handleLogout = async () => {
    await signOut(auth);
    router.refresh(); // Refresh the page after logging out
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log('Current User:', currentUser);
        const data = await getUserData(currentUser.uid);
        console.log('Fetched User Data:', data);
        setUserData(data);
      } else {
        router.push('/splash');
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <main>
      <div className="flex flex-row bg-[#080808]">
        <div onClick={handleLogout}>
          <h1 className="absolute bottom-[33px] left-[34px] font-semibold">
            Log Out
          </h1>
        </div>
        <div class = "absolute right-0 top-[18px] left-[21px] flex flex-row">
        <svg onClick = {() => router.push("/dashboard")} class = " mr-[9px] " width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="27" height="27" rx="13.5" fill="#151517" stroke="#535353"/>
<path d="M9.825 15L15.425 20.6L14 22L6 14L14 6L15.425 7.4L9.825 13H22V15H9.825Z" fill="white"/>
</svg>

<div className="flex flex-row w-[97px] h-[28px] bg-transparent border-[#535353] rounded-[25px]  border-[1px] flex justify-center items-center">
          <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 50 50">
            <path fill="currentColor" d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17s-7.6 17-17 17m0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.7-15-15-15" />
            <path fill="currentColor" d="M33.3 26.7L25 18.4l-8.3 8.3l-1.4-1.4l9.7-9.7l9.7 9.7z" />
            <path fill="currentColor" d="M24 17h2v17h-2z" />
          </svg>
          <h1 className="ml-[8px] text-[12px] font-semibold shrink-0">
            Free plan
          </h1>
        </div>
        </div>
        
        <div className="flex flex-col h-[100vh] w-[277px] bg-[#151517]">
          <div className="mt-[91px] ml-[38px]">
            <h1 className="text-[18px] font-bold mb-[77px]">
              User Settings
            </h1>
            <h1 className="font-medium text-18px text-[#C3C3C3]">
              My Account
            </h1>
            <h1 className="font-medium text-18px mt-[47px] text-white">
              Profiles
            </h1>
            <h1 className="font-medium text-18px mt-[47px] mb-[78px] text-[#C3C3C3]">
              Privacy & Safety
            </h1>
            <svg className="mb-[39px]" width="226" height="4" viewBox="0 0 226 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2L224 2" stroke="#323135" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <h1 className="text-[18px] font-semibold">
              Appearance
            </h1>
            <h1 className="mt-[53px] font-medium text-18px mb-[45px] text-[#C3C3C3]">
              Themes
            </h1>
            <svg className="mb-[36px]" width="226" height="4" viewBox="0 0 226 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2L224 2" stroke="#323135" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <h1 className="text-[18px] font-semibold">
              Advanced
            </h1>
          </div>
        </div>

       
      </div>
    </main>
  );
}
