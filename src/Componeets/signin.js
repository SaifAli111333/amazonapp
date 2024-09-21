import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import siginimg from '../signimg.jpg';  // Adjust the path as needed

const defaultTheme = createTheme();

const Signin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append('email', email);
    formdata.append('password', password);

  
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post('http://localhost:3000/user/signin', formdata, {
          headers: {
              'Authorization': `Bearer ${token}` 
          }
      });

      if (response.status === 200) {
          const { email, usertype, token,name,user_id } = response.data;

          if (!email || !usertype || !token) {
              throw new Error('Invalid response format');
          }

          localStorage.setItem('user', JSON.stringify({ email, usertype,name,user_id }));
          localStorage.setItem('token', token);

          if (usertype === 'pmm') {
              navigate('/Pmmhome');
          } else if (usertype === 'admin'){
              navigate('/Adminhome');
          } else {
            navigate('/home');
        }
      } else {
          throw new Error('Login failed');
      }
  } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      alert('Login failed: ' + (err.response?.data?.message || err.message));
  }
};
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          backgroundImage: `url(${siginimg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
  sx={{
    position: 'absolute',
    right: '15%', // Adjust this value as needed
    top: '50%',
    transform: 'translateY(-50%)',
    width: '30%',
    minWidth: '300px',
    // backgroundColor: 'rgba(255, 255, 255, 0.9)',
    // borderRadius: '12px',
    padding: '40px',
    // boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}
>
            <Avatar
              sx={{
                m: 1,
                bgcolor: 'linear-gradient(135deg, #3f51b5, #03a9f4)',
                width: 80,
                height: 80,
                border: '4px solid #fff',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
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
                color: '#333',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                mb: 2,
              }}
            >
              Sign In
            </Typography>
           
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Typography style={{fontWeight:'bold'}}>Email Address</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder='Enter Email'
                autoComplete="email"
                autoFocus
                sx={{
                  marginTop:-0.1,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '4px',
                  '& .MuiInputBase-input': {
                    padding: '12px',
                  },
                  '& .MuiFormLabel-root': {
                    color: '#555',
                  },
                  '& .MuiFormLabel-root.Mui-focused': {
                    color: '#3f51b5',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#ccc',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3f51b5',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3f51b5',
                    },
                  },
                }}
              />
              </Grid>
              <Grid item xs={12}>
              <Typography style={{fontWeight:'bold'}}>Password</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{
                  marginTop:-0.1,

                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '4px',
                  '& .MuiInputBase-input': {
                    padding: '12px',
                  },
                  '& .MuiFormLabel-root': {
                    color: '#555',
                  },
                  '& .MuiFormLabel-root.Mui-focused': {
                    color: '#3f51b5',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#ccc',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3f51b5',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3f51b5',
                    },
                  },
                }}
              />
              </Grid>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '0.875rem',
                    color: '#333',
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#3f51b5',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#303f9f',
                  },
                  borderRadius: '8px',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" sx={{ color: '#333' }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2" sx={{ color: '#333',marginLeft:5 }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Signin;
