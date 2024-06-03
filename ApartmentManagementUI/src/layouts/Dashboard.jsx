import Sidebar from "../components/Sidebar.jsx";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5', color: 'black' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;