import { useAtom } from 'jotai'
import Box from '@mui/material/Box/Box';
import selectedMateAtom from '../jotai/selectedMateAtom'
import { Typography, CircularProgress } from '@mui/material';
import { ProfilePaper } from './MyProfile';
import Avatar from '@mui/material/Avatar';

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
                <ProfilePaper>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: '5px' }}>
                        <Avatar src={otherMate.photoURL || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"} sx={{ width: '140px', height: '140px' }} />
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