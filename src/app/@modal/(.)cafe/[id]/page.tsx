import { collection, getDocs, query, where } from 'firebase/firestore';
import Modal from '../../../../components/Modal';
import ModalContainer from '../../../../components/Cafe/ModalContainer';
import { db } from '@/libs/server/firebase';
import { MenuType } from '@/types';

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
  const menus = await fetchData(id);
  return (
    <Modal>
      <ModalContainer menus={menus} />
    </Modal>
  );
}
