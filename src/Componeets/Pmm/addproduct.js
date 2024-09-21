import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, CssBaseline, Select, MenuItem, FormControl, Grid,InputLabel, ListItem, ListItemText, ListItemIcon, InputAdornment } from '@mui/material';
import axios from 'axios';
import Flag from 'react-world-flags';
import SaveIcon from "@mui/icons-material/Save";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Avatar from "@mui/material/Avatar";
import { Controller, useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";

// List of countries with currency symbols
const countries = [
  { code: 'US', name: 'United States', currencySymbol: '$' },
  { code: 'GB', name: 'United Kingdom', currencySymbol: '£' },
  { code: 'FR', name: 'France', currencySymbol: '€' },
  { code: 'DE', name: 'Germany', currencySymbol: '€' },
  { code: 'JP', name: 'Japan', currencySymbol: '¥' },
  { code: 'CN', name: 'China', currencySymbol: '¥' },
  // Add more countries and their currency symbols as needed
];

const AddProduct = () => {
  const [product, setProduct] = useState({
    Market: '',
    seller_id: '',
    SaleLimit: '',
    TodayRemaining: '',
    TotalRemaining: '',
    Keyword: '',
    ASIN: '',
    SoldBy: '',
    Brandname: '',
    ProductPrice: '',
    ComissionType: '',
    TextReview: '',
    PictureReview: '',
    VedioReview: '',
    TextTopReview: '',
    PictureTopReview: '',
    VedioTopReview: '',
    Rating: '',
    NoReview: '',
    Feedback: '',
    Giveaway: '',
    ProductType:'',
    photoUrl:''
  });
  const {
    register,
    control,
    getValues,
    setValue,
    formState: { errors }
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined,
  });
  const [error, setError] = useState('');

  // Extract the current currency symbol based on the selected market
  const currentCurrencySymbol = countries.find(country => country.code === product.Market)?.currencySymbol || '';

  // Handle input change
  const handleChange = (e) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      [e.target.name]: e.target.value
    }));
  };

  // Handle CommissionType change
  const handleComissionTypeChange = (e) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      ComissionType: e.target.value
    }));
  };

  // Handle Market selection
  const handleMarketChange = (e) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      Market: e.target.value
    }));
  };
  const [images, setImages] = React.useState(null);
  ///Delete Image
  const deleteimg = () => {
    setImages(null);
    setValue("photoUrl", "");
  };
  const onImageChange = e => {
    setImages(URL.createObjectURL(e.target.files[0]));
    const file = e.target.files[0];
    convertBase64(file);
    // console.log("64 image",base64)
    console.log(
      "Kdr Sy aya ha Console",
      URL.createObjectURL(e.target.files[0])
    );
  };
  const Input = styled("input")({
    display: "none"
  });
  const convertBase64 = file => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = error => {
        reject(error);
      };
    }).then(users => {
      setValue("base64", users);
    });
  };



  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Retrieve the token from localStorage (or sessionStorage)
    const token = localStorage.getItem('token');

    axios.post('http://localhost:3000/Product', product, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Product added:', response.data);
      // Clear the form or redirect user
      setProduct({
        Market: '',
        seller_id: '',
        SaleLimit: '',
        TodayRemaining: '',
        TotalRemaining: '',
        Keyword: '',
        ASIN: '',
        SoldBy: '',
        Brandname: '',
        ProductPrice: '',
        ComissionType: '',
        TextReview: '',
        PictureReview: '',
        VedioReview: '',
        TextTopReview: '',
        PictureTopReview: '',
        VedioTopReview: '',
        Rating: '',
        NoReview: '',
        Feedback: '',
        Giveaway: '',
        Description:''
      });
      setError('');
    })
    .catch(error => {
      console.error('Error adding product:', error);
      setError('There was an error adding the product. Please try again.');
    });
  };

  return (
    <Container sx={{ backgroundColor: 'white', minHeight: '100vh', py: 3 }}>

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
      borderRadius: '5px',
      marginTop: '10px',
      paddingBottom: '20px',
      marginLeft: '1px',
      padding: '15px',
      // paddingLeft: '15px',
      backgroundColor: 'white',
      height: '120vh',
      overflowY: 'auto', 
        }}
  >
