import React, { useState, useEffect, useMemo } from 'react';
import { Container, CssBaseline, Box, Grid, TextField, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  marginTop: '8px',
};

const glassStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(12px)',
  borderRadius: '20px',
  padding: '20px',
  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
};

const textFieldStyle = {
  marginBottom: '16px',
};

const DataGridStyle = {
  borderRadius: '20px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  overflow: 'auto', // Handle overflow inside DataGrid
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useState({
    market: '',
    sellerId: '',
    productID: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get('http://localhost:3000/Product', { headers });
        setProducts(response.data.products);
      } catch (err) {
        console.error('Error fetching products', err);
        setError('Failed to fetch products. Please try again.');
      }
    };

    fetchProducts();
  }, []);
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const idMatch = searchParams.market === '' || (product.Market && product.Market.toString().includes(searchParams.market));
      const sellerIdMatch = searchParams.sellerId === '' || (product.seller_id && product.seller_id.toString().includes(searchParams.sellerId));
      const productNoMatch = searchParams.productID === '' || (product.ProductID && product.ProductID.toString().includes(searchParams.productID));

      return idMatch && sellerIdMatch && productNoMatch;
    });
  }, [products, searchParams]); 
  const columns = [
    { field: 'ProductID', headerName: 'Product ID', width: 100 },
    { field: 'seller_id', headerName: 'Seller ID', width: 100 },
    { field: 'Market', headerName: 'Market', width: 100 },
    { field: 'SaleLimit', headerName: 'Sale Limit', width: 100 },
    { field: 'TodayRemaining', headerName: 'Today Remaining', width: 130 },
    { field: 'TotalRemaining', headerName: 'Total Remaining', width: 130 },
    { field: 'ComissionType', headerName: 'Commission Type', width: 130 },
    { field: 'createdBy', headerName: 'Created By', width: 100 },
    {
      field: 'view',
      headerName: 'View',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/product-overview/${params.row.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  // const rows = useMemo(() => filteredProducts.map((product) => ({
  //   id: product._id,
  //   ProductID: product.ProductID,
  //   seller_id: product.seller_id,
  //   Market: product.Market,
  //   SaleLimit: product.SaleLimit,
  //   TodayRemaining: product.TodayRemaining,
  //   TotalRemaining: product.TotalRemaining,
  //   ComissionType: product.ComissionType,
  //   createdBy: product.createdBy,
  //   reserved: product.reserved || false,
  // })), [filteredProducts]);
  const rows = useMemo(() => filteredProducts.map((product) => ({
    id: product._id,
    ProductID: product.ProductID, // Ensure this field exists and is correct
    seller_id: product.seller_id,
    Market: product.Market,
    SaleLimit: product.SaleLimit,
    TodayRemaining: product.TodayRemaining,
    TotalRemaining: product.TotalRemaining,
    ComissionType: product.ComissionType,
    createdBy: product.createdBy,
    reserved: product.reserved || false,
  })), [filteredProducts]);


  
  return (
    <Container maxWidth="lg" sx={{ padding: 0, margin: 0 }}>
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
          height: '100vh',
          overflow: 'hidden', // Prevent overflow from parent Grid
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} md={12} lg={12}>
           
              <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                All Products
              </Typography>
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
          height: 'auto'
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} md={12} lg={12}>
              <Grid container spacing={2}>

              <Grid item xs={4}>
                <Typography>Market ID</Typography>
  <TextField
    variant="outlined"
    fullWidth
    name="market"
    value={searchParams.market}
    onChange={handleSearchChange}
    InputProps={{
      sx: { height: '40px' }, // Adjust the height value as needed
    }}
    sx={textFieldStyle}
  />
</Grid>

              <Grid item xs={4}>
              <Typography>Seller ID</Typography>
              <TextField
                variant="outlined"
                fullWidth
                name="sellerId"
                value={searchParams.sellerId}
                onChange={handleSearchChange}
                InputProps={{
                  sx: { height: '40px' }, // Adjust the height value as needed
                }}
                sx={textFieldStyle}
              />
              </Grid>
              <Grid item xs={4}>
              <Typography>Product No</Typography>
              <TextField
                variant="outlined"
                fullWidth
                name="productID"
                value={searchParams.productID}
                onChange={handleSearchChange}
                InputProps={{
                  sx: { height: '40px' }, // Adjust the height value as needed
                }}
                sx={textFieldStyle}
              />
              </Grid>
              </Grid>
              
              <Grid container item xs={12} justifyContent="flex-end" spacing={2}>
    <Grid item>
      <Button variant="contained" color="primary" >
        Search
      </Button>
    </Grid>
    <Grid item>
      <Button variant="outlined" color="secondary" >
        Clear
      </Button>
    </Grid>

</Grid>


              </Grid>
              </Grid>
              </Grid>
              <Box sx={{ height: 'calc(98vh - 250px)', overflow: 'auto' }}> {/* Adjust height and overflow */}
              <DataGrid
            rows={rows}
            columns={columns}
            pageSize={50}
            rowsPerPageOptions={[10, 20, 50]}
            />
              </Box>
          
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminProducts;

