import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Ace from './Ace';

const Luffy = ({ type, arr, onDrop }: any) => {
  const [currentArr, setCurrentArr] = useState(arr);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ACE_TYPE',
    drop: (item: any) => {
      // Update your data array when an item is dropped
      setCurrentArr((prevArr: any) => [...prevArr, item.element]);
      onDrop(type, [...currentArr, item.element]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        width: '300px',
        height: '300px',
        border: '2px dashed #000',
        padding: '8px',
      }}
    >
      {isOver && <div style={{ position: 'absolute', top: 0, left: 0, backgroundColor: 'yellow' }}>Drop here</div>}
      {currentArr.map((e: any, i: any) => (
        <Ace key={i} element={e} />
      ))}
    </div>
  );
};

export default Luffy;