<Grid container justifyContent="center">
      <Grid item xs={12} md={12} lg={12}>
      <Box sx={{ height: 400, width: '100%' }}>

        <Typography style={{fontSize:30}}>
          Add New Product
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container columnSpacing={1}>
        <Grid item xs={2}>
                  <Grid container>
                    <Grid item xs={12}>
                      <label htmlFor="icon-button-file">
                        <Input
                          id="icon-button-file"
                          type="file"
                          onChange={onImageChange}
                        />
                        <Avatar
                          sx={{ bgcolor: "#FCBE13" }}
                          src={images}
                          style={{
                            height: 150,
                            width: 150,
                            borderRadius: "100px"
                          }}
                        >
                          <AddAPhotoIcon
                            fontSize="large"
                            style={{ color: "black", marginBottom: "5px" }}
                          />
                        </Avatar>
                      </label>
                    </Grid>
                    {images && images.length > 0
                      ? <Button
                          onClick={deleteimg}
                          variant="gradient"
                          // disabled={submitting}
                          style={{
                            marginLeft: "20px",
                            height: "35px",
                            width: "70px",
                            color: "black",
                            fontSize: "14px"
                          }}
                          // startIcon={<img src={CancelIcon} style={{marginTop:'-3px',marginRight:'-6px',}}/>}
                        >
                          <DeleteOutlinedIcon
                            fontSize="medium"
                            style={{ color: "red", marginBottom: "5px" }}
                          />
                          Remove
                        </Button>
                      : null}
                  </Grid>
                </Grid>
                <Grid item xs={10}>
                  <Grid container columnSpacing={1}>
        
