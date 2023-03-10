import Paper from '@mui/material/Paper'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import currentUserAtom, { currentUserListedAtom } from '../../jotai/currentUserAtom'
import { Intern } from '../../types/Intern'
import { ProfilePaper } from '../../pages/MyProfile'
import theme from '../../config/config.theme'
import { ErrorResponse } from '@remix-run/router'
import { getTodoLabel, profileErrorsAtom } from '../../jotai/profileAtoms'

const DisplayProfile = ({ checkFullProfile }: { checkFullProfile: () => boolean }) => {

    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
    const [tried, setTried] = useState(false);
    const [listed, setListed] = useAtom(currentUserListedAtom);
    const [errors, setErrors] = useAtom(profileErrorsAtom);


    const loadInfo = () => {
        // setListed(currentUser?.listed || false);
    }

    useEffect(() => {
        updateUserInfo()
    }, [listed])

    useEffect(() => {
        loadInfo()
    }, [])
    

    const updateUserInfo = () => {
        if (currentUser) {
            let currentUserUpdateInfo = { ...currentUser, listed: listed } as Intern;
            setCurrentUser(currentUserUpdateInfo)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTried(true);
        if (e.target.checked && checkFullProfile()) {
            setListed(true);
        } else { setListed(false) }
    }


    const renderTodos = () => {
        return <Box>
            {Object.entries(errors).filter((key) => key[1]).map(([key, isError], index) =>
                <Typography key={key} sx={{ fontSize: '.8rem', color: 'red' }}>Please add {getTodoLabel(key)}</Typography>
            )}
        </Box>
    }

    return (
        <ProfilePaper
            sx={{
                transition: 'all 250ms',
                border: listed ? "2px solid " + theme.palette.secondary.light : "",
                backgroundColor: listed ? '' : "#ececec"
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box
                    sx={{
                        // width: '80%',
                        flexGrow: .8,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        pl: {
                            xs: '5px',
                        }
                    }}
                >
                    <Typography>Display my profile</Typography>
                </Box>
                <Box
                    sx={{
                        // width: '20%',
                        flexGrow: .2,
                        display: 'flex',
                        justifyContent: 'end',
                    }}
                >
                    <Switch color='secondary' checked={!!listed} onChange={handleChange} />
                </Box>
            </Box>
            <Box sx={{ pl: '5px' }}>
                {tried && renderTodos()}
            </Box>
        </ProfilePaper>
    )
}


export default DisplayProfile