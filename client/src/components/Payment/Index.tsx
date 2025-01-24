import { useRecoilState } from 'recoil';
import WillPay from '../WillPay/WillPay.tsx';
import { checkedCartState } from '../../recoils/cart.ts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PaymentModal from './Modal.tsx';
import { useMutation } from '@tanstack/react-query';
import { graphqlFetcher } from '../../queryClient.ts';
import { EXECUTE_PAY } from '../../graphql/payment.ts';

type PaymentInfos = string[];

const Payment = () => {
  const navigate = useNavigate();
  const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState);
  const [modalShow, toggleModal] = useState(false);

  const { mutate: excutePay } = useMutation({
    mutationFn: (payInfos: PaymentInfos) => graphqlFetcher(EXECUTE_PAY, payInfos)
  });

  const showModal = () => {
    toggleModal(true);
  };

  const proceed = () => {
    const payInfos = checkedCartData.map(({ id }) => id);
    excutePay(payInfos);
    setCheckedCartData([]);
    alert('결제가 완료되었습니다.');
    navigate('/products', { replace: true });
  };

  const cancel = () => {
    toggleModal(false);
  };

  return (
    <div>
      <WillPay submitTitle="결제하기" handleSubmit={showModal} />
      <PaymentModal show={modalShow} proceed={proceed} cancel={cancel} />
    </div>
  );
};

export default Payment;
