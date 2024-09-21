import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ChangePassword = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:3000/user/changepassword', {
        password: data.password,
        newPassword: data.newPassword,
        retypeNewPassword: data.retypeNewPassword,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error changing password. Please try again.');
      setMessage('');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Change Password
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              {...register('password', { required: 'Current password is required' })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              {...register('newPassword', { 
                required: 'New password is required', 
                minLength: { value: 6, message: 'Password must be at least 6 characters' } 
              })}
              error={!!errors.newPassword}
              helperText={errors.newPassword ? errors.newPassword.message : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Retype New Password"
              type="password"
              {...register('retypeNewPassword', {
                required: 'Please retype your new password',
                validate: (value) => value === watch('newPassword') || 'Passwords do not match',
              })}
              error={!!errors.retypeNewPassword}
              helperText={errors.retypeNewPassword ? errors.retypeNewPassword.message : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Change Password
            </Button>
          </Grid>
          {message && (
            <Grid item xs={12}>
              <Typography color="green">{message}</Typography>
            </Grid>
          )}
          {error && (
            <Grid item xs={12}>
              <Typography color="red">{error}</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default ChangePassword;
