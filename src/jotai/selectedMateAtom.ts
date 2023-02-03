import { atom } from "jotai";
import { MateInfo } from "../types/Mate";

const selectedMateAtom = atom<MateInfo | null>(null);

export default selectedMateAtom;