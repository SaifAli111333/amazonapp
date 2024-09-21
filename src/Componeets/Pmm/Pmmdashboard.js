import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardHeader, Divider } from '@mui/material';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom'; 
import axios from 'axios';


function Pmmdashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);
  const [totalCommission, setTotalCommission] = useState(0); // State for total commission

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get('http://localhost:3000/ProductCount', { headers });
        setTotalProducts(response.data.count);
      } catch (err) {
        console.error('Error fetching product count', err);
      }
    };

    fetchProductCount();
  }, []);

  useEffect(() => {
    const fetchReservationsCount = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get('http://localhost:3000/ProductCount', { headers });
        setTotalReservations(response.data.count);
      } catch (err) {
        console.error('Error fetching product count', err);
      }
    };

    fetchReservationsCount();
  }, []);

  useEffect(() => {
    const fetchTotalCommission = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get('http://localhost:3000/categories/totalcommission', { headers });
        setTotalCommission(response.data.subtotal);
      } catch (err) {
        console.error('Error fetching total commission', err);
      }
    };

    fetchTotalCommission();
  }, []);


  return (
    <Container sx={{ backgroundColor: '#f0f2f5', minHeight: '100vh', py: 3 }}>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333', mb: 3, textAlign: 'center' }}>
          Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* Cards for statistics */}
          <Grid item xs={12} sm={6} md={4}>
            <Link to="products" style={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  bgcolor: '#ffffff',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: '2px solid #3f51b5',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  },
                  height: '150px',
                }}
              >
                <CardHeader
                  title="Products"
                  sx={{ bgcolor: '#3f51b5', color: '#fff', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
                />
                <CardContent>
                  <Typography variant="h5" sx={{ color: '#333' }}>{totalProducts}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Link to="cart" style={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  bgcolor: '#ffffff',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: '2px solid #4caf50',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  },
                  height: '150px',
                }}
              >
                <CardHeader
                  title="Reservations"
                  sx={{ bgcolor: '#4caf50', color: '#fff', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
                />
                <CardContent>
                  <Typography variant="h5" sx={{ color: '#333' }}>{totalReservations}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>

          {/* New Card for Total Commission */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                bgcolor: '#ffffff',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                textAlign: 'center',
                border: '2px solid #ff9800',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                },
                height: '150px',
              }}
            >
              <CardHeader
                title="Total Commission"
                sx={{ bgcolor: '#ff9800', color: '#fff', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
              />
              <CardContent>
                <Typography variant="h5" sx={{ color: '#333' }}>{totalCommission}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* The rest of your existing code... */}
        </Grid>
      </Box>
    </Container>
  );
}

export default Pmmdashboard;
