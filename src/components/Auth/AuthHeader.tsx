import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Close } from '@/image/svgs ';

interface AuthHeaderProps {
  authType: null | string;
}

const AuthHeader = ({ authType }: AuthHeaderProps) => {
  const router = useRouter();

  const [title, setTtitle] = useState('');

  useEffect(() => {
    switch (authType) {
      case null:
        setTtitle('로그인');
        break;
      case 'join':
        setTtitle('회원가입');
        break;
      case 'password':
        setTtitle('비밀번호 변경');
        break;
    }
  }, [authType]);

  return (
    <div className='grid h-[45px] grid-cols-[1fr,10fr,1fr] items-center justify-center bg-emerald-600 px-4 text-white'>
      <span className='col-start-2 col-end-3 text-center md:text-xl'>
        {title}
      </span>
      <span
        className='cursor-pointer justify-self-end'
        onClick={() => router.back()}
      >
        <Close />
      </span>
    </div>
  );
};

export default AuthHeader;
