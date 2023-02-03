import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { Bedtime, CleanlinessResponse, LocationResponse, LoudnessResponse, ShareBedroomResponse, StartDate } from "./MatchingQuestions";
import { User } from "firebase/auth";

export interface MateInfo {
    uid: string,
    listed: boolean,

    contact?: string,
    name?: string,
    photoURL?: string,

    startDate?: StartDate,
    location?: LocationResponse,
    budgetMax?: number,
    budgetMin?: number,

    bedtime?: Bedtime,
    cleanliness?: CleanlinessResponse,
    loudness?: LoudnessResponse,

    numRoomatesMin?: number,
    numRoomatesMax?: number,
    shareBedroom?: ShareBedroomResponse,
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