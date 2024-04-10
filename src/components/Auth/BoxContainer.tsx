import React from 'react';

interface BoxContainerProps {
  children: React.ReactNode;
}

const BoxContainer = ({ children }: BoxContainerProps) => {
  return (
    <div className='z-30 h-[806.25px] w-[500px] overflow-hidden rounded-md bg-white pb-4'>
      {children}
    </div>
  );
};

export default BoxContainer;
