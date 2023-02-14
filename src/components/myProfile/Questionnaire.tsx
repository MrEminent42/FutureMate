import React, { useState, useEffect } from 'react'
import { ProfileEntryContainer, ProfileEntryLeft, ProfileEntryRight, ProfilePaper, SectionTitle } from '../../pages/MyProfile'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material';
import Slider from '@mui/material/Slider';
import { Bedtime, CleanlinessResponse, LoudnessResponse } from '../../types/MatchingQuestions';
import { useAtom } from 'jotai';
import currentUserAtom from '../../jotai/currentUserAtom';
import { CleanlinessLabels, BedtimeLabels, LoudnessLabels, combineInternInfo, Intern } from '../../types/Intern';
import { profileErrorsAtom } from '../../jotai/profileAtoms';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';

const Questionnaire = () => {
    const [loudness, setLoudness] = useState<LoudnessResponse | null>(null);
    const [bedtime, setBedtime] = useState<Bedtime | null>(null);
    const [cleanliness, setCleanliness] = useState<CleanlinessResponse | null>(null);
    const [householdSize, setHouseholdSize] = useState<number | null>(null);
    const [shareBedroom, setShareBedroom] = useState(false);
    const [genderInclusive, setGenderInclusive] = useState(false);
    const [errors, setErrors] = useAtom(profileErrorsAtom);
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

    const loadData = () => {
        setLoudness(currentUser?.loudness || null);
        setBedtime(currentUser?.bedtime || null);
        setCleanliness(currentUser?.cleanliness || null);
        setHouseholdSize(currentUser?.householdSize || null);
        setShareBedroom(currentUser?.shareBedroom || false);
        setGenderInclusive(currentUser?.genderInclusive || false);
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
                householdSize: householdSize,
                shareBedroom: shareBedroom,
                genderInclusive: genderInclusive,
            },
            {...currentUser, shareBedroom: shareBedroom, genderInclusive: genderInclusive } as Intern
        ));
    }

    useEffect(() => {
        updateLocalUserInfo()
    }, [bedtime, loudness, cleanliness, householdSize, shareBedroom, genderInclusive])



    return (
        <ProfilePaper>
            <SectionTitle>Living Preferences</SectionTitle>
            <ProfileEntryContainer sx={{ borderWidth: errors.loudness ? '1px' : '0px', flexDirection: { xs: 'column', md: 'row' } }}>
                <ProfileEntryLeft>
                    <Typography>
                        Loudness
                    </Typography>
                </ProfileEntryLeft>
                <ProfileEntryRight>
                    <Slider
                        sx={{ width: { xs: '100%', md: '65%' } }}
                        value={loudness || 2}
                        min={1}
                        max={4}
                        onChange={(e, nv) => {
                            setErrors({ ...errors, loudness: false })
                            setLoudness(nv as number)
                        }}
                        marks={[
                            { value: 1, label: LoudnessLabels[1] },
                            { value: 4, label: LoudnessLabels[4] },
                        ]}
                        valueLabelFormat={(i) => LoudnessLabels[i]}
                        getAriaValueText={(i) => LoudnessLabels[i]}
                        valueLabelDisplay="auto"
                    />
                </ProfileEntryRight>
            </ProfileEntryContainer>
            <Divider />
            <ProfileEntryContainer sx={{ borderWidth: errors.bedtime ? '1px' : '0px', flexDirection: { xs: 'column', md: 'row' } }}>
                <ProfileEntryLeft>
                    <Typography>
                        Bedtime
                    </Typography>
                </ProfileEntryLeft>
                <ProfileEntryRight>
                    <Slider
                        sx={{ width: { xs: '100%', md: '65%' } }}
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
            <Divider />
            <ProfileEntryContainer sx={{ borderWidth: errors.cleanliness ? '1px' : '0px', flexDirection: { xs: 'column', md: 'row' } }}>
                <ProfileEntryLeft>
                    <Typography>
                        Cleanliness
                    </Typography>
                </ProfileEntryLeft>
                <ProfileEntryRight>
                    <Slider
                        sx={{ width: { xs: '100%', md: '65%' } }}
                        value={cleanliness || 2}
                        min={1}
                        max={4}
                        onChange={(e, nv) => {
                            setErrors({ ...errors, cleanliness: false })
                            setCleanliness(nv as number)
                        }}
                        marks={[
                            { value: 1, label: CleanlinessLabels[1] },
                            { value: 4, label: CleanlinessLabels[4] },
                        ]}
                        valueLabelFormat={(i) => CleanlinessLabels[i]}
                        getAriaValueText={(i) => CleanlinessLabels[i]}
                        valueLabelDisplay="auto"
                    />
                </ProfileEntryRight>
            </ProfileEntryContainer>
            <Divider />
            <ProfileEntryContainer sx={{ borderWidth: errors.householdSize ? '1px' : '0px', flexDirection: { xs: 'column', md: 'row' } }}>
                <ProfileEntryLeft>
                    <Typography>
                        Household Size
                    </Typography>
                </ProfileEntryLeft>
                <ProfileEntryRight sx={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Slider
                        sx={{ width: { xs: '100%', md: '65%' }, mx: '10px' }}
                        value={householdSize || 2}
                        min={2}
                        max={5}
                        onChange={(e, nv) => {
                            setErrors({ ...errors, householdSize: false })
                            setHouseholdSize(nv as number)
                        }}
                        marks={[
                            { value: 2, label: '2' },
                            { value: 5, label: '5+' },
                        ]}
                        valueLabelFormat={(i) => i < 5 ? i : "5+"}
                        getAriaValueText={(i) => i < 5 ? i.toString() : "5+"}
                        valueLabelDisplay="auto"
                    />
                </ProfileEntryRight>
            </ProfileEntryContainer>
            <Divider />
            <ProfileEntryContainer sx={{ borderWidth: errors.householdSize ? '1px' : '0px', flexDirection: { xs: 'column', md: 'row' } }}>
                {/* <ProfileEntryLeft>
                    <Typography>
                        
                    </Typography>
                </ProfileEntryLeft> */}
                <ProfileEntryRight sx={{ flexDirection: 'row', justifyContent: 'center' }}>

                    <Box sx={{ ml: '10px', px: '4px', display: 'flex', flexDirection: 'column', textAlign: 'center', }}>
                        <Box>
                            <Checkbox
                                color="secondary"
                                checked={shareBedroom}
                                onChange={(e) => setShareBedroom(e.target.checked)}
                            />
                        </Box>
                        <Typography sx={{ fontSize: '.8rem' }}>Share a bedroom</Typography>
                    </Box>
                    <Box sx={{ ml: '10px', px: '4px', display: 'flex', flexDirection: 'column', textAlign: 'center', }}>
                        <Box>
                            <Checkbox
                                color="secondary"
                                checked={genderInclusive}
                                onChange={(e) => setGenderInclusive(e.target.checked)}
                            />
                        </Box>
                        <Typography sx={{ fontSize: '.8rem' }}>Live with all genders</Typography>
                    </Box>
                </ProfileEntryRight>
            </ProfileEntryContainer>
        </ProfilePaper>
    )
}

export default Questionnaire

