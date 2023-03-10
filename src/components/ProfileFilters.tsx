import { Card, styled, Typography, Box, Dialog, useMediaQuery, ToggleButtonGroup, ToggleButton } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CapsToLower, CleanlinessResponse, LocationResponse, LoudnessResponse, StartDate } from '../types/MatchingQuestions';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { useAtom } from 'jotai';
import { budgetFilterAtom, cleanlinessFilterAtom, householdSizeFilterAtom, locationFilterAtom, loudnessFiltersAtom, startDateFilterAtom } from '../jotai/filtersAtom';
import theme from '../config/config.theme';
import ReplayIcon from '@mui/icons-material/Replay';
import CheckIcon from '@mui/icons-material/Check';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { CleanlinessLabels, LoudnessLabels } from '../types/Intern';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PlaceIcon from '@mui/icons-material/Place';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const ProfileFilters = () => {
    const [open, setOpen] = useState(false);

    const [locationFilter, setLocationFilter] = useAtom(locationFilterAtom);

    const [startDateFilter, setStartDateFilter] = useAtom(startDateFilterAtom);
    const [cleanlinessFilter, setCleanlinessFilter] = useAtom(cleanlinessFilterAtom);
    const [loudnessFilter, setLoudnessFilter] = useAtom(loudnessFiltersAtom);

    const [householdSizeFilter, setHouseholdSizeFilter] = useAtom(householdSizeFilterAtom);
    // const [budgetFilter, setBudgetFilter] = useAtom(budgetFilterAtom);

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const resetFilters = () => {
        setLocationFilter(null);
        setStartDateFilter([]);
        setCleanlinessFilter([]);
        setLoudnessFilter([]);
        setHouseholdSizeFilter([]);
        // setBudgetFilter(null);
    }

    const countAppliedFilters = () => {
        let count = 0;

        if (locationFilter) count++;

        if (startDateFilter.length) count++;
        if (cleanlinessFilter.length) count++;
        if (loudnessFilter.length) count++;
        if (householdSizeFilter.length) count++;
        // if (budgetFilter && budgetFilter > 0) count++;
        return count;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: { xs: '100%', md: '600px' } }}>

            {/* <FiltersPaper sx={{ width: (open ? '80%' : '69%') }}> */}
            <FiltersPaper sx={{ minWidth: '40%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TopLabel>
                        Filters {countAppliedFilters() > 0 && `(${countAppliedFilters()})`}
                    </TopLabel>
                    <Box style={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center', marginLeft: '20px', }}>

                        {countAppliedFilters() > 0 && <FilterButton
                            variant='outlined'
                            color='secondary'
                            onClick={resetFilters}
                        >
                            <ReplayIcon />
                            {!fullScreen && 'Reset'}
                        </FilterButton>}
                        <FilterButton
                            variant='contained'
                            color='secondary'
                            onClick={() => setOpen(!open)}
                            sx={{
                            }}
                        >
                            {!fullScreen && 'Select'}
                            <ChevronRightIcon
                                sx={{
                                    transition: 'all 250ms',
                                    transform: open ? 'rotate(90deg)' : '',
                                }} />
                        </FilterButton>
                    </Box>
                </Box>

            </FiltersPaper >

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullScreen={fullScreen}
                PaperProps={{
                    sx: {
                        backgroundColor: '#f3f3f3',
                    }
                }}
            >
                <DialogBox>
                    <DialogTitle>
                        Filters
                    </DialogTitle>

                    <FilterFlex>
                        <Box sx={{ px: '10px' }}>
                            <PlaceIcon />
                        </Box>
                        <Select
                            size="small"
                            value={locationFilter}
                            onChange={(item) => {
                                setLocationFilter(item.target.value as LocationResponse)
                            }}
                            sx={{ width: '300px', maxWidth: '90%' }}
                            renderValue={(item) => {
                                if (item) {
                                    return <p style={{ textTransform: 'capitalize' }}>{item ? CapsToLower(item) : "Location"}</p>
                                } else {
                                    return <em>Any</em>
                                }
                            }}
                        >
                            <MenuItem
                                value=""
                            >
                                <em>Any</em>
                            </MenuItem>
                            {Object.values(LocationResponse).map((item, i) => (
                                <MenuItem
                                    key={i}
                                    value={item}
                                    sx={{ textTransform: 'capitalize' }}
                                >{CapsToLower(item)}</MenuItem>
                            ))}
                        </Select>

                    </FilterFlex>

                    <FilterFlex>
                        <Box sx={{ px: '10px' }}>
                            <InsertInvitationIcon />
                        </Box>
                        <ToggleButtonGroup
                            value={startDateFilter}
                            onChange={(_, value) => setStartDateFilter(value)}
                        >
                            {Object.values(StartDate).map((item, i) => (
                                <FilterToggleButton
                                    key={i}
                                    sx={{ textTransform: 'capitalize', flexGrow: 1 }}
                                    value={item}
                                >{CapsToLower(item)}</FilterToggleButton>
                            ))}
                        </ToggleButtonGroup>

                    </FilterFlex>
                    <FilterFlex>
                        <Box sx={{ px: '10px' }}>
                            <CleaningServicesIcon />
                        </Box>
                        <ToggleButtonGroup
                            value={cleanlinessFilter}
                            onChange={(_, value) => setCleanlinessFilter(value)}
                        >
                            {Object.keys(CleanlinessResponse).slice(0, 4).map((item, i) => (
                                <FilterToggleButton
                                    key={i}
                                    value={+item}
                                >{CleanlinessLabels[i + 1]}</FilterToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </FilterFlex>
                    <FilterFlex>
                        <Box sx={{ px: '10px' }}>
                            <VolumeUpIcon />
                        </Box>
                        <ToggleButtonGroup
                            value={loudnessFilter}
                            onChange={(_, value) => setLoudnessFilter(value)}
                        >
                            {Object.keys(LoudnessResponse).slice(0, 4).map((item, i) => (
                                <FilterToggleButton
                                    key={i}
                                    value={+item}
                                >{LoudnessLabels[i + 1]}</FilterToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </FilterFlex>
                    <FilterFlex>
                        <Box sx={{ px: '10px' }}>
                            <HolidayVillageIcon />
                        </Box>
                        <ToggleButtonGroup
                            value={householdSizeFilter}
                            onChange={(_, value) => setHouseholdSizeFilter(value)}
                        >
                            {[2, 3, 4, 5].map((item) => (
                                <FilterToggleButton
                                    key={item}
                                    value={+item}
                                >{item < 5 ? item : "5+"}</FilterToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </FilterFlex>
                    {/* <FilterFlex>
                        <Box sx={{ px: '10px' }}>
                            <AttachMoneyIcon />
                        </Box>
                        <ToggleButtonGroup
                            value={budgetFilter}
                            exclusive
                            onChange={(_, value) => setBudgetFilter(value)}
                        >
                            {[1000, 1500, 2000, 2500, 3000, 3500, 4000].map((item) => (
                                <FilterToggleButton
                                    key={item}
                                    value={+item}
                                >{item < 4000 ? "$" + item : "$4000+"}</FilterToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </FilterFlex> */}
                    <Box sx={{ flexGrow: 1 }} />
                    <FilterFlex sx={{ gap: '10px' }}>
                        <FilterButton
                            variant='outlined'
                            color='secondary'
                            onClick={resetFilters}
                            sx={{
                                mb: '1rem'
                            }}
                        >
                            <ReplayIcon />
                            Reset
                        </FilterButton>
                        <FilterButton
                            variant='contained'
                            color='secondary'
                            onClick={() => setOpen(false)}
                            sx={{
                                mb: '1rem'
                            }}
                        >
                            <CheckIcon />
                            Apply
                        </FilterButton>
                    </FilterFlex>
                </DialogBox>

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
            </Dialog>
        </Box>

    )
}

export default ProfileFilters


const FiltersPaper = styled(Card)(() => ({
    transition: 'all 250ms',
    margin: '1rem ',
    padding: '.5rem 1rem',
    wordBreak: 'break-word',
    overflow: 'hidden',
    borderRadius: '20px',
    backgroundColor: '#f3f3f3',
    borderWidth: '1px'
}))

const TopLabel = styled(Typography)(() => ({
    fontSide: '1.5rem',
    fontWeight: '600'
}))

const FilterButton = styled(Button)(({ theme }) => ({
    // backgroundColor: theme.palette.secondary.light
}))

const DialogBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px',
    padding: '5px 10px',
    // backgroundColor: 'red',
    height: '100%',
}))

const DialogTitle = styled(Typography)(() => ({
    fontSize: '1.1rem',
    fontWeight: '600',
    // backgroundColor: 'red',
}))
const DialogSubtitle = styled(Typography)(() => ({
    fontSize: '0.8rem',
    fontWeight: '500',
}))

const FilterFlex = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px',

}))

const FilterToggleButton = styled(ToggleButton)(() => ({

    textTransform: 'capitalize',
    flexGrow: 1,

    '&.Mui-selected': {
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        }
    }
}))