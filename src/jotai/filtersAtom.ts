import { atom } from "jotai";
import { CleanlinessResponse, LoudnessResponse, StartDate } from "../types/MatchingQuestions";

const includeNoResponseFiltersAtom = atom(true);

const startDateFilterAtom = atom<StartDate[]>([])
const cleanlinessFilterAtom = atom<CleanlinessResponse[]>([])
const loudnessFiltersAtom = atom<LoudnessResponse[]>([])

const householdSizeFilterAtom = atom<number[]>([])
const budgetFilterAtom = atom<number | null>(null)

export {
    startDateFilterAtom,
    loudnessFiltersAtom,
    cleanlinessFilterAtom,
    householdSizeFilterAtom,
    budgetFilterAtom
}
