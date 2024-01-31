'use client'
import React from 'react';
import { useDrag } from 'react-dnd';
import { ContextMenuDemo } from '../active/IssueEdit';
import { ContextMenuTrigger } from '@/components/ui/context-menu';
import { GoPlus } from 'react-icons/go';

const Ace = ({ element, key }: any) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ACE_TYPE',
    item: { element },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag}>
      <ContextMenuDemo
                  ref={drag} 
                  clickEl={(
                        <ContextMenuTrigger>
                            <div className='border-b-2 bgHover-darkgrey duration-75 border-gray-800 w-full h-12 flex items-center px-6 flex-between'>
                              <div className='flex-center gap-2'>
                                {element}
                              </div>

                            </div>
                      </ContextMenuTrigger>
                    )} 
                name={element}
              />
    </div>
  );
};

export default Ace;
