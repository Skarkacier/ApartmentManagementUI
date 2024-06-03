import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import axios from 'axios';

const ApartmentForm = ({ open, handleClose, fetchApartments, apartmentToEdit }) => {
  const [newApartment, setNewApartment] = useState({
    block: '',
    floor: '',
    number: '',
    status: false,
    userID: ''
  });

  useEffect(() => {
    if (apartmentToEdit) {
      setNewApartment(apartmentToEdit);
    }
  }, [apartmentToEdit]);

  const handleChange = (e) => {
    setNewApartment({ ...newApartment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (apartmentToEdit) {
        await axios.put(`http://localhost:5140/api/Apartments/${newApartment.apartmentID}`, newApartment);
      } else {
        await axios.post('http://localhost:5140/api/Apartments', newApartment);
      }
      fetchApartments();
      handleClose();
    } catch (error) {
      console.error('Error saving apartment:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{apartmentToEdit ? 'Edit Apartment' : 'Add New Apartment'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill out the form below to {apartmentToEdit ? 'edit the' : 'add a new'} apartment.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="block"
          label="Block"
          type="text"
          fullWidth
          variant="outlined"
          value={newApartment.block}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="floor"
          label="Floor"
          type="text"
          fullWidth
          variant="outlined"
          value={newApartment.floor}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="number"
          label="Number"
          type="text"
          fullWidth
          variant="outlined"
          value={newApartment.number}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="status"
          label="Status"
          type="text"
          fullWidth
          variant="outlined"
          value={newApartment.status}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="userID"
          label="User ID"
          type="text"
          fullWidth
          variant="outlined"
          value={newApartment.userID}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ marginRight: 1 }}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};
ApartmentForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchApartments: PropTypes.func,
  apartmentToEdit: PropTypes.object,
};
export default ApartmentForm;