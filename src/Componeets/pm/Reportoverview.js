import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MessageComponent from "../pm/Messagecomponent"; // Ensure this path is correct

function ReportOverviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(`http://localhost:3000/report/${id}`, { headers });
        setReport(response.data.report);
        setIsResolved(response.data.report.isResolved);
      } catch (err) {
        console.error('Error fetching report', err);
      }
    };

    fetchReport();
  }, [id]);

  const handleResolve = async (resolve) => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      await axios.put(
        `http://localhost:3000/report/${id}`,
        { isResolved: resolve },
        { headers }
      );

      setIsResolved(resolve);
      setIsDialogOpen(false);
    } catch (err) {
      console.error('Error updating report', err);
    }
  };

  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      await axios.post(
        'http://localhost:3000/messages',
        {
          reportId: id,
          senderId: user.user_id,
          recipientId: report?.buyerId, // Ensure you have buyerId in report
          content: messageContent,
        },
        { headers }
      );

      setMessageContent('');
      setIsMessageDialogOpen(false);
    } catch (err) {
      console.error('Error sending message', err);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1">
            Report Details
          </Typography>
        </Grid>
        {report ? (
          <Grid item xs={12}>
            <Typography variant="h6">Report ID: {report.ReportID}</Typography>
            <Typography variant="h6">Order ID: {report.OrderID}</Typography>
            <Typography variant="h6">Date: {new Date(report.TextDate).toLocaleDateString()}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsDialogOpen(true)}
            >
              Resolve
            </Button>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Typography>Loading...</Typography>
          </Grid>
        )}
      </Grid>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Resolve Report</DialogTitle>
        <DialogContent>
          <Typography>Do you want to resolve this report?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleResolve(true)} color="primary">
            Yes
          </Button>
          <Button onClick={() => handleResolve(false)} color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={isMessageDialogOpen} onClose={() => setIsMessageDialogOpen(false)}>
        <DialogTitle>Send a Message</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Message"
            type="text"
            fullWidth
            variant="standard"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSendMessage} color="primary">
            Send
          </Button>
          <Button onClick={() => setIsMessageDialogOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Message Component */}
      <Box mt={4}>
        <MessageComponent reportId={id} senderId={user.user_id} recipientId={report?.buyerId} />
      </Box>
    </Container>
  );
}

export default ReportOverviewPage;
