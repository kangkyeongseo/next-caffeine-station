'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import useUser from '@/hooks/useUser';
import AuthLoading from './AuthLoading';

type authPageType =
  | 'login'
  | 'join'
  | 'password'
  | 'reset-password'
  | 'profile';

export interface AuthFormProps {
  type: string;
  setType: React.Dispatch<React.SetStateAction<authPageType>>;
}

const ProfileContainer = dynamic(() => import('./Profile/ProfileContainer'), {
  loading: () => <AuthLoading />,
});
const LoginForm = dynamic(() => import('./Login/LoginForm'), {
  loading: () => <AuthLoading />,
});
const JoinForm = dynamic(() => import('./Join/JoinForm'), {
  loading: () => <AuthLoading />,
});
const PasswordForm = dynamic(() => import('./Password/PasswordForm'), {
  loading: () => <AuthLoading />,
});
const ResetForm = dynamic(() => import('./Reset/resetForm'), {
  loading: () => <AuthLoading />,
});

const AuthContainer = () => {
  const { user, rule, isUserLoading } = useUser();
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
    <div className='z-30 h-[90%] w-[90%] overflow-hidden rounded-md bg-white pb-4 lg:w-[500px]'>
      {!isUserLoading ? (
        user ? (
          <ProfileContainer type={type} user={user} rule={rule} />
        ) : (
          <>
            {type === 'login' && <LoginForm type={type} setType={setType} />}
            {type === 'join' && <JoinForm type={type} setType={setType} />}
            {type === 'password' && (
              <PasswordForm type={type} setType={setType} />
            )}
            {type === 'reset-password' && <ResetForm type={type} />}
          </>
        )
      ) : (
        <AuthLoading />
      )}
    </div>
  );
};

export default AuthContainer;
