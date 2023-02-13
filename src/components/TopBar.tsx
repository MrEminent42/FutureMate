import React from 'react';
import { AppBar, Avatar, Fade, IconButton, Toolbar, Typography, styled } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { firebaseAuth, firebaseStorage } from '../config/firebase';
import { useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import currentUserAtom from "../jotai/currentUserAtom";
import { useAtom } from 'jotai';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import theme from '../config/config.theme';


const TopBar = () => {
    const navigate = useNavigate();

    const [logoUrl, setLogoUrl] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const [currentUser] = useAtom(currentUserAtom);

    useEffect(() => {
        const fileRef = ref(firebaseStorage, "logo.png");
        getDownloadURL(fileRef).then(setLogoUrl)
    }, [])

    const handleClose = () => {
        setAnchorEl(null);
    }

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
                <Toolbar
                    sx={{ position: 'relative' }}
                >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        // sx={{ mr: 2 }}
                        onClick={() => navigate("/")}
                    >

                        <Fade
                            in={logoUrl != ''}
                        >
                            <Box
                                component="img"
                                src={logoUrl}
                                sx={{ height: { xs: '50px', md: '60px' }, transform: 'scale(2)', overflow: 'hidden' }}
                            />
                        </Fade>

                    </IconButton>
                    <Box
                        sx={{ flexGrow: 1, display: 'flex', justifyContent: 'end', alignItems: 'center' }}
                    >

                        {firebaseAuth.currentUser &&
                            <React.Fragment>
                                <Box
                                    sx={{
                                        flex: 1,
                                        height: '50px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            width: '85%',
                                            justifyContent: 'space-evenly',
                                            position: 'relative',
                                            maxWidth: '300px',
                                            transform: {
                                                xs: 'translateX(5%)',
                                                sm: ''
                                            },
                                        }}
                                    >

                                        <PageTab
                                            onClick={() => navigate("/")}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: {
                                                        xs: '0.69rem',
                                                        sm: '1rem'
                                                    }
                                                }}
                                            >Roommates</Typography>
                                        </PageTab>
                                        <PageTab
                                            onClick={() => navigate("/profile")}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: {
                                                        xs: '0.69rem',
                                                        sm: '1rem'
                                                    }
                                                }}
                                            >Profile</Typography>
                                        </PageTab>

                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                bottom: '10%',
                                                // borderBottom: '5px solid red',
                                                borderRadius: '30% 30% 0 0 ',
                                                // border: '2px solid ' + theme.palette.secondary.main,
                                                height: '10%',
                                                backgroundColor: theme.palette.secondary.main,
                                                width: '25%',
                                                transition: 'all 250ms',
                                                transform: window.location.href.indexOf("profile") < 0 ? "translateX(-100%)" : "translateX(100%)",

                                            }}

                                        />
                                    </Box>
                                </Box>
                                <IconButton 
                                    sx={{ p: { xs: 0, md: '8px' } }}
                                    onClick={(e) => {
                                        setAnchorEl(e.currentTarget);
                                    }}
                                >
                                    <Avatar src={currentUser?.photoURL ? currentUser.photoURL : ""} sx={{ overflow: 'none' }}>
                                        {currentUser?.name ? currentUser.name.split(" ").map((s) => s[0]).join("") : "Unknown"}
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={menuOpen}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={() => {
                                        handleClose();
                                        navigate("profile");
                                    }}>
                                        <Avatar
                                            src={currentUser?.photoURL ? currentUser.photoURL : ""}
                                        >
                                            {currentUser?.name ? currentUser.name.split(" ").map((s) => s[0]).join("") : "Unknown"}
                                        </Avatar> Profile
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        handleClose();
                                        firebaseAuth.signOut();
                                        navigate("/");
                                    }}>
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </React.Fragment>
                        }
                    </Box>


                </Toolbar>
            </AppBar>

        </Box >
    )
}

export default TopBar

const PageTab = styled(Box)(() => ({
    flexGrow: 1,
    height: '60%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
}))
