import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/libs/server/firebase';
import { BrandType } from '@/types';

const fetchData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'brand'));
    const brand = querySnapshot.docs.map(doc => {
      return { id: doc.id, name: doc.data().name } as BrandType;
    });
    return brand;
  } catch (error) {
    return [];
  }
};

export default async function MenuPage() {
  const brands = await fetchData();
  return (
    <div className='mx-auto mt-20 min-h-[700px] w-[600px] border-2'>
      <div className='bg-black/80 py-2 text-center'>
        <span className='text-white'>메뉴</span>
      </div>
      <ul>
        {brands.map(brand => (
          <li key={brand.id}>
            <Link
              href={`/admin/menu/${brand.id}`}
              className='block border-b-2 py-2 text-center hover:bg-gray-100'
            >
              {brand.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
