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
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Reports() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [NoRowsLabel, setNoRowsLabel] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get('http://localhost:3000/report', { headers });
        const reports = response.data.reports;
        const filteredReports = reports.filter(report => report.isResolved === false);

        const mappedReports = filteredReports.map(report => ({
          id: report._id,
          ReportID: report.ReportID || '',
          OrderID: report.OrderID || '',
          Orderby: report.Orderby || '', 
          Createdby: report.Createdby || '', 
          TextDate: new Date(report.TextDate).toLocaleDateString() || '',
        }));

        setRows(mappedReports);
        setIsLoading(false);
        setNoRowsLabel(mappedReports.length === 0);
      } catch (err) {
        console.error('Error fetching reports', err);
        setIsLoading(false);
        setNoRowsLabel(true);
      }
    };

    fetchReports();
  }, []);

  const columns = [
    { field: 'ReportID', headerName: 'Report ID', width: 150 },
    { field: 'OrderID', headerName: 'Order ID', width: 150 },
    { field: 'Orderby', headerName: 'Ordered By', width: 150 }, // New field
    { field: 'Createdby', headerName: 'Created By', width: 150 }, // New field
    { field: 'TextDate', headerName: 'Date', width: 150 },
    {
      field: 'view',
      headerName: 'View',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/report-overview/${params.row.id}`)}
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
              Reports
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
                        disableRowSelectionOnClick
                        hideFooterSelectedRowCount
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

export default Reports;
