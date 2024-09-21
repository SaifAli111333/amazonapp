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
  Button,
  MenuItem
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Refundpendingoverview = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editOrder, setEditOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(`http://localhost:3000/order/${id}`, { headers });
        if (response.data && response.data.order) {
          setOrder(response.data.order);
          setEditOrder(response.data.order);
        } else if (response.data && response.data.error) {
          setError(response.data.error);
        } else {
          setError('Order not found.');
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

  const handleEditClick = () => {
    setEditOrder(order);
    setIsEditing(true);
  };

  const handleDetailClick = () => {
    setIsEditing(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleUpdateClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      await axios.put(`http://localhost:3000/order/${id}`, editOrder, { headers });
      setIsEditing(false);
      setOrder(editOrder);
    } catch (err) {
      console.error('Error updating order:', err);
      setError('Failed to update order. Please try again.');
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Grid
        container
        spacing={1}
        item
        xs={12}
        sm={12}
        xl={12}
        style={{
          width: '100%',
          marginBottom: '10px',
          border: '2px solid #326C1D',
          borderRadius: '10px',
          marginTop: '10px',
          paddingBottom: '20px',
          marginLeft: '1px',
          padding: '15px',
          backgroundColor: 'white',
          height: 'auto',
          overflow: 'hidden',
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Detail Overview
            </Typography>
            <Grid container spacing={3} style={{ marginTop: 5 }}>
              <Grid item xs={3}>
                <Card sx={{ bgcolor: '#ffffff', height: 'auto', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
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
                <Card sx={{ bgcolor: '#ffffff', height: 'auto', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginTop: 20 }}>
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
              <Grid item xs={9}>
                <Card sx={{ bgcolor: '#ffffff', height: 'auto', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
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
                    {isEditing ? (
                      <Box sx={{ height: 'auto', display: 'flex', flexDirection: 'column' }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="Order Type"
                              name="OrderType"
                              select
                              value={editOrder?.OrderType || 'ordered'}
                              onChange={handleChange}
                              fullWidth
                            >
                              <MenuItem value="refunded">Refunded</MenuItem>
                              <MenuItem value="onhold">Onhold</MenuItem>
                              <MenuItem value="reviewDeleted">ReviewDeleted</MenuItem>

                            </TextField>
                          </Grid>
                        </Grid>
                        <Box sx={{ mt: 2 }}>
                          <Button variant="contained" color="primary" onClick={handleUpdateClick}>
                            Update
                          </Button>
                          <Button variant="outlined" color="secondary" onClick={handleDetailClick} sx={{ ml: 2 }}>
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <Box>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                              Order Number:
                            </Typography>
                            {order?.Ordernumber}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                              Customer Email:
                            </Typography>
                            {order?.Customeremail}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                              AWZ Link:
                            </Typography>
                            {order?.awzlink}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                              Order Type:
                            </Typography>
                            {order?.OrderType}
                          </Grid>
                        </Grid>
                        <Box sx={{ mt: 2 }}>
                          <Button variant="contained" color="primary" onClick={handleEditClick}>
                            Edit
                          </Button>
                        </Box>
                      </Box>
                    )}
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

export default Refundpendingoverview;
