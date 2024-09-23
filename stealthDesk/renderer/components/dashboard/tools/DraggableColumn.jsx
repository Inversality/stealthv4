// DraggableColumn.jsx
import React from 'react';
import DraggableItem from './draggableItem';

const DraggableColumn = () => {
  const items = [
    { id: 1, content: (
        <svg xmlns="http://www.w3.org/2000/svg" className="mb-[8px] mt-[10px]" width="1em" height="1em" viewBox="0 0 256 256">
          <path fill="black" d="M76 92a16 16 0 1 1-16-16a16 16 0 0 1 16 16m52-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16m68 32a16 16 0 1 0-16-16a16 16 0 0 0 16 16M60 148a16 16 0 1 0 16 16a16 16 0 0 0-16-16m68 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16m68 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16"/>
        </svg>
      )
    },
    { id: 2, content: <div>Custom Content 2</div> },
    { id: 3, content: <div>Custom Content 3</div> },
    { id: 4, content: <div>Custom Content 4</div> },
  ];

  return (
    <div className="container mx-auto mt-8">
      {items.map((item) => (
        <DraggableItem key={item.id} id={item.id} content={item.content} />
      ))}
    </div>
  );
};

export default DraggableColumn;
