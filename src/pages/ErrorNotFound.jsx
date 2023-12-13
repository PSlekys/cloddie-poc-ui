import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

const ErrorNotFound = () => {
  return (
    <Box mt={{ tablet: 2 }}>
      <Container maxWidth="desktop">
        <Typography variant="h4" pt={4}>
          Page not found
        </Typography>

        <Typography variant="body1" textAlign="center" pt={6}>
          The page you were looking for was not found...
        </Typography>

        <Box textAlign="center" my={4}>
          <Button component={Link} variant="outlined" to="/">
            Return Home?
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ErrorNotFound;
