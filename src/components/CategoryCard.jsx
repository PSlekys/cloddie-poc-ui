import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const CategoryCard = ({ image, title, about }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        cursor: 'pointer',
        '&:hover': { boxShadow: (theme) => theme.shadows[6], transition: '0.2s' },
      }}
      onClick={() => navigate(`/products/${title}`)}
    >
      <CardMedia component="img" height="194" image={image} alt={title} />
      <CardContent>
        <Typography variant="body1" fontWeight="bold" textAlign="center" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          {about}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
