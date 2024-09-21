import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardHeader, Divider } from '@mui/material';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Sample data for charts
const sampleData = {
  labels: ['2024-08-01', '2024-08-02', '2024-08-03', '2024-08-04', '2024-08-05'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 3, 5, 2], // Example data
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
    },
  ],
};

const cartPercentageData = {
  labels: ['Orders', 'Reviewed', 'Cancelled', 'Completed', 'Refunded'],
  datasets: [
    {
      label: 'Category 1',
      data: [20], // Make sure to normalize data
      backgroundColor: ['#3f51b5'], // Blue
      borderColor: '#fff',
      borderWidth: 6,
    },
    {
      label: 'Category 2',
      data: [20], // Make sure to normalize data
      backgroundColor: ['#4caf50'], // Green
      borderColor: '#fff',
      borderWidth: 6,
    },
    {
      label: 'Category 3',
      data: [20], 
      backgroundColor: ['#ff9800'], // Orange
      borderColor: '#fff',
      borderWidth: 6,
    },
    {
      label: 'Category 4',
      data: [20], 
      backgroundColor: ['#ff5722'], // Red
      borderColor: '#fff',
      borderWidth: 6,
    },
    {
      label: 'Category 5',
      data: [20], 
      backgroundColor: ['#9c27b0'], // Purple
      borderColor: '#fff',
      borderWidth: 6,
    },
  ],
};



