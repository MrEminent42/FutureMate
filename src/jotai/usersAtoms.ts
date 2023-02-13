import { atom } from 'jotai';
import { usersAtom } from '../config/firebase';
import { budgetFilterAtom, cleanlinessFilterAtom, householdSizeFilterAtom, locationFilterAtom, loudnessFiltersAtom, startDateFilterAtom } from './filtersAtom';

const filteredUsersAtom = atom(
    (get) => {
        const users = get(usersAtom);
        if (users === null) return [];
        const locationFilter = get(locationFilterAtom);
        const startDates = get(startDateFilterAtom);
        const cleanliness = get(cleanlinessFilterAtom);
        const loudness = get(loudnessFiltersAtom);
        const household = get(householdSizeFilterAtom);
        // const budget = get(budgetFilterAtom);
        return users.filter((item) => {
            const intern = item.data()
            return (
                (!locationFilter || (!intern.location || locationFilter === intern.location)) &&
                (startDates.length === 0 || (!intern.startDate || startDates.includes(intern.startDate))) &&
                (cleanliness.length === 0 || (!intern.cleanliness || cleanliness.includes(intern.cleanliness))) &&
                (loudness.length === 0 || (!intern.loudness || loudness.includes(intern.loudness))) &&
                (household.length === 0 || (!intern.householdSize || household.includes(intern.householdSize)))
                // (!budget || (intern.budgetMax && (intern.budgetMax >= budget)))
            )
        })

    }
)

const filteredUsersNonMatchesAtom = atom(
    (get) => {
        const users = get(usersAtom);
        if (users === null) return [];
        const filteredUsersList = get(filteredUsersAtom)
        const filteredUsers = new Set(filteredUsersList);
        return users.filter((item) => !filteredUsers.has(item))
    }
)

export { filteredUsersAtom, filteredUsersNonMatchesAtom }