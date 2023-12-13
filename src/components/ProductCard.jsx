import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const ProductCard = ({ id, image, about, price }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        cursor: 'pointer',
        '&:hover': { boxShadow: (theme) => theme.shadows[6], transition: '0.2s' },
      }}
      onClick={() => navigate(`/product/${id}`)}
    >
      <CardMedia component="img" height="194" image={image} alt={about} />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {about}
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={1}>
          from <b>€{price}</b>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
