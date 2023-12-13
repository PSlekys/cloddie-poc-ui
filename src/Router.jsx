import React, { lazy, Suspense, useEffect } from 'react';
import { Outlet, useRoutes, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Box } from '@mui/material';
import LoadingSpinner from './components/LoadingSpinner';
import Navigation from './components/Navbar';
import Footer from './components/Footer';

export const Home = lazy(() => import('./pages/Home'));
export const Register = lazy(() => import('./pages/Register'));
export const Login = lazy(() => import('./pages/Login'));
export const Products = lazy(() => import('./pages/Products'));
export const Product = lazy(() => import('./pages/Product'));
export const UserOrders = lazy(() => import('./pages/UserOrders'));
export const OwnerProducts = lazy(() => import('./pages/OwnerProducts'));
export const AddProduct = lazy(() => import('./pages/AddProduct'));
export const Terms = lazy(() => import('./pages/Terms'));
export const ErrorNotFound = lazy(() => import('./pages/ErrorNotFound'));

const removeExpiredToken = () => {
  const token = localStorage.getItem('token');

  if (token) {
    const decodedToken = jwtDecode(token);

    if (Date.now() >= decodedToken?.exp * 1000) {
      localStorage.removeItem('token');
    }
  }
};

const Router = () => {
  const location = useLocation();

  useEffect(() => {
    removeExpiredToken();
  }, [location]);

  const routes = useRoutes([
    {
      element: (
        <>
          <Navigation />
          <Suspense fallback={<LoadingSpinner />}>
            <Box mt={8} py={2} minHeight="calc(100vh - 4rem - 5rem)">
              <Outlet />
            </Box>
          </Suspense>
          <Footer />
        </>
      ),
      children: [
        { element: <Home />, index: true },
        { path: 'Register', element: <Register /> },
        { path: 'Login', element: <Login /> },
        { path: 'Terms', element: <Terms /> },
        { path: 'products/:category?', element: <Products /> },
        { path: 'product/:id', element: <Product /> },
        { path: 'profile', element: <UserOrders /> },
        { path: 'your-products', element: <OwnerProducts /> },
        { path: 'add-product', element: <AddProduct /> },
        { path: '*', element: <ErrorNotFound /> },
      ],
    },
  ]);

  return routes;
};

export default Router;
