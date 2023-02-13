import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box/Box';
import { Typography, Card, Button } from '@mui/material';
import PictureAndName from '../components/myProfile/PictureAndName';
import Snackbar from '@mui/material/Snackbar';
import { emptyProfileAtom, failSnackAtom, saveSuccessSnackAtom, uploadSuccessSnackAtom } from '../jotai/snacksAtoms';
import { useAtom } from 'jotai';
import Alert from '@mui/material/Alert';
import CompanyInfo from '../components/myProfile/CompanyInfo';
import currentUserAtom, { currentUserListedAtom } from '../jotai/currentUserAtom';
import { doc, setDoc } from 'firebase/firestore';
import { firebaseAuth, firestoreDb } from '../config/firebase';
import { InternDocConverter } from '../types/Intern';
import DisplayProfile from '../components/myProfile/DisplaySwitch';
import { styled } from '@mui/material/styles'
import Questionnaire from '../components/myProfile/Questionnaire';
import Socials from '../components/myProfile/Socials';
import { useNavigate } from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { PageTitle } from './Home';
import { getTodoLabel, profileErrorsAtom } from '../jotai/profileAtoms';

const Profile = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const navigate = useNavigate();

    const [uploadSuccess, setUploadSuccess] = useAtom(uploadSuccessSnackAtom);
    const [saveSuccess, setSaveSuccess] = useAtom(saveSuccessSnackAtom);
    const [failSnack, setFailSnack] = useAtom(failSnackAtom);
    const [emptyProfileSnack, setEmptyProfileSnack] = useAtom(emptyProfileAtom);
    const [currentUser] = useAtom(currentUserAtom);

    const [firstTime, setFirstTime] = useState(false);
    const [_, setListed] = useAtom(currentUserListedAtom);

    const [errors, setErrors] = useAtom(profileErrorsAtom);

    useEffect(() => {
        if (!firstTime) updateFirebaseUser()
    }, [currentUser])

    useEffect(() => {
        const firstTime = queryParameters.get("onboarding");
        setFirstTime(firstTime === "true" ? true : false);
    }, [])

    const updateFirebaseUser = (overrideListed?: boolean) => {
        if (currentUser && firebaseAuth.currentUser) {
            if (overrideListed) setListed(true);
            const userRef = doc(firestoreDb, "mates", firebaseAuth.currentUser.uid!).withConverter(InternDocConverter);
            setDoc(userRef, { ...currentUser, listed: overrideListed || currentUser.listed }).catch(() => setFailSnack(true)).then(() => { setSaveSuccess(true) });
        }
    }


    const checkFullProfile = () => {
        if (!currentUser) return false;
        let valid = true;
        let newErrors = {};

        if (!currentUser.name) {
            valid = false;
            newErrors = { ...newErrors, name: true };
        }

        if (!currentUser.contact) {
            valid = false;
            newErrors = { ...newErrors, contact: true };
        }

        if (!currentUser.location) {
            valid = false;
            newErrors = { ...newErrors, location: true };
        }

        if (!currentUser.startDate) {
            valid = false;
            newErrors = { ...newErrors, startDate: true };
        }

        // if (!currentUser.budgetMin) {
        //     valid = false;
        //     newErrors = { ...newErrors, budgetMin: true };
        // }

        if (!currentUser.budgetMax) {
            valid = false;
            newErrors = { ...newErrors, budgetMax: true };
        }

        if (!currentUser.loudness) {
            valid = false;
            newErrors = { ...newErrors, loudness: true };
        }

        if (!currentUser.bedtime) {
            valid = false;
            newErrors = { ...newErrors, bedtime: true };
        }

        if (!currentUser.cleanliness) {
            valid = false;
            newErrors = { ...newErrors, cleanliness: true };
        }

        if (!currentUser.photoURL) {
            valid = false;
            newErrors = { ...newErrors, photoURL: true };
        }

        if (!currentUser.householdSize) {
            valid = false;
            newErrors = { ...newErrors, householdSize: true }
        }

        setErrors({ ...errors, ...newErrors })
        return valid;
    }

    return (
        <Box sx={{ width: { xs: '100%', md: '600px' } }}>
            <Box sx={{ px: '1rem' }}>
                {firstTime ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h4" sx={{ mb: '1rem' }}>Welcome!</Typography>
                        <Typography variant="body1" sx={{ mb: '1rem' }}>Please fill out your profile.</Typography>
                    </Box>
                ) : (
                        <PageTitle sx={{ mb: '1rem' }}>Your Profile</PageTitle>
                )}
                <PictureAndName />
                {!firstTime && <DisplayProfile
                    checkFullProfile={checkFullProfile} />}
                <CompanyInfo />
                <Questionnaire />
                <Socials />

                <Button
                    variant="contained"
                    color="success"
                    sx={{ width: '100%', mb: '10px' }}
                    onClick={() => {
                        if (firstTime) {
                            if (!checkFullProfile()) {
                                setEmptyProfileSnack(true);
                            } else {
                                setFirstTime(false)
                                updateFirebaseUser(true)
                                navigate("/")
                            }
                        } else {
                            updateFirebaseUser()
                            navigate("/")
                        }
                    }}
                >{firstTime ? "Save & List My Profile" : "Save"}</Button>

                {/* snackbars for success/fail */}
                <Snackbar
                    open={uploadSuccess}
                    autoHideDuration={3000}
                    onClose={() => setUploadSuccess(false)}
                    anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                    <Alert severity='success' variant='filled'>
                        Success! You look great 😍
                    </Alert>
                </Snackbar>

                <Snackbar
                    open={saveSuccess && !uploadSuccess}
                    autoHideDuration={3000}
                    onClose={() => setSaveSuccess(false)}
                    anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                    <Alert severity='success' variant='filled'>
                        Saved 🥳
                    </Alert>
                </Snackbar>

                <Snackbar
                    open={failSnack}
                    autoHideDuration={3000}
                    onClose={() => setFailSnack(false)}
                    anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                    <Alert severity='error' variant='filled'>
                        That didn't quite work...
                    </Alert>
                </Snackbar>

                <Snackbar
                    open={emptyProfileSnack}
                    autoHideDuration={6000}
                    onClose={() => setEmptyProfileSnack(false)}
                    anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                    <Alert severity='error' variant='filled'>
                        {/* Please make sure your profile has: contact info, internship details, and living preferences. */}
                        Please add: {
                            Object.entries(errors)
                                .filter(([key, isError]) => isError)
                                .map(([key]) => getTodoLabel(key))
                                .join(", ")}.
                    </Alert>
                </Snackbar>
            </Box>
        </Box >
    )

}




export default Profile

export const ProfilePaper = styled(Card)(({ theme }) => ({
    padding: '1rem',
    margin: '1rem 0',
}))

export const ProfileEntryContainer = styled(Box)(({ theme }) => ({
    // width: '100%',
    flexGrow: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5px 0',
    padding: '7px 5px',
    borderColor: 'red',
    borderRadius: '15px',
    borderStyle: 'solid',
    borderWidth: 0,
}))

export const ProfileEntryLeft = styled(Box)(({ theme }) => ({
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '90px',
    textAlign: 'center',
    // backgroundColor: 'red',
    // padding: '0 10px'
}))

export const ProfileEntryRight = styled(Box)(({ theme }) => ({
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
}))

export const SectionTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.main,
    fontSize: '1.2rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '10px'
}))