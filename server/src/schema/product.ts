import { gql } from 'apollo-server-express';

const productSchema = gql`
  type Product {
    id: String!
    imageUrl: String!
    price: Int!
    title: String!
    description: String!
    createdAt: Int
  }

  extend type Query {
    products: [Product!]!
    product(id: ID!): Product!
  }
`;

export default productSchema;
