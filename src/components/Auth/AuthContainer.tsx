'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import AuthHeader from './AuthHeader';
import LoginForm from './Login/LoginForm';
import JoinForm from './Join/JoinForm';
import PasswordForm from './Password/PasswordForm';

const AuthContainer = () => {
  const searchParams = useSearchParams();
  const authType = searchParams.get('type');
  return (
    <div className='z-30 h-[806.25px] w-[500px] overflow-hidden rounded-md bg-white pb-4'>
      <AuthHeader authType={authType} />
      <div className='mt-20 flex justify-center'>
        {!authType && <LoginForm />}
        {authType === 'join' && <JoinForm />}
        {authType === 'password' && <PasswordForm />}
      </div>
    </div>
  );
};

export default AuthContainer;
