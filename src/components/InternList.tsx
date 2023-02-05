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
import { startDateFilterAtom } from "../jotai/filtersAtom";
import currentUserAtom from "../jotai/currentUserAtom";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const InternList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useAtom(usersAtom);
    const [date] = useAtom(startDateFilterAtom);

    const [matches, setMatches] = useState([] as Intern[]);
    const [notMatches, setNotMatches] = useState([] as Intern[]);

    const [currentUser] = useAtom(currentUserAtom)

    const loadUsers = () => {
        const db = getFirestore(firebaseApp);
        const q = query(collection(db, "mates"), where("listed", "==", true))
        getDocs(q.withConverter(InternDocConverter)).then((querySnapshot) => setUsers(querySnapshot.docs)).catch(console.log)
    }

    useEffect(() => {
        if (firebaseAuth.currentUser) loadUsers();
    }, [])

    useEffect(() => {
        filterUsers()
    }, [users, date])

    const filterUsers = () => {
        let matchList = [] as Intern[];
        let noMatchList = [] as Intern[];
        users.forEach((user) => {
            if (!date || user.data().startDate === date) {
                matchList.push(user.data())
            } else {
                noMatchList.push(user.data())
            }
        })

        setMatches(matchList);
        setNotMatches(noMatchList);
    }

    return (
        <Fade in={users.length > 0}>
            <Box sx={{ px: '1rem' }}>

                {/* hidden reminder */}
                {!currentUser?.listed && (
                    <ProfileReminder onClick={() => navigate('profile')} >
                        <Typography sx={{ fontSize: '.8rem' }}>
                            You're not listing your profile.
                        </Typography>
                        <Button color="secondary" >
                            Fix that <ChevronRightIcon />
                        </Button>
                    </ProfileReminder>
                )}

                {matches && matches.map((user, i) => (
                    <InternCard
                        internInfo={user} key={i} />
                ))}
            </Box>
        </Fade>
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
                        <Avatar src={internInfo.photoURL || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"} sx={{ width: '100%', height: '100%' }} />
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