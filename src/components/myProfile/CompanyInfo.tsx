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
import { styled } from "@mui/material/styles";
import { profileErrorsAtom } from '../../jotai/profileAtoms';

const CompanyInfo = () => {
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

    const [startDate, setStartDate] = useState<StartDate | null>(currentUser?.startDate || null);
    const [location, setLocation] = useState<LocationResponse | null>(currentUser?.location || null);
    const [budgetMin, setBudgetMin] = useState<number | null>(currentUser?.budgetMin || 0);
    const [budgetMax, setBudgetMax] = useState<number | null>(currentUser?.budgetMax || 0);

    const [errors, setErrors] = useAtom(profileErrorsAtom);

    const handleBlur = () => {
        updateUserInfo()
    }

    const updateUserInfo = () => {
        if (currentUser) {
            setCurrentUser(combineInternInfo({
                uid: currentUser.uid || firebaseAuth.currentUser?.uid,
                listed: currentUser.listed,

                location: location,
                startDate: startDate,
                budgetMin: budgetMin,
                budgetMax: budgetMax,
            }, currentUser));
        }
    }

    useEffect(() => {
        updateUserInfo()
    }, [startDate, location, budgetMax, budgetMin])

    const loadData = () => {
        setStartDate(currentUser?.startDate || null);
        setLocation(currentUser?.location || null);
        setBudgetMax(currentUser?.budgetMax || null);
        setBudgetMin(currentUser?.budgetMin || null);
    }

    useEffect(() => {
        loadData();
    }, [])


    return (
        <ProfilePaper >
            <SectionTitle>Internship Details</SectionTitle>
            {/* start date */}
            <ProfileEntryContainer sx={{ borderWidth: errors.startDate ? '1px' : '0px' }} >
                <ProfileEntryLeft>
                    <InsertInvitationIcon />
                    <LeftChipLabel>
                        Start Date
                    </LeftChipLabel>
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
                            onClick={() => {
                                setErrors({ ...errors, startDate: false })
                                setStartDate(item)
                            }}
                        >{CapsToLower(item)}</Button>
                    ))}
                </ButtonGroup>
            </ProfileEntryContainer>
            {/* internship location */}
            <ProfileEntryContainer sx={{ borderWidth: errors.location ? '1px' : '0px' }}>
                <ProfileEntryLeft>
                    <PlaceIcon />
                    <LeftChipLabel>
                        Location
                    </LeftChipLabel>
                </ProfileEntryLeft>
                <ProfileEntryRight >
                    <Select
                        size="small"
                        value={location || ''}
                        onChange={(item) => {
                            setErrors({ ...errors, location: false })
                            setLocation(item.target.value as LocationResponse)
                        }}
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
            </ProfileEntryContainer>
            {/* budget */}
            <ProfileEntryContainer sx={{ borderWidth: errors.budgetMax || errors.budgetMin ? '1px' : '0px' }}>
                <ProfileEntryLeft>
                    <AttachMoneyIcon />
                    <LeftChipLabel>
                        Monthly
                        Budget
                    </LeftChipLabel>
                </ProfileEntryLeft>
                <ProfileEntryRight sx={{ flexDirection: 'row' }}>
                    <TextField
                        size="small"
                        value={budgetMin || ''}
                        type='number'
                        onChange={(item) => {
                            setErrors({ ...errors, budgetMin: false })
                            setBudgetMin(+item.target.value)
                        }}
                        sx={{ flexGrow: .5 }}
                        onBlur={handleBlur}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mx: '10px' }}>
                        <Typography >to</Typography>
                    </Box>
                    <TextField
                        size="small"
                        value={budgetMax || ''}
                        type='number'
                        onChange={(item) => {
                            setErrors({ ...errors, budgetMax: false })
                            setBudgetMax(+item.target.value)
                        }}
                        sx={{ flexGrow: .5 }}
                        onBlur={handleBlur}
                    />
                </ProfileEntryRight>
            </ProfileEntryContainer>
        </ProfilePaper >
    )
}

export default CompanyInfo

const LeftChipLabel = styled(Typography)(() => ({
    fontSize: '.8rem',
    fontWeight: '500',
    textAlign: 'center',
}))