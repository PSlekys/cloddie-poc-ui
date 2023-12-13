import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorCard from '../components/ErrorCard';
import OwnerCard from '../components/OwnerCard';

const getData = (token) => {
  return axios({
    method: 'GET',
    url: import.meta.env.VITE_CMS_URL + '/api/ownerproduct',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const imageBaseUrl = import.meta.env.VITE_CMS_URL;

const OwnerProducts = () => {
  const token = localStorage.getItem('token');

  const { isLoading, data, isError } = useQuery({
    queryKey: ['ownerproduct'],
    queryFn: () => getData(token),
  });

  if (isLoading) return <LoadingSpinner />;

  const products = data?.data;

  return (
    <Container maxWidth="desktop">
      <Stack direction="row" justifyContent="space-between" alignItems="center" pt={2}>
        <Typography variant="h4">Your Items</Typography>

        <Button variant="contained" component={Link} to="/add-product">
          Add an item
        </Button>
      </Stack>

      {products && (
        <>
          <Grid container spacing={2} mt={0}>
            {products.map((product) => (
              <Grid item tablet={12} key={product.id}>
                <OwnerCard
                  id={product.id}
                  name={product.name}
                  image={imageBaseUrl + product.image[0].url}
                  shortRentPrice={product.shortRentPrice}
                  longRentPrice={product.longRentPrice}
                  sellPrice={product.sellPrice}
                  description={product.description}
                  orders={product.orders}
                />
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center" mt={2}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => window.open('mailto:help@cloddie.com')}
            >
              Something does not look right? Contact Support
            </Button>
          </Box>
        </>
      )}

      {products?.length === 0 && (
        <Typography variant="h6" textAlign="center" my={4}>
          You have not added an item to rent yet!
        </Typography>
      )}

      {isError && <ErrorCard />}
    </Container>
  );
};

export default OwnerProducts;
