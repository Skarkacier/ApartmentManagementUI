import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Box, Typography, Divider } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';

const Sidebar = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 250, backgroundColor: '#46474c' }}>
      <Box sx={{ width: 255, bgcolor: '#46474c', height: '100%', color: '#e9ebf2' }}>
        <Typography variant="h6" sx={{ textAlign: 'center', padding: '20px 30px' }}>
          Management System
        </Typography>
        <Divider />
        <List sx={{ textAlign: 'center' }}>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon>
              <DashboardIcon sx={{color: '#e9ebf2'}} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/apartments">
            <ListItemIcon>
              <ApartmentIcon sx={{color: '#e9ebf2'}}/>
            </ListItemIcon>
            <ListItemText primary="Apartments" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/users">
            <ListItemIcon>
              <PeopleIcon sx={{color: '#e9ebf2'}}/>
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/payments">
            <ListItemIcon>
              <PaymentIcon sx={{color: '#e9ebf2'}}/>
            </ListItemIcon>
            <ListItemText primary="Payments" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;