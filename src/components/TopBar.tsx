import { AppBar, Avatar, Fade, IconButton, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { firebaseAuth, firebaseStorage } from '../config/firebase';
import { useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import currentUserAtom from "../jotai/currentUserAtom";
import { useAtom } from 'jotai';


const TopBar = () => {
    const navigate = useNavigate();

    const [logoUrl, setLogoUrl] = useState('');
    const [currentUser] = useAtom(currentUserAtom);

    useEffect(() => {

        const fileRef = ref(firebaseStorage, "logo.png");
        getDownloadURL(fileRef).then(setLogoUrl)
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                elevation={0}
                position="static" sx={{
                    // mb: '.rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    px: '1rem'
                }}>
                <Toolbar >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => navigate("/")}
                    >

                        <Fade
                            in={logoUrl != ''}
                        >
                            <Box
                                component="img"
                                src={logoUrl}
                                sx={{ height: '60px', transform: 'scale(2)', overflow: 'hidden' }}
                            />
                        </Fade>

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
                            <Avatar
                                src={currentUser?.photoURL ? currentUser.photoURL : ""}
                            >
                                {currentUser?.name ? currentUser.name.split(" ").map((s) => s[0]).join("") : "Unknown"}
                            </Avatar>
                            </IconButton>
                        </>
                    }


                </Toolbar>
            </AppBar>

        </Box >
    )
}

export default TopBar