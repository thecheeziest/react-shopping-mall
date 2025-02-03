import { CartType } from '../../graphql/cart.ts';
import CartItem from './Item.tsx';
import { UlContainer } from '../ul.styled.ts';
import { createRef, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { checkedCartState } from '../../recoils/cart.ts';
import WillPay from '../WillPay/WillPay.tsx';
import { useNavigate } from 'react-router-dom';

const CartList = ({ items }: { items: CartType[] }) => {
  const navigate = useNavigate();
  const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState);
  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRefs = items.map(() => createRef<HTMLInputElement>());
  const [formData, setFormData] = useState<FormData>();

  // 아이템 개별 선택
  const setAllCheckedFormItems = () => {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const selectedCount = data.getAll('select-item').length;
    const allChecked = selectedCount === items.length;
    formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = allChecked;
  };

  const setItemsCheckedFormAll = (targetInput: HTMLInputElement) => {
    const allChecked = targetInput.checked;
    checkboxRefs.forEach((inputElem) => {
      inputElem.current!.checked = allChecked;
    });
  };

  const handleCheckboxChanged = (e: SyntheticEvent) => {
    if (!formRef.current) return;
    const targetInput = e.target as HTMLInputElement;
    const data = new FormData(formRef.current);

    // select-all 선택 시
    if (targetInput.classList.contains('select-all')) {
      setItemsCheckedFormAll(targetInput);
    } else {
      setAllCheckedFormItems();
    }
    setFormData(data);
  };

  const handleSubmit = () => {
    if (checkedCartData.length) {
      navigate('/payment');
    } else {
      alert('결제할 상품이 없습니다.');
    }
  };

  useEffect(() => {
    checkedCartData.forEach((item) => {
      const itemRef = checkboxRefs.find((ref) => ref.current!.dataset.id === item.id);
      if (itemRef) itemRef.current!.checked = true;
    });
    setAllCheckedFormItems();
  }, []);

  useEffect(() => {
    const checkedItems = checkboxRefs.reduce<CartType[]>((res, ref, i) => {
      if (ref.current!.checked) res.push(items[i]);
      return res;
    }, []);
    setCheckedCartData(checkedItems);
  }, [items, formData]);

  return (
    <div>
      <form ref={formRef} onChange={handleCheckboxChanged}>
        <label>
          <input type="checkbox" className="select-all" />
          전체 선택
        </label>
        <UlContainer>
          {items.map((item, i) => (
            <CartItem {...item} key={item.id} ref={checkboxRefs[i]} />
          ))}
        </UlContainer>
      </form>
      <WillPay submitTitle="결제창으로" handleSubmit={handleSubmit} />
    </div>
  );
};

export default CartList;
