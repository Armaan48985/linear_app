import React from 'react';
import { useDrag } from 'react-dnd';

const Ace = ({ element }: any) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ACE_TYPE',
    item: { element },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >
      {element}
    </div>
  );
};

export default Ace;
