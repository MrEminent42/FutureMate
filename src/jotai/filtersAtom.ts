import { atom } from "jotai";
import { CleanlinessResponse, LoudnessResponse, StartDate } from "../types/MatchingQuestions";

const startDateFilterAtom = atom<StartDate | null>(null)
const cleanlinessFilterAtom = atom<CleanlinessResponse | null>(null)
const loudnessFiltersAtom = atom<LoudnessResponse | null>(null)

export { startDateFilterAtom, loudnessFiltersAtom, cleanlinessFilterAtom }