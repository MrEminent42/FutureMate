import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box/Box';
import { Typography, Paper } from '@mui/material';
import PictureAndName from '../components/myProfile/PictureAndName';
import Snackbar from '@mui/material/Snackbar';
import { failSnackAtom, saveSuccessSnackAtom, uploadSuccessSnackAtom } from '../jotai/snacksAtoms';
import { useAtom } from 'jotai';
import Alert from '@mui/material/Alert';
import CompanyInfo from '../components/myProfile/CompanyInfo';
import currentUserAtom from '../jotai/currentUserAtom';
import { doc, setDoc } from 'firebase/firestore';
import { firebaseAuth, firestoreDb } from '../config/firebase';
import { InternDocConverter } from '../types/Intern';
import DisplayProfile from '../components/myProfile/DisplaySwitch';
import { styled } from '@mui/material/styles'
import Questionnaire from '../components/myProfile/Questionnaire';

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
            const userRef = doc(firestoreDb, "mates", firebaseAuth.currentUser.uid!).withConverter(InternDocConverter);
            setDoc(userRef, currentUser).catch(() => setFail(true)).then(() => { setSaveSuccess(true) });
        }
    }

    return (
        <Box sx={{ width: { xs: '100%', md: '600px' } }}>
            <Box sx={{ px: '1rem' }}>
                <Typography variant="h3" sx={{ mb: '1rem' }}>Your Profile</Typography>
                <PictureAndName />
                <DisplayProfile />
                <CompanyInfo />
                <Questionnaire />

                {/* snackbars for success/fail */}
                <Snackbar
                    open={uploadSuccess}
                    autoHideDuration={3000}
                    onClose={() => setUploadSuccess(false)}
                    anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                    <Alert severity='success' variant='filled' sx={{ borderWidth: 0 }}>
                        Success! You look great 😍
                    </Alert>
                </Snackbar>

                <Snackbar
                    open={saveSuccess && !uploadSuccess}
                    autoHideDuration={3000}
                    onClose={() => setSaveSuccess(false)}
                    anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                    <Alert severity='success' variant='filled' sx={{ borderWidth: 0 }}>
                        Saved 🥳
                    </Alert>
                </Snackbar>

                <Snackbar
                    open={fail}
                    autoHideDuration={3000}
                    onClose={() => setFail(false)}
                    anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                    <Alert severity='error' variant='filled' sx={{ borderWidth: 0 }}>
                        That didn't quite work...
                    </Alert>
                </Snackbar>
            </Box>
        </Box >
    )

}




export default Profile

export const ProfilePaper = styled(Paper)(({ theme }) => ({
    padding: '1rem',
    margin: '1rem 0',
}))

export const ProfileEntryContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '7px 0',
}))

export const ProfileEntryLeft = styled(Box)(({ theme }) => ({
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}))

export const ProfileEntryRight = styled(Box)(({ theme }) => ({
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}))

export const SectionTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.main,
    fontSize: '1.2rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '10px'
}))