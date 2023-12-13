import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Backdrop sx={{ zIndex: 100 }} open={true}>
      <CircularProgress color="primary" size="3.5rem" />
    </Backdrop>
  );
};

export default LoadingSpinner;
