import { atom } from "jotai";

const profileErrorsAtom = atom({
    photoURL: false,
    name: false,
    pronouns: false,
    contact: false,
    startDate: false,
    location: false,
    budgetMin: false,
    budgetMax: false,
    loudness: false,
    bedtime: false,
    cleanliness: false,
    linkedin: false,
    instagram: false,
});

export { profileErrorsAtom };