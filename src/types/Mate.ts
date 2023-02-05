import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { Bedtime, CleanlinessResponse, LocationResponse, LoudnessResponse, ShareBedroomResponse, StartDate } from "./MatchingQuestions";
import { User } from "firebase/auth";
import { firebaseAuth } from "../config/firebase";

export interface MateInfo {
    uid: string,
    listed: boolean,

    contact?: string | null,
    name?: string | null,
    photoURL?: string | null,

    startDate?: StartDate | null,
    location?: LocationResponse | null,
    budgetMax?: number | null,
    budgetMin?: number | null,

    bedtime?: Bedtime | null,
    cleanliness?: CleanlinessResponse | null,
    loudness?: LoudnessResponse,

    numRoomatesMin?: number | null,
    numRoomatesMax?: number | null,
    shareBedroom?: ShareBedroomResponse | null,
}

export const combineMateInfo = (primary: {
    uid?: string,
    listed?: boolean,

    contact?: string | null,
    name?: string | null,
    photoURL?: string | null,

    startDate?: StartDate | null,
    location?: LocationResponse | null,
    budgetMax?: number | null,
    budgetMin?: number | null,

    bedtime?: Bedtime | null,
    cleanliness?: CleanlinessResponse | null,
    loudness?: LoudnessResponse,

    numRoomatesMin?: number | null,
    numRoomatesMax?: number | null,
    shareBedroom?: ShareBedroomResponse | null,
}, secondary: MateInfo) => {
    return {
        uid: primary.uid || secondary.uid,
        listed: primary.listed || secondary.listed || false,

        contact: primary.contact || secondary.contact,
        name: primary.name || secondary.name,
        photoURL: primary.photoURL || secondary.photoURL,

        startDate: primary.startDate || secondary.startDate,
        location: primary.location || secondary.location,
        budgetMax: primary.budgetMax || secondary.budgetMax,
        budgetMin: primary.budgetMin || secondary.budgetMin,

        bedtime: primary.bedtime || secondary.bedtime,
        cleanliness: primary.cleanliness || secondary.cleanliness,
        loudness: primary.loudness || secondary.loudness,

        numRoomatesMax: primary.numRoomatesMax || secondary.numRoomatesMax,
        numRoomatesMin: primary.numRoomatesMin || secondary.numRoomatesMin,
        shareBedroom: primary.shareBedroom || secondary.shareBedroom,
    } as MateInfo;
}

export const MateDocConverter = {
    toFirestore: (mate: MateInfo) => {
        return {
            uid: mate.uid,
            listed: mate.listed,
            contact: mate.contact || "",
            name: mate.name || "",
            photoURL: mate.photoURL || "",

            startDate: mate.startDate || "",
            budgetMax: mate.budgetMax || "",
            budgetMin: mate.budgetMin || "",
            location: mate.location || "",

            bedtime: mate.bedtime || "",
            cleanliness: mate.cleanliness || "",
            loudness: mate.loudness || "",

            numRoomatesMin: mate.numRoomatesMin || "",
            numRoomatesMax: mate.numRoomatesMax || "",
            shareBedroom: mate.shareBedroom || "",
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot<MateInfo>, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return data as MateInfo;
    }
}