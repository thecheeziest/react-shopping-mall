import GlobalLayout from './pages/_layout';
import Index from './pages';
import CartPage from './pages/cart';
import PaymentPage from './pages/payment';
import ProductDetailPage from './pages/products/[id]';
import ProductPage from './pages/products';

export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <Index />, index: true },
      { path: '/cart', element: <CartPage /> },
      { path: '/payment', element: <PaymentPage /> },
      { path: '/products', element: <ProductPage />, index: true },
      { path: '/products/:id', element: <ProductDetailPage /> }
    ]
  }
];

export const pages = [
  { route: '/' },
  { route: '/cart' },
  { route: '/payment' },
  { route: '/products' },
  { route: '/products/:id' }
];
