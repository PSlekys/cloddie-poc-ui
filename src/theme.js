import { createTheme } from '@mui/material';

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      desktop: 1264,
    },
  },
  palette: {
    background: {
      default: '#faf8f6',
    },
    primary: {
      main: '#004c32',
    },
  },
});

export default theme;
