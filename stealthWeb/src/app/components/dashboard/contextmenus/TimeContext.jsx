import React, { useState } from 'react';
import Image from 'next/image';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const TimeContext = ({ userData, firstNameInitial, lastNameInitial }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const auth = getAuth();
  const router = useRouter();

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.refresh(); // Refresh the page after logging out
  };

  const handlePreferences = () => {
    router.push('/settings'); // Redirect to the /preferences page
  };

  return (
    <div className="relative">
      <div 
        className="flex flex-row rounded-[5px] hover:bg-[#3f3f46] shrink-0" 
        onClick={toggleMenu}
      >
        <div className="w-[25px] h-[25px] bg-[#00C2FF] rounded-[5px] mr-[6px] shrink-0">
          <h1 className="text-[12px] shrink-0 flex justify-center mt-[2px] ">
            {firstNameInitial + lastNameInitial}
          </h1>
        </div>
        <h1 className="text-[#C3C3C3] mr-[4px] hover:text-white">{userData?.username}</h1>
        <Image 
          src="/arrowdown.png" 
          className="h-[4.5px] shrink-0 self-center filter transition-transform duration-300 hover:brightness-150 hover:hue-rotate-30" 
          width="9" 
          height="4" 
        />
      </div>
      {isMenuVisible && (
        <div className="absolute w-[192px] h-[122px] bg-[#1B1C1F] shadow-lg rounded-[5px] mt-2 right-0 left-1 border-[#757575] border-[.25px]">
          <ul className="text-black">
            <li 
              className="p-2 rounded-[5px] hover:bg-[#3f3f46] text-white cursor-pointer"
              onClick={handlePreferences}
            >
              Preferences
            </li>
            <li 
              className="p-2 rounded-[5px] hover:bg-[#3f3f46] text-white cursor-pointer border-t border-[#757575]" 
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
