import { CartType } from '../../graphql/cart.ts';

const ItemData = ({ product }: Pick<CartType, 'product'>) => {
  return (
    <>
      <img src={product.imageUrl} />
      <p>{product.title}</p>
      <p>{product.price}</p>
    </>
  );
};

export default ItemData;
