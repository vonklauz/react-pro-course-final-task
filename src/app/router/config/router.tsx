import { createBrowserRouter } from 'react-router-dom';
import { App } from 'app';
import { lazy } from 'react';

const HomePage = lazy(() => import('pages/HomePage').then((module) => ({ default: module.HomePage })));
const ProductPage = lazy(() =>
  import('pages/ProductPage').then((module) => ({ default: module.ProductPage }))
);
const NotFoundPage = lazy(() =>
  import('pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage }))
);
const ProfilePage = lazy(() =>
  import('pages/ProfilePage').then((module) => ({ default: module.ProfilePage }))
);
const FavoritesPage = lazy(() =>
  import('pages/FavoritesPage').then((module) => ({ default: module.FavoritesPage }))
);
const SignUpPage = lazy(() => import('pages/SignUpPage').then((module) => ({ default: module.SignUpPage })));
const SignInPage = lazy(() => import('pages/SignInPage').then((module) => ({ default: module.SignInPage })));
const CartPage = lazy(() => import('pages/CartPage').then((module) => ({ default: module.CartPage })));

export enum AppRoutes {
  HOME = 'home',
  FAVORITES = 'favorites',
  PRODUCTS = 'products',
  PROFILE = 'profile',
  CART = 'cart',
  SIGNUP = 'signup',
  SIGNIN = 'signin',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, `/${string}` | '*'> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.FAVORITES]: '/favorites',
  [AppRoutes.PRODUCTS]: '/products/:productId',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.CART]: '/cart',
  [AppRoutes.SIGNUP]: '/signup',
  [AppRoutes.SIGNIN]: '/signin',
  [AppRoutes.NOT_FOUND]: '*',
};

export const router = createBrowserRouter([
  {
    path: RoutePath.home,
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: RoutePath.favorites,
        element: <FavoritesPage />,
      },
      {
        path: RoutePath.products,
        element: <ProductPage />,
      },
      {
        path: RoutePath.profile,
        element: <ProfilePage />,
      },
      {
        path: RoutePath.cart,
        element: <CartPage />,
      },
      {
        path: RoutePath.signup,
        element: <SignUpPage />,
      },
      {
        path: RoutePath.signin,
        element: <SignInPage />,
      },

      // last route
      {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
      },
    ],
  },
]);
