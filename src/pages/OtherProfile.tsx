import React from 'react'
import { MateInfo } from '../types/Mate'
import { useAtom } from 'jotai'
import Box from '@mui/material/Box/Box';
import selectedMateAtom from '../jotai/selectedMateAtom'
import { Typography, Paper, CircularProgress } from '@mui/material';
import { ProfilePaper } from './MyProfile';

const OtherProfile = () => {

    const [otherMate] = useAtom(selectedMateAtom);

    if (!otherMate) {
        return (
            <CircularProgress />
        )
    }

    return (
        <Box sx={{ width: { xs: '100%', md: '600px' } }}>
            <Box sx={{ px: '1rem' }}>
                <ProfilePaper elevation={0}>


                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: '5px' }}>

                        <Box
                            component="img"
                            src={otherMate.photoURL || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}

                            sx={{
                                borderRadius: '50%',
                                height: '140px',
                                width: '140px',
                            }}
                        />

                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h3" sx={{ mb: '1rem' }}>{otherMate?.name}</Typography>
                        <Typography>contact: {otherMate.contact}</Typography>
                    </Box>
                </ProfilePaper>
            </Box>

        </Box>
    )
}

export default OtherProfile