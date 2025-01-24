import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { GET_PRODUCT, Product } from '../../graphql/products.ts';
import { graphqlFetcher, QueryKeys } from '../../queryClient.ts';
import ProductDetail from '../../components/Product/Detail.tsx';

const ProductDetailPage = () => {
  const { id } = useParams();
  console.log('useParams', id);
  const { data, isLoading } = useQuery<Product>({
    queryKey: [QueryKeys.PRODUCTS, id],
    queryFn: () => graphqlFetcher<Product>(GET_PRODUCT, { id })
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) return null;

  return (
    <div>
      <h2>상품 상세</h2>
      <ProductDetail item={data} />;
    </div>
  );
};

export default ProductDetailPage;
