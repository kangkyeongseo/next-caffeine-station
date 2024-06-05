import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';
import KeywordSetting from './KeywordSetting';
import AuthHeader from '../AuthHeader';

interface ProfileContainerProps {
  type: string;
  user: any;
  rule: string;
}

const ProfileContainer = ({ type, user, rule }: ProfileContainerProps) => {
  const auth = getAuth();
  const router = useRouter();

  const logout = () => {
    signOut(auth)
      .then(() => {
        router.back();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <AuthHeader type={type} />
      <div className='mt-20 flex justify-center'>
        <div className='w-full space-y-12 px-12'>
          <div className='flex flex-col items-center gap-2'>
            <span>{user?.email}</span>
            <span
              className='cursor-pointer text-sm text-gray-400 hover:text-black/70'
              onClick={logout}
            >
              로그아웃
            </span>
          </div>
          <div className='space-y-3'>
            <div className='pb-3'>
              <span className='text-sm font-bold'>
                검색 카페 키워드 설정하기
              </span>
            </div>
            <KeywordSetting user={user} rule={rule} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileContainer;
