import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { Container } from '@mui/material';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorCard from '../components/ErrorCard';

const getData = () => {
  return axios({
    method: 'GET',
    url: import.meta.env.VITE_CMS_URL + '/api/t-and-c',
  });
};

const Terms = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ['terms'],
    queryFn: () => getData(),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container maxWidth="desktop">
      {isError && <ErrorCard />}

      {data?.data && <BlocksRenderer content={data?.data?.data?.attributes?.content} />}
    </Container>
  );
};

export default Terms;
