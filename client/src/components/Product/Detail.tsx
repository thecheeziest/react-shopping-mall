import { Product } from '../../graphql/products.ts';

const ProductDetail = ({ item: { description, imageUrl, price, title } }: { item: Product }) => (
  <div>
    <p>{title}</p>
    <img src={imageUrl} />
    <p>{description}</p>
    <span>${price}</span>
  </div>
);

export default ProductDetail;
