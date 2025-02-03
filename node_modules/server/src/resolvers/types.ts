export type Resolver = {
  [k: string]: {
    [key: string]: (
      parent: any,
      args: { [key: string]: any },
      context: {
        db: {
          cart: Cart;
          products: Products;
        };
      },
      info: any
    ) => any;
  };
};

export type Product = {
  id: string;
  image: string;
  price: number;
  title: string;
  description: string;
  createdAt: string;
};

export type Products = Product[];

export type CartItem = {
  id: string;
  amount: number;
};

export type Cart = CartItem[];
