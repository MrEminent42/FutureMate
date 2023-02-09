import React, { useState, useEffect } from 'react'
import { ProfileEntryContainer, ProfileEntryLeft, ProfileEntryRight, ProfilePaper, SectionTitle } from '../../pages/MyProfile'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material';
import Slider from '@mui/material/Slider';
import { Bedtime, CleanlinessResponse, LoudnessResponse } from '../../types/MatchingQuestions';
import { useAtom } from 'jotai';
import currentUserAtom from '../../jotai/currentUserAtom';
import { CleanlinessLabels, BedtimeLabels, LoudnessLabels, combineInternInfo } from '../../types/Intern';
import { profileErrorsAtom } from '../../jotai/profileAtoms';

const Questionnaire = () => {
    const [loudness, setLoudness] = useState<LoudnessResponse | null>(null);
    const [bedtime, setBedtime] = useState<Bedtime | null>(null);
    const [cleanliness, setCleanliness] = useState<CleanlinessResponse | null>(null);
    const [errors, setErrors] = useAtom(profileErrorsAtom);
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

    const loadData = () => {
        setLoudness(currentUser?.loudness || null);
        setBedtime(currentUser?.bedtime || null);
        setCleanliness(currentUser?.cleanliness || null);
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
            <SectionTitle>Living Preferences</SectionTitle>
            <ProfileEntryContainer sx={{ borderWidth: errors.loudness ? '1px' : '0px' }}>
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
                        onChange={(e, nv) => {
                            setErrors({ ...errors, loudness: false })
                            setLoudness(nv as number)
                        }}
                        valueLabelFormat={(i) => LoudnessLabels[i]}
                        getAriaValueText={(i) => LoudnessLabels[i]}
                        valueLabelDisplay="auto"
                    />
                </ProfileEntryRight>
            </ProfileEntryContainer>
            <ProfileEntryContainer sx={{ borderWidth: errors.bedtime ? '1px' : '0px' }}>
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
                        onChange={(e, nv) => {
                            setErrors({ ...errors, bedtime: false })
                            setBedtime(nv as number)
                        }}
                    />
                </ProfileEntryRight>
            </ProfileEntryContainer>
            <ProfileEntryContainer sx={{ borderWidth: errors.cleanliness ? '1px' : '0px' }}>
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
                        onChange={(e, nv) => {
                            setErrors({ ...errors, cleanliness: false })
                            setCleanliness(nv as number)
                        }}
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

