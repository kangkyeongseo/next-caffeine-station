'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import AuthHeader from './AuthHeader';
import LoginForm from './Login/LoginForm';
import JoinForm from './Join/JoinForm';
import PasswordForm from './Password/PasswordForm';
import ResetForm from './Reset/resetForm';
import ProfileContainer from './Profile/ProfileContainer';
import useUser from '@/hooks/useUser';

type authPageType =
  | 'login'
  | 'join'
  | 'password'
  | 'reset-password'
  | 'profile';

export interface AuthFormProps {
  setType: React.Dispatch<React.SetStateAction<authPageType>>;
}

const AuthContainer = () => {
  const { user, isUserLoading, rule } = useUser();
  const pathname = usePathname();

  const [type, setType] = useState<authPageType>('login');

  useEffect(() => {
    if (pathname.includes('reset-password')) {
      setType('reset-password');
    }
  }, [pathname]);

  useEffect(() => {
    if (!user) return;
    setType('profile');
  }, [user]);

  return (
    <div className='z-30 h-[806.25px] w-[500px] overflow-hidden rounded-md bg-white pb-4'>
      {!isUserLoading && <AuthHeader type={type} />}
      <div className='mt-20 flex justify-center'>
        {!isUserLoading ? (
          user ? (
            <ProfileContainer user={user} />
          ) : (
            <>
              {type === 'login' && <LoginForm setType={setType} />}
              {type === 'join' && <JoinForm setType={setType} />}
              {type === 'password' && <PasswordForm setType={setType} />}
              {type === 'reset-password' && <ResetForm />}
            </>
          )
        ) : null}
      </div>
    </div>
  );
};

export default AuthContainer;
