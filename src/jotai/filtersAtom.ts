import { atom } from "jotai";
import { CleanlinessResponse, LocationResponse, LoudnessResponse, StartDate } from "../types/MatchingQuestions";

const includeNoResponseFiltersAtom = atom(true);

const locationFilterAtom = atom<LocationResponse | null>(null)

const startDateFilterAtom = atom<StartDate[]>([])
const cleanlinessFilterAtom = atom<CleanlinessResponse[]>([])
const loudnessFiltersAtom = atom<LoudnessResponse[]>([])

const householdSizeFilterAtom = atom<number[]>([])
const budgetFilterAtom = atom<number | null>(null)

export {
    locationFilterAtom,
    startDateFilterAtom,
    loudnessFiltersAtom,
    cleanlinessFilterAtom,
    householdSizeFilterAtom,
    budgetFilterAtom,
}
