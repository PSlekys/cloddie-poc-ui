import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const login = () => {
    navigate('/login');
  };

  const profile = () => {
    navigate('/profile');
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Stack>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ color: 'white', flexGrow: 1, textDecoration: 'none' }}
          >
            CLODDIE
          </Typography>
          {token ? (
            <>
              <Button color="inherit" onClick={() => profile()}>
                Profile
              </Button>
              <Button color="inherit" onClick={() => logout()}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => login()}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Stack>
  );
};

export default Navbar;
