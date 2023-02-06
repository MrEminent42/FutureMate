import React, { useState, useEffect } from 'react'
import { ProfileEntryContainer, ProfileEntryLeft, ProfileEntryRight, ProfilePaper, SectionTitle } from '../../pages/MyProfile'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material';
import Slider from '@mui/material/Slider';
import { Bedtime, CleanlinessResponse, LoudnessResponse } from '../../types/MatchingQuestions';
import { useAtom } from 'jotai';
import currentUserAtom from '../../jotai/currentUserAtom';
import { CleanlinessLabels, BedtimeLabels, LoudnessLabels, combineInternInfo } from '../../types/Intern';

const Questionnaire = () => {
    const [loudness, setLoudness] = useState(LoudnessResponse.MOSTLY_QUIET);
    const [bedtime, setBedtime] = useState(Bedtime.ELEVEN_OR_TWELVE);
    const [cleanliness, setCleanliness] = useState(CleanlinessResponse.VERY_CLEAN);

    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

    const loadData = () => {
        setLoudness(currentUser?.loudness || LoudnessResponse.MOSTLY_QUIET);
        setBedtime(currentUser?.bedtime || Bedtime.ELEVEN_OR_TWELVE);
        setCleanliness(currentUser?.cleanliness || CleanlinessResponse.VERY_CLEAN);
    }

    useEffect(() => {
        loadData();
    }, [])


    const updateLocalUserInfo = () => {
        if (!currentUser) return;
        setCurrentUser(combineInternInfo(
            {
                loudness: loudness,
                bedtime: bedtime,
                cleanliness: cleanliness,
            },
            currentUser
        ));
    }

    useEffect(() => {
        updateLocalUserInfo()
    }, [bedtime, loudness, cleanliness])



    return (
        <ProfilePaper>
            <SectionTitle >Roommate Questionnarie</SectionTitle>
            <ProfileEntryContainer>
                <ProfileEntryLeft>
                    <Typography>
                        Loudness
                    </Typography>
                </ProfileEntryLeft>
                <ProfileEntryRight>
                    <Slider
                        sx={{ width: '80%' }}
                        value={loudness || 2}
                        min={1}
                        max={4}
                        onChange={(e, nv) => setLoudness(nv as number)}
                        valueLabelFormat={(i) => LoudnessLabels[i]}
                        getAriaValueText={(i) => LoudnessLabels[i]}
                        valueLabelDisplay="auto"
                    />
                </ProfileEntryRight>
            </ProfileEntryContainer>
            <ProfileEntryContainer>
                <ProfileEntryLeft>
                    <Typography>
                        Bedtime
                    </Typography>
                </ProfileEntryLeft>
                <ProfileEntryRight>
                    <Slider
                        sx={{ width: '80%' }}
                        value={bedtime || 2}
                        min={Bedtime.NINE_TO_ELEVEN}
                        max={Bedtime.AFTER_MIDNIGHT}
                        marks={[
                            { value: Bedtime.NINE_TO_ELEVEN, label: BedtimeLabels[Bedtime.NINE_TO_ELEVEN] },
                            { value: Bedtime.ELEVEN_OR_TWELVE, label: BedtimeLabels[Bedtime.ELEVEN_OR_TWELVE] },
                            { value: Bedtime.AFTER_MIDNIGHT, label: BedtimeLabels[Bedtime.AFTER_MIDNIGHT] }
                        ]}
                        onChange={(e, nv) => setBedtime(nv as number)}
                    />
                </ProfileEntryRight>
            </ProfileEntryContainer>
            <ProfileEntryContainer>
                <ProfileEntryLeft>
                    <Typography>
                        Cleanliness
                    </Typography>
                </ProfileEntryLeft>
                <ProfileEntryRight>
                    <Slider
                        sx={{ width: '80%' }}
                        value={cleanliness || 2}
                        min={1}
                        max={4}
                        onChange={(e, nv) => setCleanliness(nv as number)}
                        valueLabelFormat={(i) => CleanlinessLabels[i]}
                        getAriaValueText={(i) => CleanlinessLabels[i]}
                        valueLabelDisplay="auto"
                    />
                </ProfileEntryRight>
            </ProfileEntryContainer>
        </ProfilePaper>
    )
}

export default Questionnaire

