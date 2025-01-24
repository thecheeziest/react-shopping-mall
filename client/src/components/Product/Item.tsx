import { Link } from 'react-router-dom';
import { Product } from '../../graphql/products.ts';
import { useMutation } from '@tanstack/react-query';
import { graphqlFetcher } from '../../queryClient.ts';
import { ADD_CART } from '../../graphql/cart.ts';

const ProductItem = ({ id, imageUrl, price, title, description }: Product) => {
  const { mutate: addCart } = useMutation({
    mutationFn: (id: string) => graphqlFetcher(ADD_CART, { id })
  });

  return (
    <li>
      <Link to={`/products/${id}`}>
        <p>{title}</p>
        <img src={imageUrl} />
        <p>{description}</p>
        <span>${price}</span>
      </Link>
      <button onClick={() => addCart(id)}>담기</button>
    </li>
  );
};

export default ProductItem;
