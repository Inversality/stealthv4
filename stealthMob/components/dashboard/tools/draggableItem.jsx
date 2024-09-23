import React from 'react';
import { View } from 'react-native';
import Draggable from 'react-draggable';
import { styled } from 'nativewind';

const StyledView = styled(View);

const DraggableItem = ({ id, content }) => (
  <Draggable
    axis="y"
    bounds="parent"
    grid={[1, 50]} // Snaps vertically every 50 pixels
    handle=".handle"
    defaultPosition={{ x: 0, y: 0 }}
    scale={1}
    onStart={(e, data) => console.log('Drag started', data)}
    onDrag={(e, data) => console.log('Dragging', data)}
    onStop={(e, data) => console.log('Drag stopped', data)}
  >
    <StyledView className="handle bg-gray-300 p-4 m-2 cursor-pointer border-b-2 border-black flex justify-center items-center">
      {content}
    </StyledView>
  </Draggable>
);

export default DraggableItem;
