'use client';
import React from 'react';
import AuthHeader from './AuthHeader';
import LoginForm from './Login/LoginForm';
import { useSearchParams } from 'next/navigation';
import JoinForm from './Join/JoinForm';

const AuthContainer = () => {
  const searchParams = useSearchParams();
  const authType = searchParams.get('type');
  return (
    <div className='z-30 h-[806.25px] w-[500px] overflow-hidden rounded-md bg-white pb-4'>
      <AuthHeader authType={authType} />
      <div className='mt-20 flex justify-center'>
        {!authType && <LoginForm />}
        {authType === 'join' && <JoinForm />}
      </div>
    </div>
  );
};

export default AuthContainer;
