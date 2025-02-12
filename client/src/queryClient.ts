import { QueryClient } from '@tanstack/react-query';
import { request, RequestDocument } from 'graphql-request';

// type AnyOBJ = { [key: string]: any };

export const getClient = (() => {
  let client: QueryClient | null = null;
  return () => {
    if (!client) {
      client = new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: Infinity,
            staleTime: Infinity,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false
          }
        }
      });
    }
    return client;
  };
})();

const BASE_URL = 'http://localhost:8000/graphql';

// fetcher를 axios, graphql, fetch 등으로 변경할 수 있음
// export const restFetcher = async ({
//   method,
//   path,
//   body,
//   params
// }: {
//   method: 'GET' | 'POST' | 'PUT' | 'DELETE';
//   path: string;
//   body?: AnyOBJ;
//   params?: AnyOBJ;
// }) => {
//   try {
//     let url = `${BASE_URL}${path}`;
//     const fetchOptions: RequestInit = {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': BASE_URL
//       }
//     };
//     if (params) {
//       const searchParams = new URLSearchParams(params);
//       url += '?' + searchParams.toString();
//     }
//
//     if (body) fetchOptions.body = JSON.stringify(body);
//
//     const res = await fetch(url, fetchOptions);
//     return await res.json();
//   } catch (err) {
//     console.error(err);
//   }
// };

export const graphqlFetcher = <T>(query: RequestDocument, variables = {}) => request<T>(BASE_URL, query, variables);

export const QueryKeys = {
  PRODUCTS: 'PRODUCTS',
  CART: 'CART'
};
