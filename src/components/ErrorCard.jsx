import React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';

const ErrorCard = () => {
  return (
    <Box mt={2}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        We ran into an issue loading the data, please try reloading the page or contact support.
      </Alert>
    </Box>
  );
};

export default ErrorCard;
