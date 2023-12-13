import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorCard from '../components/ErrorCard';
import CategoryCard from '../components/CategoryCard';
import { Link } from 'react-router-dom';

const getData = () => {
  const url = `${import.meta.env.VITE_CMS_URL}/api/categories?populate=image`;

  return axios({ url });
};

const imageBaseUrl = import.meta.env.VITE_CMS_URL;

const Home = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getData(),
  });

  const categories = data?.data?.data || [];

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container maxWidth="desktop">
      <Box>
        <Typography textAlign="center" component="h2" variant="h5" mt={2}>
          Welcome to your one-stop-rental for looking stylish!
        </Typography>

        {isError && <ErrorCard />}

        {categories?.length > 0 && (
          <Grid container spacing={2} mt={1}>
            {categories.map((category) => (
              <Grid item mobile={12} tablet={3} key={category.attributes.title}>
                <CategoryCard
                  image={imageBaseUrl + category.attributes.image.data.attributes.url}
                  title={category.attributes.title}
                  about={category.attributes.description}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <Box textAlign="center" mt={4} mb={2}>
          <Button component={Link} to="/your-products" variant="outlined">
            Looking to rent out your clothing?
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
