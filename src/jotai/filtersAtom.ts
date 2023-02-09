import { atom } from "jotai";
import { CleanlinessResponse, LoudnessResponse, StartDate } from "../types/MatchingQuestions";

const startDateFilterAtom = atom<StartDate[]>([])
const cleanlinessFilterAtom = atom<CleanlinessResponse[]>([])
const loudnessFiltersAtom = atom<LoudnessResponse[]>([])

export { startDateFilterAtom, loudnessFiltersAtom, cleanlinessFilterAtom }