import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ToastNotification from '../Modal/TopNotificaion';// Make sure the path is correct

const itemsPerPage = 5;

const ReportTable = () => {
  const [reports, setReports] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReport, setNewReport] = useState({ type_reclamation: '', energy: 'Gas' });
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/allTipR');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleDelete = (id) => {
    setReports(reports.filter(report => report.id !== id));
    setToast({ message: 'Report deleted successfully', type: 'success' });
  };

  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError('');
  };

  const handleNewReportChange = (e) => {
    const { name, value } = e.target;
    setNewReport({ ...newReport, [name]: value });
  };

  const handleAddReport = () => {
    axios.post('http://127.0.0.1:8000/api/createTipR', newReport)
      .then(response => {
        if (response.data.fails) {
          setError(response.data.message);
        } else {
          fetchReports();
          setNewReport({ type_reclamation: '', energy: 'Gas' });
          setIsModalOpen(false);
          setToast({ message: 'Report added successfully', type: 'success' });
        }
      })
      .catch (error => {
        setError('An error occurred while creating the report.');
      })
      .finally(() => {
        setTimeout(() => setToast({ message: '', type: '' }), 3000);
      });
  };

  const filteredReports = reports.filter(report => 
    searchId === '' || report.id.toString().includes(searchId)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReports = filteredReports.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <TextField
          label="Search by ID"
          variant="outlined"
          size="small"
          value={searchId}
          onChange={handleSearchChange}
          className="mr-4"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
        >
          New
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-200">
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Energy</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.energy}</TableCell>
                <TableCell>{report.type_reclamation}</TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleDelete(report.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="join mt-4 flex justify-center">
        {[...Array(totalPages).keys()].map(page => (
          <button
            key={page + 1}
            className={`join-item btn btn-xs ${currentPage === page + 1 ? 'btn-active' : ''}`}
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </button>
        ))}
      </div>
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Add New Report</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details for the new report.
          </DialogContentText>
          {error && <p className="text-red-500">{error}</p>}
          <FormControl fullWidth margin="dense">
            <InputLabel id="energy-label">Energy</InputLabel>
            <Select
              labelId="energy-label"
              name="energy"
              value={newReport.energy}
              onChange={handleNewReportChange}
              label="Energy"
            >
              <MenuItem value="Gas">Gas</MenuItem>
              <MenuItem value="Electric">Electric</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="type_reclamation"
            label="Type"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={newReport.type_reclamation}
            onChange={handleNewReportChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddReport} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      {toast.message && <ToastNotification message={toast.message} type={toast.type} />}
    </div>
  );
};

export default ReportTable;
