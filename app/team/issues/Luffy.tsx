'use client'
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Ace from './Ace';
import { GoPlus } from 'react-icons/go';
import CreateIssue from '@/components/createIssue';
import { addDataToFireStore } from '@/app/db';
import { Timestamp } from 'firebase/firestore';

  const Luffy = ({ type, arr }: any) => {
    const [currentArr, setCurrentArr] = useState(arr);
    const [issues, setIssues] = useState<{ id: string; name: string; type: string; time: Date }[]>([]);
    const [value, setValue] = useState('');

    const createIssue = () => {
      const date = new Date();
      if (value !== "") {
        setIssues((prevIssues:any) => {
          const newIssues = [
            ...prevIssues,
            { id: value, name: value, type: "active", time: Timestamp.fromDate(date) }
          ];
          setValue('');
          return newIssues;
        });
        addDataToFireStore(value, value, "naruto", date);
      }
    };

  
    const [{ isOver }, drop] = useDrop(() => ({
      accept: 'ACE_TYPE',
      drop: (item: any) => {
        // Update your data array when an item is dropped
        setCurrentArr((prevArr: any) => [...prevArr, item.element]);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

  return (
    <>
        <div className='bg-grey w-full h-12 flex-between px-6'>
          <h2>{type}</h2>
          <CreateIssue trigger={<GoPlus/>} value={type} setValue={setValue} createIssue={createIssue}/>
        </div>
        <div ref={drop}>
        {isOver && <div style={{ position: 'absolute', top: 0, left: 0, backgroundColor: 'yellow' }}>Drop here</div>}
        {currentArr.map((e: any, i: any) => (
          <Ace key={i} element={e} />
        ))}
      </div>
  </>
  );
};

export default Luffy;
