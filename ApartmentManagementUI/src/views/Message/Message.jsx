import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import axios from 'axios';

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messageResponse = await axios.get('http://localhost:5140/api/Messages');
        setMessages(messageResponse.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
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

    fetchMessages();
    fetchUsers();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const indexOfLastMessage = page * rowsPerPage;
  const indexOfFirstMessage = indexOfLastMessage - rowsPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  const mergedMessages = currentMessages.map(message => {
    const user = users.find(u => u.userID === message.senderId);
    const user2 = users.find(u => u.userID === message.receiverId);
    return {
      ...message,
      fullName: user ? user.fullName : 'N/A',
      fullName2: user2 ? user2.fullName : 'N/A',
      isReadText: message.isRead ? 'Yes' : 'No',
    };
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              Message Details
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>MessageID</TableCell>
                    <TableCell>MessageText</TableCell>
                    <TableCell>Sender FullName</TableCell>
                    <TableCell>Receiver FullName</TableCell>
                    <TableCell>IsRead</TableCell>
                    <TableCell>MessageDate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mergedMessages.map(message => (
                    <TableRow key={message.messageID}>
                      <TableCell>{message.messageID}</TableCell>
                      <TableCell>{message.messageText}</TableCell>
                      <TableCell>{message.fullName}</TableCell>
                      <TableCell>{message.fullName2}</TableCell>
                      <TableCell>{message.isReadText}</TableCell>
                      <TableCell>{message.messageDate}</TableCell>
                    </TableRow>
                  ))}
                  {currentMessages.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6}>No messages found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              count={Math.ceil(messages.length / rowsPerPage)}
              page={page}
              onChange={handlePageChange}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Message;