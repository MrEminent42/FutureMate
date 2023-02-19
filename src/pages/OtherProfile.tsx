import { useAtom } from 'jotai'
import Box from '@mui/material/Box/Box';
import selectedInternAtom from '../jotai/selectedInternAtom'
import { Typography, styled, IconButton } from '@mui/material';
import { ProfilePaper, SectionTitle } from './MyProfile';
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
import { Navigate, useNavigate } from 'react-router-dom';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import Divider from '@mui/material/Divider';
import Groups2Icon from '@mui/icons-material/Groups2';
import BedIcon from '@mui/icons-material/Bed';

const OtherProfile = () => {
    const navigate = useNavigate();

    const [otherIntern] = useAtom(selectedInternAtom);

    if (!otherIntern) {
        return (
            <Navigate to="/" />
        )
    }

    const getUrl = (link: string, value: string) => {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        if (!!pattern.test(value)) {
            // is url
            if (value.startsWith("https://") || value.startsWith("http://")) {
                return value;
            } else {
                return "https://" + value;
            }
        }
        return link + value;
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
                                href={getUrl("https://linkedin.com/in/", otherIntern.linkedin)}
                                target="_blank"
                            >
                                <LinkedIn />
                            </IconButton>
                        )}
                        {otherIntern.instagram && (
                            <IconButton
                                href={getUrl("https://instagram.com/", otherIntern.instagram)}
                                target="_blank"
                            >
                                <Instagram />
                            </IconButton>
                        )}
                    </Box>
                </ProfilePaper>

                <ProfilePaper>
                    <CardPadder>
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
                    <CardPadder sx={{ flexDirection: 'column', py: { md: '5px' } }}>
                        <SectionTitle>Lifestyle Preferences</SectionTitle>
                        <SliderEntryContainer>
                            <ProfileEntryLeft>
                                <Typography sx={{ textAlign: 'center' }}>
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
                <ProfilePaper sx={{ pb: 0 }}>
                    <CardPadder sx={{ flexDirection: 'column' }}>
                        <SectionTitle>Household Preferences</SectionTitle>
                        {/* <Grid container gap={2}> */}
                        {(
                            <PreferenceGridItem >
                                <PreferenceGridLeft>
                                    <Groups2Icon sx={{ color: 'secondary.main', height: '3rem' }} />
                                    <PreferenceText>All genders</PreferenceText>
                                </PreferenceGridLeft>
                                <PreferenceGridRight>
                                    <PreferenceValue>{otherIntern.genderInclusive ? "Yes" : "No"}</PreferenceValue>
                                </PreferenceGridRight>
                            </PreferenceGridItem>
                        )}
                        <Divider variant="fullWidth" flexItem />
                        {(
                            <PreferenceGridItem >
                                <PreferenceGridLeft>
                                    <BedIcon sx={{ color: 'secondary.main', height: '3rem' }} />
                                    <PreferenceText>Shared bedroom</PreferenceText>
                                </PreferenceGridLeft>
                                <PreferenceGridRight>
                                    <PreferenceValue>{otherIntern.shareBedroom ? "Yes" : "No"}</PreferenceValue>
                                </PreferenceGridRight>
                            </PreferenceGridItem>
                        )}
                        <Divider variant="fullWidth" flexItem />
                        {otherIntern.householdSize && (
                            <>
                                <PreferenceGridItem >
                                    <PreferenceGridLeft>
                                        <HolidayVillageIcon sx={{ color: 'secondary.main', height: '3rem' }} />
                                        <PreferenceText>Preferred household size</PreferenceText>
                                    </PreferenceGridLeft>
                                    <PreferenceGridRight>
                                        <PreferenceValue>{otherIntern.householdSize}</PreferenceValue>
                                    </PreferenceGridRight>
                                </PreferenceGridItem>
                            </>
                        )}
                        {/* </Grid> */}
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
    padding: '10px 0',
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
    textAlign: 'center',
}))
const Pronouns = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
}))

const CardPadder = styled(Box)(() => ({
    p: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}))

const InfoChip = styled(Box)(() => ({
    width: '33%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}))

const InfoChipText = styled(Typography)(() => ({
    textTransform: 'capitalize',
    textAlign: 'center',
    fontSize: '.75rem',
    fontWeight: '700',
}))

const PreferenceText = styled(Typography)(() => ({
    // textTransform: 'capitalize',
    textAlign: 'center',
    fontSize: '1.0rem',
    fontWeight: '500',
    // paddingLeft: '2px',
}))

const PreferenceValue = styled(Typography)(() => ({
    textTransform: 'capitalize',
    textAlign: 'center',
    fontSize: '1.3rem',
    fontWeight: '500',
    minWidth: '30%',
}))

export const SliderEntryContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.breakpoints.up('sm') ? '20px 10px 10px 0' : '25px 30px 10px 0'
}))

export const ProfileEntryLeft = styled(Box)(({ theme }) => ({
    // width: '20%',
    flexGrow: .1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
}))

export const ProfileEntryRight = styled(Box)(({ theme }) => ({
    // width: '80%',
    flexGrow: .8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}))

const PreferenceGridItem = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
}))

const PreferenceGridLeft = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2px 10px',
    height: '100%',
    boxSizing: 'border-box',
    gap: '10px',
}))


const PreferenceGridRight = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // width: '30%',
    marginRight: '10px',
}))