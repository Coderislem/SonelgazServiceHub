import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  Box // Import Box component for flexbox styling
} from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
 // Import axios for API requests

const ReclamationTable = () => {
  const [data, setData] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState('');
  const [currentId, setCurrentId] = useState(null);
const [reclama,setrecla]=useState([]);
  useEffect(() => {
    fetchReclamationData();
  }, []);
  const token = localStorage.getItem("token");
  const fetchReclamationData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/indexR", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const filteredData = data.filter(item => !item.Responce);
      setrecla(filteredData);
    } catch (error) {
      console.error('Error fetching reclamation data:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleClickOpen = (id) => {
    setCurrentId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setResponse('');
  };

  const handleSend = () => {
    console.log(`Response for ID ${currentId}: ${response}`);
    handleClose();
  };

 
  return (
    <Paper>
      <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
        <Typography variant="h5">Problem Report</Typography>
        <TextField
          label="Search by ID"
          variant="outlined"
          value={searchId}
          onChange={handleSearchChange}
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date Created</TableCell>
             
              <TableCell>Problem Report</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reclama.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.created_at}</TableCell>
          
                
                <TableCell>
                  <p style={{ margin: 0 }}>{row.description}</p>
                </TableCell>
                <TableCell>
                  <IconButton aria-label="reply" onClick={() => handleClickOpen(row.id)}>
                    <ReplyIcon color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Respond to Problem Report</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please write your response for the problem report with ID {currentId}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Response"
            type="text"
            fullWidth
            variant="outlined"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSend} color="primary" variant="contained">Send</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ReclamationTable;
