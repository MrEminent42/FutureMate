import { useAtom } from 'jotai'
import Box from '@mui/material/Box/Box';
import selectedInternAtom from '../jotai/selectedInternAtom'
import { Typography, CircularProgress, styled, IconButton } from '@mui/material';
import { ProfilePaper } from './MyProfile';
import Avatar from '@mui/material/Avatar';
import PlaceIcon from '@mui/icons-material/Place';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Bedtime, CapsToLower } from '../types/MatchingQuestions';
import { CleanlinessLabels, LoudnessLabels, BedtimeLabels } from '../types/Intern';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Instagram from '@mui/icons-material/Instagram';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';

const OtherProfile = () => {
    const navigate = useNavigate();

    const [otherIntern] = useAtom(selectedInternAtom);

    if (!otherIntern) {
        return (
            <CircularProgress />
        )
    }

    return (
        <Box sx={{ width: { xs: '100%', md: '600px' } }}>
            <TitleContainer>
                <BackContainer>
                    <Button
                        onClick={() => navigate("/")}
                        color="inherit">
                        <ChevronLeft />
                        Roommate List
                    </Button>
                </BackContainer>
                {/* <PageTitle>
                    Intern Profile
                </PageTitle> */}
            </TitleContainer>
            <Box sx={{ px: '1rem' }}>
                <ProfilePaper>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: '5px' }}>

                        <Avatar
                            src={otherIntern.photoURL ? otherIntern.photoURL : ""}
                            sx={{ width: '140px', height: '140px' }}>
                            {otherIntern?.name ? otherIntern.name.split(" ").map((s) => s[0]).join("") : "Unknown"}
                        </Avatar>

                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Name variant="h3" >{otherIntern?.name}</Name>
                        {otherIntern.pronouns && <Pronouns>{otherIntern.pronouns}</Pronouns>}
                        <Typography>{otherIntern.contact}</Typography>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        {otherIntern.linkedin && (
                            <IconButton
                                href={"https://linkedin.com/in/" + otherIntern.linkedin}
                                target="_blank"
                            >
                                <LinkedIn />
                            </IconButton>
                        )}
                        {otherIntern.instagram && (
                            <IconButton
                                href={"https://instagram.com/" + otherIntern.instagram}
                                target="_blank"
                            >
                                <Instagram />
                            </IconButton>
                        )}
                    </Box>
                </ProfilePaper>

                <ProfilePaper>
                    <CardPadder >
                        {otherIntern.location && (

                            <Tooltip title="Location" placement="top">
                                <InfoChip>
                                    <PlaceIcon sx={{ color: 'secondary.main', height: '1.2rem' }} />
                                    <InfoChipText>{CapsToLower(otherIntern.location)}</InfoChipText>
                                </InfoChip>
                            </Tooltip>
                        )}
                        {otherIntern.startDate && (

                            <Tooltip title="Internship Start Date" placement="top">
                                <InfoChip>
                                    <InsertInvitationIcon sx={{ color: 'secondary.main', height: '1.2rem' }} />
                                    <InfoChipText>{CapsToLower(otherIntern.startDate)}</InfoChipText>
                                </InfoChip>
                            </Tooltip>
                        )}
                        {otherIntern.budgetMax && (
                            <Tooltip title="Budget" placement="top">
                                <InfoChip>
                                    <AttachMoneyIcon sx={{ color: 'secondary.main', height: '1.2rem' }} />
                                    <InfoChipText >{otherIntern.budgetMax}</InfoChipText>
                                </InfoChip>
                            </Tooltip>
                        )}
                        {otherIntern.householdSize && (
                            <Tooltip title="Household Size" placement="top">
                                <InfoChip>
                                    <HolidayVillageIcon sx={{ color: 'secondary.main', height: '1.2rem' }} />
                                    <InfoChipText >{otherIntern.householdSize}</InfoChipText>
                                </InfoChip>
                            </Tooltip>
                        )}
                    </CardPadder>
                </ProfilePaper>
                <ProfilePaper sx={{ pb: 0 }}>
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
                                    value={otherIntern.loudness || 2}
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
                                    value={otherIntern.bedtime || 2}
                                    min={Bedtime.NINE_TO_ELEVEN}
                                    max={Bedtime.AFTER_MIDNIGHT}
                                    valueLabelFormat={(i) => BedtimeLabels[i]}
                                    getAriaValueText={(i) => BedtimeLabels[i]}
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
                                    value={otherIntern.cleanliness || 2}
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


const TitleContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    padding: '10px 0'
}))

const BackContainer = styled(Box)(() => ({
    height: '100%',
    position: 'absolute',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}))

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
    // color: grey[500],
    textTransform: 'capitalize',
    textAlign: 'center',
    fontSize: '.75rem',
    fontWeight: '700'
}))

export const SliderEntryContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.breakpoints.up('sm') ? '10px 10px 10px 0' : '25px 30px 10px 0'
}))

export const ProfileEntryLeft = styled(Box)(({ theme }) => ({
    // width: '20%',
    flexGrow: .1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}))

export const ProfileEntryRight = styled(Box)(({ theme }) => ({
    // width: '80%',
    flexGrow: .8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}))