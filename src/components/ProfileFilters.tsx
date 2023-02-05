import { Paper, styled, Typography, Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Collapse from '@mui/material/Collapse';
import ButtonGroup from '@mui/material/ButtonGroup';
import { CapsToLower, LoudnessResponse, StartDate } from '../types/MatchingQuestions';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { useAtom } from 'jotai';
import { loudnessFiltersAtom, startDateFilterAtom } from '../jotai/filtersAtom';
import { LoudnessLabels } from '../types/Intern';

const ProfileFilters = () => {
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useAtom(startDateFilterAtom);
    const [loudness, setLoudness] = useAtom(loudnessFiltersAtom);

    return (
        <FiltersPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <TopLabel>
                    Filters
                </TopLabel>
                <FilterButton
                    variant='contained'
                    color='secondary'
                    onClick={() => setOpen(!open)}
                    sx={{
                    }}
                >
                    <ChevronRightIcon
                        sx={{
                            transition: 'all 250ms',
                            transform: open ? 'rotate(90deg)' : '',
                        }} />
                </FilterButton>
            </Box>
            <Collapse
                in={open}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px' }}>
                    <Box sx={{ px: '10px' }}>
                        <InsertInvitationIcon />
                    </Box>
                    <ButtonGroup
                        sx={{ flexGrow: 1 }}
                    >
                        {Object.values(StartDate).map((item, i) => (
                            <Button
                                key={i}
                                color='secondary'
                                sx={{ flexGrow: 1 }}

                                variant={startDate === item ? 'contained' : 'outlined'}
                                onClick={() => {
                                    setStartDate(startDate && startDate === item ? null : item)
                                }}
                            >{CapsToLower(item)}</Button>
                        ))}
                    </ButtonGroup>
                </Box>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px' }}>
                    <Box sx={{ px: '10px' }}>
                        <InsertInvitationIcon />
                    </Box>
                    <ButtonGroup
                        sx={{ flexGrow: 1 }}
                    >
                        {Object.values(LoudnessResponse).map((item, i) => (
                            <Button
                                key={i}
                                color='secondary'
                                sx={{ flexGrow: 1 }}
                                // variant={loudness === item ? 'contained' : 'outlined'}
                                onClick={() => {
                                    // setLoudness(loudness ? null : item as LoudnessResponse)
                                }}
                            >{item}</Button>
                        ))}
                    </ButtonGroup>
                </Box> */}
            </Collapse>
        </FiltersPaper >
    )
}

const FiltersPaper = styled(Paper)(() => ({
    transition: 'all 250ms',
    margin: '1rem ',
    padding: '.5rem 1rem',
    wordBreak: 'break-word',
    overflow: 'hidden',
    borderRadius: '20px',
    backgroundColor: '#eeecec',
    border: '1px solid black'
}))

const TopLabel = styled(Typography)(() => ({
    fontSide: '1.5rem',
    fontWeight: '600'
}))

const FilterButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.light
}))

export default ProfileFilters