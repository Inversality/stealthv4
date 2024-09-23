'use client';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PlatformTab from './platformtab';
import icons from '../../constants/icons';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSvg = styled('svg');

class PlatformFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isHovered: false, // This will be handled differently in React Native
        };
    }

    toggleFolder = () => {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen,
        }));
    };

    render() {
        const { icon, label, color, tabs } = this.props;
        const { isOpen } = this.state;

        return (
            <StyledView className="flex flex-col mb-[13px]">
                <TouchableOpacity
                    className="flex flex-row h-[30px] rounded-[5px] items-center"
                    onPress={this.toggleFolder}
                    style={{ backgroundColor: isOpen ? '#3f3f46' : 'transparent' }} // Simulating hover effect
                >
                    <StyledSvg className="self-center ml-[10px] flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" style={{ color }}>
                        <path fill="currentColor" d="M496 152a56 56 0 0 0-56-56H220.11a23.9 23.9 0 0 1-13.31-4L179 73.41A55.77 55.77 0 0 0 147.89 64H72a56 56 0 0 0-56 56v48a8 8 0 0 0 8 8h464a8 8 0 0 0 8-8ZM16 392a56 56 0 0 0 56 56h368a56 56 0 0 0 56-56V216a8 8 0 0 0-8-8H24a8 8 0 0 0-8 8Z"/>
                    </StyledSvg>
                    <StyledText className="ml-[13px] text-[13px] font-medium self-center flex-shrink-0" style={{ color }}>
                        {label}
                    </StyledText>
                    {isOpen && (
                        <StyledSvg className="self-center h-[15px] ml-[70px] w-[15px] flex-grow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path className="fill-[#545454] hover:fill-white" fill="currentColor" d="M8.5 2.75a.75.75 0 0 0-1.5 0V7H2.75a.75.75 0 0 0 0 1.5H7v4.25a.75.75 0 0 0 1.5 0V8.5h4.25a.75.75 0 0 0 0-1.5H8.5z"/>
                        </StyledSvg>
                    )}
                </TouchableOpacity>
                {isOpen && (
                    <StyledView className="pl-4 mt-[21px] border-l-[1px]" style={{ borderLeftColor: color }}>
                        {tabs.map((tab, index) => (
                            <PlatformTab key={index} icon={tab.icon} label={tab.label} />
                        ))}
                    </StyledView>
                )}
            </StyledView>
        );
    }
}

export default PlatformFolder;
