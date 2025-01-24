import { CartType, DELETE_CART, UPDATE_CART } from '../../graphql/cart.ts';
import { useMutation } from '@tanstack/react-query';
import { getClient, graphqlFetcher, QueryKeys } from '../../queryClient.ts';
import { ForwardedRef, forwardRef, SyntheticEvent } from 'react';

const CartItem = ({ id, imageUrl, price, title, amount }: CartType, ref: ForwardedRef<HTMLInputElement>) => {
  const queryClient = getClient();

  const { mutate: updateCart } = useMutation({
    mutationFn: ({ id, amount }: { id: string; amount: number }) =>
      graphqlFetcher<{ [key: string]: CartType }>(UPDATE_CART, { id, amount }),
    onMutate: async ({ id, amount }) => {
      await queryClient.cancelQueries({ queryKey: [QueryKeys.CART] });
      const prevCart = queryClient.getQueryData<{ [key: string]: CartType }>([QueryKeys.CART]);
      if (!prevCart?.[id]) return prevCart;

      const newCart = {
        ...(prevCart || {}),
        [id]: { ...prevCart[id], amount }
      };
      queryClient.setQueryData([QueryKeys.CART], newCart);
      return prevCart;
    },
    onSuccess: (newValues) => {
      const prevCart = queryClient.getQueryData<{ [key: string]: CartType }>([QueryKeys.CART]);
      const newCart = {
        ...(prevCart || {}),
        [id]: newValues
      };
      queryClient.setQueryData([QueryKeys.CART], newCart);
    }
  });

  const { mutate: deleteCart } = useMutation({
    mutationFn: ({ id }: { id: string }) => graphqlFetcher<{ [key: string]: CartType }>(DELETE_CART, { id }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.CART]
      });
    },
    onError: (error) => {
      console.error('Delete failed:', error);
    }
  });

  const handleUpdateAmount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value);
    if (amount < 1) return;
    updateCart({ id, amount });
  };

  const handleDeleteCart = () => {
    deleteCart({ id });
  };

  return (
    <li>
      <input type="checkbox" name={`select-item`} ref={ref} />
      <img src={imageUrl} />
      <p>{price}</p>
      <p>{title}</p>
      <input type="number" value={amount} min={1} onChange={handleUpdateAmount} />
      <button type="button" onClick={handleDeleteCart}>
        삭제
      </button>
    </li>
  );
};

export default forwardRef(CartItem);
