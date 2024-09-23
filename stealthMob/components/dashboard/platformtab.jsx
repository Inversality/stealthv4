import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

class PlatformTab extends React.Component {
    render() {
        const { icon, label } = this.props;
        return (
            <StyledView className="flex flex-row mb-[13px] h-[30px] rounded-[5px] hover:bg-[#3f3f46]">
                {icon}
                <StyledText className="text-[#EDEDED] font-Inter-SemiBold text-[15px] mt-[2px] ml-[8px]">{label}</StyledText>
            </StyledView>
        );
    }
}

export default PlatformTab;
