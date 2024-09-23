import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Popup = ({ isVisible, onClose, children }) => {
    return (
        <Modal
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <StyledView className="flex-1 bg-black bg-opacity-50 justify-center items-center" onPress={onClose}>
                <StyledTouchableOpacity
                    className="bg-white p-6 rounded shadow-lg"
                    onPress={(e) => e.stopPropagation()}
                    activeOpacity={1}
                >
                    <StyledTouchableOpacity className="absolute top-2 right-2" onPress={onClose}>
                        <StyledText>&times;</StyledText>
                    </StyledTouchableOpacity>
                    {children}
                </StyledTouchableOpacity>
            </StyledView>
        </Modal>
    );
};

export default Popup;
