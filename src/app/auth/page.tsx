import React from 'react';
import AuthContainer from '@/components/Auth/AuthContainer';

function LoginPage() {
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-black/80'>
      <AuthContainer />
    </div>
  );
}

export default LoginPage;
