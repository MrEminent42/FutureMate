import Paper from '@mui/material/Paper'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import currentUserAtom, { currentUserListedAtom } from '../../jotai/currentUserAtom'
import { Intern } from '../../types/Intern'
import { ProfilePaper } from '../../pages/MyProfile'

const DisplayProfile = ({ checkFullProfile }: { checkFullProfile: () => boolean }) => {

    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
    const [tried, setTried] = useState(false);
    const [listed, setListed] = useAtom(currentUserListedAtom);

    const loadInfo = () => {
        // setListed(currentUser?.listed || false);
    }

    useEffect(() => {
        updateUserInfo()
    }, [listed])

    useEffect(() => {
        loadInfo()
    }, [])

    const updateUserInfo = () => {
        if (currentUser) {
            let currentUserUpdateInfo = { ...currentUser, listed: listed } as Intern;
            setCurrentUser(currentUserUpdateInfo)
        }
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTried(true);
        if (e.target.checked && checkFullProfile()) {
            setListed(true);
        } else { setListed(false) }
    }

    return (
        <ProfilePaper>
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
                    <Switch color='secondary' checked={listed} onChange={handleChange} />
                </Box>
            </Box>
            {renderTodos()}
        </ProfilePaper>
    )
}


export default DisplayProfile