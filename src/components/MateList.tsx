import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { firebaseApp, firebaseAuth, usersAtom } from "../config/firebase";
import { MateDocConverter, MateInfo } from "../types/Mate";
import { useAtom } from 'jotai';
import Typography from "@mui/material/Typography";
import { useEffect, useState } from 'react';
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { CapsToLower } from "../types/MatchingQuestions";
import Grid from "@mui/material/Grid/Grid";
import grey from "@mui/material/colors/grey";
import PlaceIcon from '@mui/icons-material/Place';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TypographyMapping from "../types/TypographyMapping";
import { useNavigate } from "react-router-dom";
import selectedMateAtom from "../jotai/selectedMateAtom";
import { styled } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import { startDateFilterAtom } from "../jotai/filtersAtom";



const MateList = () => {
    const [users, setUsers] = useAtom(usersAtom);
    const [date] = useAtom(startDateFilterAtom);

    const [matches, setMatches] = useState([] as MateInfo[]);
    const [notMatches, setNotMatches] = useState([] as MateInfo[]);

    const loadUsers = () => {
        const db = getFirestore(firebaseApp);
        const q = query(collection(db, "mates"), where("listed", "==", true))
        getDocs(q.withConverter(MateDocConverter)).then((querySnapshot) => setUsers(querySnapshot.docs)).catch(console.log)
    }

    useEffect(() => {
        if (firebaseAuth.currentUser) loadUsers();
    }, [])

    useEffect(() => {
        let matchList = [] as MateInfo[];
        let noMatchList = [] as MateInfo[];
        users.forEach((user) => {
            if (!date || user.data().startDate === date) {
                matchList.push(user.data())
            } else {
                noMatchList.push(user.data())
            }
        })

        setMatches(matchList);
        setNotMatches(noMatchList);

    }, [usersAtom, date])

    return (
        <>
            <Box sx={{ px: '1rem' }}>
                <Typography variant="h3">Roomates</Typography>
                {matches && matches.map((user, i) => (
                    <MateCard
                        mateInfo={user} key={i} />
                ))}
            </Box>
        </>
    )
}

const MateCard = ({ mateInfo }: { mateInfo: MateInfo }) => {
    const [, setOtherMate] = useAtom(selectedMateAtom);
    const navigate = useNavigate();
    return (
        <MatePaper
            onClick={() => {
                setOtherMate(mateInfo)
                navigate("mate");
            }}

        >
            <Grid container sx={{}}>
                {/* left container for title, text, etc */}
                <Grid item container sx={{ p: { xs: '.5rem', sm: '1.0rem' } }} xs={8}>
                    <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Name>
                            {mateInfo.name}
                        </Name>
                        <Pronouns>
                            {mateInfo.pronouns && mateInfo.pronouns}
                        </Pronouns>

                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {mateInfo.location && (
                            <InfoChip>
                                <PlaceIcon sx={{ color: grey[500], height: '1.2rem' }} />
                                <Typography
                                    variant={TypographyMapping.CardDotInfo}
                                    sx={{
                                        color: grey[500],
                                        textTransform: 'capitalize'
                                    }}>{CapsToLower(mateInfo.location)}</Typography>
                            </InfoChip>
                        )}
                        {mateInfo.startDate && (
                            <InfoChip>
                                <InsertInvitationIcon sx={{ color: grey[500], height: '1.2rem' }} />
                                <Typography
                                    variant={TypographyMapping.CardDotInfo}
                                    sx={{ color: grey[500], textTransform: 'capitalize' }}
                                >
                                    {CapsToLower(mateInfo.startDate)}
                                </Typography>
                            </InfoChip>
                        )}
                        {mateInfo.budgetMax && (
                            <InfoChip>
                                <AttachMoneyIcon sx={{ color: grey[500], height: '1.2rem' }} />
                                <Typography variant={TypographyMapping.CardDotInfo} sx={{ color: grey[500] }}>{mateInfo.budgetMax}</Typography>
                            </InfoChip>
                        )}
                    </Grid>
                </Grid>

                {/* right container for image */}
                <Grid item xs={4} sx={{ p: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                    <Box sx={{ height: '100px', width: '100px', borderRadius: '50%', overflow: 'hidden', textAlign: 'center' }}>
                        <Avatar src={mateInfo.photoURL || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"} sx={{ width: '100%', height: '100%' }} />
                    </Box>
                </Grid>

            </Grid>
        </MatePaper >
    )
}

export default MateList;

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

const MatePaper = styled(Paper)(({ theme }) => ({
    margin: '1rem 0',
    wordBreak: 'break-word',
    overflow: 'hidden',
    border: '1px solid grey',
    borderRadius: '20px'
}))

const InfoChip = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    margin: '2px 0'
}))