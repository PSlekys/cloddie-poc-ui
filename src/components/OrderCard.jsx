import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const OrderCard = ({ image, title, price, rentStart, rentDuration, confirmed }) => {
  return (
    <Card>
      <CardMedia component="img" height="194" image={image} alt={title} />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={1}>
          Paid: &euro;{price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rent Start: {rentStart}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rent Duration: {rentDuration}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Confirmed: {confirmed ? 'Yes' : 'No'}
        </Typography>

        <Button
          variant="outlined"
          size="small"
          sx={{ mt: 2 }}
          onClick={() => window.open('mailto:help@cloddie.com')}
        >
          Not right? Contact support
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
