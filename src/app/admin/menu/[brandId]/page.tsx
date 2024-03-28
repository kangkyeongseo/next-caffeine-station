import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/libs/server/firebase';
import { BrandType, MenuType } from '@/types';
import MenuContainer from '@/components/Admin/Menu/MenuContainer';

const fetchData = async (brandId: string) => {
  try {
    const menuQuery = query(
      collection(db, 'menu'),
      where('brandId', '==', brandId),
    );
    const menuQuerySnapshot = await getDocs(menuQuery);
    const brandDocSnapshot = await getDoc(doc(db, 'brand', brandId));

    const menus = menuQuerySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() } as MenuType;
    });
    const brand = brandDocSnapshot.data() as BrandType;

    return { menus, brand };
  } catch (error) {
    return {};
  }
};

export default async function BrandMenuPage({
  params: { brandId },
}: {
  params: { brandId: string };
}) {
  const { menus, brand } = await fetchData(brandId);
  if (!menus) return;
  if (!brand) return;
  return (
    <div className='mx-auto mt-20 min-h-[700px] w-[600px] border-2'>
      <MenuContainer menus={menus} brand={brand} />
    </div>
  );
}
