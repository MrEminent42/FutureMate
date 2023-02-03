import { AppBar, Avatar, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { firebaseAuth, firebaseStorage } from '../config/firebase';
import { useAtom } from 'jotai';
import currentUserAtom from '../jotai/currentUserAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';

const TopBar = () => {
    const navigate = useNavigate();
    const [currentUser] = useAtom(currentUserAtom);
    const [authState] = useAuthState(firebaseAuth);

    const [logoUrl, setLogoUrl] = useState('');

    useEffect(() => {

        const fileRef = ref(firebaseStorage, "logo.png");
        getDownloadURL(fileRef).then(setLogoUrl)
    })


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar elevation={0} position="static" sx={{ mb: '1rem' }}>
                <Toolbar >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => navigate("/")}
                    >

                        <Box
                            component="img"
                            src={logoUrl}
                            sx={{ height: '60px', transform: 'scale(2)', overflow: 'hidden' }}
                        />

                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    {firebaseAuth.currentUser &&
                        <>
                            <IconButton
                                disableRipple
                                onClick={() => {
                                    firebaseAuth.signOut();
                                    navigate("/");
                                }} >
                                <Typography>Sign out</Typography>
                            </IconButton >
                            <IconButton
                                onClick={() => navigate("profile")}
                            >
                                <Avatar src={firebaseAuth.currentUser.photoURL!} />
                            </IconButton>
                        </>
                    }


                </Toolbar>
            </AppBar>

        </Box>
    )
}

export default TopBar