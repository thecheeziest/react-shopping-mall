import GET_PRODUCTS, {GET_PRODUCT} from '../graphql/products.ts';
import {graphql} from 'msw';
import {ADD_CART, CartType, DELETE_CART, GET_CART, UPDATE_CART} from '../graphql/cart.ts';
import {EXECUTE_PAY} from '../graphql/payment.ts';

const mockProducts = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1 + '',
  imageUrl: `https://picsum.photos/id/${i + 20}/200/150`,
  price: 50000,
  title: `상품 ${i + 1}`,
  description: `상품 ${i + 1} 상세 설명`,
  createdAt: new Date(1645735501883 + i * 1000 * 60 * 60 * 10).toISOString()
}));

let cartData: { [key: string]: CartType } = {};

export const handlers = [
  graphql.query(GET_PRODUCTS, (_, res, ctx) => {
    return res(
      ctx.data({
        products: mockProducts
      })
    );
  }),
  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    const found = mockProducts.find((item) => item.id === req.variables.id);
    if (found) return res(ctx.data(found));
    return res();
  }),
  graphql.query(GET_CART, (_, res, ctx) => {
    console.log('get cart cartData', cartData);
    return res(ctx.data(cartData));
  }),
  graphql.mutation(ADD_CART, (req, res, ctx) => {
    const newCartData = { ...cartData };
    const id = req.variables.id;
    const targetProduct = mockProducts.find((item) => item.id === req.variables.id);

    if (!targetProduct) {
      throw new Error('상품이 존재하지 않습니다.');
    }

    const newItem = {
      ...targetProduct,
      amount: (newCartData[id]?.amount || 0) + 1
    };
    newCartData[id] = newItem;
    cartData = newCartData;
    return res(ctx.data(newItem));
  }),
  graphql.mutation(UPDATE_CART, (req, res, ctx) => {
    const newCartData = { ...cartData };
    const { id, amount } = req.variables;

    if (!newCartData[id]) {
      throw new Error('상품이 존재하지 않습니다.');
    }

    const newItem = {
      ...newCartData[id],
      amount
    };
    newCartData[id] = newItem;
    cartData = newCartData;
    return res(ctx.data(newItem));
  }),
  graphql.mutation(DELETE_CART, ({ variables: { id } }, res, ctx) => {
    const newCartData = { ...cartData };
    delete newCartData[id];
    cartData = newCartData;
    return res(ctx.data({ id }));
  }),
  graphql.mutation(EXECUTE_PAY, ({ variables: ids }, res, ctx) => {
    ids.forEach((id: string) => {
      delete cartData[id];
    });
    return res(ctx.data(ids));
  })
];
