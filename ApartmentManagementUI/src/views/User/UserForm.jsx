import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import axios from 'axios';

const UserForm = ({ open, handleClose, fetchUsers, userToEdit }) => {
  const [newUser, setNewUser] = useState({
    fullName: '',
    identityNum: '',
    email: '',
    password: '',
    phoneNumber: '',
    carPlate: ''
  });

  useEffect(() => {
    if (userToEdit) {
      setNewUser(userToEdit);
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (userToEdit) {
        await axios.put(`http://localhost:5140/api/Users/${newUser.userID}`, newUser);
      } else {
        await axios.post('http://localhost:5140/api/Users', newUser);
      }
      fetchUsers();
      handleClose();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{userToEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill out the form below to {userToEdit ? 'edit the' : 'add a new'} user.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="fullName"
          label="FullName"
          type="text"
          fullWidth
          variant="outlined"
          value={newUser.fullName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="identityNum"
          label="IdentityNum"
          type="text"
          fullWidth
          variant="outlined"
          value={newUser.identityNum}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="text"
          fullWidth
          variant="outlined"
          value={newUser.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="password"
          label="Password"
          type="text"
          fullWidth
          variant="outlined"
          value={newUser.password}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="phoneNumber"
          label="PhoneNumber"
          type="text"
          fullWidth
          variant="outlined"
          value={newUser.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="carPlate"
          label="CarPlate"
          type="text"
          fullWidth
          variant="outlined"
          value={newUser.carPlate}
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
UserForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func,
  userToEdit: PropTypes.object,
};
export default UserForm;