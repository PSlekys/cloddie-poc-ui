import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Box, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const tableColumns = [
  {
    field: 'id',
    headerName: 'ID',
  },
  {
    field: 'rentStart',
    headerName: 'Rent Start Date',
    flex: 1,
  },
  {
    field: 'price',
    headerName: 'Rental Price',
    flex: 1,
  },
  {
    field: 'rentType',
    headerName: 'Rental Type',
    flex: 1,
  },
  {
    field: 'paid',
    headerName: 'Confirmed',
    valueFormatted: (value) => (value ? 'Yes' : 'No'),
    flex: 1,
  },
];

const OwnerCard = ({
  id,
  image,
  name,
  shortRentPrice,
  longRentPrice,
  sellPrice,
  description,
  orders,
}) => {
  const navigate = useNavigate();

  return (
    <Card>
      <Box p={2}>
        <Stack direction="row" spacing={2}>
          <img
            src={image}
            alt={name}
            height="250"
            width="250"
            style={{ objectFit: 'cover', borderRadius: '5px' }}
          />

          <Box>
            <Typography variant="body1" color="text.secondary">
              {name}
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
              Short-term price: <b>€{shortRentPrice}</b>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Long-term price: <b>€{longRentPrice}</b>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sell price: <b>€{sellPrice}</b>
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
              {description.split('\n').map((descriptionItems, index) => (
                <React.Fragment key={index}>
                  {descriptionItems}
                  <br />
                </React.Fragment>
              ))}
            </Typography>

            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate(`/product/${id}`)}
              sx={{ mt: 1 }}
            >
              View Product Page
            </Button>
          </Box>
        </Stack>

        <Box>
          <Typography variant="h6" mt={2} mb={1}>
            Item Orders
          </Typography>
          {orders?.length === 0 && (
            <Typography variant="body2">This item has not been rented yet</Typography>
          )}
          {orders?.length > 0 && (
            <DataGrid
              columns={tableColumns}
              rows={orders}
              density="compact"
              autoHeight
              hideFooter
            />
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default OwnerCard;
