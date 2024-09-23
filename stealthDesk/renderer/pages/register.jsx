'use client'
import React, { useEffect, useState } from 'react'

import { useAuth,getAuth, fetchSignInMethodsForEmail, onAuthStateChanged } from 'firebase/auth'
import Image from 'next/image'
import icons from '../constants/icons'


import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import { doCreateUserWithEmailAndPassword } from '../firebase/auth'

import { auth } from '../contexts/firebaseconfig'
import { useRouter } from 'next/navigation'

const Register = () => {

    
    const router = useRouter();
    const [phase, setPhase] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [user, setUser] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [usernameAvailable, setUsernameAvailable] = useState(true)
    const db = getFirestore()
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [emailAvailable, setEmailAvailable] = useState(true)
   const [userin, setUserin] = useState(null);
    
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
    const checkEmailAvailability = async (email) => {
      const auth = getAuth()
      try {
        const signInMethods = await fetchSignInMethodsForEmail(auth, email)
        if (signInMethods.length > 0) {
          setEmailAvailable(false)
        } else {
          setEmailAvailable(true)
        }
      } catch (error) {
        console.error('Error checking email availability:', error)
        setEmailAvailable(true) // Assume email is available if there is an error
      }
    }
    
const checkUsernameAvailability = async (username) => {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('username', '==', username))
    const querySnapshot = await getDocs(q)
    
        if (!querySnapshot.empty) {
          setUsernameAvailable(false)
        } else {
          setUsernameAvailable(true)
        }
      }    
// If username or email is already taken don't let user submit form 
const onSubmit = async (e) => {
    e.preventDefault()
    if (!isRegistering) {
      setIsRegistering(true)
      const userData = {
        firstName: firstName,
        lastName: lastName,
        username: user,
      }
      try {
        if (usernameAvailable) {
          await doCreateUserWithEmailAndPassword(email, password, userData)
          router.push("/dashboard");
          // Handle navigation or any other logic after successful registration
        } else {
          setErrorMessage('Username is already taken.')
        }
      } catch (error) {
        setErrorMessage('Error creating account.')
      }
      setIsRegistering(false)
    }
  }

    const onSub1 = async (e) => {
        e.preventDefault()
        setPhase('2')
    }
    
    const RenderedEmailPassword = () => {

        switch(phase) {
            case '2':
                return(
                    <div class = "w-[464px] h-[284px] bg-[#161616] rounded-[10px] mt-[5.4vh] flex justify-center">
                    <form onSubmit={onSubmit}>
                    <div class = "mt-[25px] flex flex-col ">
                   
                        <h1 class = " text-[14px]  ">
                        Email
                        </h1>
                        <div class = {`mt-[11px] rounded-[10px] bg-[#0F1011] w-[341px] h-[41px] ${!emailAvailable ? 'border border-red-500' : ''}`}>
                        <input   type="email"
                        class = {`bg-transparent w-[100%] pl-[10px] mt-[2%] resize-none overflow-hidden focus:outline-none placeholder-[#716D6D] placeholder:text-[14px] ${!emailAvailable ? 'text-red-500' : ''}`}
                                            autoComplete='email'
                                            required
                                            placeholder='example@[email].com'
                                            value={email} onChange={(e) => {  setEmail(e.target.value)
                                                checkEmailAvailability(e.target.value) }} >
                            
                            </input>
                        </div>
                     
                        <h1 class = "mt-[18px] text-[14px] ">
                            Password
                        </h1>
                        <div class = "mt-[11px] rounded-[10px] bg-[#0F1011] w-[341px] h-[41px]  ">
                            <input    
                            className="bg-transparent w-[100%] pl-[10px] mt-[2%] resize-none overflow-hidden focus:outline-none placeholder-[#716D6D] placeholder:text-[14px]"
                                            type="password"
                                            autoComplete='new-password'
                                            placeholder='Example Password'
                                            required
                                            value={password} onChange={(e) => { setPassword(e.target.value) }} >
                            
                            </input>
                        </div>
                       
                       
                      
                        
                        <button type="submit" disabled={isRegistering || !emailAvailable} className="mt-[32px] mb-[18px] w-[38px] h-[25px] bg-[#0F1011] rounded-[9.27px] self-center flex justify-center">
                            
                    
                            <svg width="29" height="21" viewBox="0 0 29 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="self-center pt-[2px] filter transition-transform duration-300 hover:brightness-150 hover:hue-rotate-30">
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
                    
                    </form>
                    </div>
                )
            default:
                return (
                    <div className="w-[464px] h-[356px] bg-[#161616] rounded-[10px] mt-[3.4vh] flex justify-center">
                      <form onSubmit={onSub1}>
                        <div className="mt-[25px] flex flex-col ">
                          <h1 className="text-[14px]">
                            First Name
                          </h1>
                          <div className="mt-[11px] rounded-[10px] bg-[#0F1011] w-[341px] h-[41px]">
                            <input
                              type="First Name"
                              className="bg-transparent w-[100%] pl-[10px] mt-[2%] resize-none overflow-hidden focus:outline-none placeholder-[#716D6D] placeholder:text-[14px]"
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
                              type="Last Name"
                              className="bg-transparent w-[100%] pl-[10px] mt-[2%] resize-none overflow-hidden focus:outline-none placeholder-[#716D6D] placeholder:text-[14px]"
                              autoComplete='LastName'
                              required
                              placeholder='Last Name'
                              value={lastName} onChange={(e) => { setLastName(e.target.value) }}
                            />
                          </div>
          
                          <h1 className="mt-[18px] text-[14px] flex">
                            Username
                          </h1>
                          <div className={`mt-[11px] rounded-[10px] bg-[#0F1011] w-[341px] h-[41px] ${!usernameAvailable ? 'border border-red-500' : ''}`}>
                            <input
                              type="username"
                              className={`bg-transparent w-[100%] pl-[10px] mt-[2%] resize-none overflow-hidden focus:outline-none placeholder-[#716D6D] placeholder:text-[14px] ${!usernameAvailable ? 'text-red-500' : ''}`}
                              autoComplete='username'
                              required
                              placeholder='Example Username'
                              value={user} onChange={(e) => { setUser(e.target.value); checkUsernameAvailability(e.target.value) }}
                            />
                          </div>
                          {!usernameAvailable && (
                            <p className="absolute top-full text-red-500 text-sm mt-[5px]">
                              Username not available
                            </p>
                          )}
          
                          <button disabled={isRegistering || !usernameAvailable} type="submit" className="mt-[32px] mb-[18px] w-[38px] h-[25px] bg-[#0F1011] rounded-[9.27px] self-center flex justify-center">
                            <svg width="29" height="21" viewBox="0 0 29 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="self-center pt-[2px] filter transition-transform duration-300 hover:brightness-150 hover:hue-rotate-30">
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
                      </form>
                    </div>
                  );
        }
    }
      
       
       
    return (
    
        <div class = "flex justify-center h-[100vh] bg-[#0F1011] w-[100vw] h-[100vh]">
            
        <div class = "flex flex-col mt-[13vh] mb-[17vh]" >
           
            <div className='flex justify-center'>
            {icons.logo}
            </div>
        
        <Image class =" mt-[32px] mb-[6vh]  self-center" width = "170" height = "27" src = "/Stealth.png"/>
        <h1 className = "text-[12px] flex justify-center text-[#C3C3C3] flex justify-center"> Sign Up:</h1>
     
            {RenderedEmailPassword()}
       
        </div>
        </div>
   
 


    );
};

export default Register;
