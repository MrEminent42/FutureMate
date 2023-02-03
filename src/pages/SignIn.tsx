import { GoogleAuthProvider, getAdditionalUserInfo, signInWithPopup } from "firebase/auth";
import { firebaseApp, firebaseAuth, firestoreDb, usersAtom } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { QuerySnapshot, addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc } from "firebase/firestore";
import { MateDocConverter, MateInfo } from "../types/Mate";
import { useAtom } from "jotai";
import { useState, useEffect } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import currentUserAtom from "../jotai/currentUserAtom";
import { useAuthState } from "react-firebase-hooks/auth";


export const SignIn = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useAtom(usersAtom);
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);


    const [authState] = useAuthState(firebaseAuth);
    useEffect(() => {
        if (authState?.email) {
            navigate("/")
        }
    }, [authState]);


    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        setSubmitted(true);
        setLoading(true);

        signInWithPopup(firebaseAuth, provider).then((result) => {
            loadCurrentUser();
            // loadUsers();
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            setLoading(false);
            setSubmitted(false);
            alert(error.message);
        })
    }

    // useEffect(() => {
    //     if (!submitted) return;
    //     finishLogin();

    // }, [loading])



    const loadCurrentUser = () => {

        const userRef = doc(firestoreDb, "mates", firebaseAuth.currentUser!.uid!).withConverter(MateDocConverter);
        getDoc(userRef).catch(console.log).then((docSnap) => {
            if (!docSnap || !docSnap.exists()) {
                console.log("creating new user")
                let newMate = {
                    uid: firebaseAuth.currentUser!.uid!,
                    email: firebaseAuth.currentUser!.email,
                    photoURL: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
                    name: firebaseAuth.currentUser!.displayName,
                    listed: false,
                } as MateInfo;
                setDoc(userRef, newMate).catch(console.log);
                setCurrentUser(newMate);
            } else {
                setCurrentUser(docSnap.data());
            }
            setLoading(false);
            navigate("/profile");
        });
    }

    return (
        <>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
        </>
    )
}


export default SignIn