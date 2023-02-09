import { atom } from 'jotai';
import { usersAtom } from '../config/firebase';
import { cleanlinessFilterAtom, loudnessFiltersAtom, startDateFilterAtom } from './filtersAtom';

const filteredUsersAtom = atom(
    (get) => {
        const startDates = get(startDateFilterAtom);
        const cleanliness = get(cleanlinessFilterAtom);
        const loudness = get(loudnessFiltersAtom);
        return get(usersAtom).filter((item) => {
            const intern = item.data()
            return (
                (startDates.length === 0 || (intern.startDate && startDates.includes(intern.startDate))) &&
                (cleanliness.length === 0 || (intern.cleanliness && cleanliness.includes(intern.cleanliness))) &&
                (loudness.length === 0 || (intern.loudness && loudness.includes(intern.loudness)))
            )
        })

    }
)

const filteredUsersNonMatchesAtom = atom(
    (get) => {
        const filteredUsersList = get(filteredUsersAtom)
        const filteredUsers = new Set(filteredUsersList);
        return get(usersAtom).filter((item) => !filteredUsers.has(item))
    }
)

export { filteredUsersAtom, filteredUsersNonMatchesAtom }