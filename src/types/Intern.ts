import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { Bedtime, CleanlinessResponse, LocationResponse, LoudnessResponse, StartDate } from "./MatchingQuestions";

export interface Intern {
    uid: string,
    listed: boolean,
    hidden?: string[],

    contact?: string | null,
    name?: string | null,
    photoURL?: string | null,
    pronouns?: string | null,

    startDate?: StartDate | null,
    location?: LocationResponse | null,
    budgetMax?: number | null,
    budgetMin?: number | null,
    roleInfo?: string | null,

    bedtime?: Bedtime | null,
    cleanliness?: CleanlinessResponse | null,
    loudness?: LoudnessResponse | null,
    genderInclusive?: boolean | null,

    householdSize?: number | null,
    shareBedroom?: boolean | null,

    linkedin?: string | null,
    instagram?: string | null,
}

export const LoudnessLabels = ["", "Mostly quiet", "Occasionally social", "Often loud", "Very party"];
export const CleanlinessLabels = ["", "Almost jungle", "Lots of stuff", "Mostly tidy", "Very clean"]
export const BedtimeLabels = ["", "9-11PM", "11PM-12AM", "12AM+"]

export const combineInternInfo = (primary: {
    uid?: string,
    listed?: boolean,
    hidden?: string[],

    contact?: string | null,
    name?: string | null,
    photoURL?: string | null,
    pronouns?: string | null,

    startDate?: StartDate | null,
    location?: LocationResponse | null,
    budgetMax?: number | null,
    budgetMin?: number | null,
    roleInfo?: string | null,

    bedtime?: Bedtime | null,
    cleanliness?: CleanlinessResponse | null,
    loudness?: LoudnessResponse | null,
    genderInclusive?: boolean | null,

    householdSize?: number | null,
    shareBedroom?: boolean | null,

    linkedin?: string | null,
    instagram?: string | null,
}, secondary: Intern) => {
    return {
        uid: primary.uid || secondary.uid,
        listed: primary.listed !== undefined ? primary.listed : secondary.listed,
        hidden: primary.hidden,

        contact: primary.contact || secondary.contact,
        name: primary.name || secondary.name,
        photoURL: primary.photoURL || secondary.photoURL,
        pronouns: primary.pronouns || secondary.pronouns,

        startDate: primary.startDate || secondary.startDate,
        location: primary.location || secondary.location,
        budgetMax: primary.budgetMax || secondary.budgetMax,
        budgetMin: primary.budgetMin || secondary.budgetMin,
        roleInfo: primary.roleInfo || secondary.roleInfo ,

        bedtime: primary.bedtime || secondary.bedtime,
        cleanliness: primary.cleanliness || secondary.cleanliness,
        loudness: primary.loudness || secondary.loudness,
        genderInclusive: primary.genderInclusive || secondary.genderInclusive,

        householdSize: primary.householdSize || secondary.householdSize,
        shareBedroom: primary.shareBedroom,

        linkedin: primary.linkedin || secondary.linkedin,
        instagram: primary.instagram || secondary.instagram,
    } as Intern;
}

export const InternDocConverter = {
    toFirestore: (intern: Intern) => {
        return {
            uid: intern.uid,
            listed: intern.listed,
            hidden: intern.hidden || [] as string[],

            contact: intern.contact || "",
            name: intern.name || "",
            photoURL: intern.photoURL || "",
            pronouns: intern.pronouns || "",

            startDate: intern.startDate || "",
            budgetMax: intern.budgetMax || "",
            budgetMin: intern.budgetMin || "",
            location: intern.location || "",
            roleInfo: intern.roleInfo || "",

            bedtime: intern.bedtime || "",
            cleanliness: intern.cleanliness || "",
            loudness: intern.loudness || "",
            genderInclusive: intern.genderInclusive || "",

            householdSize: intern.householdSize || "",
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