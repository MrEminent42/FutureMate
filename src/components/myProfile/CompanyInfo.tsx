import React, { useState, useEffect } from 'react'
import { Alert, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { CapsToLower, LocationResponse, StartDate } from '../../types/MatchingQuestions';
import { useAtom } from 'jotai';
import currentUserAtom from '../../jotai/currentUserAtom';
import { MateInfo } from '../../types/Mate';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PlaceIcon from '@mui/icons-material/Place';
import { firebaseAuth } from '../../config/firebase';
import { ProfileEntryContainer, ProfileEntryLeft, ProfileEntryRight, ProfilePaper, SectionTitle } from '../../pages/MyProfile';

const CompanyInfo = () => {
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

    const [startDate, setStartDate] = useState<StartDate | null>(currentUser?.startDate || null);
    const [location, setLocation] = useState<LocationResponse | null>(currentUser?.location || null);
    const [budgetMin, setBudgetMin] = useState<number | null>(currentUser?.budgetMin || 0);
    const [budgetMax, setBudgetMax] = useState<number | null>(currentUser?.budgetMax || 0);

    const handleBlur = () => {
        updateUserInfo()
    }

    const updateUserInfo = () => {
        let currentUserUpdateInfo = {
            ...currentUser,
            uid: currentUser?.uid || firebaseAuth.currentUser!.uid,
            listed: currentUser?.listed || false,
            location: location,
            startDate: startDate,
            budgetMin: budgetMin,
            budgetMax: budgetMax
        };
        setCurrentUser(currentUserUpdateInfo);
    }

    useEffect(() => {
        updateUserInfo()
    }, [startDate, location])

    const loadData = () => {
        setStartDate(currentUser?.startDate || null);
        setLocation(currentUser?.location || null);
        setBudgetMax(currentUser?.budgetMax || null);
        setBudgetMin(currentUser?.budgetMin || null);
    }

    useEffect(() => {
        loadData();
        updateUserInfo();
    }, [])


    return (
        <ProfilePaper >
            <SectionTitle>Internship Details</SectionTitle>
            {/* start date */}
            <ProfileEntryContainer >
                <ProfileEntryLeft>
                    <InsertInvitationIcon />
                </ProfileEntryLeft>
                <ButtonGroup
                    sx={{ flexGrow: 1 }}
                >
                    {Object.values(StartDate).map((item, i) => (
                        <Button
                            key={i}
                            color='primary'
                            sx={{ textTransform: 'capitalize', flexGrow: 1 }}
                            variant={startDate === item ? 'contained' : 'outlined'}
                            onClick={() => setStartDate(item)}
                        >{CapsToLower(item)}</Button>
                    ))}
                </ButtonGroup>
            </ProfileEntryContainer>
            {/* internship location */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: '7px' }}>
                <ProfileEntryLeft>
                    <PlaceIcon />
                </ProfileEntryLeft>
                <ProfileEntryRight >
                    <Select
                        value={location || ''}
                        onChange={(item) => setLocation(item.target.value as LocationResponse)}
                        sx={{ width: '100%' }}
                        renderValue={(item) => <p style={{ textTransform: 'capitalize' }}>{CapsToLower(item)}</p>}
                    >
                        {Object.values(LocationResponse).map((item, i) => (
                            <MenuItem
                                key={i}
                                value={item}
                                sx={{ textTransform: 'capitalize' }}
                            >{CapsToLower(item)}</MenuItem>
                        ))}
                    </Select>
                </ProfileEntryRight>
            </Box>
            {/* budget */}
            <ProfileEntryContainer>
                <ProfileEntryLeft>
                    <AttachMoneyIcon />
                </ProfileEntryLeft>
                <ProfileEntryRight sx={{ flexDirection: 'row' }}>
                    <TextField
                        value={budgetMin || ''}
                        type='number'
                        onChange={(item) => setBudgetMin(+item.target.value)}
                        sx={{ flexGrow: .5 }}
                        onBlur={handleBlur}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mx: '10px' }}>
                        <Typography >to</Typography>
                    </Box>
                    <TextField
                        value={budgetMax || ''}
                        type='number'
                        onChange={(item) => setBudgetMax(+item.target.value)}
                        sx={{ flexGrow: .5 }}
                        onBlur={handleBlur}
                    />
                </ProfileEntryRight>
            </ProfileEntryContainer>
        </ProfilePaper >
    )
}

export default CompanyInfo