// Dashboard component
function AdminDashboard() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalcancelled, setTotalcancelled] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalRefunded, setTotalRefunded] = useState(0);
  const [totalReviewed, setTotalReviewed] = useState(0);
  const [totalonhold, setTotalonhold] = useState(0);
  const [totalRefundpending, setTotalRefundPending] = useState(0);
  const [totalReviewDeleted, setTotalReviewDeleted] = useState(0);
  const [totalCommisioned, setTotalCommisioned] = useState(0);

  useEffect(() => {
    const fetchOrderCounts = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        // Fetch total products
        const OrderResponse = await axios.get('http://localhost:3000/categories/count?OrderType=ordered', { headers });
        setTotalOrders(OrderResponse.data.count);

        // Fetch product counts based on type
        const reservationResponse = await axios.get('http://localhost:3000/categories/count?OrderType=cancelled', { headers });
        setTotalcancelled(reservationResponse.data.count);

        const completedResponse = await axios.get('http://localhost:3000/categories/count?OrderType=completed', { headers });
        setTotalCompleted(completedResponse.data.count);

        const refundedResponse = await axios.get('http://localhost:3000/categories/count?OrderType=refunded', { headers });
        setTotalRefunded(refundedResponse.data.count);

        const reviewedResponse = await axios.get('http://localhost:3000/categories/count?OrderType=reviewed', { headers });
        setTotalReviewed(reviewedResponse.data.count);
        const onholdResponce = await axios.get('http://localhost:3000/categories/count?OrderType=onhold', { headers });
        setTotalonhold(onholdResponce.data.count);

        const refundpendingResponse = await axios.get('http://localhost:3000/categories/count?OrderType=refundPending', { headers });
        setTotalRefundPending(refundpendingResponse.data.count);

        const reviewedeletedResponse = await axios.get('http://localhost:3000/categories/count?OrderType=reviewDeleted', { headers });
        setTotalReviewDeleted(reviewedeletedResponse.data.count);

        const commisionedResponse = await axios.get('http://localhost:3000/categories/count?OrderType=commisioned', { headers });
        setTotalCommisioned(commisionedResponse.data.count);
      } catch (err) {
        console.error('Error fetching product counts', err);
      }
    };

    fetchOrderCounts();
  }, []);

  const columns = [
    { field: 'ProductID', headerName: 'Product ID', width: 100 },
    { field: 'seller_id', headerName: 'Seller ID', width: 100 },
    { field: 'Market', headerName: 'Market', width: 100 },
    { field: 'SaleLimit', headerName: 'Sale Limit', width: 100 },
    { field: 'TodayRemaining', headerName: 'Today Remaining', width: 130 },
    { field: 'TotalRemaining', headerName: 'Total Remaining', width: 130 },
    { field: 'ComissionType', headerName: 'Commission Type', width: 130 },
    { field: 'createdBy', headerName: 'Created By', width: 100 },
  ];

  const [rows, setRows] = useState("");

  //const totalOrders = 250;

  return (
    <Container sx={{ minHeight: '100vh', py: 3 }}>
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
          overflow: 'hidden', // Prevent overflow from parent Grid
        }}
      >
        <Grid container justifyContent="center">
          <Box sx={{ padding: 3 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: '#333',
                mb: 3,
                textAlign: 'center',
              }}
            >
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
                      title="Orders"
                      sx={{ bgcolor: '#3f51b5', color: '#fff', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
                    />
                    <CardContent>
                      <Typography variant="h5" sx={{ color: '#333' }}>{totalOrders}</Typography>
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
                      height: '150px', // Reduced card size
                    }}
                  >
                    <CardHeader
                      title="Cancelled"
                      sx={{ bgcolor: '#4caf50', color: '#fff', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
                    />
                    <CardContent>
                      <Typography variant="h5" sx={{ color: '#333' }}>{totalcancelled}</Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Link to="product" style={{ textDecoration: 'none' }}>
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
                      height: '150px', // Reduced card size
                    }}
                  >
                    <CardHeader
                      title="Completed"
                      sx={{ bgcolor: '#ff9800', color: '#fff', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
                    />
                    <CardContent>
                      <Typography variant="h5" sx={{ color: '#333' }}>{totalCompleted}</Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Link to="product" style={{ textDecoration: 'none' }}>
                  <Card
                    sx={{
                      bgcolor: '#ffffff',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      borderRadius: '8px',
                      textAlign: 'center',
                      border: '2px solid #ff5722',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      },
                      height: '150px', // Reduced card size
                    }}
                  >
                    <CardHeader
                      title="Refunded"
                      sx={{ bgcolor: '#ff5722', color: '#fff', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
                    />
                    <CardContent>
                      <Typography variant="h5" sx={{ color: '#333' }}>{totalRefunded}</Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Link to="product" style={{ textDecoration: 'none' }}>
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
                      height: '150px', // Reduced card size
                    }}
                  >
                    <CardHeader
                      title="Reviewed"
                      sx={{ bgcolor: '#3f51b5', color: '#fff', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
                    />
                    <CardContent>
                      <Typography variant="h5" sx={{ color: '#333' }}>{totalReviewed}</Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>

<Grid item xs={12} sm={6} md={4}>
  <Link to="product" style={{ textDecoration: 'none' }}>
    <Card
      sx={{
        bgcolor: '#ffffff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        textAlign: 'center',
        border: '2px solid #9c27b0',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        height: '150px', // Reduced card size
      }}
    >
      <CardHeader
        title="On Hold"
        sx={{ bgcolor: '#9c27b0', color: '#fff', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
      />
      <CardContent>
        <Typography variant="h5" sx={{ color: '#333' }}>{totalonhold}</Typography>
      </CardContent>
    </Card>
  </Link>
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <Link to="product" style={{ textDecoration: 'none' }}>
    <Card
      sx={{
        bgcolor: '#ffffff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        textAlign: 'center',
        border: '2px solid #ff5722',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        height: '150px', // Reduced card size
      }}
    >
      <CardHeader
        title="Refund Pending"
        sx={{ bgcolor: '#ff5722', color: '#fff', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
      />
      <CardContent>
        <Typography variant="h5" sx={{ color: '#333' }}>{totalRefundpending}</Typography>
      </CardContent>
    </Card>
  </Link>
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <Link to="product" style={{ textDecoration: 'none' }}>
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
        height: '150px', // Reduced card size
      }}
    >
      <CardHeader
        title="Review Deleted"
        sx={{ bgcolor: '#ff9800', color: '#fff', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
      />
      <CardContent>
        <Typography variant="h5" sx={{ color: '#333' }}>{totalReviewDeleted}</Typography>
      </CardContent>
    </Card>
  </Link>
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <Link to="product" style={{ textDecoration: 'none' }}>
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
        height: '150px', // Reduced card size
      }}
    >
      <CardHeader
        title="Commissioned"
        sx={{ bgcolor: '#4caf50', color: '#fff', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
      />
      <CardContent>
        <Typography variant="h5" sx={{ color: '#333' }}>{totalCommisioned}</Typography>
      </CardContent>
    </Card>
  </Link>
</Grid>


              {/* Chart section */}
              <Grid container spacing={3} style={{marginTop:5 ,marginLeft:5}}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ bgcolor: '#ffffff', height: '100%', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <CardHeader
                      title="Cart Percentage"
                      sx={{
                        bgcolor: '#fafafa',
                        color: '#333',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Divider />
                    <CardContent>
                      <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Doughnut
                          data={cartPercentageData}
                          options={{
                            responsive: true,
                            plugins: {
                              legend: {
                                position: 'top',
                                labels: {
                                  color: '#666',
                                },
                              },
                              tooltip: {
                                callbacks: {
                                  label: function (context) {
                                    let label = context.label || '';
                                    if (label) {
                                      label += ': ';
                                    }
                                    if (context.parsed >= 0) {
                                      label += `${context.parsed}%`;
                                    }
                                    return label;
                                  },
                                },
                              },
                            },
                          }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ bgcolor: '#ffffff', height: '100%', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <CardHeader
                      title="Sales Data"
                      sx={{
                        bgcolor: '#fafafa',
                        color: '#333',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Divider />
                    <CardContent>
                      <Box sx={{ height: 300 }}>
                        <Bar
                          data={sampleData}
                          options={{
                            responsive: true,
                            plugins: {
                              legend: {
                                position: 'top',
                                labels: {
                                  color: '#666',
                                },
                              },
                              tooltip: {
                                callbacks: {
                                  label: function (context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                      label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                      label += `${context.parsed.y} sales`;
                                    }
                                    return label;
                                  },
                                },
                              },
                            },
                            scales: {
                              x: {
                                title: {
                                  display: true,
                                  text: 'Date',
                                  color: '#666',
                                  font: {
                                    weight: 'normal',
                                  },
                                },
                                grid: {
                                  display: false,
                                },
                              },
                              y: {
                                title: {
                                  display: true,
                                  text: 'Sales',
                                  color: '#666',
                                  font: {
                                    weight: 'normal',
                                  },
                                },
                                grid: {
                                  borderDash: [5, 5],
                                  color: 'rgba(0, 0, 0, 0.1)',
                                },
                                beginAtZero: true,
                              },
                            },
                          }}
                        />
                      </Box>
                    </CardContent>
                   
                  </Card>
                  
                </Grid>
                <Box sx={{ height: 'calc(98vh - 250px)', overflow: 'auto' ,width:'100%' ,marginTop:3,marginLeft:3 }}> {/* Adjust height and overflow */}
                  <DataGrid
                rows={rows}
                columns={columns}
                pageSize={50}
                rowsPerPageOptions={[10, 20, 50]}
                />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminDashboard;
