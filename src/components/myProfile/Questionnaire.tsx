import React, { useState, useEffect } from 'react'
import { ProfileEntryContainer, ProfileEntryLeft, ProfileEntryRight, ProfilePaper, SectionTitle } from '../../pages/MyProfile'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles'
import Slider from '@mui/material/Slider';
import { Bedtime, CleanlinessResponse, LoudnessResponse } from '../../types/MatchingQuestions';
import { useAtom } from 'jotai';
import currentUserAtom from '../../jotai/currentUserAtom';

const Questionnaire = () => {
    const [loudness, setLoudness] = useState(LoudnessResponse.MOSTLY_QUIET);
    const [bedtime, setBedtime] = useState(Bedtime.ELEVEN_OR_TWELVE);
    const [cleanliness, setCleanliness] = useState(CleanlinessResponse.VERY_CLEAN);

    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

    const getLoudnessLabel = (loud: LoudnessResponse) => {
        return ["Mostly quiet", "Occasionally social", "Often social", "Very party"][loud - 1]
    }

    const getCleanlinessLabel = (clean: CleanlinessResponse) => {
        return ["Very clean", "Mostly tidy", "Lots of stuff", "Almost jungle"][clean - 1]
    }

    const updateLocalUserInfo = () => {
        if (!currentUser) return;
        let currentUserUpdateInfo = {
            ...currentUser,
            loudness: loudness,
            bedtime: bedtime
        }
        setCurrentUser(currentUserUpdateInfo);
    }


    useEffect(() => {
        updateLocalUserInfo()
    }, [bedtime, loudness])



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
                        valueLabelFormat={getLoudnessLabel}
                        getAriaValueText={getLoudnessLabel}
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
                            { value: Bedtime.NINE_TO_ELEVEN, label: "9-11 PM" },
                            { value: Bedtime.ELEVEN_OR_TWELVE, label: "11PM-12AM" },
                            { value: Bedtime.AFTER_MIDNIGHT, label: "12AM+" }
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
                        valueLabelFormat={getCleanlinessLabel}
                        getAriaValueText={getCleanlinessLabel}
                        valueLabelDisplay="auto"
                    />
                </ProfileEntryRight>
            </ProfileEntryContainer>
        </ProfilePaper>
    )
}

export default Questionnaire

