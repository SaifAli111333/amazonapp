import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import {  useForm } from "react-hook-form";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
const defaultTheme = createTheme();

export default function SignUp() {
  // State for form fields
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [retypepassword, setRetypePassword] = React.useState('');
  const [usertype, setUsertype] = React.useState('');
  const [phonenumber, setPhonenumber] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [cnic, setCnic] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [banktitle, setBanktitle] = React.useState('');
  const [bankname, setBankname] = React.useState('');
  const [banknumber, setBanknumber] = React.useState('');
  const [paymentmethod, setPaymentmethod] = React.useState('');

  // State for error tracking
  const [errors, setErrors] = React.useState({});

  const navigate = useNavigate();
  const {
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
  const validateField = (fieldName, value) => {
    let error = '';
    switch (fieldName) {
      case 'firstname':
        if (!value) error = 'First name is required';
        break;
      case 'lastname':
        if (!value) error = 'Last name is required';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        break;
      case 'retypepassword':
        if (value !== password) error = 'Passwords do not match';
        break;
      case 'usertype':
        if (!value) error = 'User type is required';
        break;
      case 'phonenumber':
        if (!value) error = 'Phone number is required';
        break;
      case 'username':
        if (!value) error = 'Username is required';
        break;
      case 'gender':
        if (!value) error = 'Gender is required';
        break;
      case 'cnic':
        if (!value) error = 'CNIC is required';
        break;
      case 'address':
        if (!value) error = 'Address is required';
        break;
      case 'banktitle':
        if (!value) error = 'Bank title is required';
        break;
      case 'bankname':
        if (!value) error = 'Bank name is required';
        break;
      case 'banknumber':
        if (!value) error = 'Bank number is required';
        break;
      case 'paymentmethod':
        if (!value) error = 'Payment method is required';
        break;
      default:
        break;
    }
    return error;
  };

  const handleBlur = (fieldName) => (e) => {
    const value = e.target.value;
    const error = validateField(fieldName, value);
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    for (const field of [
      'firstname',
      'lastname',
      'email',
      'password',
      'retypepassword',
      'usertype',
      'phonenumber',
      'username',
      'gender',
      'cnic',
      'address',
      'banktitle',
      'bankname',
      'banknumber',
      'paymentmethod',
    ]) {
      const value = eval(field);
      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const formdata = new FormData();
    formdata.append('firstname', firstname);
    formdata.append('lastname', lastname);
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('retypepassword', retypepassword);
    formdata.append('usertype', usertype);
    formdata.append('phonenumber', phonenumber);
    formdata.append('username', username);
    formdata.append('gender', gender);
    formdata.append('cnic', cnic);
    formdata.append('address', address);
    formdata.append('banktitle', banktitle);
    formdata.append('bankname', bankname);
    formdata.append('banknumber', banknumber);
    formdata.append('paymentmethod', paymentmethod);

    try {
      const response = await axios.post('http://localhost:3000/user/signup', formdata);
      if (response.status === 200) {
        navigate('/home'); // Navigate to home after successful signup
      }
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
    }
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




  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: 'linear-gradient(135deg, #3f51b5, #03a9f4)', // Gradient background
              width: 80, // Increased size
              height: 80, // Increased size
              border: '4px solid #fff', // White border
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // Shadow for depth
              transition: 'all 0.3s ease', // Smooth transition
              '&:hover': {
                transform: 'scale(1.1)', // Slight zoom effect on hover
              },
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 40, color: '#fff' }} />
          </Avatar>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#3f51b5', // Primary color
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Text shadow for depth
              mb: 2,
            }}
          >
            Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                  <Grid item xs={6} >
                    <Typography>First Name</Typography>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  placeholder='First Name'
                  autoFocus
                  onChange={(e) => setFirstname(e.target.value)}
                  onBlur={handleBlur('firstname')}
                  error={!!errors.firstname}
                  helperText={errors.firstname}
                  sx={{
                    backgroundColor: '#f5f5f5', // Light background
                    borderRadius: '4px', // Rounded corners
                    '& .MuiInputBase-input': {
                      padding: '12px', // Adjust padding for input text
                    },
                    '& .MuiFormLabel-root': {
                      color: '#555', // Label color
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: '#3f51b5', // Focused label color
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ccc', // Border color
                      },
                      '&:hover fieldset': {
                        borderColor: '#3f51b5', // Hover border color
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3f51b5', // Focused border color
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} >
              <Typography>Last Name</Typography>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  name="lastname"
                  placeholder='Last Name'
                  autoComplete="family-name"
                  onChange={(e) => setLastname(e.target.value)}
                  onBlur={handleBlur('lastname')}
                  error={!!errors.lastname}
                  helperText={errors.lastname}
                  sx={{
                    backgroundColor: '#f5f5f5', // Light background
                    borderRadius: '4px', // Rounded corners
                    '& .MuiInputBase-input': {
                      padding: '12px', // Adjust padding for input text
                    },
                    '& .MuiFormLabel-root': {
                      color: '#555', // Label color
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: '#3f51b5', // Focused label color
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ccc', // Border color
                      },
                      '&:hover fieldset': {
                        borderColor: '#3f51b5', // Hover border color
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3f51b5', // Focused border color
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} style={{marginTop:10}}>
              <Typography>User Type</Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="usertype-label"
                    id="usertype"
                    value={usertype}
                    onChange={(e) => setUsertype(e.target.value)}
                    onBlur={handleBlur('usertype')}
                    error={!!errors.usertype}
                    sx={{
                      backgroundColor: '#f5f5f5', // Light background
                      borderRadius: '4px', // Rounded corners
                      '& .MuiInputBase-input': {
                        padding: '12px', // Adjust padding for input text
                      },
                      '& .MuiFormLabel-root': {
                        color: '#555', // Label color
                      },
                      '& .MuiFormLabel-root.Mui-focused': {
                        color: '#3f51b5', // Focused label color
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#ccc', // Border color
                        },
                        '&:hover fieldset': {
                          borderColor: '#3f51b5', // Hover border color
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3f51b5', // Focused border color
                        },
                      },
                    }}
                  >
                    <MenuItem value="admin">admin</MenuItem>
                    <MenuItem value="pmm">pmm</MenuItem>
                    <MenuItem value="pm">pm</MenuItem>

                  </Select>
                </FormControl>
                {errors.usertype && <Typography color="error">{errors.usertype}</Typography>}
              </Grid>
              <Grid item xs={6} style={{marginTop:10}}>
              <Typography>Username</Typography>
                <TextField
                  required
                  fullWidth
                  name="username"
                  id="username"
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={handleBlur('username')}
                  error={!!errors.username}
                  helperText={errors.username}
                  sx={{
                    backgroundColor: '#f5f5f5', // Light background
                    borderRadius: '4px', // Rounded corners
                    '& .MuiInputBase-input': {
                      padding: '12px', // Adjust padding for input text
                    },
                    '& .MuiFormLabel-root': {
                      color: '#555', // Label color
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: '#3f51b5', // Focused label color
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ccc', // Border color
                      },
                      '&:hover fieldset': {
                        borderColor: '#3f51b5', // Hover border color
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3f51b5', // Focused border color
                      },
                    },
                  }}
                />
              </Grid>
                  </Grid>
                </Grid>
                </Grid>
            <Grid container spacing={2} >
              
              <Grid item xs={4}>
              <Typography>Email Address</Typography>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleBlur('email')}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{
                    backgroundColor: '#f5f5f5', // Light background
                    borderRadius: '4px', // Rounded corners
                    '& .MuiInputBase-input': {
                      padding: '12px', // Adjust padding for input text
                    },
                    '& .MuiFormLabel-root': {
                      color: '#555', // Label color
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: '#3f51b5', // Focused label color
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ccc', // Border color
                      },
                      '&:hover fieldset': {
                        borderColor: '#3f51b5', // Hover border color
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3f51b5', // Focused border color
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={4} >
              <Typography>Password</Typography>
                <TextField
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handleBlur('password')}
                  error={!!errors.password}
                  helperText={errors.password}
                  sx={{
                    backgroundColor: '#f5f5f5', // Light background
                    borderRadius: '4px', // Rounded corners
                    '& .MuiInputBase-input': {
                      padding: '12px', // Adjust padding for input text
                    },
                    '& .MuiFormLabel-root': {
                      color: '#555', // Label color
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: '#3f51b5', // Focused label color
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ccc', // Border color
                      },
                      '&:hover fieldset': {
                        borderColor: '#3f51b5', // Hover border color
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3f51b5', // Focused border color
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={4}>
              <Typography>Retype Password</Typography>
                <TextField
                  required
                  fullWidth
                  name="retypepassword"
                  type="password"
                  id="retypepassword"
                  autoComplete="new-password"
                  onChange={(e) => setRetypePassword(e.target.value)}
                  onBlur={handleBlur('retypepassword')}
                  error={!!errors.retypepassword}
                  helperText={errors.retypepassword}
                  sx={{
                    backgroundColor: '#f5f5f5', // Light background
                    borderRadius: '4px', // Rounded corners
                    '& .MuiInputBase-input': {
                      padding: '12px', // Adjust padding for input text
                    },
                    '& .MuiFormLabel-root': {
                      color: '#555', // Label color
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: '#3f51b5', // Focused label color
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ccc', // Border color
                      },
                      '&:hover fieldset': {
                        borderColor: '#3f51b5', // Hover border color
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3f51b5', // Focused border color
                      },
                    },
                  }}
                />
              </Grid>             
              <Grid item xs={4}>
              <Typography>Phone Number</Typography>
                <TextField
                  required
                  fullWidth
                  name="phonenumber"
                  id="phonenumber"
                  autoComplete="tel"
                  onChange={(e) => setPhonenumber(e.target.value)}
                  onBlur={handleBlur('phonenumber')}
                  error={!!errors.phonenumber}
                  helperText={errors.phonenumber}
                  sx={{
                    backgroundColor: '#f5f5f5', // Light background
                    borderRadius: '4px', // Rounded corners
                    '& .MuiInputBase-input': {
                      padding: '12px', // Adjust padding for input text
                    },
                    '& .MuiFormLabel-root': {
                      color: '#555', // Label color
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: '#3f51b5', // Focused label color
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ccc', // Border color
                      },
                      '&:hover fieldset': {
                        borderColor: '#3f51b5', // Hover border color
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3f51b5', // Focused border color
                      },
                    },
                  }}
                />
              </Grid>             
              <Grid item xs={4}>
              <Typography>Gender</Typography>
                <TextField
                  required
                  fullWidth
                  name="gender"
                  id="gender"
                  autoComplete="gender"
                  onChange={(e) => setGender(e.target.value)}
                  onBlur={handleBlur('gender')}
                  error={!!errors.gender}
                  helperText={errors.gender}
                  sx={{
                    backgroundColor: '#f5f5f5', // Light background
                    borderRadius: '4px', // Rounded corners
                    '& .MuiInputBase-input': {
                      padding: '12px', // Adjust padding for input text
                    },
                    '& .MuiFormLabel-root': {
                      color: '#555', // Label color
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: '#3f51b5', // Focused label color
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ccc', // Border color
                      },
                      '&:hover fieldset': {
                        borderColor: '#3f51b5', // Hover border color
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3f51b5', // Focused border color
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={4}>
              <Typography>CNIC</Typography>
                <TextField
                  required
                  fullWidth
                  name="cnic"
                  id="cnic"
                  autoComplete="cnic"
                  onChange={(e) => setCnic(e.target.value)}
                  onBlur={handleBlur('cnic')}
                  error={!!errors.cnic}
                  helperText={errors.cnic}
                  sx={{
                    backgroundColor: '#f5f5f5', // Light background
                    borderRadius: '4px', // Rounded corners
                    '& .MuiInputBase-input': {
                      padding: '12px', // Adjust padding for input text
                    },
                    '& .MuiFormLabel-root': {
                      color: '#555', // Label color
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: '#3f51b5', // Focused label color
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ccc', // Border color
                      },
                      '&:hover fieldset': {
                        borderColor: '#3f51b5', // Hover border color
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3f51b5', // Focused border color
                      },
                    },
                  }}
                />
              </Grid> 
              <Grid item xs={4}>
              <Typography>Address</Typography>
                <TextField
                  required
                  fullWidth
                  name="address"
                  id="address"
                  autoComplete="address"
                  onChange={(e) => setAddress(e.target.value)}
                  onBlur={handleBlur('address')}
                  error={!!errors.address}
                  helperText={errors.address}
                  sx={{
                    backgroundColor: '#f5f5f5', // Light background
                    borderRadius: '4px', // Rounded corners
                    '& .MuiInputBase-input': {
                      padding: '12px', // Adjust padding for input text
                    },
                    '& .MuiFormLabel-root': {
                      color: '#555', // Label color
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: '#3f51b5', // Focused label color
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ccc', // Border color
                      },
                      '&:hover fieldset': {
                        borderColor: '#3f51b5', // Hover border color
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3f51b5', // Focused border color
                      },
                    },
                  }}
                />
              </Grid>             
              <Grid item xs={4}>
              <Typography>Bank Title</Typography>
                <TextField
                  required
                  fullWidth
                  name="banktitle"
                  id="banktitle"
                  autoComplete="banktitle"
                  onChange={(e) => setBanktitle(e.target.value)}
                  onBlur={handleBlur('banktitle')}
                  error={!!errors.banktitle}
                  helperText={errors.banktitle}
                  sx={{
                    backgroundColor: '#f5f5f5', // Light background
                    borderRadius: '4px', // Rounded corners
                    '& .MuiInputBase-input': {
                      padding: '12px', // Adjust padding for input text
                    },
                    '& .MuiFormLabel-root': {
                      color: '#555', // Label color
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: '#3f51b5', // Focused label color
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ccc', // Border color
                      },
                      '&:hover fieldset': {
                        borderColor: '#3f51b5', // Hover border color
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3f51b5', // Focused border color
                      },
                    },
                  }}
                />
              </Grid>            
              <Grid item xs={4}>
              <Typography>Bank Name</Typography>
                <TextField
                  required
                  fullWidth
                  name="bankname"
                  id="bankname"
                  autoComplete="bankname"
                  onChange={(e) => setBankname(e.target.value)}
                  onBlur={handleBlur('bankname')}
                  error={!!errors.bankname}
                  helperText={errors.bankname}
                  sx={{
                    backgroundColor: '#f5f5f5', // Light background
                    borderRadius: '4px', // Rounded corners
                    '& .MuiInputBase-input': {
                      padding: '12px', // Adjust padding for input text
                    },
                    '& .MuiFormLabel-root': {
                      color: '#555', // Label color
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: '#3f51b5', // Focused label color
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ccc', // Border color
                      },
                      '&:hover fieldset': {
                        borderColor: '#3f51b5', // Hover border color
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3f51b5', // Focused border color
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={4}>
              <Typography>Bank Number</Typography>
                <TextField
                  required
                  fullWidth
                  name="banknumber"
                  id="banknumber"
                  autoComplete="banknumber"
                  onChange={(e) => setBanknumber(e.target.value)}
                  onBlur={handleBlur('banknumber')}
                  error={!!errors.banknumber}
                  helperText={errors.banknumber}
                  sx={{
                    backgroundColor: '#f5f5f5', // Light background
                    borderRadius: '4px', // Rounded corners
                    '& .MuiInputBase-input': {
                      padding: '12px', // Adjust padding for input text
                    },
                    '& .MuiFormLabel-root': {
                      color: '#555', // Label color
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: '#3f51b5', // Focused label color
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ccc', // Border color
                      },
                      '&:hover fieldset': {
                        borderColor: '#3f51b5', // Hover border color
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3f51b5', // Focused border color
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={4}>
              <Typography>Payment Method</Typography>
                <TextField
                  required
                  fullWidth
                  name="paymentmethod"
                  id="paymentmethod"
                  autoComplete="paymentmethod"
                  onChange={(e) => setPaymentmethod(e.target.value)}
                  onBlur={handleBlur('paymentmethod')}
                  error={!!errors.paymentmethod}
                  helperText={errors.paymentmethod}
                  sx={{
                    backgroundColor: '#f5f5f5', // Light background
                    borderRadius: '4px', // Rounded corners
                    '& .MuiInputBase-input': {
                      padding: '12px', // Adjust padding for input text
                    },
                    '& .MuiFormLabel-root': {
                      color: '#555', // Label color
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: '#3f51b5', // Focused label color
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ccc', // Border color
                      },
                      '&:hover fieldset': {
                        borderColor: '#3f51b5', // Hover border color
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3f51b5', // Focused border color
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#3f51b5', // Primary color
                '&:hover': {
                  backgroundColor: '#303f9f', // Darker shade on hover
                },
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
