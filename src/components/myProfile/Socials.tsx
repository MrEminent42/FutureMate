import React, { useState, useEffect } from 'react'
import { Alert, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { CapsToLower, LocationResponse, StartDate } from '../../types/MatchingQuestions';
import { useAtom } from 'jotai';
import currentUserAtom from '../../jotai/currentUserAtom';
import { Intern, combineInternInfo } from '../../types/Intern';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PlaceIcon from '@mui/icons-material/Place';
import { firebaseAuth } from '../../config/firebase';
import { ProfileEntryContainer, ProfileEntryLeft, ProfileEntryRight, ProfilePaper, SectionTitle } from '../../pages/MyProfile';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Socials = () => {
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

    const [linkedin, setLinkedin] = useState<string>(currentUser?.linkedin || "");
    const [instagram, setInstagram] = useState<string>(currentUser?.instagram || "");

    const handleBlur = () => {
        updateUserInfo()
    }

    const updateUserInfo = () => {
        if (currentUser) {
            setCurrentUser(combineInternInfo({
                linkedin: linkedin,
                instagram: instagram
            }, currentUser));
        }
    }

    useEffect(() => {
        updateUserInfo()
    }, [linkedin, instagram])

    const loadData = () => {
        setInstagram(currentUser?.instagram || "")
        setLinkedin(currentUser?.linkedin || "")
    }

    useEffect(() => {
        loadData();
    }, [])


    return (
        <ProfilePaper >
            <SectionTitle>Socials</SectionTitle>
            <ProfileEntryContainer >
                <ProfileEntryLeft>
                    <LinkedInIcon />
                </ProfileEntryLeft>
                <ProfileEntryRight>
                    <TextField
                        size="small"
                        label="LinkedIn username"
                        autoComplete='linkedin'
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        onBlur={handleBlur}
                    />
                </ProfileEntryRight>
            </ProfileEntryContainer>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: '7px' }}>
                <ProfileEntryLeft>
                    <InstagramIcon />
                </ProfileEntryLeft>
                <ProfileEntryRight >
                    <TextField
                        size="small"
                        label="Instagram username"
                        autoComplete='instagram'
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        onBlur={handleBlur}
                    />
                </ProfileEntryRight>
            </Box>
        </ProfilePaper >
    )
}

export default Socials