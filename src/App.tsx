
import { firebaseAuth, } from './config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from './pages/SignIn';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import React from 'react'
// import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Profile from './pages/Profile';
import TopBar from './components/TopBar';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';


const App = () => {
  const [user] = useAuthState(firebaseAuth);
  console.log("useAuthState(firebaseAuth): " + user?.email)

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!user) {
      // if (firebaseAuth.currentUser) {
      return <Navigate to="/login" />
    }

    return children;
  }

  return (

    <BrowserRouter>
      <Box sx={{ backgroundColor: grey[100], height: '100vh' }}>
        <TopBar />
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="login" element={<SignIn />} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </Box>
    </BrowserRouter>

  )


}


export default App