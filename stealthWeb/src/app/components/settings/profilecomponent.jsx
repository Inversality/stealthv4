
'use client'
import React from 'react';
import Image from 'next/image';
class ProfileComponent extends React.Component {
    render() {
        const { name, platform } = this.props;
        return (

            <div className="flex flex-col mt-[70px]">
                <div class ="flex flex-row justify-center mb-[59px]  h-[51px]">
                    <Image className = "w-[38.59px] h-[38.59px] mr-[27px]" src = ""/>
                    <div class = "flex-col">
                        <h1 className = "text-[18.58px] font-semibold mb-[6px] font-semibold text-[18.58px] text-[#E7E8EA]"> {name} </h1>
                        <h1 className = "text-[13.58px] font-semibold text-[13.58px] text-[#A3A8AE] "> {platform} </h1>

                         </div>
                    <Image src= "" className = "flex flex-grow w-[14.3px] h-[14.3px]"/>
                    
                </div>
                <div class = "flex flex-col">
                        <div class = "flex flex-row ml-[33px] mr-[30px]">
                        <h1 class = "text-[17.15] text-[#CFD1D4]">
                            Display on profile
                        </h1>

                        <div class = "flex flex-grow">
            
                        </div>
                        </div>
                     

                    </div>
            </div>
        );
    }
}

export default ProfileComponent;
