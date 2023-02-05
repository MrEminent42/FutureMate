import { useAtom } from 'jotai'
import Box from '@mui/material/Box/Box';
import selectedMateAtom from '../jotai/selectedMateAtom'
import { Typography, CircularProgress, styled } from '@mui/material';
import { ProfilePaper } from './MyProfile';
import Avatar from '@mui/material/Avatar';
import PlaceIcon from '@mui/icons-material/Place';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Bedtime, CapsToLower } from '../types/MatchingQuestions';
import TypographyMapping from '../types/TypographyMapping';
import { grey } from '@mui/material/colors';
import { CleanlinessLabels, LoudnessLabels } from '../types/Mate';
import Slider from '@mui/material/Slider';

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
                        <Name variant="h3" >{otherMate?.name}</Name>
                        {otherMate.pronouns && <Pronouns>{otherMate.pronouns}</Pronouns>}
                        <Typography>contact: {otherMate.contact}</Typography>
                    </Box>
                </ProfilePaper>

                <ProfilePaper>
                    <CardPadder >
                        {otherMate.location && (
                            <InfoChip>
                                <PlaceIcon sx={{ color: grey[500], height: '1.2rem' }} />
                                <InfoChipText>{CapsToLower(otherMate.location)}</InfoChipText>
                            </InfoChip>
                        )}
                        {otherMate.startDate && (
                            <InfoChip>
                                <InsertInvitationIcon sx={{ color: grey[500], height: '1.2rem' }} />
                                <InfoChipText>{CapsToLower(otherMate.startDate)}</InfoChipText>
                            </InfoChip>
                        )}
                        {otherMate.budgetMax && (
                            <InfoChip>
                                <AttachMoneyIcon sx={{ color: grey[500], height: '1.2rem' }} />
                                <InfoChipText >{otherMate.budgetMax}</InfoChipText>
                            </InfoChip>
                        )}
                    </CardPadder>
                </ProfilePaper>
                <ProfilePaper>
                    <CardPadder sx={{ flexDirection: 'column' }}>
                        <SliderEntryContainer>
                            <ProfileEntryLeft>
                                <Typography>
                                    Loudness
                                </Typography>
                            </ProfileEntryLeft>
                            <ProfileEntryRight>
                                <Slider
                                    disabled
                                    valueLabelDisplay="on"
                                    sx={{ width: '80%' }}
                                    value={otherMate.loudness || 2}
                                    min={1}
                                    max={4}
                                    valueLabelFormat={(i) => LoudnessLabels[i]}
                                    getAriaValueText={(i) => LoudnessLabels[i]}
                                />
                            </ProfileEntryRight>
                        </SliderEntryContainer>
                        <SliderEntryContainer>
                            <ProfileEntryLeft>
                                <Typography>
                                    Bedtime
                                </Typography>
                            </ProfileEntryLeft>
                            <ProfileEntryRight>
                                <Slider
                                    disabled
                                    valueLabelDisplay="on"
                                    sx={{ width: '80%' }}
                                    value={otherMate.bedtime || 2}
                                    min={Bedtime.NINE_TO_ELEVEN}
                                    max={Bedtime.AFTER_MIDNIGHT}
                                />
                            </ProfileEntryRight>
                        </SliderEntryContainer>
                        <SliderEntryContainer>
                            <ProfileEntryLeft>
                                <Typography>
                                    Cleanliness
                                </Typography>
                            </ProfileEntryLeft>
                            <ProfileEntryRight>
                                <Slider
                                    disabled
                                    valueLabelDisplay="on"
                                    sx={{ width: '80%' }}
                                    value={otherMate.cleanliness || 2}
                                    min={1}
                                    max={4}
                                    valueLabelFormat={(i) => CleanlinessLabels[i]}
                                    getAriaValueText={(i) => CleanlinessLabels[i]}
                                />
                            </ProfileEntryRight>
                        </SliderEntryContainer>
                    </CardPadder>
                </ProfilePaper>
            </Box>
        </Box>
    )
}

export default OtherProfile

const Name = styled(Typography)(({ theme }) => ({
    fontSize: '2rem',
    fontWeight: '600',
}))
const Pronouns = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
}))

const CardPadder = styled(Box)(() => ({
    p: 3,
    display: 'flex',
    justifyContent: 'center',
}))

const InfoChip = styled(Box)(() => ({
    width: '33%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}))

const InfoChipText = styled(Typography)(() => ({
    color: grey[500],
    textTransform: 'capitalize',
    textAlign: 'center',
    fontSize: '.75rem',
    fontWeight: '700'
}))

export const SliderEntryContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '25px 0 10px 0',
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