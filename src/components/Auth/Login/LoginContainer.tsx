import React from 'react';
import BoxContainer from '../BoxContainer';
import LoginHeader from './LoginHeader';
import LoginForm from './LoginForm';

const LoginContainer = () => {
  return (
    <BoxContainer>
      <LoginHeader />
      <div className='mt-20 flex justify-center'>
        <LoginForm />
      </div>
    </BoxContainer>
  );
};

export default LoginContainer;
