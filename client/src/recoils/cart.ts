import { atom } from 'recoil';
import { CartType } from '../graphql/cart.ts';

export const checkedCartState = atom<CartType[]>({
  key: 'cartState',
  default: []
});

// export const cartItemSelector = selectorFamily<number | undefined, string>({
//   key: 'cartItem',
//   get:
//     (id: string) =>
//     ({ get }) => {
//       const carts = get(cartState);
//       return carts.get(id);
//     },
//   set:
//     (id: string) =>
//     ({ get, set }, newValue) => {
//       if (typeof newValue === 'number') {
//         const newCart = new Map([...get(cartState)]);
//         newCart.set(id, newValue);
//         console.log(newCart);
//         set(cartState, newCart);
//       }
//     }
// });
