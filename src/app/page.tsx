import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/libs/server/firebase';
import { BrandType } from '@/types';
import MainContainer from '@/components/Main/MainContainer';

const fetchData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'brand'));
    return querySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() } as BrandType;
    });
  } catch (error) {
    return [];
  }
};

export default async function Home() {
  const brands = await fetchData();
  return <MainContainer brands={brands} />;
}
