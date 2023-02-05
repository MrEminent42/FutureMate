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
    pronouns?: string | null,

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

    linkedin?: string | null,
    instagram?: string | null,
}

export const CleanlinessLabels = ["", "Mostly quiet", "Occasionally social", "Often social", "Very party"];
export const LoudnessLabels = ["", "Very clean", "Mostly tidy", "Lots of stuff", "Almost jungle"]

export const combineMateInfo = (primary: {
    uid?: string,
    listed?: boolean,

    contact?: string | null,
    name?: string | null,
    photoURL?: string | null,
    pronouns?: string | null,

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

    linkedin?: string | null,
    instagram?: string | null,
}, secondary: MateInfo) => {
    return {
        uid: primary.uid || secondary.uid,
        listed: primary.listed || secondary.listed || false,

        contact: primary.contact || secondary.contact,
        name: primary.name || secondary.name,
        photoURL: primary.photoURL || secondary.photoURL,
        pronouns: primary.pronouns || secondary.pronouns,

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

        linkedin: primary.linkedin || secondary.linkedin,
        instagram: primary.instagram || secondary.instagram,
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
            pronouns: mate.pronouns || "",

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

            linkedin: mate.linkedin || "",
            instagram: mate.instagram || "",
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot<MateInfo>, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return data as MateInfo;
    }
}