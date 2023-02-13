import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { firebaseApp, firebaseAuth, usersAtom } from "../config/firebase";
import { InternDocConverter as InternDocConverter, Intern } from "../types/Intern";
import { useAtom } from 'jotai';
import Typography from "@mui/material/Typography";
import { useEffect, useState } from 'react';
import { Box } from "@mui/system";
import { CapsToLower } from "../types/MatchingQuestions";
import Grid from "@mui/material/Grid/Grid";
import grey from "@mui/material/colors/grey";
import PlaceIcon from '@mui/icons-material/Place';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TypographyMapping from "../types/TypographyMapping";
import { useNavigate } from "react-router-dom";
import selectedInternAtom from "../jotai/selectedInternAtom";
import { styled } from "@mui/material/styles";
import { Avatar, Fade, Card, Button } from "@mui/material";
import currentUserAtom, { currentUserListedAtom } from "../jotai/currentUserAtom";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Collapse } from '@mui/material';
import Divider from '@mui/material/Divider';
import { filteredUsersAtom, filteredUsersNonMatchesAtom } from "../jotai/usersAtoms";


const InternList = () => {
    const navigate = useNavigate();
    const [allUsers, setUsers] = useAtom(usersAtom);
    const [filteredUsers] = useAtom(filteredUsersAtom);
    const [nonMatchUsers] = useAtom(filteredUsersNonMatchesAtom);

    const [currentUser] = useAtom(currentUserAtom);
    const [currentUserListed] = useAtom(currentUserListedAtom);
    const [showNonMatches, setShowNonMatches] = useState(false);

    const loadUsers = () => {
        const db = getFirestore(firebaseApp);
        const q = query(collection(db, "mates"), where("listed", "==", true));
        getDocs(q.withConverter(InternDocConverter)).then((querySnapshot) => setUsers(querySnapshot.docs)).catch(console.log)
    }

    useEffect(() => {
        if (firebaseAuth.currentUser) loadUsers();
    }, [])


    return (
        <Box sx={{ px: '1rem' }}>

            {/* hidden reminder */}
            {!currentUserListed && (
                <ProfileReminder onClick={() => navigate('profile')} >
                    <Typography sx={{ fontSize: '.8rem' }}>
                        You're not listing your profile.
                    </Typography>
                    <Button color="secondary" >
                        Fix that <ChevronRightIcon />
                    </Button>
                </ProfileReminder>
            )}

            <Box>
                <Fade in={allUsers.length > 0}>
                    <Box>
                        {filteredUsers && filteredUsers.map((user, i) => (
                            <InternCard
                                internInfo={user.data()} key={i} />
                        ))}
                        {allUsers.length > 0 && filteredUsers.length === 0 && (
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mt: '1rem'
                            }}>
                                <Typography>No matches.</Typography>
                            </Box>
                        )}
                        <Button
                            color='secondary'
                            onClick={() => setShowNonMatches(!showNonMatches)}
                        >
                            See non-matches
                        </Button>
                    </Box>
                </Fade>
            </Box>
            <Collapse
                in={showNonMatches}
            >
                <Divider />
                {nonMatchUsers.length > 0 ? nonMatchUsers.map((user, i) => (
                    <InternCard
                        internInfo={user.data()} key={i} />
                )) : (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: '1rem'
                    }}>
                        <Typography>There's  nobody here.</Typography>
                    </Box>
                )}
            </Collapse>
        </Box>
    )
}

const InternCard = ({ internInfo }: { internInfo: Intern }) => {
    const [, setOtherIntern] = useAtom(selectedInternAtom);
    const navigate = useNavigate();
    return (
        <InternPaper
            onClick={() => {
                setOtherIntern(internInfo)
                navigate("mate");
            }}

        >
            <Grid container sx={{}}>
                {/* left container for title, text, etc */}
                <Grid item container sx={{ p: { xs: '.5rem', sm: '1.0rem' } }} xs={8}>
                    <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Name>
                            {internInfo.name}
                        </Name>
                        <Pronouns>
                            {internInfo.pronouns && internInfo.pronouns}
                        </Pronouns>

                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {internInfo.location && (
                            <InfoChip>
                                <PlaceIcon sx={{ color: grey[500], height: '1.2rem' }} />
                                <Typography
                                    variant={TypographyMapping.CardDotInfo}
                                    sx={{
                                        color: grey[500],
                                        textTransform: 'capitalize'
                                    }}>{CapsToLower(internInfo.location)}</Typography>
                            </InfoChip>
                        )}
                        {internInfo.startDate && (
                            <InfoChip>
                                <InsertInvitationIcon sx={{ color: grey[500], height: '1.2rem' }} />
                                <Typography
                                    variant={TypographyMapping.CardDotInfo}
                                    sx={{ color: grey[500], textTransform: 'capitalize' }}
                                >
                                    {CapsToLower(internInfo.startDate)}
                                </Typography>
                            </InfoChip>
                        )}
                        {internInfo.budgetMax && (
                            <InfoChip>
                                <AttachMoneyIcon sx={{ color: grey[500], height: '1.2rem' }} />
                                <Typography variant={TypographyMapping.CardDotInfo} sx={{ color: grey[500] }}>{internInfo.budgetMax}</Typography>
                            </InfoChip>
                        )}
                    </Grid>
                </Grid>

                {/* right container for image */}
                <Grid item xs={4} sx={{ p: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                    <Box sx={{ height: '100px', width: '100px', borderRadius: '50%', overflow: 'hidden', textAlign: 'center' }}>
                        <Avatar
                            src={internInfo.photoURL ? internInfo.photoURL : ""}
                            sx={{ width: '100%', height: '100%' }}>
                            {internInfo?.name ? internInfo.name.split(" ").map((s) => s[0]).join("") : "Unknown"}
                        </Avatar>
                    </Box>
                </Grid>

            </Grid>
        </InternPaper >
    )
}

export default InternList;

const Name = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    fontSize: '1.3rem',
    fontWeight: '500'
}))

const Pronouns = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    fontSize: '.8rem',
    fontWeight: '300'
}))

const InternPaper = styled(Card)(({ theme }) => ({
    margin: '1rem 0',
    wordBreak: 'break-word',
    overflow: 'hidden',
    // border: '2px solid #c7c4c4',
    borderRadius: '20px'
}))

const InfoChip = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    margin: '2px 0'
}))

const ProfileReminder = styled(Card)(() => ({
    padding: '5px 10px 5px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}))