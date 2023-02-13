import Box from '@mui/material/Box/Box';
import Fade from '@mui/material/Fade';
import Skeleton from '@mui/material/Skeleton';
import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { firebaseAuth } from '../config/firebase';
import { HomeSkeleton } from '../pages/Home';


export type ProtectedRouteProps = {
    isAuthenticated: boolean;
    authenticationPath: string;
    outlet: JSX.Element;
};

export default function ProtectedRoute({ children }: { children: JSX.Element }) {


    const [authentication, setAuthState] = useState({
        authenticated: false,
        initializing: true
    });

    useEffect(() => firebaseAuth.onAuthStateChanged(user => {
        if (user) {
            setAuthState({
                authenticated: true,
                initializing: false
            });
        } else {
            setAuthState({
                authenticated: false,
                initializing: false
            });
        }
    }), [setAuthState]);


    if (authentication.initializing) {
        return (
            <Fade in={true}
                style={{
                    transitionDelay: '800ms',
                }}
            >
                <Box sx={{ width: { xs: '100%', md: '600px' } }}>
                    <HomeSkeleton />
                    <Box sx={{ px: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Skeleton variant="rectangular" height={'50px'} width={'80%'} sx={{ my: '15px', borderRadius: '20px' }} />
                        <Skeleton variant="rectangular" height={'130px'} width={'100%'} sx={{ my: '15px', borderRadius: '20px' }} />
                        <Skeleton variant="rectangular" height={'130px'} width={'100%'} sx={{ my: '15px', borderRadius: '20px' }} />
                        <Skeleton variant="rectangular" height={'130px'} width={'100%'} sx={{ my: '15px', borderRadius: '20px' }} />
                        <Skeleton variant="rectangular" height={'130px'} width={'100%'} sx={{ my: '15px', borderRadius: '20px' }} />
                    </Box >
                </Box>
            </Fade>
        )
    }


    if (authentication.authenticated) {
        return children;
    } else {
        return <Navigate to={{ pathname: "/login" }} />;
    }
};