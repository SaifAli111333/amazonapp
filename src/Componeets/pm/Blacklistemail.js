import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Grid, Container, Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Blacklist = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  useEffect(() => {
    const fetchBlacklist = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get('http://localhost:3000/blacklist', { headers });
        console.log('API Response:', response.data);

        const blacklists = response.data.blacklists || [];

        const mappedBlacklist = blacklists.map(email => ({
          id: email._id,
          email: email.email || '',
        }));

        setRows(mappedBlacklist);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching blacklist', err);
        setIsLoading(false);
      }
    };

    fetchBlacklist();
  }, []);

  const columns = [
    { field: 'email', headerName: 'Email', width: 250 }
  ];

  return (
    <Container maxWidth="lg" sx={{ padding: 0, margin: 0 }}>
      <Grid
        container
        spacing={1}
        item
        xs={12}
        style={{
          width: '100%',
          marginBottom: '10px',
          border: '2px solid #326C1D',
          borderRadius: '10px',
          marginTop: '10px',
          paddingBottom: '20px',
          padding: '15px',
          backgroundColor: 'white',
          height: 'auto',
          overflow: 'hidden',
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Blacklist Emails
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

export default Blacklist;
