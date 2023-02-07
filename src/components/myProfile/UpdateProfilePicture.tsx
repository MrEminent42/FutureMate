import React, { useState } from 'react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { User, updateProfile } from 'firebase/auth';
import FileResizer from 'react-image-file-resizer';
import { firebaseAuth, firebaseStorage } from '../../config/firebase';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { useAtom } from 'jotai';
import currentUserAtom from '../../jotai/currentUserAtom';
import { Intern } from '../../types/Intern';

const UpdateProfilePicture = (props: {
    open: boolean;
    onClose: () => void;
    setUploadSuccess: (a: boolean) => any;
    setUploadFailed: (a: boolean) => any;
}) => {

    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
    const [photo, setPhoto] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);


    const uploadProfile = async (photo: File, firebaseUser: User, setLoading: (a: boolean) => any) => {
        const fileRef = ref(firebaseStorage, "profiles/" + firebaseUser.uid + ".png");
        setLoading(true);
        const compressedPhoto = (await resizeFile(photo)) as File;
        const res = await uploadBytes(fileRef, compressedPhoto);
        const photoURL = await getDownloadURL(fileRef);
        if (!firebaseAuth.currentUser) return;
        updateProfile(firebaseAuth.currentUser, { photoURL: photoURL }).then(() => {
            setLoading(false);
            props.setUploadSuccess(true);
        })
        setCurrentUser({ ...currentUser, photoURL: photoURL } as Intern)
    }

    const resizeFile = (file: File) => new Promise(resolve => {
        FileResizer.imageFileResizer(file, 600, 600, 'PNG', 80, 0,
            uri => {
                resolve(uri);
            }, 'file');
    });

    const handleClose = (photo: File) => {
        if (!firebaseAuth.currentUser) return;
        props.onClose();
        setPhoto(photo);
        uploadProfile(photo, firebaseAuth.currentUser, setUploading).then(totalSuccess).catch(fail);

    };

    const totalSuccess = () => {
        setUploading(false);
        props.setUploadSuccess(true);
    }

    const fail = () => {
        setUploading(false);
        props.setUploadFailed(true);
    }


    if (uploading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open
            >
                <CircularProgress color="secondary" />
            </Backdrop>
        )
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Change profile photo</DialogTitle>
            <Button
                variant="contained"
                component="label"
            >
                Upload File
                <input
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            // console.log(e.target.files[0]);
                            handleClose(e.target.files[0]);
                        }
                    }}
                    type="file"
                    hidden
                />
            </Button>

        </Dialog>
    )
}

export default UpdateProfilePicture