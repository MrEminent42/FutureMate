import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth, firestoreDb } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { InternDocConverter, Intern } from "../types/Intern";
import { useAtom } from "jotai";
import { useState, useEffect } from 'react';
import { Backdrop, CircularProgress, Typography } from '@mui/material';
import currentUserAtom from "../jotai/currentUserAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import GoogleIcon from '@mui/icons-material/Google';
import { Fade } from '@mui/material';
import { HomeSkeleton } from "./Home";
import Skeleton from '@mui/material/Skeleton';


export const SignIn = () => {
    const navigate = useNavigate();
    const [, setCurrentUser] = useAtom(currentUserAtom);

    const [, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const [skeleton, setSkeleton] = useState(true);

    const [authState] = useAuthState(firebaseAuth);
    useEffect(() => {
        if (authState) {
            loadCurrentUser();
        }
    }, [authState]);


    useEffect(() => {
        setTimeout(function () {
            setSkeleton(false);
        }, 1100);
    }, []);


    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        setSubmitted(true);
        setLoading(true);

        signInWithPopup(firebaseAuth, provider).then((result) => {
            loadCurrentUser();
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            setLoading(false);
            setSubmitted(false);
            // alert(error.message);
        })
    }



    const loadCurrentUser = () => {
        if (!firebaseAuth.currentUser) return;
        const userRef = doc(firestoreDb, "mates", firebaseAuth.currentUser.uid).withConverter(InternDocConverter);
        getDoc(userRef).catch(console.log).then((docSnap) => {
            if (!firebaseAuth.currentUser) return;

            if (!docSnap || !docSnap.exists()) {
                console.log("creating new user")
                let newIntern: Intern = {
                    uid: firebaseAuth.currentUser.uid,
                    contact: firebaseAuth.currentUser.email,
                    photoURL: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
                    name: firebaseAuth.currentUser!.displayName || null,
                    listed: false,
                }
                setDoc(userRef, newIntern).catch(console.log);
                setCurrentUser(newIntern);
                navigate("/profile");
            } else {
                setCurrentUser(docSnap.data());
                navigate("/");
            }
            setLoading(false);
        });

    }

    const renderSkeleton = () => {
        return (
            <Fade in={skeleton}>
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

    const renderSignIn = () => {
        return (
            <Box sx={{ width: { xs: '100%', md: '600px' } }}>
                <Fade in={!skeleton}>
                    <Paper sx={{ m: '1rem', minHeight: '300px', position: 'relative', pb: '70px' }}>
                        <Box sx={{ p: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                            <Typography variant="h3" sx={{ mb: '1rem', textAlign: 'center' }}>SaleMate</Typography>
                            <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                Designed to help FutureForce 2023 interns find roommates.
                            </Typography>

                            <Box sx={{ maxWidth: '300px' }}>

                                <Typography variant="body1" sx={{ textAlign: 'center', mt: '1rem' }}>
                                    Disclaimers, etc:
                                </Typography>
                                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                    By signing up, you agree to receive emails about critical updates of this service for security and privacy.
                                </Typography>
                                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                    Listing your information on this service will allow anyone else who signs up to see the information. Be smart!
                                </Typography>
                            </Box>

                        </Box>
                        <Box sx={{
                            position: 'absolute',
                            bottom: '1rem',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <Button onClick={signInWithGoogle} variant="contained" color="secondary" >
                                <GoogleIcon sx={{ mr: '1rem' }} />
                                Sign in with Google
                            </Button>

                        </Box>
                    </Paper>



                </Fade>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="secondary" />
                </Backdrop>
            </Box >
        )
    }

    if (skeleton) {
        return renderSkeleton();
    } else {

        return renderSignIn();

    }
}


export default SignIn