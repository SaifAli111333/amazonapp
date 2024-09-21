import React, { useState, useEffect } from 'react';
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Grid,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Button
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Orderdetailoverview = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(`http://localhost:3000/order/${id}`, { headers });
        if (response.data && response.data.order) {
          setOrder(response.data.order);
        } else {
          setError(response.data?.error || 'Order not found.');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order details', err);
        setError('Failed to fetch order details. Please try again.');
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <CircularProgress />;

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Grid
        container
        spacing={1}
        style={{
          width: '100%',
          marginBottom: '10px',
          border: '2px solid #326C1D',
          borderRadius: '10px',
          marginTop: '10px',
          paddingBottom: '20px',
          padding: '15px',
          backgroundColor: 'white',
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Order Overview
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Card sx={{ bgcolor: '#ffffff', borderRadius: '8px', boxShadow: 1 }}>
                  <CardHeader
                    title="Picture"
                    sx={{
                      bgcolor: '#fafafa',
                      color: '#333',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Divider />
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {order && order.ProductID}
                    </Box>
                  </CardContent>
                </Card>
                <Card sx={{ bgcolor: '#ffffff', borderRadius: '8px', boxShadow: 1, mt: 2 }}>
                  <CardHeader
                    title="Amazon Picture"
                    sx={{
                      bgcolor: '#fafafa',
                      color: '#333',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Divider />
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {order && order.ProductID}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={9}>
                <Card sx={{ bgcolor: '#ffffff', borderRadius: '8px', boxShadow: 1 }}>
                  <CardHeader
                    title="Details"
                    sx={{
                      bgcolor: '#fafafa',
                      color: '#333',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Divider />
                  <CardContent>
                    {error && (
                      <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                        {error}
                      </Typography>
                    )}
                    <Box>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                            Order Number:
                          </Typography>
                          {order?.Ordernumber || 'N/A'}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                            Customer Email:
                          </Typography>
                          {order?.Customeremail || 'N/A'}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                            AWZ Link:
                          </Typography>
                          {order?.awzlink || 'N/A'}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                            Order Type:
                          </Typography>
                          {order?.OrderType || 'N/A'}
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Orderdetailoverview;
