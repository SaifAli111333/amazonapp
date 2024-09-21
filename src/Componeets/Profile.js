import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { styled } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';


const Profile = () => {
  const [initialValues, setInitialValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    usertype: '',
    phonenumber: '',
    username: '',
    gender: '',
    cnic: '',
    address: '',
    banktitle: '',
    bankname: '',
    banknumber: '',
    paymentmethod: '',
  });
  const {
    register,
    control,
    getValues,
    setValue,
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
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      setInitialValues(response.data.user); 
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, []);
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

  return (
    <Container>
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
          height: '80vh',
          overflow: 'hidden', // Prevent overflow from parent Grid
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} md={12} lg={12}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Grid container columnSpacing={1}>
        <Grid item xs={2}>
                  <Grid container>
                    <Grid item xs={12}>
                      <label htmlFor="icon-button-file">
                        <Input
                          id="icon-button-file"
                          type="file"
                          disabled
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
                  <Grid item xs={6} >
        <Typography >
        First Name
      </Typography> 
          <TextField
            value={initialValues.firstname}
            fullWidth
            disabled
            sx={{ 
                '& .MuiInputBase-input': { height: '10px' } // Adjust height as needed
              }}
          />
        </Grid>
        <Grid item xs={6}>
        <Typography >
        Last Name
      </Typography> 
                <TextField
            value={initialValues.lastname}
            fullWidth
            disabled
            sx={{ 
              '& .MuiInputBase-input': { height: '10px' } // Adjust height as needed
            }}
          />
        </Grid>
        <Grid item xs={12}>
        <Typography >
        Email
      </Typography> 
          <TextField
            value={initialValues.email}
            fullWidth
            disabled
            sx={{ 
              '& .MuiInputBase-input': { height: '10px' } // Adjust height as needed
            }}
          />
        </Grid>
                  </Grid>
                </Grid>
                </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6} >
        <Typography >
        User Type
      </Typography> 
          <TextField
            value={initialValues.usertype}
            fullWidth
            disabled
            sx={{ 
              '& .MuiInputBase-input': { height: '10px' } // Adjust height as needed
            }}
          />
        </Grid>
        <Grid item xs={6} >
        <Typography >
        Phone Number
      </Typography> 
          <TextField
            value={initialValues.phonenumber}
            fullWidth
            disabled
            sx={{ 
              '& .MuiInputBase-input': { height: '10px' } // Adjust height as needed
            }}
          />
        </Grid>

        <Grid item xs={6} style={{marginTop:-15}}>
        <Typography >
        Username
      </Typography> 
                <TextField
            value={initialValues.username}
            fullWidth
            disabled
            sx={{ 
              '& .MuiInputBase-input': { height: '10px' } // Adjust height as needed
            }}
          />
        </Grid>
        <Grid item xs={6} style={{marginTop:-15}} >
        <Typography >
        Gender
      </Typography> 
          <TextField
            value={initialValues.gender}
            fullWidth
            disabled
            sx={{ 
              '& .MuiInputBase-input': { height: '10px' } // Adjust height as needed
            }}
          />
        </Grid>
        <Grid item xs={6} style={{marginTop:-15}}>
        <Typography >
        CNIC
      </Typography> 
          <TextField
            value={initialValues.cnic}
            fullWidth
            disabled
            sx={{ 
              '& .MuiInputBase-input': { height: '10px' } // Adjust height as needed
            }}
          />
        </Grid>
        <Grid item xs={6} style={{marginTop:-15}}>
        <Typography >
        Address
      </Typography> 
          <TextField
            value={initialValues.address}
            fullWidth
            disabled
            sx={{ 
              '& .MuiInputBase-input': { height: '10px' } // Adjust height as needed
            }}
          />
        </Grid>
        <Grid item xs={6} style={{marginTop:-15}}>
        <Typography >
        Bank Title
      </Typography> 
          <TextField
            value={initialValues.banktitle}
            fullWidth
            disabled
            sx={{ 
              '& .MuiInputBase-input': { height: '10px' } // Adjust height as needed
            }}
          />
        </Grid>
        <Grid item xs={6} style={{marginTop:-15}}>
        <Typography >
        Bank Name
      </Typography> 
          <TextField
            value={initialValues.bankname}
            fullWidth
            disabled
            sx={{ 
              '& .MuiInputBase-input': { height: '10px' } // Adjust height as needed
            }}
          />
        </Grid>
        <Grid item xs={6} style={{marginTop:-15}}>
        <Typography >
        Bank Number
      </Typography> 
          <TextField
            value={initialValues.banknumber}
            fullWidth
            disabled
            sx={{ 
              '& .MuiInputBase-input': { height: '10px' } // Adjust height as needed
            }}
          />
        </Grid>
        <Grid item xs={6} style={{marginTop:-15}}>
        <Typography >
        Payment Method
      </Typography> 
          <TextField
            value={initialValues.paymentmethod}
            fullWidth
            disabled
            sx={{ 
              '& .MuiInputBase-input': { height: '10px' } // Adjust height as needed
            }}
          />
        </Grid>
      </Grid>
      </Grid>
      </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
