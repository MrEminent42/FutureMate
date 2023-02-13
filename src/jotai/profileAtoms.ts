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
    householdSize: false,
});


export const getTodoLabel = (error: string) => {
    switch (error) {
        case "photoURL": return "a profile photo";
        case "name": return "your name";
        case "contact": return "your contact info";
        case "startDate": return "your internship start date";
        case "location": return "your internship location";
        case "budgetMin": return "your minimum preferred budget";
        case "budgetMax": return "your maximum budget";
        case "loudness": return "your loudness living preference";
        case "cleanliness": return "your cleanliness living preference";
        case "bedtime": return "your average bedtime";
        case "houeholdSize": return "your preferred household size";
        default: return "Some other error is happening here..."
    }
}

export { profileErrorsAtom };