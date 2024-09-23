import React from 'react';
import { View } from 'react-native';
import DraggableItem from './DraggableItem';
import { styled } from 'nativewind';

const StyledView = styled(View);

const items = [
  {
    id: 1,
    content: (
      <StyledView className="mb-[8px] mt-[10px]" style={{ width: 24, height: 24 }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256">
          <path fill="black" d="M76 92a16 16 0 1 1-16-16a16 16 0 0 1 16 16m52-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16m68 32a16 16 0 1 0-16-16a16 16 0 0 0 16 16M60 148a16 16 0 1 0 16 16a16 16 0 0 0-16-16m68 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16m68 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16"/>
        </svg>
      </StyledView>
    ),
  },
  { id: 2, content: <StyledView>Custom Content 2</StyledView> },
  { id: 3, content: <StyledView>Custom Content 3</StyledView> },
  { id: 4, content: <StyledView>Custom Content 4</StyledView> },
];

const DraggableColumn = () => {
  return (
    <StyledView className="container mx-auto mt-8">
      {items.map((item) => (
        <DraggableItem key={item.id} id={item.id} content={item.content} />
      ))}
    </StyledView>
  );
};

export default DraggableColumn;
