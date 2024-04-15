import React from 'react';
import BoxContainer from '../BoxContainer';
import AuthHeader from '../AuthHeader';
import JoinForm from './JoinForm';

const JoginContainer = () => {
  return (
    <BoxContainer>
      <AuthHeader />
      <div className='mt-20 flex justify-center'>
        <JoinForm />
      </div>
    </BoxContainer>
  );
};

export default JoginContainer;
