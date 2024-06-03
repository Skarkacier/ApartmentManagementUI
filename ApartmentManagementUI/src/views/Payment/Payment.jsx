import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, Button } from "@mui/material";
import axios from 'axios';
import PaymentForm from './PaymentForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [paymentToEdit, setPaymentToEdit] = useState(null);

  const fetchPayments = async () => {
    try {
      const paymentResponse = await axios.get('http://localhost:5140/api/Payments');
      setPayments(paymentResponse.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
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

  const handleDelete = async (paymentID) => {
    try {
      await axios.delete(`http://localhost:5140/api/Payments/${paymentID}`);
      fetchPayments();
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
    fetchUsers();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPaymentToEdit(null);
  };

  const handleEdit = (payment) => {
    setPaymentToEdit(payment);
    handleClickOpen();
  };

  const mergedPayments = payments.map(payment => {
    const user = users.find(u => u.userID === payment.userID);
    return {
      ...payment,
      fullName: user ? user.fullName : 'N/A',
      isPayedText: payment.isPayed ? 'Yes' : 'No',
    };
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h5" component="div">
                Payment Details
              </Typography>
              <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ marginLeft: 2 }}>
                Add New Payment
              </Button>
            </Grid>
            <PaymentForm
              open={open}
              handleClose={handleClose}
              fetchPayments={fetchPayments}
              users={users}
              paymentToEdit={paymentToEdit}
            />
            <TableContainer sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>PaymentID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell>IsPayed</TableCell>
                    <TableCell>Payment Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mergedPayments.map(payment => (
                    <TableRow key={payment.paymentID}>
                      <TableCell>{payment.paymentID}</TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.fullName}</TableCell>
                      <TableCell>{payment.isPayedText}</TableCell>
                      <TableCell>{payment.paymentDate}</TableCell>
                      <TableCell>
                      <IconButton
                          size="small"
                          onClick={() => handleEdit(payment)}
                          sx={{ color: '#b032ef', marginRight: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(payment.paymentID)}
                          sx={{ color: '#de1919' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {mergedPayments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7}>No payments found</TableCell>
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

export default Payment;
