import { collection, getDocs } from 'firebase/firestore';
import Map from '@/components/Main/Map';
import CafeSideBar from '@/components/Main/CafeSideBar/CafeSideBar';
import FilteringController from '@/components/Main/FilteringController';
import SetMapButtons from '@/components/Main/SetMapButtons';
import { db } from '@/libs/server/firebase';
import { BrandType } from '@/types';

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
  return (
    <div className='relative h-full w-screen overflow-hidden md:h-screen'>
      <FilteringController />
      <Map />
      <CafeSideBar brands={brands} />
      <SetMapButtons />
    </div>
  );
}
