import React from 'react';
import { Container, Typography, Paper, Stack } from '@mui/material';

const Footer = () => {
  return (
    <Paper elevation={0} sx={{ backgroundColor: '#191a1c' }} square>
      <Container maxWidth="desktop">
        <Stack height="5rem" justifyContent="center" alignItems="center">
          <Typography variant="body2" component="p" textAlign="center" color="common.white">
            &copy; Cloddie. All Rights Reserved.
          </Typography>
        </Stack>
      </Container>
    </Paper>
  );
};

export default Footer;
