'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import icons from "../constants/icons";
import PlatformFolder from "../components/dashboard/platformfolder";
import PlatformTab from "../components/dashboard/platformtab";
import { getAuth } from 'firebase/auth';
import DraggableColumn from '../components/dashboard/tools/DraggableColumn';
import { getUserData } from "../utils/UserDataService";
import { redirect } from "next/navigation";
import { app, auth } from '../contexts/firebaseconfig';
import { useRouter } from 'next/navigation';
import DraggableToolbar from '../components/dashboard/tools/draggableTools';
import UserProfile from '../components/dashboard/user/userprofile';

export default function Dashboard() {
  const auth = getAuth();
  const [timestate, setTimeState] = useState(false);
  const [typestate, setTypeState] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const firstNameInitial = typeof userData?.firstName === 'string' && userData?.firstName?.[0]?.toUpperCase() || '';
  const lastNameInitial = typeof userData?.lastName === 'string' && userData?.lastName?.[0]?.toUpperCase() || '';
  const router = useRouter();
  const [view, setView] = useState('full');
  const [timeView, setTimeView] = useState(['Today','Week','Month','Year']);
  const [typeView, setTypeView] = useState(['Views','Likes','Comments','Age','Race']);

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



  const handleClick = (event) => {
    if (event.target === event.currentTarget) {
      setView('full');
    }
  };

  if (!user) return null; 

  return (
    <div className="flex flex-col">
      <div className="w-full h-[5vh] flex justify-center bg-[#080808]">
        <div className="flex justify-center flex-row items-center">
          <Image className="w-[20px] h-[20px] mr-[14px]" src="/dashboardlogo.png" width="20" height="20" />
          <h1 className="text-[14px] text-[#C3C3C3]">Stealth</h1>
          <Image className="w-[12px] h-[12px] filter transition-transform duration-300 hover:brightness-150 hover:hue-rotate-30" src="/arrow.png" width="12" height="12" />
          <h1 className="text-[14px] text-[#C3C3C3]">Dashboard</h1>
        </div>
      </div>
      <section>
        <div className="flex flex-row h-[95vh]">
          <div className="h-full w-[256px] bg-black flex flex-col mr-[31px] ml-[12px] mt-[26px]">
            <div className="flex flex-row">
              <UserProfile userData={userData} firstNameInitial={firstNameInitial} lastNameInitial={lastNameInitial} />
              <div className="flex flex-row"></div>
              <div className="w-[71px]" />
              {icons.search}
              <Image src="/note.png" width="18" height="18" className="self-center filter transition-transform duration-300 hover:brightness-150 hover:hue-rotate-30" />
            </div>
            <div className="flex items-center mt-[38px] mb-[20px] h-[30px] rounded-[5px] hover:bg-[#3f3f46]">
              <div className="flex flex-row  ml-[8px]">
                {icons.downarrow}
                <h1 className="text-[#747474] text-[12px] ml-[8px] mr-[8px]">Platforms</h1>
              </div>
            </div>
            <div className="flex flex-col">
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
            </div>
          </div>
          <div className="h-[100%] px-[32px] pt-[17px] pb-[28px] w-full flex flex-col bg-[#0F1011]" onClick={handleClick}>
            <DraggableToolbar />
            <div className="mb-[22px] flex flex-row w-full">
            <div 
                onClick={() => setTimeState(!timestate)} 
                className="relative w-[233px] border-[1px] border-[#323135] h-[40px] bg-[#0E0E0F] hover:border-white flex justify-center rounded-[10px]"
              >
                <h1 className="text-[#C3C3C3] hover:text-white self-center">{timeView[0]}</h1>
                {timestate && (
                  <div className="flex flex-col absolute top-[50px]">
                  {timeView.map((item, index) => (
  index === 0 ? (

    null
  ) : (
    <div 
      key={index} 
      onClick={() => {
        // Make a copy of the timeView array
        const tempArray = [...timeView];
        
        // Swap elements
        const temp = tempArray[0];
        tempArray[0] = item;
        tempArray[index] = temp;
        
        // Update state with the new array
        setTimeView(tempArray);
      }} 
      className="relative w-[233px] mt-3 border-[1px] border-[#323135] h-[40px] bg-[#0E0E0F] hover:border-white flex justify-center rounded-[10px]"
    >
      <h1 className="text-[#C3C3C3] hover:text-white self-center">{item}</h1>
    </div>
  )
))}

                  </div>
                )}

              </div>
              <div className="grow" />
             
              <div 
                onClick={() => setTypeState(!typestate)} 
                className="relative w-[233px] border-[1px] border-[#323135] h-[40px] bg-[#0E0E0F] hover:border-white flex justify-center rounded-[10px]"
              >
                <h1 className="text-[#C3C3C3] hover:text-white self-center">{typeView[0]}</h1>
                {typestate && (
                  <div className="flex flex-col absolute top-[50px]">
                  {typeView.map((item, index) => (
  index === 0 ? (

    null
  ) : (
    <div 
      key={index} 
      onClick={() => {
   
        const tempArray = [...typeView];
        

        const temp = tempArray[0];
        tempArray[0] = item;
        tempArray[index] = temp;
        
   
        setTypeView(tempArray);
      }} 
      className="relative w-[233px] mt-3 border-[1px] border-[#323135] h-[40px] bg-[#0E0E0F] hover:border-white flex justify-center rounded-[10px]"
    >
      <h1 className="text-[#C3C3C3] hover:text-white self-center">{item}</h1>
    </div>
  )
))}

                  </div>
                )}

              </div>
            </div>
            {view === "chart" ? (
              <>
                <div className="bg-[#0E0E0F] border-[1px] hover:border-white border-[#323135] h-[82%] mt-[55px] w-[95%] self-center rounded-[10px] flex justify-center">
                  {icons.plus}
                </div>
              </>
            ) : null}
            {view === "full" ? (
              <>
                <div className="mb-[27px] w-full h-[15%] hover:border-white bg-[#0E0E0F] rounded-[10px] border-[1px] border-[#323135] flex justify-center">
                  {icons.plus}
                </div>
                <div className="w-full h-[43%] flex flex-row mb-[23px]">
                  <div onClick={() => setView('chart')} className="bg-[#0E0E0F] border-[1px] hover:border-white border-[#323135] h-full w-[33%] mr-[5px] rounded-[10px] flex justify-center">
                    {icons.plus}
                  </div>
                  <div className="grow" />
                  <div onClick={() => setView('chart')} className="bg-[#0E0E0F] border-[1px] hover:border-white border-[#323135] h-full w-[33%] mr-[5px] rounded-[10px] flex justify-center">
                    {icons.plus}
                  </div>
                  <div className="grow" />
                  <div onClick={() => setView('chart')} className="bg-[#0E0E0F] border-[1px] hover:border-white border-[#323135] h-full w-[33%] rounded-[10px] flex justify-center">
                    {icons.plus}
                  </div>
                </div>
                <div className="flex flex-row w-full h-[26%]">
                  <div className="bg-[#0E0E0F] border-[1px] hover:border-white border-[#323135] h-full w-[49%] rounded-[10px] flex justify-center">
                    {icons.plus}
                  </div>
                  <div className="grow" />
                  <div className="bg-[#0E0E0F] border-[1px] border-[#323135] hover:border-white h-full w-[49%] rounded-[10px] flex justify-center">
                    {icons.plus}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
