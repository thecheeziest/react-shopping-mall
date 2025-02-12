import { useQuery } from '@tanstack/react-query';
import GET_PRODUCTS, { Products } from '../../graphql/products.ts';
import { graphqlFetcher, QueryKeys } from '../../queryClient.ts';
import ProductList from '../../components/Product/List.tsx';

const ProductPage = () => {
  const { data, isLoading } = useQuery<Products>({
    queryKey: [QueryKeys.PRODUCTS],
    queryFn: () => graphqlFetcher<Products>(GET_PRODUCTS)
  });
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>상품 목록</h2>
      <ProductList list={data?.products || []} />
    </div>
  );
};

export default ProductPage;
