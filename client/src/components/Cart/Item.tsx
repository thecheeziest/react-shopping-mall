import { CartType, DELETE_CART, UPDATE_CART } from '../../graphql/cart.ts';
import { useMutation } from '@tanstack/react-query';
import { getClient, graphqlFetcher, QueryKeys } from '../../queryClient.ts';
import { ForwardedRef, forwardRef, SyntheticEvent } from 'react';

const CartItem = (
  { id, product: { imageUrl, price, title }, amount }: CartType,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const queryClient = getClient();

  const { mutate: updateCart } = useMutation({
    mutationFn: ({ id, amount }: { id: string; amount: number }) =>
      graphqlFetcher<{ [key: string]: CartType }>(UPDATE_CART, { id, amount }),
    onMutate: async ({ id, amount }) => {
      await queryClient.cancelQueries({ queryKey: [QueryKeys.CART] });
      const { cart } = queryClient.getQueryData<{ cart: CartType[] }>([QueryKeys.CART]) || {};
      if (!cart) return null;

      const targetIndex = cart?.findIndex((cartItem) => cartItem.id === id);

      const newCart = [...cart];
      newCart.splice(targetIndex, 1, { ...newCart[targetIndex], amount });
      queryClient.setQueryData([QueryKeys.CART], { cart: newCart });
      return cart;
    },
    onSuccess: ({ updateCart }) => {
      const { cart: prevCart } = queryClient.getQueryData<{ cart: CartType[] }>([QueryKeys.CART]) || { cart: [] };
      const targetIndex = prevCart?.findIndex((cartItem) => cartItem.id === updateCart.id);

      if (!prevCart || targetIndex === undefined || targetIndex < 0) return;

      const newCart = [...prevCart];
      newCart.splice(targetIndex, 1, updateCart);
      queryClient.setQueryData([QueryKeys.CART], { cart: newCart });
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
