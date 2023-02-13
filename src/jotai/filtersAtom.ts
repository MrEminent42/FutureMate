import { atom } from "jotai";
import { CleanlinessResponse, LocationResponse, LoudnessResponse, StartDate } from "../types/MatchingQuestions";
import { atomWithStorage } from 'jotai/utils';

const includeNoResponseFiltersAtom = atom(true);

const locationFilterAtom = atomWithStorage<LocationResponse | null>('locationFilter', null)

const startDateFilterAtom = atomWithStorage<StartDate[]>('startDateFilter', [])
const cleanlinessFilterAtom = atomWithStorage<CleanlinessResponse[]>('cleanlinessFilter', [])
const loudnessFiltersAtom = atomWithStorage<LoudnessResponse[]>('loudnessFilter', [])

const householdSizeFilterAtom = atomWithStorage<number[]>('householdSizeFilter', [])
const budgetFilterAtom = atomWithStorage<number | null>('budgetFilter', null)

export {
    locationFilterAtom,
    startDateFilterAtom,
    loudnessFiltersAtom,
    cleanlinessFilterAtom,
    householdSizeFilterAtom,
    budgetFilterAtom,
}
