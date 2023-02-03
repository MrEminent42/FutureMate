import { collection, doc, getDoc, getDocs, getFirestore, query, QueryDocumentSnapshot, setDoc, where } from "firebase/firestore";
import { firebaseApp, firebaseAuth, firestoreDb, usersAtom } from "../config/firebase";
import { MateDocConverter, MateInfo } from "../types/Mate";
import { useAtom } from 'jotai';
import Typography from "@mui/material/Typography";
import { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { Bedtime, CapsToLower } from "../types/MatchingQuestions";
import red from "@mui/material/colors/red";
import Grid from "@mui/material/Grid/Grid";
import grey from "@mui/material/colors/grey";
import PlaceIcon from '@mui/icons-material/Place';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TypographyMapping from "../types/TypographyMapping";


const MateList = () => {
    const [users, setUsers] = useAtom(usersAtom);

    const loadUsers = () => {
        const db = getFirestore(firebaseApp);
        const q = query(collection(db, "mates"), where("listed", "==", true))
        getDocs(q.withConverter(MateDocConverter)).then((querySnapshot) => setUsers(querySnapshot.docs)).catch(console.log)
    }

    useEffect(() => {
        if (firebaseAuth.currentUser) loadUsers();
    }, [])

    return (
        <>
            <Box sx={{ px: '1rem' }}>
                <Typography variant="h3">Roomates</Typography>
                {users && users.map((doc, i) => (<MateCard mateInfo={doc.data()} key={i} />))}
            </Box>
        </>
    )


}

const MateCard = ({ mateInfo }: { mateInfo: MateInfo }) => {
    // const mateInfo = a.data()
    return (
        <Paper elevation={0} sx={{ my: '1rem', wordBreak: 'break-word', overflow: 'hidden', border: 2, borderColor: 'primary.main', borderRadius: '20px' }}>
            <Grid container sx={{}}>

                {/* left container for title, text, etc */}
                <Grid item container sx={{ p: { xs: '.5rem', sm: '1.0rem' } }} xs={8}>
                    <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant={TypographyMapping.CardName}
                            sx={{ textAlign: 'center' }}
                        >
                            {mateInfo.name}
                        </Typography>

                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {mateInfo.location && (
                            <Box sx={{ display: 'flex', alignItems: 'center', my: '2px' }}>
                                <PlaceIcon sx={{ color: grey[500], height: '1.2rem' }} />
                                <Typography
                                    variant={TypographyMapping.CardDotInfo}
                                    sx={{
                                        color: grey[500],
                                        textTransform: 'capitalize'
                                    }}>{CapsToLower(mateInfo.location)}</Typography>
                            </Box>
                        )}
                        {mateInfo.startDate && (
                            <Box sx={{ display: 'flex', alignItems: 'center', my: '2px' }}>
                                <InsertInvitationIcon sx={{ color: grey[500], height: '1.2rem' }} />
                                <Typography
                                    variant={TypographyMapping.CardDotInfo}
                                    sx={{ color: grey[500], textTransform: 'capitalize' }}
                                >
                                    {CapsToLower(mateInfo.startDate)}
                                </Typography>
                            </Box>
                        )}
                        {mateInfo.budgetMax && (
                            <Box sx={{ display: 'flex', alignItems: 'center', my: '2px' }}>
                                <AttachMoneyIcon sx={{ color: grey[500], height: '1.2rem' }} />
                                <Typography variant={TypographyMapping.CardDotInfo} sx={{ color: grey[500] }}>{mateInfo.budgetMax}</Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>

                {/* right container for image */}
                <Grid item xs={4} sx={{ p: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                    <Box sx={{ height: '100px', width: '100px', borderRadius: '50%', overflow: 'hidden', textAlign: 'center' }}>
                        <img src={mateInfo.photoURL} style={{ flexGrow: 1, height: '100%' }} />
                    </Box>
                </Grid>

            </Grid>
        </Paper >
    )
}

export default MateList;