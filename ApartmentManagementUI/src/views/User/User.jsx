import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, Button } from "@mui/material";
import axios from 'axios';
import UserForm from './UserForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const User = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5140/api/Users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (userID) => {
    try {
      await axios.delete(`http://localhost:5140/api/Users/${userID}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUserToEdit(null);
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
    handleClickOpen();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h5" component="div">
                User Details
              </Typography>
              <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ marginLeft: 2 }}>
                Add New User
              </Button>
            </Grid>
            <UserForm
              open={open}
              handleClose={handleClose}
              fetchUsers={fetchUsers}
              userToEdit={userToEdit}
            />
            <TableContainer sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>UserID</TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell>Identity Number</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Car Plate</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.userID}>
                      <TableCell>{user.userID}</TableCell>
                      <TableCell>{user.fullName}</TableCell>
                      <TableCell>{user.identityNum}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.password}</TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>
                      <TableCell>{user.carPlate}</TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(user)}
                          sx={{ color: '#b032ef', marginRight: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(user.userID)}
                          sx={{ color: '#de1919' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {users.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8}>No users found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default User;
