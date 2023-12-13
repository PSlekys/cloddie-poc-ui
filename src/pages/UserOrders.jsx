import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Container, Grid, Typography } from '@mui/material';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorCard from '../components/ErrorCard';
import OrderCard from '../components/OrderCard';

const getData = (token) => {
  return axios({
    method: 'GET',
    url: import.meta.env.VITE_CMS_URL + '/api/userorder',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const imageBaseUrl = import.meta.env.VITE_CMS_URL;

const UserOrders = () => {
  const token = localStorage.getItem('token');

  const { isLoading, data, isError } = useQuery({
    queryKey: ['userorders'],
    queryFn: () => getData(token),
  });

  if (isLoading) return <LoadingSpinner />;

  const orders = data?.data;

  return (
    <Container maxWidth="desktop">
      <Typography variant="h4" pt={2}>
        Your orders
      </Typography>

      {orders && (
        <Grid container spacing={2} mt={0}>
          {orders.map((order) => (
            <Grid item mobile={12} tablet={3} key={order.id}>
              <OrderCard
                image={imageBaseUrl + order.product.image[0].url}
                title={order.product.name}
                price={order.price}
                rentStart={order.rentStart}
                rentDuration={order.rentType}
                confirmed={order.paid}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {orders?.length === 0 && (
        <Typography variant="h6" textAlign="center" my={4}>
          You have not rented anything yet!
        </Typography>
      )}

      {isError && <ErrorCard />}
    </Container>
  );
};

export default UserOrders;
