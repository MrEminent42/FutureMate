import { useEffect } from 'react';

import { firebaseAuth, firestoreDb, } from './config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from './pages/SignIn';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Home from './pages/Home';
import Profile from './pages/MyProfile';
import TopBar from './components/TopBar';
import { Box } from '@mui/system';
import { grey, red } from '@mui/material/colors';
import OtherProfile from './pages/OtherProfile';
import ProtectedRoute from './components/ProtectedRoute';
import currentUserAtom from './jotai/currentUserAtom';
import { useAtom } from 'jotai';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Intern, InternDocConverter } from './types/Intern';


const App = () => {
    const [user] = useAuthState(firebaseAuth);

    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

    useEffect(() => {
        if (user) {
            loadCurrentUser();
        } else {
            setCurrentUser(null);
        }

    }, [user])

    const loadCurrentUser = () => {
        if (!firebaseAuth.currentUser) return;
        const userRef = doc(firestoreDb, "mates", firebaseAuth.currentUser.uid).withConverter(InternDocConverter);
        getDoc(userRef).catch(console.log).then((docSnap) => {
            if (!firebaseAuth.currentUser) return;

            if (!docSnap || !docSnap.exists()) {
                // let newIntern: Intern = {
                //     uid: firebaseAuth.currentUser.uid,
                //     contact: firebaseAuth.currentUser.email,
                //     name: firebaseAuth.currentUser.displayName || null,
                //     listed: false,
                // }
                // setDoc(userRef, newIntern).catch(console.log);
                // setCurrentUser(newIntern);
                // navigate("/profile?onboarding=true");
            } else {
                setCurrentUser(docSnap.data());
            }
        });

  }

  return (

    <BrowserRouter>
      <Box sx={{ backgroundColor: 'background.default', height: '100vh', width: '100vw', position: 'fixed', zIndex: -10 }} />
      <TopBar />
      <Box maxWidth={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="login" element={<SignIn />} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="mate" element={<ProtectedRoute><OtherProfile /></ProtectedRoute>} />
        </Routes>
      </Box>
    </BrowserRouter>

  )


}


export default App