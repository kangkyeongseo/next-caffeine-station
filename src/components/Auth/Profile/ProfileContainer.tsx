import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '@/libs/server/firebase';
import { BrandType } from '@/types';

interface ProfileContainerProps {
  user: any;
}

const ProfileContainer = ({ user }: ProfileContainerProps) => {
  const auth = getAuth();
  const router = useRouter();

  const [brands, setBrands] = useState<BrandType[]>([]);
  const [userKeyword, setUserKeyword] = useState<any>(null);
  const [costEffectiveBrands, setCostEffectiveBrands] = useState<any[]>([]);
  const [premiumBrands, setPremiumBrands] = useState<any[]>([]);
  const [customBrands, setCustomBrands] = useState<any[]>([]);
  const [toastMessage, setToastMessage] = useState('');

  const logout = () => {
    signOut(auth)
      .then(() => {
        router.back();
      })
      .catch(error => {
        console.log(error);
      });
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
    }).then(() => {
      setToastMessage('키워드가 저장되었습니다.');
    });
  };

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
      const docRef = doc(db, 'user', user.uid);
      const docSnap = await getDoc(docRef);
      setUserKeyword(docSnap.data()?.keyword);
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
    <div className='w-full space-y-12 px-12'>
      <div className='flex flex-col items-center gap-2'>
        <span className='text-lg'>{user?.email}</span>
        <span
          className='cursor-pointer text-sm text-black/70 hover:text-black'
          onClick={logout}
        >
          로그아웃
        </span>
      </div>
      <div className='space-y-3'>
        <span>검색 카페 설정하기</span>
        <div className='space-y-1'>
          <span className='text-sm'>가성비</span>
          <ul className='flex flex-wrap gap-1'>
            {costEffectiveBrands.map(brand => (
              <li
                className={`cursor-pointer rounded-md border px-2 py-1 text-sm ${brand.isChecked ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'hover:bg-gray-100'}`}
                key={brand.name}
                onClick={() => onBrandClick(brand.type, brand.name)}
              >
                {brand.name}
              </li>
            ))}
          </ul>
        </div>
        <div className='space-y-1'>
          <span className='text-sm'>프리미엄</span>
          <ul className='flex flex-wrap gap-1'>
            {premiumBrands.map(brand => (
              <li
                className={`cursor-pointer rounded-md border px-2 py-1 text-sm ${brand.isChecked ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'hover:bg-gray-100'}`}
                key={brand.name}
                onClick={() => onBrandClick(brand.type, brand.name)}
              >
                {brand.name}
              </li>
            ))}
          </ul>
        </div>
        <div className='space-y-1'>
          <span className='text-sm'>나의 카페</span>
          <ul className='flex flex-wrap gap-1'>
            {customBrands.map(brand => (
              <li
                className={`cursor-pointer rounded-md border px-2 py-1 text-sm ${brand.isChecked ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'hover:bg-gray-100'}`}
                key={brand.name}
                onClick={() => onBrandClick(brand.type, brand.name)}
              >
                {brand.name}
              </li>
            ))}
          </ul>
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
      </div>
    </div>
  );
};

export default ProfileContainer;
