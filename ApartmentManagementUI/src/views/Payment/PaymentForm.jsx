import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import axios from 'axios';

const PaymentForm = ({ open, handleClose, fetchPayments, paymentToEdit }) => {
  const [newPayment, setNewPayment] = useState({
    type: '',
    amount: '',
    fullName: '',
    isPayedText: false,
    paymentDate: ''
  });

  useEffect(() => {
    if (paymentToEdit) {
      setNewPayment(paymentToEdit);
    }
  }, [paymentToEdit]);

  const handleChange = (e) => {
    setNewPayment({ ...newPayment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (paymentToEdit) {
        await axios.put(`http://localhost:5140/api/Payments/${newPayment.paymentID}`, newPayment);
      } else {
        await axios.post('http://localhost:5140/api/Payments', newPayment);
      }
      fetchPayments();
      handleClose();
    } catch (error) {
      console.error('Error saving payment:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{paymentToEdit ? 'Edit Payment' : 'Add New Payment'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill out the form below to {paymentToEdit ? 'edit the' : 'add a new'} payment.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="type"
          label="Type"
          type="text"
          fullWidth
          variant="outlined"
          value={newPayment.type}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="amount"
          label="Amount"
          type="text"
          fullWidth
          variant="outlined"
          value={newPayment.amount}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="fullName"
          label="FullName"
          type="text"
          fullWidth
          variant="outlined"
          value={newPayment.fullName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="isPayed"
          label="Is Payed"
          type="text"
          fullWidth
          variant="outlined"
          value={newPayment.isPayedText}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="paymentDate"
          label="Payment Date"
          type="text"
          fullWidth
          variant="outlined"
          value={newPayment.paymentDate}
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
PaymentForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchPayments: PropTypes.func,
  paymentToEdit: PropTypes.object,
};
export default PaymentForm;