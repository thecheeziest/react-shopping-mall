import { Product } from '../../graphql/products';
import { UlContainer } from '../ul.styled.ts';
import ProductItem from './Item.tsx';

const ProductList = ({ list }: { list: Product[] }) => {
  return (
    <UlContainer>
      {list.map((product) => (
        <ProductItem {...product} key={product.id} />
      ))}
    </UlContainer>
  );
};
export default ProductList;
