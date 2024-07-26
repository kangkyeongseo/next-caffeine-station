import React, { useCallback, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setKeywords } from '@/redux/slices/filterSlice';
import { setUserKeyword } from '@/redux/slices/userKeywordSlice';

interface KeywordsFilterProps {
  keywordType: string;
  setkeywordType: React.Dispatch<React.SetStateAction<string>>;
  user: User | null;
  isUserLoading: boolean;
}

const DEFAULT_KEYWORDS = ['가성비', '프리미엄', '모든 카페'];
const COSTEFFECTIVE_KEYWORDS = ['빽다방', '메가MGC커피', '컴포즈커피'];
const PREMIUM_KEYWORDS = ['스타벅스', '폴바셋', '투썸플레이스'];

const KeywordsFilter = React.memo(
  ({
    keywordType,
    setkeywordType,
    user,
    isUserLoading,
  }: KeywordsFilterProps) => {
    const dispatch = useAppDispatch();

    const { userKeyword } = useAppSelector(state => state.userKeyword);

    const [displayKeywords, setDisplayKeywords] = useState(DEFAULT_KEYWORDS);

    const fetchData = useCallback(async () => {
      if (!user) return;
      const { doc, getDoc } = await import('firebase/firestore');
      const { db } = await import('@/libs/server/firebase');
      const docRef = doc(db, 'user', user.uid);
      const docSnap = await getDoc(docRef);
      dispatch(setUserKeyword(docSnap.data()?.keyword));
    }, [dispatch, user]);

    const changeKeywordsByTpye = useCallback(
      (type: string) => {
        switch (type) {
          case '가성비':
            dispatch(
              setKeywords(
                user ? userKeyword.costEffective : COSTEFFECTIVE_KEYWORDS,
              ),
            );
            break;
          case '프리미엄':
            dispatch(
              setKeywords(user ? userKeyword.premium : PREMIUM_KEYWORDS),
            );
            break;
          case '나의 카페':
            dispatch(setKeywords(userKeyword.custom));
            break;
          case '모든 카페':
            dispatch(setKeywords(['모든 카페']));
            break;
          default:
            break;
        }
      },
      [dispatch, user, userKeyword],
    );

    const onKeywordsChange = (type: string) => {
      if (isUserLoading) return;
      changeKeywordsByTpye(type);
      setkeywordType(type);
    };

    useEffect(() => {
      if (isUserLoading) return;
      if (!user) {
        dispatch(setKeywords(COSTEFFECTIVE_KEYWORDS));
        setkeywordType('가성비');
      } else {
        fetchData();
      }
    }, [isUserLoading, user, dispatch, setkeywordType, fetchData]);

    useEffect(() => {
      if (isUserLoading) return;
      setDisplayKeywords(
        user ? [...DEFAULT_KEYWORDS, '나의 카페'] : DEFAULT_KEYWORDS,
      );
    }, [isUserLoading, user]);

    useEffect(() => {
      if (!user) return;
      changeKeywordsByTpye(keywordType);
    }, [user, userKeyword, changeKeywordsByTpye, keywordType]);

    return (
      <div
        className={`grid border font-light ${user && !isUserLoading ? 'grid-cols-4' : 'grid-cols-3'}`}
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
