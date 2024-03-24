import Modal from '../../../../components/Cafe/Modal';
import ModalContainer from '../../../../components/Cafe/ModalContainer';

export default function CafeModal({ params }: { params: { id: string } }) {
  return (
    <Modal>
      <ModalContainer cafeId={params.id} />
    </Modal>
  );
}
