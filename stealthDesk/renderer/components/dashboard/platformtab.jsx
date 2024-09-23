
'use client'
import React from 'react';

class PlatformTab extends React.Component {
    render() {
        const { icon, label } = this.props;
        return (
            <div className="flex flex-row mb-[13px] h-[30px] rounded-[5px] hover:bg-[#3f3f46]">
                {icon}
                <h1 className="ml-[13px] self-center text-[13px] font-medium text-[#C3C3C3] hover:text-white">
                    {label}
                </h1>
            </div>
        );
    }
}

export default PlatformTab;
