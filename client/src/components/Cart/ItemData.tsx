import { CartType } from '../../graphql/cart.ts';

const ItemData = ({ imageUrl, price, title }: Pick<CartType, 'imageUrl' | 'price' | 'title'>) => {
  return (
    <>
      <img src={imageUrl} />
      <p>{title}</p>
      <p>{price}</p>
    </>
  );
};

export default ItemData;
