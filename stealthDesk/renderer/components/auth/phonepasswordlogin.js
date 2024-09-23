import icons from "../../constants/icons";
import Image from "next/image";
import React, { useState } from "react";

const PhonePasswordLogin = ({ SetLoginMethod }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      // Add your custom sign-in logic here if needed
    }
  };

  return (
    <div>
      <main>
        <div className="flex justify-center bg-[#0F1011] h-[100vh]">
          <div className="flex flex-col mt-[30vh]">
            {icons.logo}
            <Image className="mt-[32px] self-center" width="170" height="27" src="/Stealth.png" />
            <div className="w-[464px] h-[259px] bg-[#161616] rounded-[10px] mt-[3.4vh] flex justify-center">
              <div className="mt-[25px] flex flex-col">
                <h1 className="text-[14px]">Phone</h1>
                <div className="mt-[11px] rounded-[10px] bg-[#0F1011] w-[341px] h-[41px]">
                  <input
                    className="bg-transparent w-[100%] pl-[10px] mt-[2%] resize-none overflow-hidden focus:outline-none"
                    type="phone"
                    autoComplete='phone'
                    placeholder="X-XXX-XXX-XXXX"
                    required
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value) }}
                  />
                </div>
                <div className="pt-[37px] flex flex-col">
                  <h1 className="text-[14px]">Password</h1>
                  <div className="mt-[11px] rounded-[10px] bg-[#0F1011] w-[341px] h-[41px]">
                    <input
                      className="bg-transparent w-[100%] pl-[10px] mt-[2%] resize-none overflow-hidden focus:outline-none"
                      type="password"
                      autoComplete='current-password'
                      
                      required
                      value={password}
                      onChange={(e) => { setPassword(e.target.value) }}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-center" >
                <div onClick={() => SetLoginMethod(null)} className="mt-[19px] mr-[19px] w-[38px] h-[25px] bg-[#0F1011] rounded-[9.27px] self-center flex justify-center">
                  <svg width="29" height="21" viewBox="0 0 29 21" fill="none" xmlns="http://www.w3.org/2000/svg"  className="self-center pt-[2px] transform scale-x-[-1] filter transition-transform duration-300 hover:brightness-150 hover:hue-rotate-30">
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
                </div>
                <div className="mt-[19px] w-[38px] h-[25px] bg-[#0F1011] rounded-[9.27px] self-center flex justify-center">
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
                </div>
                </div>
              
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PhonePasswordLogin;
