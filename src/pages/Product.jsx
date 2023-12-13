import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Card, CardMedia, Typography, Container, Stack, Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorCard from '../components/ErrorCard';

const getData = (id) => {
  const url = `${import.meta.env.VITE_CMS_URL}/api/products/${id}?populate=*`;

  return axios.get(url);
};

const imageBaseUrl = import.meta.env.VITE_CMS_URL;

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const { isLoading, isError, data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getData(id),
  });

  if (isLoading) return <LoadingSpinner />;

  const item = data?.data?.data?.attributes;

  const PriceButton = ({ type, price, label }) => (
    <Stack
      spacing={2}
      direction="row"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <Typography flex="1">{type}</Typography>
      <Typography>
        <b>&euro;{price}</b>
      </Typography>
      <Button variant="contained" p={2} sx={{ minWidth: '4.5rem' }} disabled={!token}>
        {label}
      </Button>
    </Stack>
  );

  return (
    <Container component="main" maxWidth="tablet">
      <Box mb={1}>
        <Button size="small" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>

      {(isError || !item) && <ErrorCard />}

      {item && (
        <Grid container justifyContent="flex-start" spacing={2}>
          <Grid item mobile={12} tablet={6}>
            <Card
              sx={{
                maxWidth: '25rem',
              }}
              square
            >
              <CardMedia
                component="img"
                image={imageBaseUrl + item.image.data[0].attributes.url}
                alt={item.name}
              />
            </Card>
          </Grid>
          <Grid item mobile={12} tablet={6}>
            <Stack>
              <Typography mb={3} variant="h5" component="p">
                {item.name}
              </Typography>

              <Typography mb={3} variant="body1" component="p">
                {item.description.split('\n').map((descriptionItems, index) => (
                  <React.Fragment key={index}>
                    {descriptionItems}
                    <br />
                  </React.Fragment>
                ))}
              </Typography>

              <Stack spacing={2}>
                <PriceButton type="Sell Price:" price={item.sellPrice} label="Buy" />
                <PriceButton type="3 Day Rent Price:" price={item.shortRentPrice} label="Rent" />
                <PriceButton type="7 Day Rent Price:" price={item.longRentPrice} label="Rent" />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Product;
