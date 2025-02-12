import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { GET_PRODUCT, Product } from '../../graphql/products.ts';
import { graphqlFetcher, QueryKeys } from '../../queryClient.ts';
import ProductDetail from '../../components/Product/Detail.tsx';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery<{ product: Product }>({
    queryKey: [QueryKeys.PRODUCTS, id],
    queryFn: () => graphqlFetcher<{ product: Product }>(GET_PRODUCT, { id })
  });

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) return null;

  return (
    <div>
      <h2>상품 상세</h2>
      <ProductDetail item={data.product} />;
    </div>
  );
};

export default ProductDetailPage;
