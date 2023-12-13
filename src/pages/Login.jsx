import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import { useMutation } from '@tanstack/react-query';

const postLogin = (user) => {
  const url = `${import.meta.env.VITE_CMS_URL}/api/auth/local`;

  return axios.post(url, {
    identifier: user.email,
    password: user.password,
  });
};

const Login = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: (user) => postLogin(user),
    onSuccess: (res) => {
      const token = res?.data?.jwt;
      localStorage.setItem('token', token);
      navigate('/');
    },
    onError: (error) => {
      alert(error?.message || 'We have encountered an issue. Please try again');
    },
  });

  const token = localStorage.getItem('token');

  if (token) {
    navigate('/');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const user = {
      email: data.get('email'),
      password: data.get('password'),
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
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputProps={{
              minLength: 6,
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <LoadingButton
            fullWidth
            loading={isLoading}
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item mobile>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                Don&apos;t have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
