import { collection, getDocs, query, where } from 'firebase/firestore';
import Modal from '../../../../components/Modal';
import ModalContainer from '../../../../components/Cafe/ModalContainer';
import { db } from '@/libs/server/firebase';
import { MenuType } from '@/types';

export const revalidate = 10;

const fetchData = async (brandId: string) => {
  try {
    const menuQuery = query(
      collection(db, 'menu'),
      where('brandId', '==', brandId),
    );
    const menuQuerySnapshot = await getDocs(menuQuery);
    const menus = menuQuerySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() } as MenuType;
    });
    menus.sort((a, b) => {
      return a.nutritionalInfos[0].price - b.nutritionalInfos[0].price;
    });

    return menus;
  } catch (error) {
    return [];
  }
};

export default async function CafeModal({
  params: { id },
}: {
  params: { id: string };
}) {
  let isAllCafeMode = false;
  let menus = [] as MenuType[];

  if (id !== 'cafe-catagory') {
    menus = await fetchData(id);
  } else {
    isAllCafeMode = true;
  }

  return (
    <Modal>
      <ModalContainer menus={menus} isAllCafeMode={isAllCafeMode} />
    </Modal>
  );
}
