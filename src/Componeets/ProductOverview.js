import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Box, Typography,Grid, CircularProgress ,Card, CardContent, CardHeader, Divider} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductOverview = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(`http://localhost:3000/Product/${id}`, { headers });
        console.log('API response:', response.data); 

        if (response.data && response.data.product) {
          setProduct(response.data.product); 
        } else if (response.data && response.data.error) {
          setError(response.data.error); 
        } else {
          setError('Product not found.');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product details', err);
        setError('Failed to fetch product details. Please try again.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <CircularProgress />;

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      {/* <Box sx={{ marginTop: '8px', padding: '20px' }}>
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        {product ? (
          <>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Product Overview
            </Typography>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
              Product ID: {product.ProductID}
            </Typography>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
              Market: {product.Market}
            </Typography>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
              Keyword: {product.Keyword}
            </Typography>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
              Brand Name: {product.Brandname}
            </Typography>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
              Sold By: {product.SoldBy}
            </Typography>
          </>
        ) : (
          <Typography variant="body1">No product data available.</Typography>
        )}
      </Box> */}
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
          <Grid item xs={12} md={12} lg={12}>
           
              <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Product Overview
              </Typography>
              <Grid container spacing={3} style={{marginTop:5 }}>

              <Grid item xs={3} >
                <Grid item xs={12}>
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
                  <Box sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {product.ProductID}
                  </Box>
                </CardContent>
              </Card>
              </Grid>
              <Grid item xs={12} style={{marginTop:20}}>
              <Card sx={{ bgcolor: '#ffffff', height: 'auto', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
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
                  <Box sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {product.ProductID}
                  </Box>
                </CardContent>
              </Card>
              </Grid>
            </Grid>
            <Grid item xs={9} >
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
                  <Box sx={{ height: 'auto', display: 'flex',  }}>
                    
                  <Grid item xs={12} >
                  {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        {product ? (
          <>
          <Grid container columnSpacing={1}>
          <Grid item xs={6}>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
              Product ID:
            </Typography>
            {product.ProductID}
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
            Market:
            </Typography>
            {product.Market}
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
            Brand Name:
            </Typography>
            {product.Brandname}
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
            Sold By:
            </Typography>
            {product.SoldBy}
            </Grid>
            {/* <Grid item xs={6}>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
            Brand Name:
            </Typography>
            {product.Brandname}
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
            Sold By:
            </Typography>
            {product.SoldBy}
            </Grid> */}
 <Grid item xs={3}>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
            Instructions :
            </Typography>
            </Grid> 
 <Grid item xs={9}>
            <Typography  sx={{ mt: 0.5 }}>
            Review need to be submitted after 7 days of shipment received 2. Must use keyword for product search. 
            3. Buyer should be honest, scammer buyer is responsibility of agent. 4. Don't search with Brand Name. 
            5. A pm should provide buyer’s verification in case a pmm asks for it in case of expensive products
            </Typography>
            </Grid> 
            <Grid item xs={3}>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
            Refund Condition :
            </Typography>
            </Grid> 
 <Grid item xs={9}>
            <Typography  sx={{ mt: 0.5 }}>
            Refund will be processed on 5 star review live on amazon 2. product cost + pp fee (Refund time could be 96 to 120 hours)
            </Typography>
            </Grid> 
            <Grid item xs={3}>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
            Commission Condition :
            </Typography>
            </Grid> 
 <Grid item xs={9}>
            <Typography  sx={{ mt: 0.5 }}>
            Full Commission will be paid on mature leads 2. Mature lead will be considered those order which are refunded
             against 5 star reviews. 3. Not included deleted and feedback. 4. on deleted commission will be paid as per 
             Adverzpro rule.
            </Typography>
            </Grid> 

            </Grid>
          
          </>
        ) : (
          <Typography variant="body1">No product data available.</Typography>
        )}
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

export default ProductOverview;
