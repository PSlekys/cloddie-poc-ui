import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorCard from '../components/ErrorCard';

const getData = (category, search) => {
  let url = `${
    import.meta.env.VITE_CMS_URL
  }/api/products?populate=*&filters[active][$eq]=true&filters[archived][$eq]=false`;

  if (category && !search) {
    url += `&filters[category][title][$eqi]=${category}`;
  }

  if (category && search) {
    url += `&filters[category][$eqi]=${category}&filters[name][$containsi]=${search}`;
  }

  if (!category && search) {
    url += `&filters[name][$containsi]=${search}`;
  }

  return axios({ url });
};

const imageBaseUrl = import.meta.env.VITE_CMS_URL;

const Products = () => {
  const [search, setSearch] = useState('');
  const { category } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['products', category, search],
    queryFn: () => getData(category, search),
  });

  const products = data?.data?.data;

  return (
    <Container maxWidth="desktop">
      <Typography variant="h4" pt={4}>
        {category ? category.slice(0, 1).toUpperCase() + category.slice(1) : 'All products'}
      </Typography>

      <Box mt={2}>
        <Stack
          direction="row"
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(e.target.elements[0].value);
          }}
        >
          <TextField
            type="search"
            label="Search"
            variant="outlined"
            placeholder="search..."
            sx={{ flex: 1 }}
            InputProps={{
              sx: { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            }}
          />
          <Button
            variant="contained"
            disableElevation
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          >
            Search
          </Button>
        </Stack>
      </Box>

      {isLoading && <LoadingSpinner />}

      {isError && <ErrorCard />}

      {products && (
        <Grid container spacing={2} mt={0}>
          {products.map((product) => (
            <Grid item mobile={12} tablet={3} key={product.id}>
              <ProductCard
                id={product.id}
                image={imageBaseUrl + product.attributes.image.data[0].attributes.url}
                price={product.attributes.shortRentPrice}
                about={product.attributes.name}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {products?.length === 0 && (
        <Typography variant="h6" textAlign="center" my={4}>
          No products found, please try again!
        </Typography>
      )}
    </Container>
  );
};

export default Products;
