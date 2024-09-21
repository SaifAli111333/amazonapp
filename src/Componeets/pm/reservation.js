import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Container, Box, Typography, Grid, CircularProgress, Button, Modal, TextField,
  InputAdornment, IconButton
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import LinkIcon from '@mui/icons-material/Link';

const containerStyle = {
  marginTop: '8px',
};

const ReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    Ordernumber: '',
    OrderPhoto: '',
    RefundPhoto: '',
    awzlink: '',
  });
  const [selectedRow, setSelectedRow] = useState(null); // To store the selected row data for the modal

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get('http://localhost:3000/reservation', { headers });

        if (Array.isArray(response.data.reservations)) {
          setReservations(response.data.reservations);
        } else {
          console.error('Unexpected data format:', response.data);
          setError('Unexpected data format.');
        }
      } catch (err) {
        console.error('Error fetching reservations:', err);
        setError('Failed to fetch reservations.');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleRelease = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      await axios.delete(`http://localhost:3000/reservation/${id}`, { headers });

      setReservations(reservations.filter((reservation) => reservation._id !== id));
    } catch (err) {
      console.error('Error releasing reservation:', err);
      setError('Failed to release reservation.');
    }
  };

  const handleAddOrder = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(orderDetails.awzlink)
      .then(() => alert('Link copied to clipboard!'))
      .catch((err) => console.error('Failed to copy link:', err));
  };

  const handleSaveOrder = async () => {
    const formData = new FormData();
    formData.append('Ordernumber', orderDetails.Ordernumber);
    formData.append('OrderPhoto', orderDetails.OrderPhoto);
    formData.append('RefundPhoto', orderDetails.RefundPhoto);
    formData.append('awzlink', orderDetails.awzlink);
    formData.append('productId', selectedRow?.ProductID || ''); // Use data from selectedRow
    formData.append('createdBy', selectedRow?.Createdby || ''); // Use data from selectedRow
    formData.append('Reservedby', selectedRow?.Reservedby || ''); // Use data from selectedRow

    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } : {};

      await axios.post('http://localhost:3000/order', formData, { headers });

      alert('Order has been added.');
      setOpenModal(false);
      setOrderDetails({
        Ordernumber: '',
        OrderPhoto: '',
        RefundPhoto: '',
        awzlink: '',
      });
      setSelectedRow(null); // Clear the selected row
    } catch (err) {
      console.error('Error saving order:', err);
      setError('Failed to save order.');
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
    setOrderDetails({
      Ordernumber: '',
      OrderPhoto: '',
      RefundPhoto: '',
      awzlink: '',
    });
    setSelectedRow(null); // Clear the selected row
  };

  const updateReservations = useCallback(() => {
    const now = Date.now();
    setReservations((prevReservations) =>
      prevReservations.filter((reservation) => {
        if (reservation.expiresAt && reservation.expiresAt <= now) {
          handleRelease(reservation._id);
          return false;
        }
        return true;
      })
    );
  }, [reservations]);

  useEffect(() => {
    const intervalId = setInterval(updateReservations, 1000); // Update reservations every second
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [updateReservations]);

  const columns = [
    { field: 'ReservationID', headerName: 'Reservation ID', width: 200 },
    { field: 'ProductID', headerName: 'Product ID', width: 200 },
    { field: 'Reservedby', headerName: 'Reserved By', width: 200 },
    { field: 'Createdby', headerName: 'Created By', width: 200 },
    {
      field: 'addOrder',
      headerName: 'Add Order',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddOrder(params.row)}
        >
          Add Order
        </Button>
      ),
    },
    {
      field: 'release',
      headerName: 'Release',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleRelease(params.row.id)}
        >
          Release
        </Button>
      ),
    },
    {
      field: 'expiresAt',
      headerName: 'Time Left',
      width: 200,
      renderCell: (params) => {
        const expiresAt = params.row.expiresAt;
        if (!expiresAt) return 'N/A';
        const timeLeft = Math.max(0, expiresAt - Date.now());
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        return `${hours}:${minutes}:${seconds}`;
      },
    },
  ];

  const rows = useMemo(() => (reservations || []).map((reservation) => ({
    id: reservation._id,
    ReservationID: reservation.ReservationID,
    ProductID: reservation.ProductID || 'N/A',
    Reservedby: reservation.Reservedby,
    Createdby: reservation.Createdby,
    expiresAt: reservation.expiresAt ? new Date(reservation.expiresAt).getTime() : null,
  })), [reservations]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container component="main" maxWidth="lg" sx={containerStyle}>
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
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Reservations
            </Typography>
            <Box sx={{ height: 'calc(102vh - 250px)', overflow: 'auto' }}> {/* Adjust height and overflow */}
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 50]}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>

      {/* Modal for adding order details */}
      <Modal
        open={openModal}
        onClose={handleCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: '10px',
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            Add Order Details
          </Typography>
          <Grid item xs={12}>
            <Typography>Order Number</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={orderDetails.Ordernumber}
              onChange={(e) => setOrderDetails({ ...orderDetails, Ordernumber: e.target.value })}
              sx={{ mb: 1 }}
              InputProps={{
                sx: {
                  height: '40px', // Set height for TextField
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Order Photo</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="file"
              onChange={(e) => setOrderDetails({ ...orderDetails, OrderPhoto: e.target.files[0] })}
              sx={{ mb: 1 }}
              InputProps={{
                sx: {
                  height: '40px', // Set height for TextField
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton component="span">
                      <PhotoCamera />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Refund Photo</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="file"
              onChange={(e) => setOrderDetails({ ...orderDetails, RefundPhoto: e.target.files[0] })}
              sx={{ mb: 1 }}
              InputProps={{
                sx: {
                  height: '40px', // Set height for TextField
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton component="span">
                      <PhotoCamera />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Order Link</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={orderDetails.awzlink}
              onChange={(e) => setOrderDetails({ ...orderDetails, awzlink: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleCopyLink} edge="end">
                      <LinkIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid container spacing={2} style={{ marginTop: 10 }}>
            <Grid item xs={6}></Grid>
            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveOrder}
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Container>
  );
};

export default ReservationPage;
