import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, Button } from "@mui/material";
import axios from 'axios';
import ApartmentForm from './ApartmentForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Apartment = () => {
  const [apartments, setApartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [apartmentToEdit, setApartmentToEdit] = useState(null);

  const fetchApartments = async () => {
    try {
      const apartmentResponse = await axios.get('http://localhost:5140/api/Apartments');
      setApartments(apartmentResponse.data);
    } catch (error) {
      console.error('Error fetching apartments:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const userResponse = await axios.get('http://localhost:5140/api/Users');
      setUsers(userResponse.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const handleDelete = async (apartmentID) => {
    try {
      await axios.delete(`http://localhost:5140/api/Apartments/${apartmentID}`);
      fetchApartments();
    } catch (error) {
      console.error('Error deleting apartment:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchApartments();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setApartmentToEdit(null);
  };

  const handleEdit = (apartment) => {
    setApartmentToEdit(apartment);
    handleClickOpen();
  };

  const mergedApartments = apartments.map(apartment => {
    const user = users.find(u => u.userID === apartment.userID);
    return {
      ...apartment,
      fullName: user ? user.fullName : 'N/A',
      statusText: apartment.status ? 'Full' : 'Empty',
    };
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h5" component="div">
                Apartment Details
              </Typography>
              <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ marginLeft: 2 }}>
                Add New Apartment
              </Button>
            </Grid>
            <ApartmentForm
              open={open}
              handleClose={handleClose}
              fetchApartments={fetchApartments}
              users={users}
              apartmentToEdit={apartmentToEdit}
            />
            <TableContainer sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ApartmentID</TableCell>
                    <TableCell>Block</TableCell>
                    <TableCell>Floor</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mergedApartments.map(apartment => (
                    <TableRow key={apartment.apartmentID}>
                      <TableCell>{apartment.apartmentID}</TableCell>
                      <TableCell>{apartment.block}</TableCell>
                      <TableCell>{apartment.floor}</TableCell>
                      <TableCell>{apartment.number}</TableCell>
                      <TableCell>{apartment.statusText}</TableCell>
                      <TableCell>{apartment.fullName}</TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(apartment)}
                          sx={{ color: '#b032ef', marginRight: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(apartment.apartmentID)}
                          sx={{ color: '#de1919' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {mergedApartments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7}>No apartments found</TableCell>
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
export default Apartment;