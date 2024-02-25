import { Close } from '@/image/svgs ';
import Modal from './(component)/Modal';
import ModalContainer from './(component)/ModalContainer';

export default function CafeModal({ params }: { params: { id: string } }) {
  return (
    <Modal>
      <div className=' flex'>
        <div
          // className={`z-30 space-y-4 rounded-xl bg-white p-4 ${isMenuOpen ? '-translate-x-[16px]' : 'translate-x-[160px]'} transition-all`}
          className={`z-30 space-y-4 rounded-xl bg-white p-4`}
        >
          <div>
            <span>
              <Close />
            </span>
          </div>
          <ModalContainer cafeId={params.id} />
        </div>
      </div>
      {/* <div
        className={`h-[420px] w-[320px] rounded-xl bg-white transition-all ${isMenuOpen ? 'opacity-100' : 'translate-y-28 opacity-0'}`}
      ></div> */}
    </Modal>
  );
}