<Grid item xs={12}>
  <Typography style={{marginBottom:-10}}>Country</Typography>
  <FormControl fullWidth margin="normal" required>
    <Select
      labelId="Market-label"
      id="Market"
      name="Market"
      value={product.Market}
      onChange={handleMarketChange}
      label="Market"
      sx={{
        height: '40px', // Adjust the height value as needed
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {countries.map((country) => (
        <MenuItem key={country.code} value={country.code}>
          <ListItemIcon>
            <Flag code={country.code} style={{ width: 24, height: 16 }} />
          </ListItemIcon>
          <ListItemText primary={country.name} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>

<Grid item  xs={6} >
          <Typography style={{marginBottom:-10}}>Today Remaining</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="TodayRemaining"
            name="TodayRemaining"
            autoComplete="TodayRemaining"
            type="number"
            value={product.TodayRemaining}
            onChange={handleChange}
            InputProps={{
              sx: { height: '40px' }, // Adjust the height value as needed
            }}
          />
          </Grid>
          <Grid item  xs={6} >
          <Typography style={{marginBottom:-10}}>Total Remaining</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="TotalRemaining"
            name="TotalRemaining"
            autoComplete="TotalRemaining"
            type="number"
            value={product.TotalRemaining}
            onChange={handleChange}
            InputProps={{
              sx: { height: '40px' }, // Adjust the height value as needed
            }}
          />
          </Grid>
                  </Grid>
                </Grid>
                </Grid>
        <Grid container spacing={2}>
          <Grid item  xs={6} >
          <Typography style={{marginBottom:-10}}>Sale Limit</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="SaleLimit"
            name="SaleLimit"
            autoComplete="SaleLimit"
            type="number"
            value={product.SaleLimit}
            onChange={handleChange}
            InputProps={{
              sx: { height: '40px' }, // Adjust the height value as needed
            }}
            sx={{ marginBottom: '-10px' }}

          />
          </Grid>
        
         
             <Grid item  xs={6} >
             <Typography style={{marginBottom:-10}}>Keyword</Typography>
          <TextField
            margin="normal"
            fullWidth
            id="Keyword"
            name="Keyword"
            autoComplete="Keyword"
            value={product.Keyword}
            onChange={handleChange}
            InputProps={{
              sx: { height: '40px' }, // Adjust the height value as needed
            }}
            sx={{ marginBottom: '-10px' }}
          />
          </Grid>
          <Grid item  xs={6} >
          <Typography style={{marginBottom:-10}}>ASIN</Typography>
          <TextField
            margin="normal"
            fullWidth
            id="ASIN"
            name="ASIN"
            autoComplete="ASIN"
            value={product.ASIN}
            onChange={handleChange}
            InputProps={{
              sx: { height: '40px' }, // Adjust the height value as needed
            }}
            sx={{ marginBottom: '-10px' }}
          />
          </Grid>
          <Grid item  xs={6} >
          <Typography style={{marginBottom:-10}}>Sold By</Typography>
          <TextField
            margin="normal"
            fullWidth
            id="SoldBy"
            name="SoldBy"
            autoComplete="SoldBy"
            value={product.SoldBy}
            onChange={handleChange}
            InputProps={{
              sx: { height: '40px' }, // Adjust the height value as needed
            }}
            sx={{ marginBottom: '-10px' }}
          />
          </Grid>
          <Grid item  xs={6} >
          <Typography style={{marginBottom:-10}}>Brand Name</Typography>
          <TextField
            margin="normal"
            fullWidth
            id="Brandname"
            name="Brandname"
            autoComplete="Brandname"
            value={product.Brandname}
            onChange={handleChange}
            InputProps={{
              sx: { height: '40px' }, // Adjust the height value as needed
            }}
            sx={{ marginBottom: '-10px' }}
          />
          </Grid>
          <Grid item  xs={6} >
          <Typography style={{marginBottom:-10}}>Product Price</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="ProductPrice"
            name="ProductPrice"
            autoComplete="ProductPrice"
            type="number"
            value={product.ProductPrice}
            onChange={handleChange}
            
            InputProps={{
              sx: { height: '40px' },
              startAdornment: (
                <InputAdornment position="start">
                  {currentCurrencySymbol}
                </InputAdornment>
              ),
            }}
            sx={{ marginBottom: '-10px' }}
          />
          </Grid>
       
          <Grid item  xs={12} >
          <Typography style={{marginBottom:-10}}>Product Type</Typography>
          <FormControl fullWidth margin="normal" required>
            <Select
              labelId="ProductType-label"
              id="ProductType"
              name="ProductType"
              value={product.ProductType}
              onChange={handleChange}
              sx={{
                height: '40px', // Adjust the height value as needed
                display: 'flex',
                alignItems: 'center',
                marginBottom:-2
              }}
            >
          <MenuItem value="Mobile">Mobile</MenuItem>
          <MenuItem value="Electronic">Electronic</MenuItem>
          <MenuItem value="Health&Beauty">Health & Beauty</MenuItem>
          <MenuItem value="BabyProduct">Baby Product</MenuItem>
          <MenuItem value="Fashion">Fashion</MenuItem>
          <MenuItem value="Home&Kitchen">Home & Kitchen</MenuItem>
          <MenuItem value="Sports&Outdoors">Sports & Outdoors</MenuItem>
          <MenuItem value="Automotive">Automotive</MenuItem>
          <MenuItem value="Books">Books</MenuItem>
          <MenuItem value="Toys&Games">Toys & Games</MenuItem>
          <MenuItem value="Groceries">Groceries</MenuItem>
          <MenuItem value="Furniture">Furniture</MenuItem>
            </Select>
          </FormControl>
</Grid>
          <Grid item  xs={12} >
          <Typography style={{marginBottom:-10}}>Commission Type</Typography>
          <FormControl fullWidth margin="normal" required>
            <Select
              labelId="ComissionType-label"
              id="ComissionType"
              name="ComissionType"
              value={product.ComissionType}
              onChange={handleComissionTypeChange}
              sx={{
                height: '40px', // Adjust the height value as needed
                display: 'flex',
                alignItems: 'center',
                marginBottom:-2
              }}
            >
              <MenuItem value="Review">Review</MenuItem>
              <MenuItem value="TopReview">TopReview</MenuItem>
              <MenuItem value="Rating">Rating</MenuItem>
              <MenuItem value="NoReview">NoReview</MenuItem>
              <MenuItem value="Feedback">Feedback</MenuItem>
              <MenuItem value="Giveaway">Giveaway</MenuItem>
            </Select>
          </FormControl>
</Grid>
          {/* Conditionally render fields based on ComissionType */}
          {product.ComissionType === 'Review' && (
            <>
          <Grid item  xs={4} >
          <Typography style={{marginBottom:-10}}>Text Review</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="TextReview"
                name="TextReview"
                autoComplete="TextReview"
                type="number"
                value={product.TextReview}
                onChange={handleChange}
                InputProps={{
                  sx: { height: '40px' }, // Adjust the height value as needed
                }}
                sx={{ marginBottom: '-10px' }}

              />
              </Grid>
              <Grid item  xs={4} >
          <Typography style={{marginBottom:-10}}>Picture Review</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="PictureReview"
                name="PictureReview"
                autoComplete="PictureReview"
                type="number"
                value={product.PictureReview}
                onChange={handleChange}
                InputProps={{
                  sx: { height: '40px' }, // Adjust the height value as needed
                }}
                sx={{ marginBottom: '-10px' }}
              />
              </Grid>
              <Grid item  xs={4} >
          <Typography style={{marginBottom:-10}}>Video Review</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="VedioReview"
                name="VedioReview"
                autoComplete="VedioReview"
                type="number"
                value={product.VedioReview}
                onChange={handleChange}
                InputProps={{
                  sx: { height: '40px' }, // Adjust the height value as needed
                }}
                sx={{ marginBottom: '-10px' }}
              />
              </Grid>
            </>
          )}

          {product.ComissionType === 'TopReview' && (
            <>
            <Grid item  xs={4} >
            <Typography style={{marginBottom:-10}}>Text Top Review</Typography>
              <TextField
                margin="normal"
                fullWidth
                id="TextTopReview"
                name="TextTopReview"
                autoComplete="TextTopReview"
                type="number"
                value={product.TextTopReview}
                onChange={handleChange}
                InputProps={{
                  sx: { height: '40px' }, // Adjust the height value as needed
                }}
                sx={{ marginBottom: '-10px' }}
              />
              </Grid>
              <Grid item  xs={4} >
          <Typography style={{marginBottom:-10}}>Picture Top Review</Typography>
              <TextField
                margin="normal"
                fullWidth
                id="PictureTopReview"
                name="PictureTopReview"
                autoComplete="PictureTopReview"
                type="number"
                value={product.PictureTopReview}
                onChange={handleChange}
                InputProps={{
                  sx: { height: '40px' }, // Adjust the height value as needed
                }}
                sx={{ marginBottom: '-10px' }}
              />
              </Grid>
              <Grid item  xs={4} >
          <Typography style={{marginBottom:-10}}>Video Top Review</Typography>
              <TextField
                margin="normal"
                fullWidth
                id="VedioTopReview"
                name="VedioTopReview"
                autoComplete="VedioTopReview"
                type="number"
                value={product.VedioTopReview}
                onChange={handleChange}
                InputProps={{
                  sx: { height: '40px' }, // Adjust the height value as needed
                }}
                sx={{ marginBottom: '-10px' }}
              />
              </Grid>
            </>
          )}

          {product.ComissionType === 'Rating' && (
             <Grid item  xs={12} >
          <Typography style={{marginBottom:-10}}>Rating</Typography>
            <TextField
              margin="normal"
              fullWidth
              id="Rating"
              name="Rating"
              autoComplete="Rating"
              type="number"
              value={product.Rating}
              onChange={handleChange}
              InputProps={{
                sx: { height: '40px' }, // Adjust the height value as needed
              }}
              sx={{ marginBottom: '-10px' }}
            />
            </Grid>
          )}

          {product.ComissionType === 'NoReview' && (
             <Grid item  xs={12} >
          <Typography style={{marginBottom:-10}}>No Review</Typography>
            <TextField
              margin="normal"
              fullWidth
              id="NoReview"
              name="NoReview"
              autoComplete="NoReview"
              type="number"
              value={product.NoReview}
              onChange={handleChange}
              InputProps={{
                sx: { height: '40px' }, // Adjust the height value as needed
              }}
              sx={{ marginBottom: '-10px' }}
            />
            </Grid>
          )}

          {product.ComissionType === 'Feedback' && (
             <Grid item  xs={12} >
          <Typography style={{marginBottom:-10}}>Feedback</Typography>
            <TextField
              margin="normal"
              fullWidth
              id="Feedback"
              name="Feedback"
              autoComplete="Feedback"
              type="number"
              value={product.Feedback}
              onChange={handleChange}
              InputProps={{
                sx: { height: '40px' }, // Adjust the height value as needed
              }}
              sx={{ marginBottom: '-10px' }}
            />
            </Grid>
          )}

          {product.ComissionType === 'Giveaway' && (
             <Grid item  xs={12} >
          <Typography style={{marginBottom:-10}}>Giveaway</Typography>
            <TextField
              margin="normal"
              fullWidth
              id="Giveaway"
              name="Giveaway"
              autoComplete="Giveaway"
              type="number"
              value={product.Giveaway}
              onChange={handleChange}
              InputProps={{
                sx: { height: '40px' }, // Adjust the height value as needed
              }}
              sx={{ marginBottom: '-10px' }}
            />
            </Grid>
          )}
 <Grid item xs={12}>
  <Typography style={{ marginBottom: 10 }}>Description</Typography>
  <TextField
    margin="normal"
    required
    fullWidth
    id="Description"
    name="Description"
    autoComplete="Description"
    value={product.Description}
    onChange={handleChange}
    multiline // Ensure multiline is enabled
    rows={4}  // Adjust the number of rows to control initial height
    InputProps={{
      sx: { height: 'auto' }, // Set height to auto for better text wrapping
    }}
  />
</Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2,ml:130 }}
            startIcon={<SaveIcon />}

          >
            Save
          </Button>
          
        </Grid>
        </Box>
      </Box>
    </Grid>
    </Grid>
    </Grid>
    </Container>
  );
};

export default AddProduct;
