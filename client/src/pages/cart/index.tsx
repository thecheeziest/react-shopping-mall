import { useQuery } from '@tanstack/react-query';
import { graphqlFetcher, QueryKeys } from '../../queryClient.ts';
import { CartType, GET_CART } from '../../graphql/cart.ts';
import CartList from '../../components/Cart/Index';

const CartPage = () => {
  const { data } = useQuery<{ cart: CartType[] }>({
    queryKey: [QueryKeys.CART],
    queryFn: () => graphqlFetcher(GET_CART),
    staleTime: 0,
    gcTime: 1000
  });

  const cartItems = (data?.cart || []) as CartType[];

  if (!cartItems.length) return <div>장바구니가 Beer 잇습니다.</div>;

  return <CartList items={cartItems} />;
};

export default CartPage;
