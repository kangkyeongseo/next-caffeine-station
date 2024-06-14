import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setKeywords } from '@/redux/slices/filterSlice';
import { setUserKeyword } from '@/redux/slices/userKeywordSlice';

interface KeywordsFilterProps {
  keywordType: string;
  setkeywordType: React.Dispatch<React.SetStateAction<string>>;
  user: User;
  isUserLoading: boolean;
}

const defaulyKeywords = ['가성비', '프리미엄'];

const KeywordsFilter = React.memo(
  ({
    keywordType,
    setkeywordType,
    user,
    isUserLoading,
  }: KeywordsFilterProps) => {
    const dispatch = useAppDispatch();

    const { userKeyword } = useAppSelector(state => state.userKeyword);

    const [displayKeywords, setDisplayKeywords] = useState(defaulyKeywords);

    const changeKeywordsByTpye = (type: string) => {
      switch (type) {
        case '가성비':
          dispatch(
            setKeywords(
              user
                ? userKeyword.costEffective
                : ['빽다방', '메가MGC커피', '컴포즈커피'],
            ),
          );
          break;
        case '프리미엄':
          dispatch(
            setKeywords(
              user
                ? userKeyword.premium
                : ['스타벅스', '폴바셋', '투썸플레이스'],
            ),
          );
          break;
        case '나의 카페':
          dispatch(setKeywords(userKeyword.custom));
          break;
        default:
          break;
      }
    };

    const onKeywordsChange = (type: string) => {
      if (isUserLoading) return;
      changeKeywordsByTpye(type);
      setkeywordType(type);
    };

    useEffect(() => {
      if (!user) {
        dispatch(setKeywords(['빽다방', '메가MGC커피', '컴포즈커피']));
        setkeywordType('가성비');
      } else {
        const fetchData = async () => {
          const { doc, getDoc } = await import('firebase/firestore');
          const { db } = await import('@/libs/server/firebase');
          const docRef = doc(db, 'user', user.uid);
          const docSnap = await getDoc(docRef);
          dispatch(setUserKeyword(docSnap.data()?.keyword));
        };
        fetchData();
      }
    }, [user]);

    useEffect(() => {
      if (!user) {
        setDisplayKeywords(defaulyKeywords);
      } else {
        setDisplayKeywords(['가성비', '프리미엄', '나의 카페']);
      }
    }, [user]);

    useEffect(() => {
      if (!user) return;
      changeKeywordsByTpye(keywordType);
    }, [userKeyword]);

    return (
      <div
        className={`grid border font-light ${user ? 'grid-cols-3' : 'grid-cols-2'}`}
      >
        {displayKeywords.map(keyword => (
          <span
            key={keyword}
            className={`cursor-pointer py-[6px] text-center duration-100 md:py-2 ${keywordType === keyword ? 'bg-gray-200 font-medium' : 'bg-white hover:bg-gray-100'}`}
            onClick={() => onKeywordsChange(keyword)}
          >
            {keyword}
          </span>
        ))}
      </div>
    );
  },
);

KeywordsFilter.displayName = 'KeywordsFilter';

export default KeywordsFilter;
