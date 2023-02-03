import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box/Box';
import { Typography, Paper } from '@mui/material';
import PictureAndName from '../components/profile/PictureAndName';
import Snackbar from '@mui/material/Snackbar';
import { failSnackAtom, saveSuccessSnackAtom, uploadSuccessSnackAtom } from '../jotai/snacksAtoms';
import { useAtom } from 'jotai';
import Alert from '@mui/material/Alert';
import CompanyInfo from '../components/profile/CompanyInfo';
import currentUserAtom from '../jotai/currentUserAtom';
import { doc, setDoc } from 'firebase/firestore';
import { firebaseAuth, firestoreDb } from '../config/firebase';
import { MateDocConverter } from '../types/Mate';
import DisplayProfile from '../components/profile/DisplaySwitch';
import { styled } from '@mui/material/styles'

const Profile = () => {
    const [uploadSuccess, setUploadSuccess] = useAtom(uploadSuccessSnackAtom);
    const [saveSuccess, setSaveSuccess] = useAtom(saveSuccessSnackAtom);
    const [fail, setFail] = useAtom(failSnackAtom);

    const [currentUser] = useAtom(currentUserAtom);

    useEffect(() => {
        updateFirebaseUser()
    }, [currentUser])

    const updateFirebaseUser = () => {
        if (currentUser && firebaseAuth.currentUser) {
            const userRef = doc(firestoreDb, "mates", firebaseAuth.currentUser.uid!).withConverter(MateDocConverter);
            setDoc(userRef, currentUser).catch(() => setFail(true)).then(() => { setSaveSuccess(true) });
        }
    }

    return (
        <Box sx={{ mx: '1rem' }}>
            <Typography variant="h3" sx={{ mb: '1rem' }}>Your Profile</Typography>
            <PictureAndName />
            <DisplayProfile />
            <CompanyInfo />



            {/* snackbars for success/fail */}
            <Snackbar
                open={uploadSuccess}
                autoHideDuration={3000}
                onClose={() => setUploadSuccess(false)}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                <Alert severity='success'>
                    Success! You look great 😍
                </Alert>
            </Snackbar>

            <Snackbar
                open={saveSuccess && !uploadSuccess}
                autoHideDuration={3000}
                onClose={() => setSaveSuccess(false)}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                <Alert severity='success'>
                    Saved 🥳
                </Alert>
            </Snackbar>

            <Snackbar
                open={fail}
                autoHideDuration={3000}
                onClose={() => setFail(false)}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                <Alert severity='error'>
                    That didn't quite work...
                </Alert>
            </Snackbar>
        </Box >
    )

}


export const ProfilePaper = styled(Paper)(({ theme }) => ({
    padding: '1rem',
    margin: '1rem 0',
}))

export default Profile