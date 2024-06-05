import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from '@/libs/server/firebase';
import { BrandType } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setUserKeyword } from '@/redux/slices/userKeywordSlice';
import KeywordList from './KeywordList';

export type BrandsforKeywordSetting = {
  type: string;
  name: string;
  isChecked: boolean;
};

type UserKeyword = {
  costEffective: string[];
  premium: string[];
  custom: string[];
};

interface KeywordSettingProps {
  user: User;
  rule: string;
}

const KeywordSetting = ({ user, rule }: KeywordSettingProps) => {
  const dispatch = useAppDispatch();
  const { userKeyword } = useAppSelector(state => state.userKeyword);

  const [brands, setBrands] = useState<BrandType[]>([]);
  const [costEffectiveBrands, setCostEffectiveBrands] = useState<
    BrandsforKeywordSetting[]
  >([]);
  const [premiumBrands, setPremiumBrands] = useState<BrandsforKeywordSetting[]>(
    [],
  );
  const [customBrands, setCustomBrands] = useState<BrandsforKeywordSetting[]>(
    [],
  );
  const [toastMessage, setToastMessage] = useState('');

  const onBrandClick = (type: string, name: string) => {
    switch (type) {
      case 'costEffective':
        setCostEffectiveBrands(pre =>
          pre.map(brand => {
            if (brand.name === name) {
              return { ...brand, isChecked: !brand.isChecked };
            }
            return brand;
          }),
        );
        break;
      case 'premium':
        setPremiumBrands(pre =>
          pre.map(brand => {
            if (brand.name === name) {
              return { ...brand, isChecked: !brand.isChecked };
            }
            return brand;
          }),
        );
        break;
      case 'custom':
        setCustomBrands(pre =>
          pre.map(brand => {
            if (brand.name === name) {
              return { ...brand, isChecked: !brand.isChecked };
            }
            return brand;
          }),
        );
        break;
    }
  };

  const onSave = async () => {
    const changedCostEffectiveBrands = costEffectiveBrands
      .filter(brand => brand.isChecked)
      .map(brand => brand.name);
    const changedPremiumBrands = premiumBrands
      .filter(brand => brand.isChecked)
      .map(brand => brand.name);
    const changedCustomBrands = customBrands
      .filter(brand => brand.isChecked)
      .map(brand => brand.name);

    await setDoc(doc(db, 'user', user.uid), {
      keyword: {
        costEffective: changedCostEffectiveBrands,
        premium: changedPremiumBrands,
        custom: changedCustomBrands,
      },
      rule,
    }).then(() => {
      setToastMessage('키워드가 저장되었습니다.');
      dispatch(
        setUserKeyword({
          costEffective: changedCostEffectiveBrands,
          premium: changedPremiumBrands,
          custom: changedCustomBrands,
        }),
      );
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'brand'));
        const brands = querySnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() } as BrandType;
        });
        setBrands(brands);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'user', user.uid);
        const docSnap = await getDoc(docRef);
        setUserKeyword(docSnap.data()?.keyword);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    if (brands.length === 0) return;
    if (!userKeyword) return;

    setCostEffectiveBrands(
      brands
        .filter(brand => brand.type === '가성비')
        .map(brand => {
          if (userKeyword.costEffective.includes(brand.name)) {
            return { type: 'costEffective', name: brand.name, isChecked: true };
          } else {
            return {
              type: 'costEffective',
              name: brand.name,
              isChecked: false,
            };
          }
        }),
    );

    setPremiumBrands(
      brands
        .filter(brand => brand.type === '프리미엄')
        .map(brand => {
          if (userKeyword.premium.includes(brand.name)) {
            return { type: 'premium', name: brand.name, isChecked: true };
          } else {
            return { type: 'premium', name: brand.name, isChecked: false };
          }
        }),
    );

    setCustomBrands(
      brands.map(brand => {
        if (userKeyword.custom.includes(brand.name)) {
          return { type: 'custom', name: brand.name, isChecked: true };
        } else {
          return { type: 'custom', name: brand.name, isChecked: false };
        }
      }),
    );
  }, [brands, userKeyword]);

  useEffect(() => {
    if (toastMessage.length === 0) return;
    const clearToastMessage = setTimeout(() => {
      setToastMessage('');
    }, 3000);
    return () => clearTimeout(clearToastMessage);
  }, [toastMessage]);

  return (
    <>
      <div className='space-y-3 pb-3'>
        <KeywordList
          label='기성비'
          brands={costEffectiveBrands}
          onBrandClick={onBrandClick}
        />
        <KeywordList
          label='프리미엄'
          brands={premiumBrands}
          onBrandClick={onBrandClick}
        />
        <KeywordList
          label='나의 카페'
          brands={customBrands}
          onBrandClick={onBrandClick}
        />
      </div>
      <div className='space-y-3'>
        <button
          className='h-12 w-full cursor-pointer rounded-full bg-black/70 text-white hover:bg-black/80'
          onClick={onSave}
        >
          저장하기
        </button>
        <div className='text-center text-emerald-700'>{toastMessage}</div>
      </div>
    </>
  );
};

export default KeywordSetting;
