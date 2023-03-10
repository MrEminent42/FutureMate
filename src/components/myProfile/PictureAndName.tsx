import { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import UpdateProfilePicture from './UpdateProfilePicture';
import TextField from '@mui/material/TextField/TextField';
import { useAtom } from 'jotai';
import currentUserAtom from '../../jotai/currentUserAtom';
import { combineInternInfo, Intern } from '../../types/Intern';
import { failSnackAtom, uploadSuccessSnackAtom } from '../../jotai/snacksAtoms';
import { ProfileEntryContainer, ProfilePaper } from '../../pages/MyProfile';
import { Box } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import Autocomplete from '@mui/material/Autocomplete';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { profileErrorsAtom } from '../../jotai/profileAtoms';

const PictureAndName = () => {
    const [openPfpDialog, setOpenPfpDialog] = useState(false);

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [pronouns, setPronouns] = useState('');
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

    // const [errors, setErrors] = useState({ name: false, contact: false });
    const [errors, setErrors] = useAtom(profileErrorsAtom);
    const [, setUploadSuccess] = useAtom(uploadSuccessSnackAtom);
    const [, setFail] = useAtom(failSnackAtom);

    const handleDialogClose = () => {
        setOpenPfpDialog(false);
    }

    const handleSuccess = () => {
        setUploadSuccess(true);
        setErrors({ ...errors, photoURL: false });
    }

    const loadData = () => {
        setName(currentUser?.name || '');
        setContact(currentUser?.contact || '');
        setPronouns(currentUser?.pronouns || '');
    }

    useEffect(() => {
        loadData()
    }, [])

    const handleBlur = () => {
        if (validate()) {
            updateUserInfo()
        }
    }

    const validate = () => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const phoneRegex = /\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/

        setErrors({ ...errors, name: name.length < 2, contact: !(emailRegex.test(contact) || phoneRegex.test(contact)) })
        if (errors.name || errors.contact) return false;
        return true;
    }

    const updateUserInfo = () => {
        if (currentUser) {
            setCurrentUser(combineInternInfo({ name: name, contact: contact, pronouns: pronouns }, currentUser))
        }
    }


    return (
        <ProfilePaper>
            <UpdateProfilePicture
                open={openPfpDialog}
                onClose={handleDialogClose}
                setUploadFailed={setFail}
                setUploadSuccess={handleSuccess}
            />
            <ProfileEntryContainer>
                <Box
                    sx={{ width: '140px', position: 'relative' }}
                    onClick={() => setOpenPfpDialog(true)}
                >
                    <IconButton
                        disableFocusRipple
                        disableRipple
                        sx={{
                            position: 'absolute',
                            right: '3px',
                            top: '3px',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            zIndex: '1',
                            boxShadow: '3'
                        }}
                    >
                        {currentUser?.photoURL ? <EditIcon /> : <AddAPhotoIcon />}
                    </IconButton>
                    <Avatar
                        src={currentUser?.photoURL ? currentUser.photoURL : ""}
                        sx={{
                            width: '140px',
                            height: '140px',
                            border: errors.photoURL ? '3px solid red' : '3px solid transparent',
                        }}>
                        {currentUser?.name ? currentUser.name.split(" ").map((s) => s[0]).join("") : name ? name.split(" ").map((s) => s[0]).join("") : "Unknown"}
                    </Avatar>
                </Box>
            </ProfileEntryContainer>
            <ProfileEntryContainer sx={{ py: '10px' }}>
                <TextField
                    size="small"
                    label="Name"
                    autoComplete='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={handleBlur}
                    error={errors.name}
                    sx={{ width: '300px' }}
                />
            </ProfileEntryContainer>
            <ProfileEntryContainer sx={{ py: '10px' }}>
                <Autocomplete
                    size="small"
                    disablePortal
                    id="pronouns"
                    freeSolo
                    value={pronouns}
                    onChange={(e, text) => {
                        setPronouns(text || '')
                    }}
                    onInputChange={(e, text) => {
                        setPronouns(text || '')
                    }}
                    onBlur={handleBlur}
                    options={["she/her/hers", "he/him/his", "they/them/theirs", "she/they", "they/she", "he/they", "they/he"]}
                    renderInput={(params) => <TextField {...params} label="Pronouns" />}
                    ListboxProps={{
                        style: {
                            borderWidth: 0
                        }
                    }}

                    sx={{ width: '300px' }}
                />
            </ProfileEntryContainer>
            <ProfileEntryContainer sx={{ pt: '10px' }}>
                <TextField
                    size="small"
                    label="Contact method"
                    autoComplete='email'
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    onBlur={handleBlur}
                    error={errors.contact}
                    helperText={errors.contact ? "Please enter a valid phone or email" : "Phone or email, to be listed publicly."}
                    sx={{ width: '300px' }}
                />
            </ProfileEntryContainer>

        </ProfilePaper >
    )
}

export default PictureAndName