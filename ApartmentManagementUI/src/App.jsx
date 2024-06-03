import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './layouts/Dashboard.jsx';
import Apartment from './views/Apartment/Apartment.jsx';
import User from './views/User/User.jsx';
import Payment from './views/Payment/Payment.jsx';
import Login from './views/Login.jsx';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}>
            <Route path="apartments" element={<Apartment />} />
            <Route path="users" element={<User />} />
            <Route path="payments" element={<Payment />} />
          </Route>
        </Routes>
      </Router>
  );
};

export default App;