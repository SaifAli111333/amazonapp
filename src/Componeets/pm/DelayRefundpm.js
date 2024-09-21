import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Grid,
  Container,
  Box,
  Typography,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DelayRefunded() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  const usertype = user?.usertype;
  console.log('User Type:', usertype);

  useEffect(() => {
    const fetchDelayRefunds = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get('http://localhost:3000/delayrefund', { headers });
        console.log('API Response:', response.data); 

        const delayRefunds = response.data.delayorders || [];

        const mappedRefunds = delayRefunds.map(refund => ({
          id: refund._id,
          OrderID: refund.OrderID || '',
          Ordernumber: refund.Ordernumber || '',
          ProductID: refund.ProductID || '',
          DelayDaysno: refund.DelayDaysno || 0,
          sellerid: refund.sellerid || '',
        }));

        setRows(mappedRefunds);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching delay refunds', err);
        setIsLoading(false);
      }
    };

    fetchDelayRefunds();
  }, []);

  const columns = [
    { field: 'OrderID', headerName: 'Order ID', width: 100 },
    { field: 'Ordernumber', headerName: 'Order Number', width: 130 },
    { field: 'ProductID', headerName: 'Product ID', width: 130 },
    { field: 'DelayDaysno', headerName: 'Delay Days No', width: 150 },
    { field: 'sellerid', headerName: 'Seller ID', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/order-overview/${params.row.id}`)}
          >
            View
          </Button>
        </div>
      ),
    },
  ];

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
          height: 'auto',
          overflow: 'hidden',
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Delay Refunds
            </Typography>
            <Box>
              <Box
                sx={{
                  height: 400,
                  width: "100%",
                  marginTop: 1,
                  "& .super-app-theme--header": {
                    backgroundColor: "#a7b61b23",
                  },
                }}
              >
                {isLoading ? (
                  <div style={{ margin: '5rem', textAlign: 'center' }}>
                    <CircularProgress />
                  </div>
                ) : (
                  <div style={{ height: 400, width: "100%" }}>
                    {rows.length === 0 ? (
                      <Typography>No data available.</Typography>
                    ) : (
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                          pagination: {
                            paginationModel: {
                              pageSize: 5,
                            },
                          },
                        }}
                        headerHeight={40}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        hideFooterSelectedRowCount
                        rowSelectionModel={rowSelectionModel}
                        onRowSelectionModelChange={(newRowSelectionModel) => {
                          setRowSelectionModel(newRowSelectionModel);
                        }}
                      />
                    )}
                  </div>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DelayRefunded;
