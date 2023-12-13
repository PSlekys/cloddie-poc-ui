import React from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import {
  Box,
  Container,
  Link,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CloudUpload } from '@mui/icons-material';
import LoadingSpinner from '../components/LoadingSpinner';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const postProduct = (product, token) => {
  const url = `${import.meta.env.VITE_CMS_URL}/api/products`;

  return axios({
    method: 'POST',
    url,
    data: product,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const AddProduct = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ product, token }) => postProduct(product, token),
    onSuccess: () => {
      alert('Sucessfully added a new product. It is under review!');
      navigate('/your-products');
    },
    onError: (error) => {
      alert(error?.message || 'We have encountered an issue. Please try again');
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    const data = {};
    const product = new FormData();

    [...event.target.elements].forEach(({ name, type, value, files }) => {
      if (!['submit', 'file', 'checkbox'].includes(type)) {
        data[name] = value;
      } else if (type === 'file') {
        [...files].forEach((file) => {
          product.append('files.image', file);
        });
      }
    });

    product.append('data', JSON.stringify({ ...data, active: false, archived: false, owner: 1 }));

    mutate({ product, token });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container maxWidth="desktop">
      <Typography variant="h4" pt={2}>
        Add an Item
      </Typography>

      <Box component="form" onSubmit={handleSubmit} mt={1}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Item Name"
          name="name"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          multiline
          rows={5}
          id="description"
          label="Item Description/Details"
          name="description"
        />
        <Grid container spacing={2}>
          <Grid item mobile={12} tablet={4}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="shortRentPrice"
              name="shortRentPrice"
              label="Short Rent Price"
              inputProps={{
                min: 0,
                max: 10000,
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">&euro;</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item mobile={12} tablet={4}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="longRentPrice"
              name="longRentPrice"
              label="Long Rent Price"
              inputProps={{
                min: 0,
                max: 10000,
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">&euro;</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item mobile={12} tablet={4}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="sellPrice"
              name="sellPrice"
              label="Sell Price"
              inputProps={{
                min: 0,
                max: 10000,
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">&euro;</InputAdornment>,
              }}
            />
          </Grid>
        </Grid>

        <Box my={1}>
          <Button component="label" variant="contained" startIcon={<CloudUpload />}>
            Upload image
            <VisuallyHiddenInput
              name="image"
              id="image"
              type="file"
              accept=".png, .jpg, .jpeg"
              required
            />
          </Button>
        </Box>

        <FormControlLabel
          control={<Checkbox name="acceptsTerms" value="true" color="primary" />}
          label={
            <Typography>
              I accept this product meets all the{' '}
              <Link component={RouterLink} to="/terms">
                terms and conditions of Cloddie
              </Link>{' '}
              and will be revied before publishing.
            </Typography>
          }
          required
        />
        <LoadingButton
          fullWidth
          loading={isLoading}
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit Product for Review
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default AddProduct;
