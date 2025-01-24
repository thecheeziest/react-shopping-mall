import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ModalContainer } from './payment.styled..ts';

const ModalPortal = ({ children }: { children: ReactNode }) => {
  const modalElement = document.getElementById('modal')!;
  return createPortal(children, modalElement);
};

const PaymentModal = ({ show, proceed, cancel }: { show: boolean; proceed: () => void; cancel: () => void }) => {
  return show ? (
    <ModalPortal>
      <ModalContainer $show={show}>
        <div className="modal-inner">
          <p>결제하시겠습니까?</p>
          <div>
            <button onClick={proceed}>예</button>
            <button onClick={cancel}>아니오</button>
          </div>
        </div>
      </ModalContainer>
    </ModalPortal>
  ) : null;
};

export default PaymentModal;
