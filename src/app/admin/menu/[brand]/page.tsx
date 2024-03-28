import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/libs/server/firebase';
import { MenuType } from '@/types';
import MenuListContainer from '@/components/Admin/Menu/MenuListContainer';

const fetchData = async (brand: string) => {
  try {
    const q = query(collection(db, 'menu'), where('brandId', '==', brand));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() } as MenuType;
    });
  } catch (error) {
    return [];
  }
};

export default async function BrandMenuPage({
  params: { brand },
}: {
  params: { brand: string };
}) {
  const menus = await fetchData(brand);

  return (
    <div>
      <span>메뉴 리스트</span>
      <MenuListContainer menus={menus} brandId={brand} />
    </div>
  );
}
