import { AppBar, Avatar, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from '../config/firebase';
import { useAtom } from 'jotai';
import currentUserAtom from '../jotai/currentUserAtom';
import { useAuthState } from 'react-firebase-hooks/auth';

const TopBar = () => {
    const navigate = useNavigate();
    const [currentUser] = useAtom(currentUserAtom);
    const [authState] = useAuthState(firebaseAuth);
    console.log("firebaseAuth.currentUser: " + firebaseAuth.currentUser?.email)
    console.log("SAME DIFF: " + authState?.email)


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

                        {/* <img style={{ objectFit: 'contain' }} src="https://firebasestorage.googleapis.com/v0/b/salemate-c2a21.appspot.com/o/logo.png?alt=media&token=467871b4-211a-464d-8fce-0caf2e715a3f" /> */}
                        <Box
                            component="img"
                            src="https://firebasestorage.googleapis.com/v0/b/salemate-c2a21.appspot.com/o/logo.png?alt=media&token=467871b4-211a-464d-8fce-0caf2e715a3f"
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