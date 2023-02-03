import Paper from '@mui/material/Paper'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import currentUserAtom from '../../jotai/currentUserAtom'
import { MateInfo } from '../../types/Mate'
import { ProfilePaper } from '../../pages/Profile'

const DisplayProfile = () => {

    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
    const [tried, setTried] = useState(false);
    const [enabled, setEnabled] = useState(false);

    const loadInfo = () => {
        setEnabled(currentUser?.listed || false);
    }

    useEffect(() => {
        updateUserInfo()
    }, [enabled])

    useEffect(() => {
        loadInfo()
    }, [])

    const updateUserInfo = () => {
        let currentUserUpdateInfo = { ...currentUser!, listed: enabled } as MateInfo;
        setCurrentUser(currentUserUpdateInfo)
    }

    const renderTodos = () => {
        if (checkFullProfile() || !tried) {
            return <></>
        }

        return (
            <Box>
                <Typography variant='body1' color='error'>Please add your:</Typography>
                {!currentUser?.name && <Typography> - Name</Typography>}
                {!currentUser?.contact && <Typography> - Contact method</Typography>}
                {!currentUser?.location && <Typography> - Location</Typography>}
                {!currentUser?.startDate && <Typography> - Start date</Typography>}
                {!currentUser?.budgetMax && <Typography> - Budget</Typography>}
            </Box>
        )
    }

    const checkFullProfile = () => {
        return currentUser?.name &&
            currentUser.contact &&
            currentUser.location &&
            currentUser.startDate &&
            currentUser.budgetMax;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTried(true);
        if (e.target.checked && checkFullProfile()) {
            setEnabled(true);
        } else { setEnabled(false) }
    }

    return (
        <ProfilePaper elevation={0}>
            <Box sx={{ display: 'flex' }}>

                <Box
                    sx={{
                        width: '80%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    <Typography>Display my profile</Typography>
                </Box>
                <Box
                    sx={{
                        width: '20%'
                    }}
                >
                    <Switch color='secondary' checked={enabled} onChange={handleChange} />
                </Box>
            </Box>
            {renderTodos()}
        </ProfilePaper>
    )
}


export default DisplayProfile