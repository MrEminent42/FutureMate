import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { Bedtime, CleanlinessResponse, LocationResponse, LoudnessResponse, ShareBedroomResponse, StartDate } from "./MatchingQuestions";

export interface Intern {
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
}, secondary: Intern) => {
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
    } as Intern;
}

export const InternDocConverter = {
    toFirestore: (intern: Intern) => {
        return {
            uid: intern.uid,
            listed: intern.listed,
            contact: intern.contact || "",
            name: intern.name || "",
            photoURL: intern.photoURL || "",
            pronouns: intern.pronouns || "",

            startDate: intern.startDate || "",
            budgetMax: intern.budgetMax || "",
            budgetMin: intern.budgetMin || "",
            location: intern.location || "",

            bedtime: intern.bedtime || "",
            cleanliness: intern.cleanliness || "",
            loudness: intern.loudness || "",

            numRoomatesMin: intern.numRoomatesMin || "",
            numRoomatesMax: intern.numRoomatesMax || "",
            shareBedroom: intern.shareBedroom || "",

            linkedin: intern.linkedin || "",
            instagram: intern.instagram || "",
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot<Intern>, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return data as Intern;
    }
}