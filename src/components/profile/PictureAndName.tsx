import React, { useState, useEffect } from 'react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { User, updateProfile } from 'firebase/auth';
import Box from '@mui/material/Box/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Alert, Paper, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import UpdateProfilePicture from './UpdateProfilePicture';
import { firebaseAuth, firestoreDb } from '../../config/firebase';
import TextField from '@mui/material/TextField/TextField';
import { useAtom } from 'jotai';
import currentUserAtom from '../../jotai/currentUserAtom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { MateDocConverter, MateInfo } from '../../types/Mate';
import { failSnackAtom, saveSuccessSnackAtom, uploadSuccessSnackAtom } from '../../jotai/snacksAtoms';


const PictureAndName = () => {
    const [openPfpDialog, setOpenPfpDialog] = useState(false);

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

    const [errors, setErrors] = useState({ name: false, contact: false });
    const [, setUploadSuccess] = useAtom(uploadSuccessSnackAtom);
    const [, setSaveSuccess] = useAtom(saveSuccessSnackAtom);
    const [, setFail] = useAtom(failSnackAtom);

    const handleDialogClose = () => {
        setOpenPfpDialog(false);
    }

    const loadData = () => {
        setName(currentUser?.name || '');
        setContact(currentUser?.contact || '');
    }

    useEffect(() => {
        loadData()
    }, [])

    const handleBlur = () => {
        if (validate()) updateUserInfo()
    }

    const validate = () => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const phoneRegex = /\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/

        // setErrors({ name: name.length < 2, contact: emailRegex.test(name) })
        setErrors({ name: name.length < 2, contact: (!emailRegex.test(contact) && !phoneRegex.test(contact)) })
        if (errors.name || errors.contact) return false;
        return true;
    }

    const updateUserInfo = () => {
        if (currentUser) {
            let currentUserUpdateInfo = { ...currentUser, name: name, contact: contact } as MateInfo;
            setCurrentUser(currentUserUpdateInfo)
        }
    }


    return (
        <Paper sx={{ p: 2, my: 2 }} elevation={0}>
            <UpdateProfilePicture
                open={openPfpDialog}
                onClose={handleDialogClose}
                setUploadFailed={setFail}
                setUploadSuccess={setUploadSuccess}
            />
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: '5px' }}>
                <Box
                    sx={{ width: '200px', position: 'relative' }}
                    onClick={() => setOpenPfpDialog(true)}
                >
                    <IconButton
                        disableFocusRipple
                        sx={{
                            position: 'absolute',
                            right: '12px',
                            top: '12px',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                    <Box
                        component="img"
                        src={currentUser?.photoURL}

                        sx={{
                            borderRadius: '50%',
                            height: '200px',
                            width: '200px',
                        }}
                    />

                </Box>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: '7px' }}>
                <TextField
                    label="Name"
                    autoComplete='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={handleBlur}
                    error={errors.name}
                />
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: '7px' }}>
                <TextField
                    label="Contact method"
                    autoComplete='email'
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    onBlur={handleBlur}
                    error={errors.contact}
                    helperText={errors.contact ? "Please enter a valid phone or email" : "Phone or email, to be listed publicly."}
                />
            </Box>

        </Paper >
    )
}

export default PictureAndName