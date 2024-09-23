'use client'
import { auth } from '../firebase/firebase';
import { useRouter } from 'next/navigation';
import { getUserData } from "../utils/UserDataService";
import { signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Settings() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const firstNameInitial = typeof userData?.firstName === 'string' && userData?.firstName?.[0]?.toUpperCase() || '';
  const lastNameInitial = typeof userData?.lastName === 'string' && userData?.lastName?.[0]?.toUpperCase() || '';
  const firstName = userData?.firstName;
  const lastName = userData?.lastName;
  const router = useRouter();
  const [view, setView] = useState('full');
  const [phase, setPhase] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usernameAvailable, setUsernameAvailable] = useState(true)
  const [isRegistering, setIsRegistering] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [emailAvailable, setEmailAvailable] = useState(true)
 const [userin, setUserin] = useState(null);
  
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
            <h1 className="font-medium text-18px text-white">
              My Account
            </h1>
            <h1 className="font-medium text-18px mt-[47px] text-[#C3C3C3]">
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

        <div className="flex flex-col flex justify-center items-center w-[100%]">
          <h1 className="font-bold font-bold text-[35px]">
            My Account
          </h1>
          <div className="relative w-[181px] h-[181px] mt-[33px] rounded-full overflow-hidden">
            <img
              src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
              className="w-full h-full object-cover"
              alt="Image description"
            />
          </div>
          <h1 className="font-semibold text-[35px] mb-[31px] mt-[51px]">
            {firstName + " " + lastName}
          </h1>
          <div className="w-[460px] h-[558px] bg-[#161616] rounded-[11px] flex justify-center items-center">
            <div>
              <h1 className="text-[14px]">
                First Name
              </h1>
              <div className="mt-[11px] rounded-[10px] bg-[#0F1011] w-[341px] h-[41px]">
                <input
                  type="text"
                  className="bg-[transparent] w-[100%] pl-[10px] mt-[2%] resize-[none] overflow-[hidden] focus:outline-none placeholder-[#716D6D] placeholder:text-[14px]"
                  autoComplete='FirstName'
                  required
                  placeholder='First Name'
                  value={firstName} onChange={(e) => { setFirstName(e.target.value) }}
                />
              </div>
              <h1 className="mt-[18px] text-[14px] flex">
                Last Name
              </h1>
              <div className="mt-[11px] rounded-[10px] bg-[#0F1011] w-[341px] h-[41px]">
                <input
                  type="text"
                  className="bg-[transparent] w-[100%] pl-[10px] mt-[2%] resize-[none] overflow-[hidden] focus:outline-none placeholder-[#716D6D] placeholder:text-[14px]"
                  autoComplete='LastName'
                  required
                  placeholder='Last Name'
                  value={lastName} onChange={(e) => { setLastName(e.target.value) }}
                />
              </div>
              <h1 className="mt-[18px] text-[14px] flex">
                Email
              </h1>
              <div className="mt-[11px] rounded-[10px] bg-[#0F1011] w-[341px] h-[41px]">
                <input
                  type="email"
                  className="bg-[transparent] w-[100%] pl-[10px] mt-[2%] resize-[none] overflow-[hidden] focus:outline-none placeholder-[#716D6D] placeholder:text-[14px]"
                  autoComplete='Email'
                  required
                  placeholder='Email'
                  value={userData?.email} onChange={(e) => { setEmail(e.target.value) }}
                />
              </div>
              <h1 className="mt-[18px] text-[14px] flex">
                Password
              </h1>
              <div className="mt-[11px] rounded-[10px] bg-[#0F1011] w-[341px] h-[41px]">
                <input
                  type="password"
                  className="bg-[transparent] w-[100%] pl-[10px] mt-[2%] resize-[none] overflow-[hidden] focus:outline-none placeholder-[#716D6D] placeholder:text-[14px]"
                  autoComplete='Password'
                  required
                  placeholder='Password'
                  value={userData?.password} onChange={(e) => { setPassword(e.target.value) }}
                />
              </div>
              <div class = "flex justify-center">
              <button type="submit" disabled={isRegistering || !emailAvailable} class="self-center mt-[32px] mb-[18px] w-[38px] h-[25px] bg-[#0F1011] rounded-[9.27px] flex justify-center ">
                            
                    
                            <svg width="29" height="21" viewBox="0 0 29 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="self-[center] pt-[2px] filter transition-transform duration-300 hover:brightness-150 hover:hue-rotate-30">
                                    <g filter="url(#filter0_d_506_3677)">
                                      <path d="M23.8022 7.66602H5.26562" stroke="#737373" strokeWidth="1.85366" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M17.6211 1.48828L23.7999 7.66713L17.6211 13.846" stroke="#737373" strokeWidth="1.85366" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                    <defs>
                                      <filter id="filter0_d_506_3677" x="0.339844" y="0.560547" width="28.3906" height="22.2129" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="4" />
                                        <feGaussianBlur stdDeviation="2" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_506_3677" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_506_3677" result="shape" />
                                      </filter>
                                    </defs>
                                  </svg>
                        </button>
              </div>
           
                      
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
