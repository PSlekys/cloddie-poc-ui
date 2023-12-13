import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import {
  Avatar,
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const postRegister = (user) => {
  return axios({
    method: 'POST',
    url: import.meta.env.VITE_CMS_URL + '/api/auth/local/register',
    data: {
      username: user.email,
      email: user.email,
      password: user.password,
      first_name: user.firstName,
      last_name: user.lastName,
      acceptsMarketing: user.acceptsMarketing,
    },
  });
};

const Register = () => {
  const navigate = useNavigate('/');

  const { mutate, isLoading } = useMutation({
    mutationFn: (user) => postRegister(user),
    onSuccess: (res) => {
      const token = res?.data?.jwt;
      localStorage.setItem('token', token);
      navigate('/');
    },
    onError: (error) => {
      alert(error?.message || 'We have encountered an issue. Please try again');
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const user = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      acceptsMarketing: !!data.get('acceptsMarketing'),
    };

    mutate(user);
  };

  return (
    <Container component="main" maxWidth="tablet">
      <Stack direction="column" alignItems="center" pt={{ tablet: 4 }}>
        <Avatar sx={{ m: 1, bgcolor: 'common.black' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item mobile={12} tablet={6}>
              <TextField
                autoFocus
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
              />
            </Grid>
            <Grid item mobile={12} tablet={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item mobile={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item mobile={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                inputProps={{
                  minLength: 6,
                }}
              />
            </Grid>
            <Grid item mobile={12}>
              <FormControlLabel
                control={<Checkbox name="acceptsMarketing" value="true" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
              <FormControlLabel
                control={<Checkbox name="acceptsTerms" value="true" color="primary" />}
                label={
                  <Typography>
                    I understand and agree to the{' '}
                    <Link component={RouterLink} to="/terms">
                      terms and conditions of Cloddie
                    </Link>
                    .
                  </Typography>
                }
                required
              />
            </Grid>
          </Grid>
          <LoadingButton
            fullWidth
            loading={isLoading}
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
};

export default Register;
