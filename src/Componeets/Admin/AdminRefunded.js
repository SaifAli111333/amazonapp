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

function AdminRefunded() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  //const [ setNoRowsLabel] = useState(false);
  const [ setSelectedRowsData] = useState([]);

  const onRowsSelectionHandler = (ids) => {
    const selectedRows = ids.map((id) => rows.find((row) => row.id === id));
    setSelectedRowsData(selectedRows);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get('http://localhost:3000/order', { headers });
        const orders = response.data.orders || []; // Ensure orders is an array

        // Filter only orders with type 'ordered'
        const orderedOrders = orders.filter(order => order.OrderType === 'refunded');

        const mappedOrders = orderedOrders.map(order => ({
          id: order._id,  
          OrderID: order.OrderID || '', 
          Ordernumber: order.Ordernumber || '',
          Market: order.Market || '',
          Keyword: order.Keyword || '',
          ProductID: order.ProductID || '',
          Orderedby: order.Orderedby || '',
          createdBy: order.Createdby || '', 
        }));

        setRows(mappedOrders);
        setIsLoading(false);
        //setNoRowsLabel(mappedOrders.length === 0); 
      } catch (err) {
        console.error('Error fetching orders', err);
        setIsLoading(false);
       // setNoRowsLabel(true);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    { field: 'OrderID', headerName: 'Order ID', width: 100 },
    { field: 'Ordernumber', headerName: 'Order Number', width: 130 },
    { field: 'Market', headerName: 'Market', width: 130 },
    { field: 'Keyword', headerName: 'Keyword', width: 150 },
    { field: 'ProductID', headerName: 'Product ID', width: 130 },
    { field: 'Orderedby', headerName: 'Ordered By', width: 150 },
    { field: 'createdBy', headerName: 'Created By', width: 150 },
    {
      field: 'view',
      headerName: 'View',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/refunded-overview/${params.row.id}`)}
        >
          View
        </Button>
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
             Refunded
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
                    {rows.length === 0 && !isLoading ? (
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
                        onRowSelectionModelChange={(newRowSelectionModel) => {
                          if (newRowSelectionModel.length > 0) {
                            const selectionSet = new Set(rowSelectionModel);
                            const result = newRowSelectionModel.filter(
                              (s) => !selectionSet.has(s)
                            );
                            setRowSelectionModel(result);
                            onRowsSelectionHandler(result);
                          } else {
                            setRowSelectionModel(newRowSelectionModel);
                          }
                        }}
                        rowSelectionModel={rowSelectionModel}
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

export default AdminRefunded;
